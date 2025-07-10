import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug, blogPosts } from '@/data/blogPosts';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.id,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="pt-20">
      {/* Header */}
      <section className="bg-gradient-to-br from-emerald-50 to-teal-100 py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="mb-8">
            <div className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-emerald-600 hover:text-emerald-700">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/blog" className="text-emerald-600 hover:text-emerald-700">
                Blog
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600 truncate">{post.title}</span>
            </div>
          </nav>

          {/* Category */}
          <div className="mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-emerald-600 font-semibold">
                  {post.author.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="ml-4">
                <p className="font-medium text-gray-900">{post.author}</p>
                <p className="text-gray-600">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">{post.readTime}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          {/* Article Image */}
          <div className="aspect-video bg-gradient-to-br from-emerald-50 to-teal-100 rounded-2xl mb-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-emerald-600 text-8xl opacity-50">
                {post.category === 'Artificial Intelligence' && '🤖'}
                {post.category === 'Digital Transformation' && '🚀'}
                {post.category === 'Cloud Computing' && '☁️'}
                {post.category === 'Integration' && '🔗'}
                {post.category === 'Cybersecurity' && '🔒'}
                {post.category === 'Data Analytics' && '📊'}
                {post.category === 'Mobile Development' && '📱'}
                {post.category === 'Process Automation' && '⚙️'}
                {post.category === 'E-commerce' && '🛒'}
                {post.category === 'Remote Work' && '💻'}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg prose-emerald max-w-none">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-700 mr-2">Tags:</span>
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-12 text-center">
            Related Articles
          </h2>
          
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {blogPosts
              .filter(p => p.id !== post.id && p.category === post.category)
              .slice(0, 3)
              .map(relatedPost => (
                <article key={relatedPost.id} className="group">
                  <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                    <div className="aspect-video bg-gradient-to-br from-emerald-50 to-teal-100 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-emerald-600 text-4xl opacity-50">
                          {relatedPost.category === 'Artificial Intelligence' && '🤖'}
                          {relatedPost.category === 'Digital Transformation' && '🚀'}
                          {relatedPost.category === 'Cloud Computing' && '☁️'}
                          {relatedPost.category === 'Integration' && '🔗'}
                          {relatedPost.category === 'Cybersecurity' && '🔒'}
                          {relatedPost.category === 'Data Analytics' && '📊'}
                          {relatedPost.category === 'Mobile Development' && '📱'}
                          {relatedPost.category === 'Process Automation' && '⚙️'}
                          {relatedPost.category === 'E-commerce' && '🛒'}
                          {relatedPost.category === 'Remote Work' && '💻'}
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 mb-3">
                        {relatedPost.category}
                      </span>
                      
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                        <Link href={`/blog/${relatedPost.id}`}>
                          {relatedPost.title}
                        </Link>
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{relatedPost.readTime}</span>
                        <Link
                          href={`/blog/${relatedPost.id}`}
                          className="text-emerald-600 hover:text-emerald-700 font-medium text-sm transition-colors"
                        >
                          Read More →
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors"
            >
              ← Back to All Articles
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-emerald-600 to-teal-600">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-emerald-100 mb-8 text-lg">
            Let's discuss how AUTOWAIS can help you implement these strategies and achieve your technology goals.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 rounded-lg bg-white text-emerald-600 font-semibold hover:bg-gray-50 transition-colors shadow-lg"
          >
            Start Your Project Today
          </Link>
        </div>
      </section>
    </main>
  );
} 