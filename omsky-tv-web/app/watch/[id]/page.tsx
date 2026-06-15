"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { VideoPlayer } from "@/components/VideoPlayer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Heart, Share2, Loader2, AlertCircle } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { getCountryFlag } from "@/lib/utils";
import axios from "axios";
import { Channel } from "@/lib/types";
import { useEffect, useState } from "react";

export default function WatchPage() {
  const params = useParams();
  const router = useRouter();
  const channelId = params.id as string;
  const { addToHistory, isFavorite, addFavorite, removeFavorite } = useAppStore();
  const [watchStartTime] = useState(Date.now());

  const { data: channel, isLoading: channelLoading } = useQuery({
    queryKey: ["channel", channelId],
    queryFn: async () => {
      const response = await axios.get<Channel[]>("/api/channels");
      return response.data.find((c) => c.id === channelId);
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

  if (channelLoading) {
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

  // Check if channel has stream URL
  if (!channel.streamUrl) {
    return (
      <div className="container px-4 py-12">
        <Button onClick={() => router.back()} variant="ghost" className="mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-4">Stream Not Available</h1>
            <p className="text-muted-foreground mb-6">
              Sorry, this channel does not have an active stream URL at the moment.
            </p>
            <div className="bg-muted/50 rounded-lg p-4 mb-6">
              <h2 className="font-semibold mb-2">{channel.name}</h2>
              <p className="text-sm text-muted-foreground">
                {getCountryFlag(channel.country)} {channel.country}
              </p>
              {channel.categories.length > 0 && (
                <p className="text-sm text-muted-foreground mt-2">
                  {channel.categories.join(", ")}
                </p>
              )}
            </div>
            <Button onClick={() => router.push("/")}>
              Browse Other Channels
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8">
      {/* Back Button */}
      <Button onClick={() => router.back()} variant="ghost" className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      {/* Video Player */}
      <Card className="overflow-hidden mb-8">
        <VideoPlayer
          src={channel.streamUrl}
          poster={channel.logo}
          http_referrer={channel.http_referrer}
          user_agent={channel.user_agent}
        />
      </Card>

      {/* Channel Info */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{channel.name}</h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-2">
                  {getCountryFlag(channel.country)}
                  <span className="text-sm">{channel.country}</span>
                </span>
                {channel.streamQuality && (
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                    {channel.streamQuality}
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={favorite ? "default" : "outline"}
                size="icon"
                onClick={handleFavorite}
              >
                <Heart className={favorite ? "fill-current" : ""} />
              </Button>
              <Button variant="outline" size="icon" onClick={handleShare}>
                <Share2 />
              </Button>
            </div>
          </div>

          {/* Categories */}
          {channel.categories.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {channel.categories.map((cat) => (
                  <span
                    key={cat}
                    className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Website */}
          {channel.website && (
            <div>
              <h3 className="text-sm font-medium mb-2">Website</h3>
              <a
                href={channel.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                {channel.website}
              </a>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
