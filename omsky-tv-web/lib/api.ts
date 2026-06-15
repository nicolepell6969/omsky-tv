import axios from 'axios';
import { Channel, Stream, Category, Country } from './types';

const IPTV_API_BASE = 'https://iptv-org.github.io/api';

const api = axios.create({
  baseURL: IPTV_API_BASE,
  timeout: 10000,
});

export const iptvApi = {
  async getChannels(): Promise<Channel[]> {
    try {
      const response = await api.get<Channel[]>('/channels.json');
      return response.data;
    } catch (error) {
      console.error('Error fetching channels:', error);
      return [];
    }
  },

  async getStreams(): Promise<Stream[]> {
    try {
      const response = await api.get<Stream[]>('/streams.json');
      return response.data;
    } catch (error) {
      console.error('Error fetching streams:', error);
      return [];
    }
  },

  async getCategories(): Promise<Category[]> {
    try {
      const response = await api.get<Category[]>('/categories.json');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  },

  async getCountries(): Promise<Country[]> {
    try {
      const response = await api.get<Country[]>('/countries.json');
      return response.data;
    } catch (error) {
      console.error('Error fetching countries:', error);
      return [];
    }
  },

  async getChannelById(channelId: string): Promise<Channel | null> {
    try {
      const channels = await this.getChannels();
      return channels.find(c => c.id === channelId) || null;
    } catch (error) {
      console.error('Error fetching channel:', error);
      return null;
    }
  },

  async getStreamsByChannel(channelId: string): Promise<Stream[]> {
    try {
      const streams = await this.getStreams();
      return streams.filter(s => s.channel === channelId);
    } catch (error) {
      console.error('Error fetching streams for channel:', error);
      return [];
    }
  },
};

export async function checkStreamHealth(url: string): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    return response.ok;
  } catch (error) {
    return false;
  }
}
