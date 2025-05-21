import Link from 'next/link';

const blogPosts = [
  {
    id: 1,
    title: 'The Future of Business Consulting in a Digital World',
    excerpt: 'Explore how digital transformation is reshaping the landscape of business consulting and what it means for organizations seeking strategic guidance.',
    date: 'May 15, 2023',
    author: 'Jane Doe',
    category: 'Business Strategy'
  },
  {
    id: 2,
    title: '5 Financial Planning Strategies Every Business Should Consider',
    excerpt: 'Discover essential financial planning approaches that can help businesses of all sizes navigate economic uncertainty and build resilience.',
    date: 'April 28, 2023',
    author: 'John Smith',
    category: 'Financial Advisory'
  },
  {
    id: 3,
    title: 'Building a Culture of Innovation: Lessons from Industry Leaders',
    excerpt: 'Learn how top organizations foster innovation within their teams and how you can implement similar practices in your business.',
    date: 'April 10, 2023',
    author: 'Emily Chen',
    category: 'Organizational Development'
  },
  {
    id: 4,
    title: 'The Role of Data Analytics in Modern Strategic Planning',
    excerpt: 'Understand how data-driven decision making is revolutionizing strategic planning processes and creating competitive advantages.',
    date: 'March 22, 2023',
    author: 'Michael Johnson',
    category: 'Strategic Planning'
  },
  {
    id: 5,
    title: 'Navigating Digital Transformation: Common Challenges and Solutions',
    excerpt: 'Explore the obstacles organizations face during digital transformation journeys and practical approaches to overcome them.',
    date: 'March 5, 2023',
    author: 'Sarah Williams',
    category: 'Digital Transformation'
  },
  {
    id: 6,
    title: 'Sustainable Business Practices: A Competitive Necessity',
    excerpt: 'Discover why sustainability is becoming a strategic imperative and how businesses can integrate sustainable practices into their operations.',
    date: 'February 18, 2023',
    author: 'David Kim',
    category: 'Sustainability'
  },
];

export default function Blog() {
  return (
    <>
      {/* Hero section with gradient background similar to homepage */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 py-16 text-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Our Blog</h1>
            <p className="text-xl text-blue-100">
              Insights, trends, and expert perspectives on business consulting and strategy
            </p>
          </div>
        </div>
      </section>

      {/* Blog grid with alternating row backgrounds */}
      <section className="py-12 bg-white">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <div 
                  key={post.id} 
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-blue-800 font-medium bg-blue-100 px-2 py-1 rounded">
                        {post.category}
                      </span>
                      <span className="text-sm text-gray-500">{post.date}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">By {post.author}</span>
                      <Link 
                        href={`/blog/${post.id}`} 
                        className="text-blue-800 font-medium hover:text-blue-600 flex items-center gap-1 group"
                      >
                        Read more
                        <span className="transform transition-transform group-hover:translate-x-1">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link href="#" className="btn btn-primary">
                View More Articles
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-gray-600 mb-6">
              Stay updated with our latest insights and industry trends. We'll send you valuable content directly to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button type="submit" className="btn btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
