import React from 'react';
import { FiStar } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';

export default function RatingStars({ rating = 5, showCount = true, count = 0 }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 !== 0;

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) {
          return <FaStar key={i} style={{ color: 'var(--color-accent-gold)', fontSize: '0.9rem' }} />;
        }
        return <FiStar key={i} style={{ color: 'var(--color-border)', fontSize: '0.9rem' }} />;
      })}
      {showCount && (
        <span
          className="num-font"
          style={{
            fontSize: '0.8rem',
            color: 'var(--color-text-muted)',
            marginLeft: '4px',
            fontWeight: 600
          }}
        >
          {rating.toFixed(1)} {count > 0 && `(${count})`}
        </span>
      )}
    </div>
  );
}
