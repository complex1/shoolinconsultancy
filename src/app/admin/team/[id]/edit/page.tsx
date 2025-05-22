import EditTeamMemberClient from "./EditTeamMemberClient";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
      <EditTeamMemberClient id={id} />
  );
}
