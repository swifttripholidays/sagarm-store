import React from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

export default function Breadcrumb({ items = [] }) {
  return (
    <nav style={{ padding: '16px 0', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <Link to="/" style={{ color: 'var(--color-text-main)', fontWeight: 500 }}>
          Home
        </Link>
        {items.map((item, idx) => (
          <React.Fragment key={idx}>
            <FiChevronRight style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }} />
            {item.link ? (
              <Link to={item.link} style={{ color: 'var(--color-text-main)' }}>
                {item.label}
              </Link>
            ) : (
              <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>{item.label}</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
}
