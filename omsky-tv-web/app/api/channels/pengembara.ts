import axios from 'axios';

export async function fetchPengembaraChannels() {
  try {
    const response = await axios.get('https://bit.ly/pengembarahitam');
    const m3u = response.data;
    const channels: any[] = [];
    
    const lines = m3u.split('\n');
    let currentChannel: any = null;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (line.startsWith('#EXTINF:')) {
        currentChannel = {
          id: `pengembara-${channels.length}`,
          country: 'ID',
          name: '',
          categories: [] as string[]
        };
        
        // Extract category from group-title
        const groupMatch = line.match(/group-title="([^"]+)"/);
        if (groupMatch) {
          const rawCat = groupMatch[1].replace(/🔴/g, '').trim();
          
          if (rawCat === 'NASIONAL') currentChannel.categories = ['general']; // Match existing UI categories
          else if (rawCat.includes('SPORT') || rawCat.includes('LIGA') || rawCat.includes('WORLD CUP')) currentChannel.categories = ['sports'];
          else if (rawCat.includes('MOVIE')) currentChannel.categories = ['movies'];
          else if (rawCat.includes('KARTUN')) currentChannel.categories = ['kids'];
          else currentChannel.categories = ['entertainment']; // Map other to entertainment
        } else {
          currentChannel.categories = ['general'];
        }
        
        // Extract logo
        const logoMatch = line.match(/tvg-logo="([^"]+)"/);
        if (logoMatch) {
          currentChannel.logo = logoMatch[1];
        }
        
        // Extract name
        const nameParts = line.split(',');
        if (nameParts.length > 1) {
          currentChannel.name = nameParts[nameParts.length - 1].trim();
        } else {
          currentChannel.name = 'Unknown Channel';
        }
        
      } 
      else if (line.startsWith('#EXTVLCOPT:http-referrer=')) {
        if (currentChannel) {
          currentChannel.http_referrer = line.replace('#EXTVLCOPT:http-referrer=', '').trim();
        }
      } 
      else if (line.startsWith('#EXTVLCOPT:http-user-agent=')) {
        if (currentChannel) {
          currentChannel.user_agent = line.replace('#EXTVLCOPT:http-user-agent=', '').trim();
        }
      } 
      else if (line.startsWith('#KODIPROP:')) {
        // Skip DRM encrypted streams since web HLS.js can't natively play them without CDM
        if (currentChannel) currentChannel.drm = true;
      } 
      else if (!line.startsWith('#') && line.length > 10) {
        // Stream URL found!
        if (currentChannel && !currentChannel.drm && !line.includes('dens.tv')) {
          currentChannel.streamUrl = line;
          currentChannel.streamQuality = '720p'; // Default quality
          
          channels.push({...currentChannel});
        }
        currentChannel = null; // Reset for next channel
      }
    }
    
    return channels;
  } catch (err) {
    console.error("Failed to parse pengembara playlist:", err);
    return [];
  }
}
