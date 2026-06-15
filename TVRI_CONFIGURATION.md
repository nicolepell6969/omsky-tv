# 📺 TVRI Channel Configuration

## Available TVRI Feeds:

### 1. TVRI Nasional (Main - 1080p)
**URL:** https://ott-balancer.tvri.go.id/live/eds/Nasional/hls/Nasional.m3u8
**Quality:** 1080p
**Type:** Official TVRI Feed
**Content:** General national programming

### 2. TVRI via DENS.TV (World Cup - 480p) ⚽
**URL:** https://op-group1-swiftservesd-1.dens.tv/s/s11/index.m3u8
**Quality:** 480p
**Type:** DENS.TV Broadcast
**Content:** **World Cup & Major Sports Events** 🏆
**Referrer:** https://www.dens.tv/
**User-Agent:** Mozilla/5.0 Windows NT 10.0; Win64; x64 AppleWebKit/537.36 KHTML, like Gecko Chrome/144.0.0.0 Safari/537.36
**Note:** Geo-blocked di beberapa region

## Configuration:

Omsky TV sekarang prioritize **DENS.TV feed** untuk channel TVRI karena feed ini yang menyiarkan Piala Dunia.

Di VLC, TVRI (480p) adalah **DENS.TV feed** - ini yang correct untuk World Cup content!

## Stream Selection Priority:

1. **DENS.TV Feed** (480p) - World Cup broadcaster ⭐
2. **TVRI Nasional** (1080p) - Main national channel
3. **Regional feeds** (720p/480p) - TVRI Aceh, Bali, etc.

## Backend Implementation:

```typescript
if (channelId === 'TVRI.id') {
  // Priority: DENS.TV feed for World Cup
  const densTvFeed = channelStreams.find(s => 
    s.url?.includes('dens.tv')
  );
  if (densTvFeed) return densTvFeed;
}
```

## Testing:

```bash
# Check TVRI stream selection
curl http://146.190.80.243/api/channels | jq '.[] | select(.id == "TVRI.id")'

# Should return DENS.TV URL after cache refresh
```

## Cache Status:

- Cache version: v2 (invalidates old cache)
- Duration: 1 hour
- Auto-refresh after version bump

## Notes:

- DENS.TV feed requires specific referrer header
- May be geo-blocked outside Indonesia
- 480p quality but has World Cup content
- Nasional feed is higher quality (1080p) but general programming
