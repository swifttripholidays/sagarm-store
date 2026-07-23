import React from 'react';
import { Link } from 'react-router-dom';
import { FiPackage } from 'react-icons/fi';

export default function EmptyState({
  icon: Icon = FiPackage,
  title = 'No Items Found',
  description = 'Try adjusting your filters or search keywords.',
  actionText = 'Back to Shop',
  actionLink = '/shop'
}) {
  return (
    <div
      style={{
        textAlign: 'center',
        padding: '60px 20px',
        backgroundColor: '#ffffff',
        borderRadius: 'var(--radius-xl)',
        border: '1px dashed var(--color-border)',
        margin: '20px 0'
      }}
    >
      <div
        style={{
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-surface-soft)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px auto',
          color: 'var(--color-primary)'
        }}
      >
        <Icon style={{ fontSize: '2.2rem' }} />
      </div>
      <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', color: 'var(--color-text-main)' }}>
        {title}
      </h3>
      <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginTop: '6px', maxWidth: '400px', margin: '6px auto 20px auto' }}>
        {description}
      </p>
      {actionLink && (
        <Link to={actionLink} className="btn btn-primary btn-sm">
          {actionText}
        </Link>
      )}
    </div>
  );
}
