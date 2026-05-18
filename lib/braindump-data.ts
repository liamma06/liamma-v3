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
}

export interface YearData {
  [year: string]: BraindumpItem[];
}

export const BRAINDUMP_YEARS = ['2026'] as const;
export type BraindumpYear = typeof BRAINDUMP_YEARS[number];

export const BRAINDUMP_DATA: YearData = {
  '2026': [
  ]
};
