import { Header } from "@/components/home/Header";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { blogPosts } from "@/lib/blog-posts";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  return (
    <>
      <Header />
      <main className="min-h-screen px-6 pt-24 pb-16">
        <article className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="mb-8 inline-block text-sm font-medium text-amber-700 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300"
          >
            ← Back to Blog
          </Link>

          <span className="text-xs font-medium uppercase tracking-wider text-amber-600 dark:text-amber-400">
            {post.category}
          </span>
          <h1 className="mt-2 font-serif text-4xl font-light text-stone-900 dark:text-stone-100 sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-xl text-stone-600 dark:text-stone-400">
            {post.subtitle}
          </p>
          <p className="mt-6 rounded-lg border-l-4 border-amber-500/50 bg-amber-50/50 px-4 py-3 text-stone-700 dark:border-amber-500/30 dark:bg-amber-950/20 dark:text-stone-300">
            <strong>Key takeaway:</strong> {post.keyTakeaway}
          </p>

          <div className="blog-content mt-12">
            <ReactMarkdown
              components={{
                h2: ({ children }) => (
                  <h2 className="mb-4 mt-10 font-serif text-2xl font-medium text-stone-900 first:mt-0 dark:text-stone-100">
                    {children}
                  </h2>
                ),
                p: ({ children }) => (
                  <p className="mb-6 leading-relaxed text-stone-700 dark:text-stone-300">
                    {children}
                  </p>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    className="font-medium text-amber-700 underline hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300"
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {post.content.trim()}
            </ReactMarkdown>
          </div>

          <section className="mt-16 border-t border-stone-200 pt-8 dark:border-stone-700">
            <h2 className="font-serif text-xl font-medium text-stone-900 dark:text-stone-100">
              Citations
            </h2>
            <ol className="mt-4 list-decimal space-y-2 pl-6 text-sm text-stone-600 dark:text-stone-400">
              {post.citations.map((cite) => (
                <li key={cite.id}>
                  {cite.url ? (
                    <a
                      href={cite.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-amber-700 dark:hover:text-amber-400"
                    >
                      {cite.text}
                    </a>
                  ) : (
                    cite.text
                  )}
                </li>
              ))}
            </ol>
          </section>
        </article>
      </main>
    </>
  );
}
