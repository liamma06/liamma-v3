import Link from 'next/link';
import { getAllNotes } from '@/lib/fieldnotes';

export default function FieldnotesPage() {
  const notes = getAllNotes();

  return (
    <div className="pt-3 max-w-2xl">
      <ul className="mt-4 flex flex-col gap-3">
        {notes.map(note => (
          <li key={note.slug} className="flex justify-between items-baseline gap-8">
            <Link href={`/writing/${note.slug}`} className="wiggle-link text-base" style={{ color: 'var(--foreground)' }}>
              {note.title}
            </Link>
            <span className="text-sm shrink-0" style={{ color: 'var(--subtle)' }}>{note.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
