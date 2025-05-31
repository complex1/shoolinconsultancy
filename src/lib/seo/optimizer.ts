/* eslint-disable @typescript-eslint/no-explicit-any */
import { legalKeywords } from './keywords';

interface SeoMetadata {
  title: string;
  description: string;
  keywords: string[];
  url: string;
  pageType: 'service' | 'blog' | 'practice' | 'location';
}

// Static SEO data
const staticSeoData: Record<string, any> = {
  '/': {
    page: '/',
    title: 'Shoolin Legal Consultancy | Premier Legal Services',
    description: 'Leading legal consultancy firm providing expert advice on corporate, litigation, intellectual property, and more.',
    keywords: 'legal consultancy, corporate law, litigation, IP law',
    image: '/images/home-hero.jpg'
  },
  '/about': {
    page: '/about',
    title: 'About Us | Shoolin Legal Consultancy',
    description: 'Learn about our firm, our values, and our approach to legal services.',
    keywords: 'about us, legal team, law firm history, shoolin consultancy',
    image: '/images/about-hero.jpg'
  },
  '/services': {
    page: '/services',
    title: 'Our Services | Shoolin Legal Consultancy',
    description: 'Comprehensive legal services for businesses and individuals.',
    keywords: 'legal services, corporate law, IP protection, litigation services',
    image: '/images/services-hero.jpg'
  }
};

export class SeoOptimizer {
  private static generateKeywordCombinations(pageType: string, location?: string): string[] {
    const keywords: string[] = [];
    const { primary, qualifiers, services } = legalKeywords;

    // Get relevant primary keywords based on page type
    const relevantPrimary = primary[pageType as keyof typeof primary] || [];
    
    // Generate combinations
    relevantPrimary.forEach(keyword => {
      // Basic keyword
      keywords.push(keyword);
      
      // With qualifiers
      qualifiers.forEach(qualifier => {
        keywords.push(`${qualifier} ${keyword}`);
        if (location) {
          keywords.push(`${qualifier} ${keyword} ${location}`);
        }
      });
      
      // With services
      services.forEach(service => {
        keywords.push(`${keyword} ${service}`);
        if (location) {
          keywords.push(`${keyword} ${service} ${location}`);
        }
      });
    });

    return keywords;
  }

  static generateSeoMetadata(
    title: string, 
    description: string,
    url: string,
    pageType: SeoMetadata['pageType'],
    location?: string
  ): SeoMetadata {
    // Generate relevant keywords
    const keywords = this.generateKeywordCombinations(pageType, location);
    
    return {
      title,
      description,
      keywords,
      url,
      pageType
    };
  }

  static async getSavedSeo(page: string): Promise<any | null> {
    // Return static SEO data for the page
    return staticSeoData[page] || null;
  }
  
  static async saveSeo(page: string, title: string, description: string, keywords?: string, image?: string): Promise<any> {
    // In real implementation, we would save to the database
    // Since we've removed the database, just return success
    console.log(`[SEO] Would save SEO data for ${page}`);
    
    return {
      id: '1',
      page,
      title,
      description,
      keywords: keywords || '',
      image: image || null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  static optimizeContent(content: string): string {
    // Simple content optimization algorithm
    
    // Add heading structure if missing
    if (!content.includes('<h1>') && !content.includes('<h2>')) {
      const titleMatch = content.match(/<title>(.*?)<\/title>/);
      if (titleMatch && titleMatch[1]) {
        content = content.replace('<body>', `<body><h1>${titleMatch[1]}</h1>`);
      }
    }
    
    // Add meta description if missing
    if (!content.includes('<meta name="description"')) {
      const description = 'Expert legal consultancy services for businesses and individuals.';
      content = content.replace('</head>', `<meta name="description" content="${description}"></head>`);
    }
    
    // Add basic schema.org markup
    if (!content.includes('schema.org')) {
      const schemaMarkup = `
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "LegalService",
          "name": "Shoolin Legal Consultancy",
          "description": "Expert legal consultancy services",
          "url": "https://www.shoolinconsultancy.com/"
        }
        </script>
      `;
      content = content.replace('</head>', `${schemaMarkup}</head>`);
    }
    
    return content;
  }
}
