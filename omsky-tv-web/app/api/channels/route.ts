import axios from 'axios';
import { NextResponse } from "next/server";

interface Channel {
  id: string;
  name: string;
  country: string;
  categories: string[];
  is_nsfw: boolean;
  closed: string | null;
  website: string | null;
  logo?: string;
}

interface Stream {
  channel: string | null;
  url: string;
  http_referrer?: string | null;
  user_agent?: string | null;
  timeshift?: string | null;
  quality?: string | null;
  title?: string | null;
}

interface ChannelWithStream extends Channel {
  streamUrl?: string;
  streamQuality?: string;
  http_referrer?: string;
  user_agent?: string;
}

const IPTV_API_BASE = 'https://iptv-org.github.io/api';

export const dynamic = "force-dynamic";
export const revalidate = 3600; // 1 hour

let cachedData: {
  channels: ChannelWithStream[];
  timestamp: number;
} | null = null;

const CACHE_DURATION = 3600 * 1000; // 1 hour in milliseconds

// Priority Indonesian channels (always included)
const PRIORITY_CHANNELS: ChannelWithStream[] = [
  {
    id: 'TVRI.id',
    name: 'TVRI Nasional',
    country: 'ID',
    categories: ['general'],
    is_nsfw: false,
    closed: null,
    website: 'https://tvri.go.id',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/TVRILogo2019.svg/960px-TVRILogo2019.svg.png',
    streamUrl: 'https://ott-balancer.tvri.go.id/live/eds/Nasional/hls/Nasional.m3u8',
    streamQuality: '1080p',
  },
  {
    id: 'TVRISport.id',
    name: 'TVRI Sport',
    country: 'ID',
    categories: ['sports'],
    is_nsfw: false,
    closed: null,
    website: 'https://tvri.go.id',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/TVRI_Sport_2022.svg/960px-TVRI_Sport_2022.svg.png',
    streamUrl: 'https://ott-balancer.tvri.go.id/live/eds/SportHD/hls/SportHD.m3u8',
    streamQuality: '720p',
  },
  {
    id: 'TVRIWorld.id',
    name: 'TVRI World',
    country: 'ID',
    categories: ['general'],
    is_nsfw: false,
    closed: null,
    website: 'https://tvri.go.id',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/TVRILogo2019.svg/960px-TVRILogo2019.svg.png',
    streamUrl: 'https://ott-balancer.tvri.go.id/live/eds/TVRIWorld/hls/TVRIWorld.m3u8',
    streamQuality: '720p',
  },
];

