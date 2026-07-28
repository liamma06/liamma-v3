'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FadeIn } from '@/components/FadeIn';
import type { NoteMetadata } from '@/lib/writing';

const TABS = [
  { label: 'all', value: 'all' },
  { label: 'thoughts', value: 'thoughts' },
  { label: 'projects', value: 'projects' },
  { label: 'ai',value: 'ai' },
];

function WritingCard({ note }: { note: NoteMetadata }) {
  const hasImage = !!note.image;

  return (
    <Link
      href={`/writing/${note.slug}`}
      className="writing-card relative block overflow-hidden rounded-[3px]"
      style={{ background: hasImage ? '#0d0d0d' : 'var(--surface)' }}
    >
      {hasImage && (
        <img
          src={note.image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.82, objectPosition: note.imagePosition ?? 'center' }}
        />
      )}

      <div className="absolute inset-0 flex flex-col p-5 md:p-6">
        <div className="flex-1 flex items-center">
          <h2
            className="text-sm md:text-[1.15rem] font-semibold leading-snug tracking-tight"
            style={{ color: hasImage ? '#fff' : 'var(--foreground)' }}
          >
            {note.title}
          </h2>
        </div>
        <div className="hidden md:block">
          {note.description && (
            <p
              className="text-sm leading-relaxed"
              style={{ color: hasImage ? 'rgba(255,255,255,0.6)' : 'var(--muted)' }}
            >
              {note.description}
            </p>
          )}
          <span
            className="text-[0.8rem] mt-1 block"
            style={{ color: hasImage ? 'rgba(255,255,255,0.38)' : 'var(--subtle)' }}
          >
            {note.date}
          </span>
        </div>
        <span
          className="md:hidden text-[0.8rem] mt-1 block"
          style={{ color: hasImage ? 'rgba(255,255,255,0.38)' : 'var(--subtle)' }}
        >
          {note.date}
        </span>
      </div>
    </Link>
  );
}

export function WritingTabs({ notes }: { notes: NoteMetadata[] }) {
  const [active, setActive] = useState('all');

  const filtered =
    active === 'all' ? notes : notes.filter((n) => n.category === active);

  return (
    <div className="pt-3">
      <div className="flex gap-5 mb-6">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActive(tab.value)}
            className={`flex items-center text-sm cursor-pointer bg-transparent border-none p-0 ${active === tab.value ? 'text-foreground font-medium' : 'text-muted font-normal'}`}
          >
            {active === tab.value && (
              <img
                src="/wiggly-dot.gif"
                alt=""
                className="wiggle-dot"
                style={{ width: 10, height: 10, marginRight: 5, flexShrink: 0 }}
              />
            )}
            {tab.label}
          </button>
        ))}
      </div>

      <div key={active} className="flex flex-col gap-4 max-w-2xl">
        {filtered.map((note, i) => (
          <FadeIn key={note.slug} step={i}>
            <WritingCard note={note} />
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
