# S3 Lab Website (IIT Bhilai)

This is a Next.js + TypeScript + Tailwind starter scaffold for the S3 Lab (Simple Sustainable Solutions) at IIT Bhilai.

Features included:
- Next.js app router
- TypeScript
- Tailwind CSS
- Basic glassmorphism styles and a modern sticky navbar
- Supabase client placeholder

Setup

1. Install dependencies

```bash
pnpm install
# or npm install
```

2. Run development server

```bash
pnpm dev
# or npm run dev
```

3. Add Supabase env vars (optional)

Create a `.env.local` with:

```
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

Notes

- The ML animation placeholder in `components/Hero.tsx` is left empty for later replacement.
- Styling uses Tailwind and a light glassmorphism aesthetic with `--primary` set to `#1e40af`.
