import { redirect } from 'next/navigation';

/**
 * The research pages moved to /projects (Projects & Initiatives).
 * Keep the old URL working for bookmarks and search engines.
 */
export default function ResearchPage() {
  redirect('/projects');
}
