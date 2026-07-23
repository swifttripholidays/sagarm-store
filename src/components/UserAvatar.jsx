import React from 'react';

export default function UserAvatar({ user, size = 'md', className = '' }) {
  const sizePixels = size === 'sm' ? '32px' : size === 'lg' ? '80px' : size === 'xl' ? '120px' : '40px';
  const fontSize = size === 'sm' ? '0.85rem' : size === 'lg' ? '2rem' : size === 'xl' ? '3rem' : '1.1rem';

  // Get initial letter from name or email
  const nameToUse = user?.fullName || user?.name || user?.email || 'User';
  const firstLetter = nameToUse.trim().charAt(0).toUpperCase();

  if (user?.avatar) {
    return (
      <img
        src={user.avatar}
        alt={nameToUse}
        className={className}
        style={{
          width: sizePixels,
          height: sizePixels,
          borderRadius: '50%',
          objectFit: 'cover',
          border: '2px solid var(--color-accent-gold)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
        }}
      />
    );
  }

  return (
    <div
      className={className}
      title={nameToUse}
      style={{
        width: sizePixels,
        height: sizePixels,
        borderRadius: '50%',
        backgroundColor: 'var(--color-primary)',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        fontSize,
        fontFamily: 'var(--font-heading)',
        border: '2px solid var(--color-accent-gold)',
        boxShadow: '0 2px 8px rgba(155, 28, 28, 0.25)',
        textTransform: 'uppercase',
        userSelect: 'none',
        flexShrink: 0
      }}
    >
      {firstLetter}
    </div>
  );
}
