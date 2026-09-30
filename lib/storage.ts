const FAVORITES_KEY = 'wrenchly_favorites';
const RECENT_KEY = 'wrenchly_recent_tools';

export function getFavorites(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function isFavorite(slug: string): boolean {
  return getFavorites().includes(slug);
}

export function toggleFavorite(slug: string): boolean {
  if (typeof window === 'undefined') return false;
  const current = getFavorites();
  let updated: string[];
  const wasFav = current.includes(slug);
  if (wasFav) {
    updated = current.filter((s) => s !== slug);
  } else {
    updated = [slug, ...current];
  }
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('wrenchly:favorites-updated', { detail: updated }));
  } catch (e) {
    console.error('Failed to update favorites', e);
  }
  return !wasFav;
}

export interface RecentItem {
  slug: string;
  visitedAt: number;
}

export function getRecentTools(): RecentItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(RECENT_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function recordToolVisit(slug: string): void {
  if (typeof window === 'undefined') return;
  const current = getRecentTools().filter((item) => item.slug !== slug);
  const updated = [{ slug, visitedAt: Date.now() }, ...current].slice(0, 15);
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('wrenchly:recent-updated', { detail: updated }));
  } catch (e) {
    console.error('Failed to update recent tools', e);
  }
}

export function clearRecentTools(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(RECENT_KEY);
    window.dispatchEvent(new CustomEvent('wrenchly:recent-updated', { detail: [] }));
  } catch (e) {
    console.error('Failed to clear recent tools', e);
  }
}
