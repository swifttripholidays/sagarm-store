import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function CategoryCard({ category }) {
  if (!category) return null;

  const bgImage = category?.image ?? 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80';
  const name = category?.name ?? 'Collection';
  const slug = category?.slug ?? '';
  const count = category?.itemCount ?? 0;
  const subtitle = category?.subtitle ?? 'Handcrafted luxury attire';

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'relative',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        height: '320px',
        boxShadow: 'var(--shadow-md)',
        border: '1px solid var(--color-card-border)'
      }}
    >
      <img
        src={bgImage}
        alt={name}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />
      {/* Dark Overlay Gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.75) 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '24px'
        }}
      >
        <span className="badge badge-gold" style={{ width: 'fit-content', marginBottom: '8px' }}>
          {count} Designs
        </span>
        <h3 style={{ fontSize: '1.5rem', color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
          {name}
        </h3>
        <p style={{ fontSize: '0.875rem', color: '#E2ECBF', marginTop: '4px', marginBottom: '16px' }}>
          {subtitle}
        </p>
        <Link to={`/shop?category=${slug}`} className="btn btn-gold btn-sm" style={{ width: 'fit-content' }}>
          Shop Collection
        </Link>
      </div>
    </motion.div>
  );
}
