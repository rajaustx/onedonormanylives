This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

## Press Section

Press entries live in `lib/press.ts`. To extract article content from an image (OCR) or URL:

```bash
npm run extract-press -- public/press/article.jpg
npm run extract-press -- https://example.com/article
```

Review the output, edit as needed, then add to the `pressEntries` array in `lib/press.ts`.

## Forms (Formspree)

Both the **Wall of Appreciation** and **Contact Us** forms use Formspree. To enable them:

1. Create form(s) at [formspree.io](https://formspree.io)
2. Set the notification email to `info@onedonormanylives.com`
3. Copy `.env.example` to `.env.local` and set:
   - `NEXT_PUBLIC_FORMSPREE_ENDPOINT` – Wall of Appreciation form
   - `NEXT_PUBLIC_FORMSPREE_CONTACT_ENDPOINT` – Contact Us form (optional; falls back to the above if not set)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
