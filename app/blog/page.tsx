import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import Link from "next/link";
import { blogPosts } from "@/lib/blog-posts";

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen px-6 pt-24 pb-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-serif text-4xl font-light text-stone-900 dark:text-stone-100 sm:text-5xl">
            Blog & Knowledge
          </h1>
          <p className="mt-4 text-lg text-stone-600 dark:text-stone-400">
            Articles about living donation, transplant, and the human stories behind them.
          </p>

          <div className="mt-16 space-y-8">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="rounded-xl border border-stone-200/60 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-stone-700/40 dark:bg-stone-900/30"
              >
                <span className="text-xs font-medium uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  {post.category}
                </span>
                <h2 className="mt-2 font-serif text-2xl font-medium text-stone-900 dark:text-stone-100">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-amber-700 dark:hover:text-amber-400"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 text-stone-600 dark:text-stone-400">
                  {post.subtitle}
                </p>
                <p className="mt-4 text-sm italic text-stone-500 dark:text-stone-400">
                  {post.keyTakeaway}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 inline-block text-sm font-medium text-amber-700 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300"
                >
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
