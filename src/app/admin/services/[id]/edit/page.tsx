import EditServiceClient from "./EditServiceClient";


export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
      <EditServiceClient id={id} />
  );
}
