import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentDir = path.join(process.cwd(), 'content/writing');

export interface NoteMetadata {
  slug: string;
  title: string;
  date: string;
  description?: string;
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

export function getAllNotes(): NoteMetadata[] {
  if (!fs.existsSync(contentDir)) return [];
  return fs.readdirSync(contentDir)
    .filter(f => f.endsWith('.md'))
    .map(filename => {
      const slug = filename.replace('.md', '');
      const { data } = matter(fs.readFileSync(path.join(contentDir, filename), 'utf8'));
      return { slug, title: data.title, date: data.date, description: data.description };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getNoteBySlug(slug: string) {
  const raw = fs.readFileSync(path.join(contentDir, `${slug}.md`), 'utf8');
  const { data, content } = matter(raw);
  const processed = await remark().use(html).process(content);
  return {
    frontmatter: data as NoteMetadata,
    contentHtml: addHeadingIds(processed.toString()),
    headings: extractHeadings(content),
  };
}
