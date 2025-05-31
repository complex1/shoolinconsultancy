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
  const currentUrl = `${typeof window === 'undefined' ? '' : window.location.origin}${page}`;
  
  return (
    <>
      {seo.title && <title>{seo.title}</title>}
      {seo.description && <meta name="description" content={seo.description} />}
      {seo.keywords && <meta name="keywords" content={seo.keywords} />}
      
      {/* Open Graph Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      {seo.title && <meta property="og:title" content={seo.title} />}
      {seo.description && <meta property="og:description" content={seo.description} />}
      {seo.image && <meta property="og:image" content={seo.image} />}
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      {seo.title && <meta name="twitter:title" content={seo.title} />}
      {seo.description && <meta name="twitter:description" content={seo.description} />}
      {seo.image && <meta name="twitter:image" content={seo.image} />}
      
      {/* Additional SEO Tags */}
      <link rel="canonical" href={currentUrl} />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      
      {/* Structured Data for Organization */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LegalService",
          "name": "Shoolin Legal Consultancy",
          "description": seo.description,
          "url": currentUrl,
          "logo": "/logo.svg",
          "image": seo.image,
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "India"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "email": "contact@shoolinconsultancy.com"
          }
        })}
      </script>
    </>
  );
}
