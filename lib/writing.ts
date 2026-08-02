import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';

const contentDir = path.join(process.cwd(), 'content/writing');

export interface NoteMetadata {
  slug: string;
  title: string;
  date: string;
  description?: string;
  image?: string;
  imagePosition?: string;
  category?: string;
  pinned?: boolean;
}

export interface Heading {
  level: number;
  text: string;
  id: string;
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function extractHeadings(content: string): Heading[] {
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const headings: Heading[] = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    headings.push({ level: match[1].length, text: match[2].trim(), id: slugify(match[2].trim()) });
  }
  return headings;
}

function addHeadingIds(htmlStr: string): string {
  return htmlStr.replace(/<(h[1-3])>([^<]+)<\/h[1-3]>/g, (_, tag, text) => {
    return `<${tag} id="${slugify(text.trim())}">${text}</${tag}>`;
  });
}

type ResolvedNote = { filePath: string; isMdx: boolean; isFolder: boolean };

function resolveNoteFile(slug: string): ResolvedNote {
  const candidates: ResolvedNote[] = [
    { filePath: path.join(contentDir, slug, 'index.mdx'), isMdx: true, isFolder: true },
    { filePath: path.join(contentDir, slug, 'index.md'), isMdx: false, isFolder: true },
    { filePath: path.join(contentDir, `${slug}.mdx`), isMdx: true, isFolder: false },
    { filePath: path.join(contentDir, `${slug}.md`), isMdx: false, isFolder: false },
  ];
  const found = candidates.find(c => fs.existsSync(c.filePath));
  if (!found) throw new Error(`No content file found for slug: ${slug}`);
  return found;
}

export function getAllNotes(): NoteMetadata[] {
  if (!fs.existsSync(contentDir)) return [];
  const slugs = new Set<string>();

  for (const entry of fs.readdirSync(contentDir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      const hasIndex = ['index.mdx', 'index.md'].some(f =>
        fs.existsSync(path.join(contentDir, entry.name, f))
      );
      if (hasIndex) slugs.add(entry.name);
    } else if (entry.isFile() && /\.(md|mdx)$/.test(entry.name)) {
      slugs.add(entry.name.replace(/\.mdx?$/, ''));
    }
  }

  return [...slugs].map(slug => {
    const { filePath } = resolveNoteFile(slug);
    const { data } = matter(fs.readFileSync(filePath, 'utf8'));
    return { slug, title: data.title, date: data.date, description: data.description, image: data.image, imagePosition: data.imagePosition, category: data.category, pinned: data.pinned };
  }).sort((a, b) => {
    if (!!a.pinned !== !!b.pinned) return a.pinned ? -1 : 1;
    const aTime = new Date(a.date).getTime() || 0;
    const bTime = new Date(b.date).getTime() || 0;
    return bTime - aTime;
  });
}

export async function getNoteBySlug(slug: string) {
  const { filePath, isMdx, isFolder } = resolveNoteFile(slug);
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);

  if (isMdx) {
    return {
      frontmatter: data as NoteMetadata,
      contentHtml: null,
      isMdx: true as const,
      isFolder,
      headings: extractHeadings(content),
    };
  }

  const processed = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeHighlight)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);

  return {
    frontmatter: data as NoteMetadata,
    contentHtml: addHeadingIds(processed.toString()),
    isMdx: false as const,
    isFolder,
    headings: extractHeadings(content),
  };
}
