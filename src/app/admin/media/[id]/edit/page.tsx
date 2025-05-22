import React from 'react';
import EditMediaPageClient from './EditMediaClient';


export default async function EditMediaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <EditMediaPageClient id={id} />; // Assuming EditMediaPageClient is the correct component for editing media
}
