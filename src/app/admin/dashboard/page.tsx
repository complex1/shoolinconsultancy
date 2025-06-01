"use client";

import AdminHeader from '../header';
import AdminSidebar from '../sidebar';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AdminHeader />
      
      <div className="flex flex-grow">
        <AdminSidebar />
        
        <main className="flex-grow p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h1>
            
            <div className="bg-white shadow rounded-lg p-6">
              <p className="text-gray-600">
                Welcome to the admin dashboard. This is a placeholder content area.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
