# Omsky TV Web - Deployment Guide

## Environment Variables

Create a `.env.local` file:

```bash
# Optional: Analytics
NEXT_PUBLIC_GA_ID=your_google_analytics_id

# Optional: AdSense
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-xxxxxxxxxx
```

## Vercel Deployment

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   cd omsky-tv-web
   vercel --prod
   ```

4. **Configure Domain** (optional):
   - Go to Vercel dashboard
   - Add custom domain
   - Update DNS settings

## Manual Deploy Steps

1. Push code to GitHub
2. Import project in Vercel dashboard
3. Vercel auto-detects Next.js
4. Deploy

## Performance Settings

- **Edge Caching**: API routes cached for 1-6 hours
- **Image Optimization**: Automatic via Next.js
- **CDN**: Global distribution via Vercel Edge Network

## Monitoring

- Use Vercel Analytics for performance
- Check Web Vitals in dashboard
- Monitor API response times
