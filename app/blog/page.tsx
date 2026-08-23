import Link from 'next/link';
import fs from 'fs';
import path from 'path';

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
}

async function getBlogPosts(): Promise<BlogPost[]> {
  const postsDirectory = path.join(process.cwd(), 'app/blog/posts');
  
  try {
    const files = fs.readdirSync(postsDirectory);

    const posts: BlogPost[] = files
      .filter(file => file.endsWith('.md'))
      .map(file => {
        const content = fs.readFileSync(path.join(postsDirectory, file), 'utf-8');
        const match = content.match(/---\n([\s\S]*?)\n---/);
        
        if (!match) return null;

        const frontmatter = match[1];
        const titleMatch = frontmatter.match(/title:\s*(.+)/);
        const slugMatch = frontmatter.match(/slug:\s*(.+)/);
        const dateMatch = frontmatter.match(/date:\s*(.+)/);
        const authorMatch = frontmatter.match(/author:\s*(.+)/);
        const descriptionMatch = frontmatter.match(/description:\s*(.+)/);

        return {
          title: titleMatch?.[1]?.trim() || '',
          slug: slugMatch?.[1]?.trim() || '',
          date: dateMatch?.[1]?.trim() || '',
          author: authorMatch?.[1]?.trim() || 'TabScan',
          description: descriptionMatch?.[1]?.trim() || '',
        };
      })
      .filter(Boolean) as BlogPost[];

    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white border-b border-slate-200 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src="/tabscan-logo.png" alt="TabScan" className="h-12" />
            <span className="font-bold text-slate-900">TabScan</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/blog" className="text-slate-600 hover:text-slate-900 font-medium">
              Blog
            </Link>
            <Link href="/" className="text-red-600 hover:text-red-700 font-medium">
              Home
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <h1 className="text-5xl font-bold text-slate-900 mb-4">Blog</h1>
            <p className="text-xl text-slate-600">
              Neueste Artikel über digitale Speisekarten, Restaurant Software und Gastronomie-Trends.
            </p>
          </div>

          <div className="space-y-8">
            {posts.length > 0 ? (
              posts.map((post) => (
                <Link href={`/blog/${post.slug}`} key={post.slug}>
                  <article className="bg-white border border-slate-200 rounded-xl p-8 hover:border-red-600 hover:shadow-lg transition-all duration-300 cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-2xl font-bold text-slate-900 hover:text-red-600 transition-colors">
                        {post.title}
                      </h2>
                    </div>
                    
                    <p className="text-slate-600 mb-4 line-clamp-2">
                      {post.description}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span>{new Date(post.date).toLocaleDateString('de-CH')}</span>
                      <span>•</span>
                      <span>von {post.author}</span>
                    </div>
                  </article>
                </Link>
              ))
            ) : (
              <div className="text-center py-16">
                <p className="text-slate-600 text-lg">Keine Blog Posts gefunden.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}