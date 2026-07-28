import { getAllNotes } from '@/lib/writing';
import { WritingTabs } from '@/components/WritingTabs';

export default function FieldnotesPage() {
  const notes = getAllNotes();
  return <WritingTabs notes={notes} />;
}
