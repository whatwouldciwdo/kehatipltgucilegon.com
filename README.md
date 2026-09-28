This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

## CMS dan Supabase

1. Buat proyek di Supabase.
2. Jalankan `supabase/migrations/202609280001_cms.sql` melalui SQL Editor.
3. Salin `.env.example` menjadi `.env.local`, lalu isi Project URL dan Publishable Key.
4. Buat pengguna melalui **Authentication > Users** di Supabase Dashboard.
5. Salin UUID pengguna dan jalankan perintah yang dicontohkan di bagian akhir file migrasi untuk memberi role `admin` atau `editor`.
6. Jalankan `npm run dev`, lalu buka [http://localhost:3000/cms/login](http://localhost:3000/cms/login).

Jangan masukkan secret key atau password database ke variabel `NEXT_PUBLIC_*`. Akses data CMS dibatasi oleh Row Level Security di PostgreSQL.

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
