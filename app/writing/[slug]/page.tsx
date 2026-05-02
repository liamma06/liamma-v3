import Link from 'next/link';
import { getNoteBySlug, getAllNotes, type NoteMetadata, type Heading } from '@/lib/fieldnotes';

export async function generateStaticParams() {
  return getAllNotes().map((n: NoteMetadata) => ({ slug: n.slug }));
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { frontmatter, contentHtml, headings } = await getNoteBySlug(slug);

  return (
    <div className="min-h-screen flex">
      {/* TOC takes the sidebar slot */}
      <aside className="fixed top-0 left-0 w-56 h-screen pt-15 pb-10 px-4 flex flex-col items-end hidden lg:flex">
        <Link
          href="/writing"
          className="text-sm text-neutral-400 hover:text-neutral-700 transition-colors duration-150 mb-8 w-full text-right pr-3"
        >
          ← writing
        </Link>
        {headings.length > 0 && (
          <div className="w-full">
            <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest mb-4 text-right pr-3">
              on this page
            </p>
            <ul className="flex flex-col gap-3">
              {headings.map((h: Heading) => (
                <li key={h.id} style={{ paddingRight: (h.level - 1) * 12 }}>
                  <a
                    href={`#${h.id}`}
                    className="text-sm text-neutral-400 hover:text-neutral-700 transition-colors duration-150 leading-snug block text-right pr-3"
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>

      {/* Article in the content slot */}
      <main className="ml-56 flex-1 px-20 py-10 max-w-2xl">
        <article>
          <h1 className="text-2xl font-semibold text-neutral-800 leading-snug">{frontmatter.title}</h1>
          <p className="text-xs text-neutral-400 mt-1 mb-10">{frontmatter.date}</p>
          <div className="prose-content" dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </article>
      </main>
    </div>
  );
}
