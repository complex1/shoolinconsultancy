import BlogPostClient from './BlogPostClient';

export default async function BlogPost({ params }: { params: Promise<{ id: string }> }) {
  // In Next.js 15, params is already a promise, so we await it
  const unwrappedParams = await params;
  const postId = unwrappedParams.id;
  
  return <BlogPostClient postId={postId} />;
}
