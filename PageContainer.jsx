import React from 'react';

export default function PageContainer({ children }) {
  return (
    <main style={{ paddingTop: 'var(--navbar-height)', minHeight: 'calc(100vh - var(--navbar-height))' }}>
      {children}
    </main>
  );
}
