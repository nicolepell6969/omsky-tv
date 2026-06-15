import axios from 'axios';
import { NextResponse } from "next/server";

interface Channel {
  id: string;
  name: string;
  country: string;
  categories: string[];
  is_nsfw: boolean;
  closed: string | null;
}

const IPTV_API_BASE = 'https://iptv-org.github.io/api';

export const dynamic = "force-dynamic";
export const revalidate = 3600; // 1 hour

export async function GET() {
  try {
    const response = await axios.get<Channel[]>(
      `${IPTV_API_BASE}/channels.json`,
      { 
        timeout: 30000,
        maxContentLength: 50 * 1024 * 1024 // 50MB
      }
    );
    const channels = response.data;
    
    // Filter: Focus on Indonesia & Asia region
    const asiaCountries = [
      'ID', 'MY', 'SG', 'TH', 'PH', 'VN', 'KH', 'LA', 'MM', 'BN', // Southeast Asia
      'JP', 'KR', 'CN', 'TW', 'HK', 'MO', // East Asia
      'IN', 'PK', 'BD', 'LK', 'NP', 'BT', 'MV', // South Asia
      'AE', 'SA', 'QA', 'KW', 'OM', 'BH', 'JO', 'LB', 'TR', 'IL', // Middle East
    ];
    
    // Priority: Indonesia first, then Asia, then rest of world
    const indonesiaChannels = channels.filter(
      (c) => !c.closed && !c.is_nsfw && c.country === 'ID'
    );
    
    const asiaChannels = channels.filter(
      (c) => !c.closed && !c.is_nsfw && c.country !== 'ID' && asiaCountries.includes(c.country)
    );
    
    const otherChannels = channels.filter(
      (c) => !c.closed && !c.is_nsfw && !asiaCountries.includes(c.country)
    );
    
    // Combine: Indonesia + Asia (unlimited) + limited others
    const activeChannels = [
      ...indonesiaChannels,
      ...asiaChannels,
      ...otherChannels.slice(0, 500) // Only 500 from other regions
    ];

    return NextResponse.json(activeChannels, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    });
  } catch (error) {
    console.error("Error fetching channels:", error);
    return NextResponse.json(
      { error: "Failed to fetch channels" },
      { status: 500 }
    );
  }
}
