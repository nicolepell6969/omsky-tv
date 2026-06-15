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
    
    // Filter: remove closed, NSFW, and limit to 5000 channels for performance
    const activeChannels = channels
      .filter((c) => !c.closed && !c.is_nsfw)
      .slice(0, 5000); // Limit to first 5000 channels

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
