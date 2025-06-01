import React from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
        <div className="admin-wrapper" style={{
              position: 'fixed',
              height: '100vh',
              width: '100vw',
              zIndex: 100,
              background: 'white',
        }}>{children}</div>
  );
}
