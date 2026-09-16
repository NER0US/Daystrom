// Daystrom bridge cast — stable legacy keys + sprite frames.
//
// Both the static portraits (cards / picker) and the in-scene walking sprites are
// now fully custom-drawn from the same per-character recipes in portraitArt.ts:
// the scene sprite reuses the portrait's exact head/face/clothing and adds legs,
// so an agent on the office floor looks identical to its card. The LimeZu base
// sheets are no longer used for the cast. See assets/ATTRIBUTION.md.

import { Texture } from 'pixi.js';
import { paintPortrait, sceneFrameBufs, SCENE_W, SCENE_H } from './portraitArt';

export type OfficeCharacterName =
  | 'michael' | 'jim' | 'pam' | 'dwight' | 'kevin' | 'angela'
  | 'oscar' | 'stanley' | 'phyllis' | 'andy' | 'kelly' | 'ryan'
  | 'toby' | 'creed' | 'meredith';

export interface CastMember {
  name: OfficeCharacterName;
  displayName: string;
  /** Signature accent color (hex) — used for the in-scene selection glow. */
  shirt: string;
  /** Blurb shown when this character is picked / has no description yet. */
  blurb: string;
}

/** Selectable roster, in display order. */
export const OFFICE_CAST: CastMember[] = [
  { name: 'michael',  displayName: 'Jean Luc', shirt: '#c7464a', blurb: 'Captain, command' },
  { name: 'jim',      displayName: 'Riker',    shirt: '#b83f45', blurb: 'First officer' },
  { name: 'pam',      displayName: 'Deanna',   shirt: '#6a65aa', blurb: 'Insight and counsel' },
  { name: 'dwight',   displayName: 'Data',     shirt: '#c99632', blurb: 'Operations' },
  { name: 'kevin',    displayName: 'Geordi',   shirt: '#d6a637', blurb: 'Engineering' },
  { name: 'angela',   displayName: 'Beverly',  shirt: '#3f7dbb', blurb: 'Medical support' },
  { name: 'oscar',    displayName: 'Worf',     shirt: '#b8862e', blurb: 'Tactical and security' },
  { name: 'stanley',  displayName: 'Miles',    shirt: '#c69233', blurb: 'Transport and systems' },
  { name: 'phyllis',  displayName: 'Guinan',   shirt: '#7b5aa6', blurb: 'Listener, morale' },
  { name: 'andy',     displayName: 'Wesley',   shirt: '#bd4b48', blurb: 'Flight cadet' },
  { name: 'kelly',    displayName: 'Ro',       shirt: '#b64f5c', blurb: 'Conn specialist' },
  { name: 'ryan',     displayName: 'Barclay',  shirt: '#d1a23c', blurb: 'Systems diagnostic' },
  { name: 'toby',     displayName: 'Mott',     shirt: '#527fb8', blurb: 'Crew services' },
  { name: 'creed',    displayName: 'Boothby',  shirt: '#6f8f5a', blurb: 'Groundskeeper emeritus' },
  { name: 'meredith', displayName: 'Tasha',    shirt: '#bd4344', blurb: 'Security chief' },
];

export const CAST_BY_NAME: Record<OfficeCharacterName, CastMember> =
  Object.fromEntries(OFFICE_CAST.map((c) => [c.name, c])) as Record<OfficeCharacterName, CastMember>;

export const DEFAULT_CHARACTER: OfficeCharacterName = 'jim';

export function hexToNumber(hex: string): number {
  return parseInt(hex.replace('#', ''), 16);
}

// ─── scene frames ────────────────────────────────────────────────────────────
const frameCache = new Map<OfficeCharacterName, Texture[][]>();

function bufToTexture(buf: Uint8ClampedArray): Texture {
  const canvas = document.createElement('canvas');
  canvas.width = SCENE_W; canvas.height = SCENE_H;
  const ctx = canvas.getContext('2d')!;
  const img = ctx.createImageData(SCENE_W, SCENE_H);
  img.data.set(buf);
  ctx.putImageData(img, 0, 0);
  const tex = Texture.from(canvas);
  tex.source.scaleMode = 'nearest';
  return tex;
}

/**
 * Frame grid CharacterSprite expects: 3 rows (down, up, right) × 7 frames
 * [walk1, walk2, walk3, type1, type2, read1, read2]. We provide a front view
 * (down — and reused for the side row, so left/right walkers still show a face)
 * and a back view (up — agents seated facing their desk show their back). The
 * three walk frames are stand / step-left / step-right.
 */
export async function getCastFrames(name: OfficeCharacterName): Promise<Texture[][]> {
  const cached = frameCache.get(name);
  if (cached) return cached;
  const { front, back } = sceneFrameBufs(name);
  const toRow = (bufs: Uint8ClampedArray[]): Texture[] => {
    const [stand, stepL, stepR] = bufs.map(bufToTexture);
    return [stand, stepL, stepR, stand, stand, stand, stand];
  };
  const frontRow = toRow(front);
  const frames: Texture[][] = [frontRow, toRow(back), frontRow]; // down, up, right
  frameCache.set(name, frames);
  return frames;
}

/**
 * Paint a character's static portrait for cards / the picker (delegates to the
 * custom procedural composer in portraitArt.ts).
 */
export async function paintCastPortrait(
  ctx: CanvasRenderingContext2D,
  name: OfficeCharacterName,
  scale = 2,
): Promise<void> {
  paintPortrait(ctx, name, scale);
}
