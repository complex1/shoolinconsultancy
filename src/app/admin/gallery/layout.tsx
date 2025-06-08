"use client";

import AdminLayout from '../adminLayout';

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  );
}
