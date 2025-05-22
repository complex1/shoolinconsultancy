import { headers } from 'next/headers';

export async function SeoHead({ page }: { page: string }) {
  let apiUrl = '';
  if (typeof window === 'undefined') {
    // On the server, build absolute URL
    const h = await headers();
    const host = h.get('host') || h.get('x-forwarded-host');
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
    apiUrl = `${protocol}://${host}/api/seo?page=${encodeURIComponent(page)}`;
  } else {
    // On the client, use relative URL
    apiUrl = `/api/seo?page=${encodeURIComponent(page)}`;
  }
  const res = await fetch(apiUrl);
  const seo = await res.json();
  if (!seo) return null;
  return (
    <>
      {seo.title && <title>{seo.title}</title>}
      {seo.description && <meta name="description" content={seo.description} />}
      {seo.keywords && <meta name="keywords" content={seo.keywords} />}
      {seo.image && <meta property="og:image" content={seo.image} />}
    </>
  );
}
