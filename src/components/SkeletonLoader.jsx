import React from 'react';

export default function SkeletonLoader({ count = 4, height = '300px' }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          style={{
            height,
            backgroundColor: 'var(--color-surface-soft)',
            borderRadius: 'var(--radius-lg)',
            animation: 'pulse 1.5s infinite ease-in-out'
          }}
        />
      ))}
      <style>{`
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
