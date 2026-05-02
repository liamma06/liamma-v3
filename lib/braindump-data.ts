export type ItemType = 'note' | 'image' | 'video';

export interface BraindumpItem {
  id: string;
  type: ItemType;
  content: string;
  rotation?: number;
  label?: string;
  video?: string;
  date?: string;
}

export interface YearData {
  [year: string]: BraindumpItem[];
}

export const BRAINDUMP_YEARS = [ '2026'] as const;
export type BraindumpYear = typeof BRAINDUMP_YEARS[number];

export const BRAINDUMP_DATA: YearData = {
  '2026': [
    {
      id: '2025-note-1',
      type: 'note',
      content: 'start building things before you\'re ready',
      rotation: -1.5,
      date: 'Jun 2025',
    },
    {
      id: '2025-note-2',
      type: 'note',
      content: 'the grass is always greener — just water yours',
      rotation: 1.2,
      date: 'Jul 2025',
    },
    {
      id: '2025-note-3',
      type: 'note',
      content: 'balance is a myth. you just sacrifice depending on priorities.',
      rotation: -0.8,
      date: 'Aug 2025',
    },
    {
      id: '2025-note-4',
      type: 'note',
      content: 'ugly and used beats beautiful and unused every time',
      rotation: 1.5,
      date: 'Sep 2025',
    },
    {
      id: '2025-img-1',
      type: 'image',
      content: '/projects/Spark-1-image.jpg',
      label: 'SparkHacks 2025',
    },
  ],

};
