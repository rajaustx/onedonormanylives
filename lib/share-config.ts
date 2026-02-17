/** Page-specific share email content. Used by ShareFloatingCTA. */

import { blogPosts } from "./blog-posts";

const SITE_URL = "https://onedonormanylives.com";

const SITE_OVERVIEW = `One Donor Many Lives honors anonymous organ donors and helps people discover a simpler first step: pledging posthumous organ donation. One act of generosity can start a chain of hope.`;

export interface ShareConfig {
  subject: string;
  pageLines: string;
  pageUrl: string;
}

function buildShareBody(config: ShareConfig): string {
  return `I was impressed by what I found on One Donor Many Lives.

${config.pageLines}

${SITE_OVERVIEW}

Explore: ${config.pageUrl}

— One Donor Many Lives`;
}

const shareConfigs: Record<string, ShareConfig> = {
  "/": {
    subject: "One Donor Many Lives — One act of generosity, a chain of hope",
    pageLines: `The site tells the story of Dr. Thankam Subramonian, Karnataka's first anonymous living kidney donor, and invites visitors to pledge posthumous organ donation. It's a movement built around one extraordinary act.`,
    pageUrl: SITE_URL,
  },
  "/one-donors-story": {
    subject: "One Donor's Story — Dr. Thankam Subramonian",
    pageLines: `Dr. Thankam became Karnataka's first anonymous, non-directed living kidney donor in February 2026. Her 12-year journey—from a talk in 2014 to surgery in 2026—shows how one person can change lives and inspire a movement.`,
    pageUrl: `${SITE_URL}/one-donors-story`,
  },
  "/pledge": {
    subject: "Pledge your intent — One Donor Many Lives",
    pageLines: `The pledge page lets you share your intent to donate organs after life. It's posthumous donation—no surgery, no risk while you're alive. Your pledge motivates others and normalizes organ donation.`,
    pageUrl: `${SITE_URL}/pledge`,
  },
  "/press": {
    subject: "Press coverage — One Donor Many Lives",
    pageLines: `The Press section collects media coverage of Dr. Thankam's story and the movement around anonymous organ donation. News from India and beyond.`,
    pageUrl: `${SITE_URL}/press`,
  },
  "/gallery": {
    subject: "Gallery — One Donor Many Lives",
    pageLines: `The gallery captures moments from Dr. Thankam's journey—before surgery, the honor walk, recovery. A visual story of one donor's impact.`,
    pageUrl: `${SITE_URL}/gallery`,
  },
  "/blog": {
    subject: "Blog & Knowledge — One Donor Many Lives",
    pageLines: `Articles about living donation, transplant, and the human stories behind them. Knowledge to help people understand organ donation.`,
    pageUrl: `${SITE_URL}/blog`,
  },
};

/** Get share config for a pathname. Blog posts use post title when available. */
export function getShareConfig(pathname: string): ShareConfig | null {
  if (pathname === "/wall") return null;

  if (pathname.startsWith("/blog/")) {
    const slug = pathname.replace("/blog/", "").replace(/\/$/, "");
    if (!slug) return shareConfigs["/blog"];

    const post = blogPosts.find((p) => p.slug === slug);
    const title = post?.title ?? slug.replace(/-/g, " ");
    return {
      subject: `From One Donor Many Lives — ${title}`,
      pageLines: post
        ? `"${title}" — ${post.subtitle}`
        : `A blog post from One Donor Many Lives about organ donation, transplant, and the stories behind them.`,
      pageUrl: `${SITE_URL}${pathname}`,
    };
  }

  return shareConfigs[pathname] ?? null;
}

export function getShareMailtoUrl(pathname: string): string | null {
  const config = getShareConfig(pathname);
  if (!config) return null;

  const body = buildShareBody(config);
  return `mailto:?subject=${encodeURIComponent(config.subject)}&body=${encodeURIComponent(body)}`;
}
