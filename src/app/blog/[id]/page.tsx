import { use } from 'react';
import BlogPostClient from './BlogPostClient';

export default function BlogPost({ params }: { params: { id: string } }) {
  // Properly unwrap params using React.use() in a server component to prevent warnings
  const unwrappedParams = use(Promise.resolve(params));
  const postId = unwrappedParams.id;
  
  return <BlogPostClient postId={postId} />;
}
