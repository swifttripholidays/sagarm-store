import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useToast } from '../contexts/ToastContext';
import {
  FiMail,
  FiMapPin,
  FiPhone,
  FiShield,
  FiTruck,
  FiRotateCcw,
  FiSend
} from 'react-icons/fi';

const newsletterSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid email address').required('Email is required')
});

export default function Footer() {
  const { t } = useTranslation();
  const { addToast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(newsletterSchema)
  });

  const onSubscribe = (data) => {
    addToast('Thank you for subscribing to Sagarm Private Club! Check your email for your 10% discount coupon.', 'success');
    reset();
  };

  return (
    <footer style={{ backgroundColor: '#1C1917', color: '#ffffff', paddingTop: '64px', borderTop: '4px solid var(--color-primary)' }}>
      {/* Footer Top Value Props Banner */}
      <div className="container" style={{ paddingBottom: '48px', borderBottom: '1px solid #2E2A27' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <FiShield style={{ fontSize: '2.5rem', color: 'var(--color-accent-gold)' }} />
            <div>
              <h4 style={{ fontSize: '1rem', color: '#ffffff' }}>100% Authentic Luxury</h4>
              <p style={{ fontSize: '0.8rem', color: '#A8A29E' }}>Exclusive single-brand craftsmanship</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <FiTruck style={{ fontSize: '2.5rem', color: 'var(--color-accent-gold)' }} />
            <div>
              <h4 style={{ fontSize: '1rem', color: '#ffffff' }}>Insured Nationwide Express Shipping</h4>
              <p style={{ fontSize: '0.8rem', color: '#A8A29E' }}>2-4 days COD delivery across Pakistan</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <FiRotateCcw style={{ fontSize: '2.5rem', color: 'var(--color-accent-gold)' }} />
            <div>
              <h4 style={{ fontSize: '1rem', color: '#ffffff' }}>No Returns</h4>
              <p style={{ fontSize: '0.8rem', color: '#A8A29E' }}>No returns. Final. Forever. Yours.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container" style={{ padding: '48px 16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '32px' }}>
        {/* Col 1: Brand Info */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-primary)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: '1.2rem'
              }}
            >
              S
            </div>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', letterSpacing: '1px' }}>
              SAGARM
            </span>
          </div>
          <p style={{ fontSize: '0.875rem', color: '#A8A29E', lineHeight: '1.6', marginBottom: '20px' }}>
            {t('footer.about_brand')}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', color: '#D6D3D1' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FiMapPin style={{ color: 'var(--color-primary)' }} /> Royal Atelier, Gulberg III, Lahore, Pakistan
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FiPhone style={{ color: 'var(--color-primary)' }} /> +92 300 724276 (SAGARM)
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FiMail style={{ color: 'var(--color-primary)' }} /> care@sagarm.shop
            </span>
          </div>
        </div>

        {/* Col 2: Collections */}
        <div>
          <h4 style={{ color: 'var(--color-accent-gold)', fontSize: '1.1rem', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Collections
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.875rem', color: '#A8A29E' }}>
            <li><Link to="/men" style={{ color: '#D6D3D1' }}>Men's Royal Sherwanis & Suits</Link></li>
            <li><Link to="/women" style={{ color: '#D6D3D1' }}>Women's Handcrafted Bridal Wear</Link></li>
            <li><Link to="/kids" style={{ color: '#D6D3D1' }}>Kids' Prince & Princess Line</Link></li>
            <li><Link to="/new-arrivals" style={{ color: '#D6D3D1' }}>New Couture Releases</Link></li>
            <li><Link to="/sale" style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>Seasonal Discounts</Link></li>
          </ul>
        </div>

        {/* Col 3: Customer Care */}
        <div>
          <h4 style={{ color: 'var(--color-accent-gold)', fontSize: '1.1rem', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Customer Care
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.875rem', color: '#A8A29E' }}>
            <li><Link to="/about" style={{ color: '#D6D3D1' }}>About Sagarm Atelier</Link></li>
            <li><Link to="/contact" style={{ color: '#D6D3D1' }}>Contact VIP Concierge</Link></li>
            <li><Link to="/faq" style={{ color: '#D6D3D1' }}>Frequently Asked Questions</Link></li>
            <li><Link to="/customer/dashboard" style={{ color: '#D6D3D1' }}>Track Your Order</Link></li>
            <li><Link to="/customer/addresses" style={{ color: '#D6D3D1' }}>Saved Addresses</Link></li>
          </ul>
        </div>

        {/* Col 4: VIP Newsletter */}
        <div>
          <h4 style={{ color: 'var(--color-accent-gold)', fontSize: '1.1rem', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            {t('footer.newsletter_title')}
          </h4>
          <p style={{ fontSize: '0.85rem', color: '#A8A29E', marginBottom: '16px' }}>
            {t('footer.newsletter_desc')}
          </p>

          <form onSubmit={handleSubmit(onSubscribe)}>
            <div style={{ position: 'relative', marginBottom: '8px' }}>
              <input
                type="email"
                placeholder="Enter your email address..."
                {...register('email')}
                style={{
                  width: '100%',
                  padding: '12px 40px 12px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid #44403C',
                  backgroundColor: '#272422',
                  color: '#ffffff',
                  fontSize: '0.875rem',
                  outline: 'none'
                }}
              />
              <button
                type="submit"
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--color-primary)',
                  fontSize: '1.2rem'
                }}
              >
                <FiSend />
              </button>
            </div>
            {errors.email && <p style={{ color: '#FCA5A5', fontSize: '0.75rem' }}>{errors.email.message}</p>}
          </form>
        </div>
      </div>

      {/* Bottom Legal Copyright */}
      <div style={{ backgroundColor: '#12100E', padding: '20px 0', fontSize: '0.8rem', color: '#A8A29E', borderTop: '1px solid #272422' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <span>© 2026 Sagarm Fashion House (sagarm.shop). {t('footer.rights')}</span>
          <div style={{ display: 'flex', gap: '12px', fontSize: '0.75rem' }}>
            <Link to="/privacy" style={{ color: '#A8A29E' }}>Privacy Policy</Link>
            <span>|</span>
            <Link to="/terms" style={{ color: '#A8A29E' }}>Terms of Service</Link>
            <span>|</span>
            <Link to="/returns" style={{ color: '#A8A29E' }}>Returns Policy</Link>
            <span>|</span>
            <Link to="/shipping" style={{ color: '#A8A29E' }}>Shipping Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
