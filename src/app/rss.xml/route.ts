import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://shoolinconsultancy.com';
  const currentDate = new Date().toUTCString();

  // Static blog posts data for RSS feed
  const blogPosts = [
    {
      title: "Understanding Corporate Law in India",
      slug: "understanding-corporate-law-india",
      excerpt: "A comprehensive guide to corporate law practices in India and their implications for businesses.",
      createdAt: new Date(),
      category: "Corporate Law"
    },
    {
      title: "Intellectual Property Rights: A Modern Perspective",
      slug: "intellectual-property-rights-modern-perspective",
      excerpt: "Exploring the evolving landscape of IP rights in the digital age and its impact on Indian businesses.",
      createdAt: new Date(),
      category: "Intellectual Property"
    },
    {
      title: "Employment Law Updates 2025",
      slug: "employment-law-updates-2025",
      excerpt: "Latest developments and changes in Indian employment law that businesses need to know.",
      createdAt: new Date(),
      category: "Employment Law"
    }
  ];

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Shoolin Consultancy Legal Insights</title>
    <link>${baseUrl}</link>
    <description>Expert legal insights, updates, and analysis from Shoolin Consultancy's legal team</description>
    <language>en</language>
    <lastBuildDate>${currentDate}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${blogPosts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.createdAt).toUTCString()}</pubDate>
      <description><![CDATA[${post.excerpt}]]></description>
      <category>${post.category}</category>
      <author>contact@shoolinconsultancy.com (Shoolin Legal Team)</author>
    </item>`).join('')}
  </channel>
</rss>`;

  return new NextResponse(rssXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
