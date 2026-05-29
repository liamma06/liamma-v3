export type ItemType = 'note' | 'image' | 'video';
export type ItemSize = 'sm' | 'md' | 'lg' | 'wide' | 'tall';

export interface BraindumpItem {
  id: string;
  type: ItemType;
  content: string;
  rotation?: number;
  label?: string;
  video?: string;
  date?: string;
  size?: ItemSize;
  trimStart?: number; // seconds
  trimEnd?: number;   // seconds
}

export interface YearData {
  [year: string]: BraindumpItem[];
}

export const BRAINDUMP_YEARS = ['2026'] as const;
export type BraindumpYear = typeof BRAINDUMP_YEARS[number];

export const BRAINDUMP_DATA: YearData = {
  '2026': [
    { id: '2026-v1', type: 'video', content: '/braindump/2026/flower.mp4',  },
    { id: '2026-v2', type: 'video', content: '/braindump/2026/flowerLights.mp4', trimStart: 0, trimEnd: 14 },
    { id: '2026-v3', type: 'video', content: '/braindump/2026/night.MOV', label: "japan in may",},
    { id: '2026-v4', type: 'video', content: '/braindump/2026/sign.mp4' },
    { id: '2026-v5', type: 'video', content: '/braindump/2026/taxi.mp4' },
    { id: '2026-v6', type: 'video', content: 'https://xhgc9k5ohb8e3k1o.public.blob.vercel-storage.com/Foggy.MP4' },
    { id: '2026-v7', type: 'video', content: 'https://xhgc9k5ohb8e3k1o.public.blob.vercel-storage.com/tree.MP4', label: "sister & tree" },
  ]
};
