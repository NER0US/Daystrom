/**
 * Product skin state.
 *
 * Daystrom keeps the upstream light/dark theme mechanism intact and layers a
 * separate product skin on top of it. This lets the fork change visual
 * language without coupling those changes to runtime/orchestration behavior.
 */
import { useSyncExternalStore } from 'react';

export type AppSkin = 'office' | 'daystrom';

const LS_KEY = 'cth.skin';

function load(): AppSkin {
  try {
    const value = window.localStorage.getItem(LS_KEY);
    if (value === 'office' || value === 'daystrom') return value;
  } catch {
    // localStorage is unavailable in SSR/tests.
  }

  // Daystrom is the default identity of this fork. The upstream office skin
  // remains available as a compatibility/fallback surface.
  return 'daystrom';
}

let skin: AppSkin = load();
const subscribers = new Set<() => void>();

function apply(): void {
  try {
    document.documentElement.dataset.cthSkin = skin;
  } catch {
    // document is unavailable in SSR/tests.
  }
}

apply();

export function appSkin(): AppSkin {
  return skin;
}

export function setAppSkin(next: AppSkin): void {
  if (next === skin) return;

  skin = next;

  try {
    window.localStorage.setItem(LS_KEY, next);
  } catch {
    // localStorage is unavailable in SSR/tests.
  }

  apply();
  subscribers.forEach((notify) => notify());
}

export function useAppSkin(): AppSkin {
  return useSyncExternalStore(
    (onChange) => {
      subscribers.add(onChange);
      return () => subscribers.delete(onChange);
    },
    () => skin
  );
}
