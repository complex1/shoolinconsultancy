"use client";

import AdminLayout from '../adminLayout';

export default function ConsultationLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  );
}
