import axios from 'axios';
import { NextResponse } from "next/server";

const IPTV_API_BASE = 'https://iptv-org.github.io/api';

export const dynamic = "force-dynamic";
export const revalidate = 3600; // 1 hour

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const channelId = searchParams.get('channelId');

    const response = await axios.get(
      `${IPTV_API_BASE}/streams.json`,
      { timeout: 10000 }
    );
    const streams = response.data;

    if (channelId) {
      const channelStreams = streams.filter(
        (s: any) => s.channel === channelId
      );
      return NextResponse.json(channelStreams);
    }

    return NextResponse.json(streams);
  } catch (error) {
    console.error("Error fetching streams:", error);
    return NextResponse.json(
      { error: "Failed to fetch streams" },
      { status: 500 }
    );
  }
}
