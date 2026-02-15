import Head from 'next/head';

const BASE_URL = 'https://homeowner1-beryl.vercel.app';

const defaultSEO = {
  siteName: 'HomeGuard Pro',
  image: `${BASE_URL}/og-image.png`,
  twitterCard: 'summary_large_image',
};

export default function SEO({ title, description, path = '' }) {
  const url = `${BASE_URL}${path}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#2563EB" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={defaultSEO.siteName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={defaultSEO.image} />

      {/* Twitter */}
      <meta name="twitter:card" content={defaultSEO.twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={defaultSEO.image} />
    </Head>
  );
}
