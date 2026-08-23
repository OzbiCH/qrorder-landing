import fs from 'fs';
import path from 'path';
import Link from 'next/link';

interface BlogPost {
  title: string;
  date: string;
  author: string;
  category: string;
  content: string;
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const postsDirectory = path.join(process.cwd(), 'app/blog/posts');
  
  console.log(`\n🔍 SEARCH for slug: "${slug}"\n`);
  
  try {
    const files = fs.readdirSync(postsDirectory);

    for (const file of files) {
      const filePath = path.join(postsDirectory, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      
      const parts = fileContent.split('---');
      
      if (parts.length < 3) {
        console.log(`WARNING ${file}: No proper frontmatter`);
        continue;
      }
      
      const frontmatter = parts[1];
      
      const slugLine = frontmatter.split('\n').find(line => line.startsWith('slug:'));
      const fileSlug = slugLine?.replace('slug:', '').trim();
      
      console.log(`FILE ${file}:`);
      console.log(`   Line: "${slugLine}"`);
      console.log(`   Extracted: "${fileSlug}"`);
      console.log(`   Match: ${fileSlug === slug ? 'YES' : 'NO'}\n`);
      
      if (fileSlug === slug) {
        console.log(`FOUND in ${file}!\n`);
        
        const body = parts.slice(2).join('---');
        
        return {
          title: frontmatter.match(/title:\s*(.+)/)?.[1]?.trim() || '',
          date: frontmatter.match(/date:\s*(.+)/)?.[1]?.trim() || '',
          author: frontmatter.match(/author:\s*(.+)/)?.[1]?.trim() || 'TabScan',
          category: frontmatter.match(/category:\s*(.+)/)?.[1]?.trim() || '',
          content: body,
        };
      }
    }
    
    console.log(`NO MATCH FOUND for: "${slug}"\n`);
    return null;
  } catch (error) {
    console.error('ERROR:', error);
    return null;
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  console.log('BlogPostPage called with slug:', slug);

  if (!slug) {
    return (
      <div className="min-h-screen bg-white">
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
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Fehler: Slug nicht gefunden</h1>
            <Link href="/blog" className="text-red-600 hover:text-red-700 font-semibold">
              ← Zurück zum Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const post = await getBlogPost(slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
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
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Post nicht gefunden</h1>
            <p className="text-slate-600 mb-8">Slug: "{slug}"</p>
            <Link href="/blog" className="text-red-600 hover:text-red-700 font-semibold">
              ← Zurück zum Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
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
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="text-red-600 hover:text-red-700 mb-8 inline-block font-semibold">
            ← Zurück zum Blog
          </Link>

          <article>
            <header className="mb-12">
              <div className="mb-4">
                <span className="text-sm font-semibold text-red-600 uppercase">{post.category}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-slate-600">
                <span>{new Date(post.date).toLocaleDateString('de-CH')}</span>
                <span>•</span>
                <span>von {post.author}</span>
              </div>
            </header>

            <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed">
              {post.content.split('\n').map((line, idx) => {
                if (line.startsWith('# ')) {
                  return (
                    <h1 key={idx} className="text-3xl font-bold text-slate-900 mt-8 mb-4">
                      {line.replace(/^# /, '')}
                    </h1>
                  );
                }
                if (line.startsWith('## ')) {
                  return (
                    <h2 key={idx} className="text-2xl font-bold text-slate-900 mt-6 mb-3">
                      {line.replace(/^## /, '')}
                    </h2>
                  );
                }
                if (line.startsWith('### ')) {
                  return (
                    <h3 key={idx} className="text-xl font-semibold text-slate-900 mt-4 mb-2">
                      {line.replace(/^### /, '')}
                    </h3>
                  );
                }
                if (line.startsWith('- ')) {
                  return (
                    <li key={idx} className="ml-6 mb-2">
                      {line.replace(/^- /, '')}
                    </li>
                  );
                }
                if (line.trim() === '') {
                  return <div key={idx} className="mb-4" />;
                }
                return (
                  <p key={idx} className="mb-4">
                    {line}
                  </p>
                );
              })}
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}