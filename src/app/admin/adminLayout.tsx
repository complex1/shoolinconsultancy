"use client";

import AdminHeader from './header';
import AdminSidebar from './sidebar';

export default function AdminDashboard({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AdminHeader />
      
      <div className="flex flex-grow" style={{ height: "calc(100vh - 100px)" }}>
        <AdminSidebar />
        
        <main
          className="flex-grow"
          style={{ overflow: "auto", height: "calc(100vh - 100px)" }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