export async function GET() {
  try {
    // Check cache first
    const now = Date.now();
    if (cachedData && (now - cachedData.timestamp) < CACHE_DURATION) {
      console.log('Returning cached channels with streams');
      return NextResponse.json(cachedData.channels, {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
        },
      });
    }

    console.log('Fetching fresh data from IPTV-ORG API...');
    
    // Fetch both channels and streams in parallel
    const [channelsResponse, streamsResponse] = await Promise.all([
      axios.get<Channel[]>(`${IPTV_API_BASE}/channels.json`, { 
        timeout: 30000,
        maxContentLength: 50 * 1024 * 1024 // 50MB
      }),
      axios.get<Stream[]>(`${IPTV_API_BASE}/streams.json`, { 
        timeout: 30000,
        maxContentLength: 100 * 1024 * 1024 // 100MB
      })
    ]);

    const channels = channelsResponse.data;
    const streams = streamsResponse.data;

    console.log(`Fetched ${channels.length} channels and ${streams.length} streams`);

    // Create a Map for fast stream lookup by channel ID
    const streamsByChannel = new Map<string, Stream[]>();
    
    streams.forEach(stream => {
      if (stream.channel) {
        if (!streamsByChannel.has(stream.channel)) {
          streamsByChannel.set(stream.channel, []);
        }
        streamsByChannel.get(stream.channel)!.push(stream);
      }
    });

    console.log(`Mapped streams to ${streamsByChannel.size} channels`);

    // Filter: Focus on Indonesia & Asia region
    const asiaCountries = [
      'ID', 'MY', 'SG', 'TH', 'PH', 'VN', 'KH', 'LA', 'MM', 'BN', // Southeast Asia
      'JP', 'KR', 'CN', 'TW', 'HK', 'MO', // East Asia
      'IN', 'PK', 'BD', 'LK', 'NP', 'BT', 'MV', // South Asia
      'AE', 'SA', 'QA', 'KW', 'OM', 'BH', 'JO', 'LB', 'TR', 'IL', // Middle East
    ];
    
    // Helper function to get best stream for a channel
    const getBestStream = (channelId: string): Stream | null => {
      const channelStreams = streamsByChannel.get(channelId);
      if (!channelStreams || channelStreams.length === 0) return null;

      // Priority 1: Find "Nasional" or main feed (exact title match with channel)
      const mainFeed = channelStreams.find(s => 
        s.title?.toLowerCase().includes('nasional') ||
        s.url?.toLowerCase().includes('nasional') ||
        (s.title && s.title.split(' ').length <= 2) // Simple name like "TVRI" not "TVRI Aceh"
      );

      if (mainFeed) return mainFeed;

      // Priority 2: HD quality > 720p > no quality specified
      const priorities: Record<string, number> = {
        '1080i': 6,
        '1080p': 5,
        '720p': 4,
        '576p': 3,
        '480p': 2,
        '360p': 1,
      };

      channelStreams.sort((a, b) => {
        const priorityA = priorities[a.quality || ''] || 0;
        const priorityB = priorities[b.quality || ''] || 0;
        return priorityB - priorityA;
      });

      return channelStreams[0];
    };

    // Merge channels with streams
    const channelsWithStreams: ChannelWithStream[] = channels
      .filter(c => !c.closed && !c.is_nsfw)
      .map(channel => {
        const bestStream = getBestStream(channel.id);
        
        return {
          ...channel,
          streamUrl: bestStream?.url,
          streamQuality: bestStream?.quality || undefined,
          http_referrer: bestStream?.http_referrer || undefined,
          user_agent: bestStream?.user_agent || undefined,
        };
      });

    // Priority: Indonesia first, then Asia, then rest of world
    const indonesiaChannels = channelsWithStreams.filter(
      (c) => c.country === 'ID' && !PRIORITY_CHANNELS.some(p => p.id === c.id) // Exclude priority channels to avoid duplicates
    );
    
    const asiaChannels = channelsWithStreams.filter(
      (c) => c.country !== 'ID' && asiaCountries.includes(c.country)
    );
    
    const otherChannels = channelsWithStreams.filter(
      (c) => !asiaCountries.includes(c.country)
    );
    
    // Combine: Indonesia + Asia (unlimited) + limited others
    const activeChannels = [
      ...PRIORITY_CHANNELS, // TVRI & priority channels first
      ...indonesiaChannels, // Other Indonesia channels (duplicates already filtered)
      ...asiaChannels,
      ...otherChannels.slice(0, 500) // Only 500 from other regions
    ];

    // Filter out channels without streams
    const channelsWithWorkingStreams = activeChannels.filter(c => c.streamUrl);

    console.log(`Returning ${channelsWithWorkingStreams.length} channels with working streams`);
    console.log(`  - Indonesia: ${indonesiaChannels.filter(c => c.streamUrl).length}`);
    console.log(`  - Asia: ${asiaChannels.filter(c => c.streamUrl).length}`);
    console.log(`  - Others: ${otherChannels.slice(0, 500).filter(c => c.streamUrl).length}`);

    // Update cache
    cachedData = {
      channels: channelsWithWorkingStreams,
      timestamp: now
    };

    return NextResponse.json(channelsWithWorkingStreams, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    });
  } catch (error) {
    console.error("Error fetching channels:", error);
    
    // Return cached data if available on error
    if (cachedData) {
      console.log('Returning stale cache due to error');
      return NextResponse.json(cachedData.channels, {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
      });
    }
    
    return NextResponse.json(
      { error: "Failed to fetch channels" },
      { status: 500 }
    );
  }
}
