'use client'

import { useSyncExternalStore } from 'react';
import {
  getFavorites,
  getRecentTools,
  toggleFavorite,
  clearRecentTools,
  type RecentItem,
} from './storage';

const FAVORITES_EVENT = 'wrenchly:favorites-updated';
const RECENT_EVENT = 'wrenchly:recent-updated';
const FAVORITES_KEY = 'wrenchly_favorites';
const RECENT_KEY = 'wrenchly_recent_tools';

const NO_FAVORITES: string[] = [];
const NO_RECENTS: RecentItem[] = [];

function subscribeTo(eventName: string) {
  return (onStoreChange: () => void) => {
    window.addEventListener(eventName, onStoreChange);
    return () => window.removeEventListener(eventName, onStoreChange);
  };
}

/**
 * `useSyncExternalStore` requires a referentially stable snapshot, so the parsed
 * value is memoized until the underlying localStorage entry actually changes.
 */
function cachedReader<T>(storageKey: string, read: () => T) {
  let lastRaw: string | null = null;
  let lastValue: T | undefined;
  let primed = false;

  return (): T => {
    const raw = window.localStorage.getItem(storageKey);
    if (!primed || raw !== lastRaw) {
      lastRaw = raw;
      lastValue = read();
      primed = true;
    }
    return lastValue as T;
  };
}

const readFavorites = cachedReader(FAVORITES_KEY, getFavorites);
const readRecents = cachedReader(RECENT_KEY, getRecentTools);

export function useFavorites(): string[] {
  return useSyncExternalStore(subscribeTo(FAVORITES_EVENT), readFavorites, () => NO_FAVORITES);
}

export function useRecentTools(): RecentItem[] {
  return useSyncExternalStore(subscribeTo(RECENT_EVENT), readRecents, () => NO_RECENTS);
}

export function useFavoriteTools(slug: string): boolean {
  return useFavorites().includes(slug);
}

export { toggleFavorite, clearRecentTools };
