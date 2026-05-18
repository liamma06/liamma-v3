import Link from 'next/link';
import { getNoteBySlug, getAllNotes, type NoteMetadata, type Heading } from '@/lib/fieldnotes';
import { MobileNav } from '@/components/MobileNav';

export async function generateStaticParams() {
  return getAllNotes().map((n: NoteMetadata) => ({ slug: n.slug }));
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { frontmatter, contentHtml, headings } = await getNoteBySlug(slug);

  return (
    <div className="min-h-screen">
      <MobileNav />
      <div className="flex w-full">
        {/* TOC takes the sidebar slot */}
        <aside
          className="hidden lg:flex sticky top-0 shrink-0 flex-col items-end pt-15 pr-2 w-56 h-screen pb-10"
          style={{ marginLeft: 'max(0px, calc(50vw - 38rem))' }}
        >
          <Link
            href="/writing"
            className="text-sm transition-colors duration-150 mb-8 w-full text-right pr-3"
            style={{ color: 'var(--subtle)' }}
            onMouseOver={undefined}
          >
            ← writing
          </Link>
          {headings.length > 0 && (
            <div className="w-full">
              <p className="text-[11px] font-semibold uppercase tracking-widest mb-4 text-right pr-3" style={{ color: 'var(--subtle)' }}>
                on this page
              </p>
              <ul className="flex flex-col gap-3">
                {headings.map((h: Heading) => (
                  <li key={h.id} style={{ paddingRight: (h.level - 1) * 12 }}>
                    <a
                      href={`#${h.id}`}
                      className="text-sm transition-colors duration-150 leading-snug block text-right pr-3"
                      style={{ color: 'var(--subtle)' }}
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
        <main
          className="flex-1 flex justify-center px-4 pt-16 pb-10 md:pt-10"
          style={{ paddingRight: 'max(14rem, calc(50vw - 24rem))' }}
        >
          <article className="w-full max-w-2xl">
            <h1 className="text-2xl font-semibold leading-snug" style={{ color: 'var(--foreground)' }}>{frontmatter.title}</h1>
            <p className="text-xs mt-1 mb-10" style={{ color: 'var(--subtle)' }}>{frontmatter.date}</p>
            <div className="prose-content" dangerouslySetInnerHTML={{ __html: contentHtml }} />
          </article>
        </main>
      </div>
    </div>
  );
}
