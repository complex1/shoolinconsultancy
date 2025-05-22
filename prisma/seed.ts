// Seed script to populate the database with initial data
import { PrismaClient } from '../src/generated/prisma'
import * as bcrypt from 'bcryptjs'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seeding...')
  
  // Create media directory if it doesn't exist
  console.log('Setting up media directory...');
  const mediaDir = path.join(process.cwd(), 'public/uploads/media');
  
  if (!fs.existsSync(mediaDir)) {
    console.log('Creating media directory...');
    fs.mkdirSync(mediaDir, { recursive: true });
  }

  // Create admin user
  console.log('Creating admin user...')
  const hashedPassword = await bcrypt.hash('admin123', 10)
  await prisma.adminUser.upsert({
    where: { username: 'admin' },
    update: {
      password: hashedPassword,
      name: 'Administrator'
    },
    create: {
      username: 'admin',
      password: hashedPassword,
      name: 'Administrator',
      role: 'admin'
    }
  })

  // Create services
  const services = [
    {
      title: 'Business Consulting',
      description: 'Strategic business consulting to optimize operations, enhance productivity, and drive sustainable growth.',
      longDescription: `Our comprehensive business consulting services are designed to help organizations identify opportunities, 
      overcome challenges, and achieve their strategic objectives. We work closely with your team to understand your unique business 
      needs and develop tailored solutions that drive measurable results.
      
      Our approach combines industry expertise with innovative methodologies to optimize your operations, enhance productivity, 
      and foster sustainable growth. Whether you're looking to streamline processes, improve organizational effectiveness, or 
      explore new market opportunities, our business consultants provide the guidance and support you need to succeed.`,
      iconUrl: '/icons/business.svg',
      slug: 'business',
      featured: true
    },
    {
      title: 'Financial Advisory',
      description: 'Expert financial guidance to help you make informed decisions, manage resources, and achieve financial stability.',
      longDescription: `Our financial advisory services provide expert guidance to help organizations navigate complex financial 
      landscapes and make informed decisions. From financial planning and analysis to risk management and investment strategies, 
      our advisors offer comprehensive support tailored to your specific needs.
      
      We help you optimize resource allocation, enhance financial performance, and build a strong foundation for long-term stability 
      and growth. Our team of experienced financial professionals delivers actionable insights and practical recommendations that 
      align with your business objectives and market conditions.`,
      iconUrl: '/icons/finance.svg',
      slug: 'financial',
      featured: true
    },
    {
      title: 'Strategic Planning',
      description: 'Comprehensive strategic planning services to align your vision with practical, actionable business initiatives.',
      longDescription: `Our strategic planning services help organizations define their vision, establish clear objectives, and 
      develop actionable roadmaps for success. We facilitate collaborative planning processes that engage key stakeholders and 
      drive alignment across your organization.
      
      From market analysis and competitive positioning to implementation planning and performance measurement, our comprehensive 
      approach ensures that your strategic initiatives deliver tangible results. We help you anticipate future trends, adapt to 
      changing market conditions, and position your organization for sustainable growth and competitive advantage.`,
      iconUrl: '/icons/strategy.svg',
      slug: 'strategy',
      featured: false
    },
    {
      title: 'Digital Transformation',
      description: 'Transform your business with cutting-edge digital solutions that enhance efficiency and customer experience.',
      longDescription: `Our digital transformation services help organizations leverage technology to reimagine their business models, 
      enhance operational efficiency, and deliver exceptional customer experiences. We guide you through every step of your digital 
      journey, from strategy development to implementation and optimization.
      
      Our team of technology experts works closely with your organization to identify the right digital solutions for your unique 
      needs. We help you embrace innovation, automate processes, enhance data analytics capabilities, and create seamless digital 
      experiences that drive customer engagement and business growth.`,
      iconUrl: '/icons/digital.svg',
      slug: 'digital',
      featured: true
    }
  ]

  console.log('Creating services...')
  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service
    })
  }

  // Create testimonials
  console.log('Creating testimonials...')
  const testimonials = [
    {
      name: 'Sarah Johnson',
      position: 'CEO',
      company: 'InnoTech Solutions',
      content: 'Shoolin Consultancy transformed our business operations. Their strategic insights and practical recommendations helped us increase productivity by 30% and significantly improve our market position.',
      rating: 5,
      imageUrl: '/testimonials/person1.svg',
      featured: true
    },
    {
      name: 'Michael Chen',
      position: 'COO',
      company: 'Global Enterprises',
      content: 'Working with Shoolin Consultancy was a game-changer for our organization. Their financial advisory services helped us streamline our resources and create a sustainable growth model.',
      rating: 5,
      imageUrl: '/testimonials/person2.svg',
      featured: true
    },
    {
      name: 'Emily Rodriguez',
      position: 'CFO',
      company: 'Next Level Corp',
      content: 'The team at Shoolin Consultancy delivered exceptional results. Their deep expertise and personalized approach made all the difference in our digital transformation journey.',
      rating: 4,
      imageUrl: '/testimonials/person3.svg',
      featured: false
    }
  ]

  for (const testimonial of testimonials) {
    await prisma.testimonial.upsert({
      where: {
        id: (await prisma.testimonial.findFirst({
          where: { name: testimonial.name, company: testimonial.company }
        }))?.id || 0
      },
      update: testimonial,
      create: testimonial
    })
  }

  // Create team members
  console.log('Creating team members...')
  const teamMembers = [
    {
      name: 'Michael Richardson',
      title: 'Managing Partner',
      specialization: 'Specializing in corporate law, mergers & acquisitions, and business strategy',
      image: '/team/attorney1.svg',
    },
    {
      name: 'Sophia Martinez',
      title: 'Senior Legal Counsel',
      specialization: 'Expertise in intellectual property, patent law, and technology regulations',
      image: '/team/attorney2.svg',
    },
    {
      name: 'David Johnson',
      title: 'International Legal Advisor',
      specialization: 'Focused on international business law, trade compliance, and global regulations',
      image: null,
    },
    {
      name: 'Rebecca Wong',
      title: 'Compliance Specialist',
      specialization: 'Specialized in financial regulations, compliance, and corporate governance',
      image: null,
    },
    {
      name: 'James Wilson',
      title: 'Chief Financial Consultant',
      specialization: 'Expert in financial analysis, investment strategy, and risk management',
      image: null,
    },
    {
      name: 'Linda Chen',
      title: 'Senior Business Consultant',
      specialization: 'Specializing in operational excellence, business transformation, and growth strategies',
      image: null,
    },
    {
      name: 'Robert Taylor',
      title: 'Digital Transformation Specialist',
      specialization: 'Expert in leveraging digital technologies to drive business innovation and efficiency',
      image: null,
    },
    {
      name: 'Olivia Patel',
      title: 'Strategic Planning Director',
      specialization: 'Focused on developing comprehensive strategic plans and implementation roadmaps',
      image: null,
    },
  ]

  for (const member of teamMembers) {
    // Convert the team member data to match the schema
    const memberData = {
      name: member.name,
      position: member.title,
      bio: member.specialization,
      imageUrl: member.image,
      order: teamMembers.indexOf(member) + 1
    };
    
    await prisma.teamMember.upsert({
      where: {
        id: (await prisma.teamMember.findFirst({
          where: { name: member.name }
        }))?.id || 0
      },
      update: memberData,
      create: memberData
    })
  }

  // Create statistics
  console.log('Creating statistics...')
  const statistics = [
    {
      label: 'Clients Served',
      value: '250+',
      icon: 'users',
      order: 1
    },
    {
      label: 'Success Rate',
      value: '98%',
      icon: 'chart-line',
      order: 2
    },
    {
      label: 'Years of Experience',
      value: '15+',
      icon: 'calendar',
      order: 3
    },
    {
      label: 'Industries Covered',
      value: '20+',
      icon: 'building',
      order: 4
    }
  ]

  for (const stat of statistics) {
    await prisma.statistic.upsert({
      where: {
        id: (await prisma.statistic.findFirst({
          where: { label: stat.label }
        }))?.id || 0
      },
      update: stat,
      create: stat
    })
  }

  // Create tags for blog posts
  console.log('Creating blog tags...')
  const tags = [
    { name: 'Business Strategy' },
    { name: 'Financial Advisory' },
    { name: 'Digital Transformation' },
    { name: 'Strategic Planning' },
    { name: 'Operational Excellence' },
    { name: 'Risk Management' },
    { name: 'Leadership' },
    { name: 'Innovation' },
    { name: 'Market Insights' },
    { name: 'Sustainability' },
  ]

  for (const tag of tags) {
    await prisma.tag.upsert({
      where: { name: tag.name },
      update: tag,
      create: tag
    })
  }

  // Get all tags from database for reference
  const dbTags = await prisma.tag.findMany()
  const tagMap = new Map(dbTags.map(tag => [tag.name, tag.id]))

  // Get team members for author reference
  const dbTeamMembers = await prisma.teamMember.findMany()

  // Create blog posts
  console.log('Creating blog posts...')
  const blogPosts = [
    {
      title: 'The Future of Business Consulting in a Digital World',
      slug: 'future-business-consulting-digital-world',
      content: `
# The Future of Business Consulting in a Digital World

The business consulting landscape is undergoing a profound transformation as digital technologies reshape client expectations and delivery models. This evolution presents both challenges and opportunities for consulting firms and independent consultants alike.

## The Digital Transformation of Consulting

Digital transformation is no longer optional for consulting firms – it's an imperative. The integration of artificial intelligence, data analytics, and cloud computing is enabling consultants to deliver more precise insights, faster recommendations, and more measurable outcomes.

Key trends we're observing:

1. **Data-driven consulting**: The rise of big data has transformed the consulting model from relying on expertise and intuition to leveraging advanced analytics and data science.

2. **Remote and hybrid delivery models**: The pandemic accelerated the adoption of virtual consulting engagements, proving that many consulting services can be delivered effectively without constant on-site presence.

3. **AI-augmented consulting**: Machine learning and AI tools are helping consultants automate routine analysis, allowing them to focus on strategic thinking and creative problem-solving.

4. **Digital platforms and ecosystems**: Consultancies are building digital platforms to complement their human capital, creating scalable solution delivery models.

## New Skills for the Modern Consultant

As the consulting industry evolves, consultants must develop new capabilities:

- Advanced data analysis and interpretation
- Digital fluency across multiple platforms and technologies
- Remote collaboration and virtual engagement skills
- Ability to combine human insight with technological capabilities

## The Human Element Remains Critical

Despite technological advancement, the core value of consulting remains fundamentally human. Technology enhances consulting effectiveness but doesn't replace:

- Critical thinking and judgment
- Creative problem-solving
- Change management expertise
- Stakeholder management and communication
- Trust building and relationship development

## Looking Ahead

The future belongs to consulting firms and professionals who can seamlessly blend digital capabilities with traditional consulting strengths. The most successful will leverage technology to scale their impact while preserving the human elements that drive transformational outcomes for clients.

As we navigate this changing landscape, we at Shoolin Consultancy remain committed to embracing digital innovation while maintaining our focus on delivering exceptional client value through our people's expertise, insight, and passion for results.
      `,
      excerpt: 'Explore how digital transformation is reshaping the landscape of business consulting and what it means for organizations seeking strategic guidance.',
      image: null,
      published: true,
      author: dbTeamMembers[0],
      tags: ['Digital Transformation', 'Business Strategy', 'Innovation']
    },
    {
      title: '5 Financial Planning Strategies Every Business Should Consider',
      slug: 'financial-planning-strategies-business',
      content: `
# 5 Financial Planning Strategies Every Business Should Consider

In today's volatile economic landscape, robust financial planning is more critical than ever. Businesses of all sizes can benefit from strategic financial management approaches that build resilience and create a foundation for sustainable growth.

## 1. Cash Flow Forecasting and Management

Cash flow remains the lifeblood of any business. Establishing a disciplined approach to cash flow management is fundamental to business survival and success.

**Key actions:**
- Implement a rolling 13-week cash flow forecasting process
- Identify cash flow drivers and develop early warning indicators
- Build multiple scenarios to prepare for different business conditions
- Establish clear cash collection procedures and monitor performance regularly

## 2. Cost Structure Optimization

Understanding your cost structure at a granular level enables strategic decision-making about where to invest and where to reduce expenses.

**Key actions:**
- Distinguish between fixed and variable costs in your business model
- Identify opportunities to convert fixed costs to variable where possible
- Implement zero-based budgeting for non-essential expenditures
- Regularly benchmark costs against industry standards

## 3. Diversified Funding Sources

Reliance on a single source of funding creates vulnerability. Developing multiple capital access points provides flexibility and reduces risk.

**Key actions:**
- Assess your current capital structure and identify gaps
- Explore alternative financing options beyond traditional bank loans
- Build relationships with multiple financial institutions
- Consider innovative funding models like revenue-based financing for growth initiatives

## 4. Strategic Risk Management

Proactive risk management is a cornerstone of sound financial planning.

**Key actions:**
- Develop a comprehensive risk register covering financial, operational and strategic risks
- Quantify potential impacts through scenario analysis
- Implement mitigation strategies for highest priority risks
- Review insurance coverage to ensure alignment with your risk profile

## 5. Technology-Enabled Financial Planning

Modern financial planning requires technological support to enable data-driven decision making.

**Key actions:**
- Invest in integrated financial planning and analysis tools
- Implement dashboards that provide real-time visibility into key metrics
- Leverage predictive analytics for forward-looking insights
- Ensure data quality through systematic governance

## Taking Action

The most effective financial strategy combines these elements into a cohesive approach tailored to your specific business context. We recommend starting with a comprehensive assessment of your current financial management practices to identify priority areas for enhancement.

By strengthening these five areas, businesses can build the financial foundation needed to weather uncertainties and capitalize on emerging opportunities in any economic environment.
      `,
      excerpt: 'Discover essential financial planning approaches that can help businesses of all sizes navigate economic uncertainty and build resilience.',
      image: null,
      published: true,
      author: dbTeamMembers[1],
      tags: ['Financial Advisory', 'Risk Management', 'Strategic Planning']
    },
    {
      title: 'Building a Culture of Innovation: Lessons from Industry Leaders',
      slug: 'building-culture-innovation-lessons',
      content: `
# Building a Culture of Innovation: Lessons from Industry Leaders

In today's rapidly evolving business environment, innovation has become a critical competitive differentiator. The most successful organizations have moved beyond viewing innovation as a departmental function and instead cultivated it as a core element of their organizational culture.

## What Defines an Innovative Culture?

Innovation cultures share several key characteristics:

- **Psychological safety** – People feel safe taking risks and proposing new ideas without fear of negative consequences
- **Empowered experimentation** – Testing and learning are encouraged as part of the normal workflow
- **Customer-centricity** – Deep understanding of customer needs drives innovation efforts
- **Collaborative environment** – Cross-functional teams work together without silos
- **Learning orientation** – Failures are viewed as valuable learning opportunities rather than reasons for punishment

## Case Studies in Innovation Culture

### Example 1: Technology Sector

A leading technology company attributes its sustained innovation success to three key practices:

1. **20% time policy** – Engineers spend 20% of their time on self-directed projects of personal interest
2. **Rapid prototyping approach** – Ideas move quickly from concept to minimal viable product for testing
3. **Celebration of "productive failure"** – Teams that take smart risks are recognized even when outcomes aren't successful

### Example 2: Healthcare Innovation

A healthcare organization transformed its traditionally conservative culture by:

1. Establishing innovation labs where cross-functional teams can experiment outside normal constraints
2. Creating dedicated funding mechanisms for employee-generated ideas
3. Implementing a structured innovation process that balances creativity with disciplined execution

## Common Barriers to Innovation Culture

Our research with clients across industries reveals several persistent obstacles:

- **Short-term performance pressure** that discourages longer-term investments
- **Risk-averse leadership** that punishes failure rather than encouraging smart risk-taking
- **Rigid hierarchies** that slow decision-making and idea implementation
- **Resource constraints** that limit experimentation
- **Lack of diversity** in teams and leadership, reducing perspective breadth

## Building Your Innovation Culture

Based on our work with industry leaders, we recommend these approaches:

1. **Start with leadership alignment** – Innovation culture must be championed from the top
2. **Implement structured innovation processes** – Provide frameworks that guide ideation through implementation
3. **Create dedicated resources** – Allocate time, budget and spaces for innovation activities
4. **Recognize and reward innovative behaviors** – Celebrate both successful outcomes and valuable learning
5. **Measure what matters** – Develop metrics beyond financial outcomes to assess innovation health

The journey toward an innovative culture requires patience and persistence, but organizations that commit to this transformation gain significant competitive advantage through enhanced adaptability, increased employee engagement, and sustained growth.

We welcome the opportunity to discuss how your organization can cultivate a more innovative culture suited to your unique context and strategic objectives.
      `,
      excerpt: 'Learn how top organizations foster innovation within their teams and how you can implement similar practices in your business.',
      image: null,
      published: true,
      author: dbTeamMembers[2], 
      tags: ['Innovation', 'Leadership', 'Business Strategy']
    },
    {
      title: 'The Role of Data Analytics in Modern Strategic Planning',
      slug: 'data-analytics-strategic-planning',
      content: `
# The Role of Data Analytics in Modern Strategic Planning

Strategic planning has undergone a profound transformation in recent years, evolving from an intuition-driven annual exercise to a dynamic, data-informed process. Organizations that effectively leverage data analytics in their strategic planning gain significant competitive advantages through more informed decision-making, faster response to market changes, and better resource allocation.

## The Evolution of Strategic Planning

Traditional strategic planning typically relied heavily on:
- Historical performance data
- Industry expertise and executive intuition
- Annual or biannual planning cycles
- Static plans with limited adjustment mechanisms

Modern data-driven strategic planning incorporates:
- Real-time market and performance analytics
- Predictive modeling and scenario planning
- Continuous planning processes with regular reassessment
- Dynamic plans that adapt to changing conditions

## Key Applications of Analytics in Strategic Planning

### Market Opportunity Analysis

Advanced analytics enables organizations to identify emerging market opportunities with unprecedented precision:

- Analyzing unstructured data from social media, review sites, and forums to identify unmet customer needs
- Combining demographic, economic, and behavioral data to forecast market potential by segment
- Detecting early signals of market shifts before they become obvious to competitors

### Competitive Positioning

Data analytics provides deeper insights into competitive dynamics:

- Tracking competitors' digital footprints to understand strategic priorities
- Using natural language processing to analyze earnings calls, press releases, and job postings
- Mapping competitive positioning through multiple dimensions beyond traditional frameworks

### Resource Allocation Optimization

Analytics improves how organizations allocate limited resources:

- Portfolio analysis that quantifies the potential return of different strategic initiatives
- Simulation models that test different resource allocation scenarios
- Dynamic resource reallocation based on real-time performance metrics

### Performance Monitoring

Modern analytics transforms how strategies are monitored and adjusted:

- Real-time dashboards tracking key performance indicators
- Automated alerts when metrics deviate from expected ranges
- Predictive indicators that identify potential issues before they impact results

## Implementing Data-Driven Strategic Planning

Organizations seeking to enhance their strategic planning with analytics should consider these steps:

1. **Data Foundation Assessment** – Evaluate current data assets, quality, and accessibility
2. **Analytics Capability Building** – Develop both technological tools and human analytical skills
3. **Process Integration** – Embed analytics into each stage of the strategic planning cycle
4. **Decision Rights Clarity** – Define how data-driven insights will influence decision-making
5. **Continuous Improvement** – Regularly assess and refine analytical approaches

## Balance Data with Judgment

While analytics provides powerful inputs to strategic planning, successful organizations recognize that data must complement, not replace, human judgment. The most effective approach combines:

- Rigorous data analysis to identify patterns and opportunities
- Creative thinking to generate innovative strategic options
- Experience-based judgment to interpret analytical findings in context
- Collaborative decision-making that considers both quantitative and qualitative factors

Organizations that strike the right balance between data-driven insights and human expertise position themselves for sustained competitive advantage in increasingly complex and dynamic markets.
      `,
      excerpt: 'Understand how data-driven decision making is revolutionizing strategic planning processes and creating competitive advantages.',
      image: null, 
      published: true,
      author: dbTeamMembers[3],
      tags: ['Strategic Planning', 'Innovation', 'Business Strategy']
    }
  ];

  for (const post of blogPosts) {
    // Extract tags from the post
    const postTags = post.tags;
    
    // Create the blog post without tags
    const createdPost = await prisma.blogPost.upsert({
      where: {
        slug: post.slug
      },
      update: {
        title: post.title,
        content: post.content,
        excerpt: post.excerpt,
        imageUrl: post.image,
        published: post.published,
        authorId: post.author.id,
      },
      create: {
        title: post.title,
        slug: post.slug,
        content: post.content,
        excerpt: post.excerpt,
        imageUrl: post.image,
        published: post.published,
        authorId: post.author.id,
      }
    });
    
    // Connect blog post to tags
    for (const tagName of postTags) {
      const tagId = tagMap.get(tagName);
      if (tagId) {
        await prisma.blogPostTag.upsert({
          where: {
            postId_tagId: {
              postId: createdPost.id,
              tagId: tagId
            }
          },
          update: {},
          create: {
            postId: createdPost.id,
            tagId: tagId
          }
        });
      }
    }
  }
  
  // Add sample media items
  console.log('Creating sample media items...');
  const sampleMediaItems = [
    {
      filename: 'sample-image-1.jpg',
      mimetype: 'image/jpeg',
      size: 128000,
      title: 'Sample Image 1',
      description: 'A sample image for demonstration purposes',
      altText: 'Example image showing a sample'
    },
    {
      filename: 'document-sample.pdf',
      mimetype: 'application/pdf',
      size: 256000,
      title: 'Sample Document',
      description: 'A sample PDF document for demonstration',
      altText: 'Sample PDF document'
    }
  ];
  
  // Don't create actual files, just add database entries
  // In a real scenario, you'd copy files to the media directory
  for (const item of sampleMediaItems) {
    const filepath = `/uploads/media/${item.filename}`;
    
    // First try to find if the media item already exists
    const existingMedia = await prisma.media.findFirst({
      where: { filepath: filepath }
    });
    
    if (existingMedia) {
      // Update existing media
      await prisma.media.update({
        where: { id: existingMedia.id },
        data: {
          title: item.title,
          description: item.description,
          altText: item.altText
        }
      });
    } else {
      // Create new media item
      await prisma.media.create({
        data: {
          filename: item.filename,
          filepath: filepath,
          mimetype: item.mimetype,
          size: item.size,
          title: item.title,
          description: item.description,
          altText: item.altText
        }
      });
    }
  }

  console.log('Database seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('Error during database seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
