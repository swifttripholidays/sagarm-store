import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function MegaMenu({
  activeCategory,
  onClose,
  categories = [],
  isLoading = false,
  isError = false
}) {
  const safeCategories = [];
  const selectedCat = safeCategories.find((c) => c?.slug === activeCategory) || safeCategories[0] || null;
  const subcategories = Array.isArray(selectedCat?.subcategories) ? selectedCat.subcategories : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      style={{
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        backgroundColor: '#ffffff',
        boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
        borderBottom: '3px solid var(--color-primary)',
        zIndex: 900,
        padding: '32px 0'
      }}
      onMouseLeave={onClose}
    >
      <div className="container">
        {isLoading ? (
          <div style={{ padding: '24px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
            <p style={{ fontSize: '0.9rem' }}>Loading categories...</p>
          </div>
        ) : isError ? (
          <div style={{ padding: '24px', textAlign: 'center', color: 'var(--color-error)' }}>
            <p style={{ fontSize: '0.9rem' }}>Failed to load categories from backend.</p>
          </div>
        ) : !selectedCat || safeCategories.length === 0 ? (
          <div style={{ padding: '24px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
            <p style={{ fontSize: '0.95rem', fontWeight: 500 }}>No categories available.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 320px', gap: '32px' }}>
            <div>
              <h4 style={{ color: 'var(--color-primary)', textTransform: 'uppercase', fontSize: '0.875rem', letterSpacing: '1px', marginBottom: '16px' }}>
                {selectedCat?.name ? `Sagarm ${selectedCat.name}` : 'Subcategories'}
              </h4>
              {subcategories.length > 0 ? (
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {subcategories.map((sub, idx) => {
                    const subName = typeof sub === 'string' ? sub : (sub?.name ?? sub?.title ?? 'Category');
                    const subSlug = typeof sub === 'string'
                      ? sub.toLowerCase().replace(/\s+/g, '-')
                      : (sub?.slug ?? subName.toLowerCase().replace(/\s+/g, '-'));
                    const subKey = typeof sub === 'object' && sub?.id ? sub.id : `${subSlug}-${idx}`;

                    return (
                      <li key={subKey}>
                        <Link
                          to={`/shop?category=${selectedCat?.slug ?? ''}&sub=${subSlug}`}
                          onClick={onClose}
                          style={{ color: 'var(--color-text-main)', fontSize: '0.95rem', fontWeight: 500 }}
                          onMouseOver={(e) => (e.currentTarget.style.color = 'var(--color-primary)')}
                          onMouseOut={(e) => (e.currentTarget.style.color = 'var(--color-text-main)')}
                        >
                          {subName}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                  No subcategories available.
                </p>
              )}
            </div>

            <div>
              <h4 style={{ color: 'var(--color-primary)', textTransform: 'uppercase', fontSize: '0.875rem', letterSpacing: '1px', marginBottom: '16px' }}>
                Special Edits
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li>
                  <Link to="/shop?sort=newest" onClick={onClose} style={{ color: 'var(--color-text-main)' }}>
                    New Couture Releases
                  </Link>
                </li>
                <li>
                  <Link to="/shop?onSale=true" onClick={onClose} style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
                    Seasonal Sale Items
                  </Link>
                </li>
                <li>
                  <Link to="/shop?category=bridal" onClick={onClose} style={{ color: 'var(--color-text-main)' }}>
                    Handcrafted Bridal Line
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 style={{ color: 'var(--color-primary)', textTransform: 'uppercase', fontSize: '0.875rem', letterSpacing: '1px', marginBottom: '16px' }}>
                Sagarm Atelier Service
              </h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                Every Sagarm piece is tailored to perfection. Enjoy custom fitting, bespoke embroidery choices, and nationwide delivery across Pakistan.
              </p>
            </div>

            {/* Featured Box */}
            {selectedCat && (
              <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', position: 'relative' }}>
                {selectedCat?.image ? (
                  <img src={selectedCat.image} alt={selectedCat?.name ?? 'Category'} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '140px', backgroundColor: 'var(--color-surface-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                    Sagarm Atelier
                  </div>
                )}
                <div style={{ padding: '12px', backgroundColor: 'var(--color-surface-soft)' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                    Sagarm {selectedCat?.name ?? ''}
                  </span>
                  <Link to={`/shop?category=${selectedCat?.slug ?? ''}`} onClick={onClose} style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                    Explore All {selectedCat?.itemCount ?? 0} Designs &rarr;
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
