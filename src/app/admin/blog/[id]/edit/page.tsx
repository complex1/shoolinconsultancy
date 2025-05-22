import EditBlogPostClient from './EditBlogPostClient';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <EditBlogPostClient id={id} />;
}
