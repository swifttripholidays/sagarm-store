import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import { FiAlertTriangle, FiHome, FiShoppingBag } from 'react-icons/fi';

export default function NotFoundPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '80vh', paddingBottom: '80px' }}>
      <Breadcrumb items={[{ label: '404 Page Not Found' }]} />

      <div className="container" style={{ maxWidth: '600px', marginTop: '40px', textAlign: 'center' }}>
        <div className="card" style={{ padding: '60px 40px', backgroundColor: '#ffffff' }}>
          <FiAlertTriangle style={{ fontSize: '4rem', color: 'var(--color-primary)', marginBottom: '16px' }} />
          <h1 className="num-font" style={{ fontSize: '5rem', fontWeight: 900, color: 'var(--color-primary)', lineHeight: 1 }}>
            404
          </h1>
          <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)', marginTop: '8px' }}>
            Page Not Found
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', margin: '12px 0 28px 0' }}>
            The luxury page or collection item you are looking for might have been moved or is no longer available.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/" className="btn btn-primary btn-md">
              <FiHome /> Return to Home
            </Link>
            <Link to="/shop" className="btn btn-outline btn-md">
              <FiShoppingBag /> Explore Shop
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
