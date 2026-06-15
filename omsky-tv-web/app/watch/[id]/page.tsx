"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { VideoPlayer } from "@/components/VideoPlayer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Heart, Share2, Loader2 } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { getCountryFlag } from "@/lib/utils";
import axios from "axios";
import { Channel, Stream } from "@/lib/types";
import { useEffect, useState } from "react";

export default function WatchPage() {
  const params = useParams();
  const router = useRouter();
  const channelId = params.id as string;
  const { addToHistory, isFavorite, addFavorite, removeFavorite } = useAppStore();
  const [currentStreamIndex, setCurrentStreamIndex] = useState(0);
  const [watchStartTime] = useState(Date.now());

  const { data: channel, isLoading: channelLoading } = useQuery({
    queryKey: ["channel", channelId],
    queryFn: async () => {
      const response = await axios.get<Channel[]>("/api/channels");
      return response.data.find((c) => c.id === channelId);
    },
  });

  const { data: streams, isLoading: streamsLoading } = useQuery({
    queryKey: ["streams", channelId],
    queryFn: async () => {
      const response = await axios.get<Stream[]>(
        `/api/streams?channelId=${channelId}`
      );
      return response.data;
    },
  });

  const favorite = channel ? isFavorite(channel.id) : false;

  useEffect(() => {
    return () => {
      if (channel) {
        const duration = Math.floor((Date.now() - watchStartTime) / 1000);
        if (duration > 10) {
          addToHistory(channel.id, duration);
        }
      }
    };
  }, [channel, watchStartTime, addToHistory]);

  const handleFavorite = () => {
    if (!channel) return;
    if (favorite) {
      removeFavorite(channel.id);
    } else {
      addFavorite(channel.id);
    }
  };

  const handleShare = async () => {
    if (typeof navigator.share !== "undefined") {
      try {
        await navigator.share({
          title: channel?.name || "Omsky TV",
          text: `Watch ${channel?.name} on Omsky TV`,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share failed:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const handleStreamError = () => {
    if (streams && currentStreamIndex < streams.length - 1) {
      setCurrentStreamIndex(currentStreamIndex + 1);
    }
  };

  if (channelLoading || streamsLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-lg text-muted-foreground">Loading stream...</p>
      </div>
    );
  }

  if (!channel) {
    return (
      <div className="container px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Channel not found</h1>
        <Button onClick={() => router.push("/")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </div>
    );
  }

  if (!streams || streams.length === 0) {
    return (
      <div className="container px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">No streams available</h1>
        <p className="text-muted-foreground mb-6">
          This channel currently has no active streams.
        </p>
        <Button onClick={() => router.push("/")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </div>
    );
  }

  const currentStream = streams[currentStreamIndex];

  return (
    <div className="container px-4 py-6 space-y-6">
      {/* Back Button */}
      <Button variant="ghost" onClick={() => router.push("/")}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Channels
      </Button>

      {/* Video Player */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <VideoPlayer
            src={currentStream.url}
            title={channel.name}
            onError={handleStreamError}
          />

          {/* Channel Info */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold">{channel.name}</h1>
                    <span className="text-3xl">
                      {getCountryFlag(channel.country)}
                    </span>
                  </div>
                  {channel.alt_names.length > 0 && (
                    <p className="text-sm text-muted-foreground">
                      Also known as: {channel.alt_names.join(", ")}
                    </p>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant={favorite ? "default" : "outline"}
                    size="icon"
                    onClick={handleFavorite}
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        favorite ? "fill-current" : ""
                      }`}
                    />
                  </Button>
                  <Button variant="outline" size="icon" onClick={handleShare}>
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {channel.categories.map((cat) => (
                  <span
                    key={cat}
                    className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm"
                  >
                    {cat}
                  </span>
                ))}
              </div>

              {channel.website && (
                <div className="pt-2 border-t">
                  <a
                    href={channel.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    Visit official website →
                  </a>
                </div>
              )}

              {streams.length > 1 && (
                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground">
                    Stream {currentStreamIndex + 1} of {streams.length}
                    {currentStreamIndex < streams.length - 1 &&
                      " - Will try next stream if current fails"}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Ad Space */}
          <Card className="bg-secondary/50">
            <CardContent className="p-6 text-center">
              <p className="text-sm text-muted-foreground">
                Advertisement Space
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4">Channel Details</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Country:</span>
                  <span className="ml-2 font-medium">
                    {getCountryFlag(channel.country)} {channel.country}
                  </span>
                </div>
                {channel.network && (
                  <div>
                    <span className="text-muted-foreground">Network:</span>
                    <span className="ml-2 font-medium">{channel.network}</span>
                  </div>
                )}
                {channel.launched && (
                  <div>
                    <span className="text-muted-foreground">Launched:</span>
                    <span className="ml-2 font-medium">{channel.launched}</span>
                  </div>
                )}
                {channel.owners.length > 0 && (
                  <div>
                    <span className="text-muted-foreground">Owners:</span>
                    <span className="ml-2 font-medium">
                      {channel.owners.join(", ")}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Ad Space Sidebar */}
          <Card className="bg-secondary/50">
            <CardContent className="p-6 text-center min-h-[300px] flex items-center justify-center">
              <p className="text-sm text-muted-foreground">
                Advertisement Space
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
