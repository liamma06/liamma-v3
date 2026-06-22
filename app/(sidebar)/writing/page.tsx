import Link from 'next/link';
import { getAllNotes, type NoteMetadata } from '@/lib/writing';
import { FadeIn } from '@/components/FadeIn';

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

export default function FieldnotesPage() {
  const notes = getAllNotes();

  return (
    <div className="pt-3">
      <div className="flex flex-col gap-4 max-w-2xl">
        {notes.map((note, i) => (
          <FadeIn key={note.slug} step={i}>
            <WritingCard note={note} />
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
