import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import { FiAward, FiHeart, FiCheckCircle } from 'react-icons/fi';

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-bg)', paddingBottom: '80px' }}>
      <Breadcrumb items={[{ label: 'About Sagarm' }]} />

      <div className="container" style={{ marginTop: '20px' }}>
        {/* Banner */}
        <div
          style={{
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1600&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '80px 40px',
            color: '#ffffff',
            textAlign: 'center',
            marginBottom: '48px'
          }}
        >
          <span className="badge badge-gold" style={{ marginBottom: '16px' }}>ESTABLISHED COUTURE HOUSE</span>
          <h1 style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)', color: '#ffffff' }}>
            The Story of Sagarm
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#E2ECBF', maxWidth: '700px', margin: '16px auto 0 auto' }}>
            sagarm.shop is an exclusive single-brand fashion house created for connoisseurs of pure luxury, artisanal hand embroidery, and regal couture.
          </p>
        </div>

        {/* Content Section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center', marginBottom: '64px' }}>
          <div>
            <span style={{ color: 'var(--color-primary)', fontWeight: 700, letterSpacing: '2px', fontSize: '0.85rem' }}>
              UNCOMPROMISED CRAFTSMANSHIP
            </span>
            <h2 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-heading)', marginTop: '8px', marginBottom: '20px' }}>
              Hand-Embroidered Splendor
            </h2>
            <p style={{ color: 'var(--color-text-main)', lineHeight: '1.8', fontSize: '1rem', marginBottom: '16px' }}>
              Unlike multi-vendor open marketplaces, Sagarm maintains strict quality control over every single thread. From our signature gold zardozi sherwanis to lush velvet lehengas, every piece is stitched in our private ateliers by master artisans.
            </p>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.8', fontSize: '0.95rem' }}>
              We source raw silks from Kashmir, velvet from Italy, and organic lawn cottons locally, blending traditional subcontinental heritage with modern silhouette tailoring.
            </p>
          </div>

          <div className="card" style={{ padding: '32px', backgroundColor: '#ffffff' }}>
            <h3 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', marginBottom: '16px' }}>
              Our Brand Pillars
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <li style={{ display: 'flex', gap: '12px' }}>
                <FiCheckCircle style={{ color: 'var(--color-primary)', fontSize: '1.25rem', flexShrink: 0 }} />
                <div>
                  <strong>Exclusive In-House Atelier:</strong> Zero third-party sellers or mass factory copies.
                </div>
              </li>
              <li style={{ display: 'flex', gap: '12px' }}>
                <FiCheckCircle style={{ color: 'var(--color-primary)', fontSize: '1.25rem', flexShrink: 0 }} />
                <div>
                  <strong>Pure Fabrics Guarantee:</strong> Only certified 100% pure silk, velvet, and organza.
                </div>
              </li>
              <li style={{ display: 'flex', gap: '12px' }}>
                <FiCheckCircle style={{ color: 'var(--color-primary)', fontSize: '1.25rem', flexShrink: 0 }} />
                <div>
                  <strong>Bespoke Custom Fitting:</strong> Tailored to your exact measurements with nationwide delivery across Pakistan.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
