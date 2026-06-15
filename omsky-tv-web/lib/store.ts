import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Channel } from './types';

interface AppState {
  favorites: string[];
  watchHistory: Array<{
    channelId: string;
    watchedAt: Date;
    duration: number;
  }>;
  currentCategory: string | null;
  currentCountry: string | null;
  searchQuery: string;
  
  // Actions
  addFavorite: (channelId: string) => void;
  removeFavorite: (channelId: string) => void;
  isFavorite: (channelId: string) => boolean;
  addToHistory: (channelId: string, duration: number) => void;
  setCategory: (category: string | null) => void;
  setCountry: (country: string | null) => void;
  setSearchQuery: (query: string) => void;
  clearFilters: () => void;
}

export const useAppStore = create<AppState>()((
  persist(
    (set, get) => ({
      favorites: [],
      watchHistory: [],
      currentCategory: null,
      currentCountry: null,
      searchQuery: '',

      addFavorite: (channelId) => {
        set((state) => ({
          favorites: [...state.favorites, channelId],
        }));
      },

      removeFavorite: (channelId) => {
        set((state) => ({
          favorites: state.favorites.filter((id) => id !== channelId),
        }));
      },

      isFavorite: (channelId) => {
        return get().favorites.includes(channelId);
      },

      addToHistory: (channelId, duration) => {
        set((state) => {
          const newHistory = [
            { channelId, watchedAt: new Date(), duration },
            ...state.watchHistory.filter((h) => h.channelId !== channelId),
          ].slice(0, 50);
          
          return { watchHistory: newHistory };
        });
      },

      setCategory: (category) => {
        set({ currentCategory: category });
      },

      setCountry: (country) => {
        set({ currentCountry: country });
      },

      setSearchQuery: (query) => {
        set({ searchQuery: query });
      },

      clearFilters: () => {
        set({
          currentCategory: null,
          currentCountry: null,
          searchQuery: '',
        });
      },
    }),
    {
      name: 'omsky-tv-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
));
