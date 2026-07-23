// import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import React, { useState, useMemo, useEffect } from 'react';
import { getProducts } from '../services/productService';
import { REVIEWS } from '../data/reviews';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import RatingStars from '../components/RatingStars';
import { motion } from 'framer-motion';
import {
  FiArrowRight,
  FiShield,
  FiTruck,
  FiRefreshCw,
  FiHeadphones,
  FiClock,
  FiCheck,
  FiMail,
  FiInstagram,
  FiPhoneCall,
  FiAward
} from 'react-icons/fi';

export default function HomePage() {
  const { t } = useTranslation();
  // const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(true);
  const safeProducts = Array.isArray(getProducts) ? Products : [];
  const safeCategories = [];
  const safeReviews = Array.isArray(REVIEWS) ? REVIEWS : [];

  const newArrivals = safeProducts.filter((p) => p?.isNew);
  const bestSellers = safeProducts.filter((p) => p?.isBestSeller);
  const menProds = safeProducts.filter((p) => p?.category === 'men');
  const womenProds = safeProducts.filter((p) => p?.category === 'women');
  const kidsProds = safeProducts.filter((p) => p?.category === 'kids');
  const featuredProds = safeProducts.filter((p) => p?.isFeatured);
  const trendingProds = safeProducts.filter((p) => p?.isTrending);

  // useEffect(() => {
  //   async function loadProducts() {
  //     try {
  //       const data = await getProducts();
  //       setProducts(data);
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   loadProducts();
  // }, []);

  return (
    <div style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* SECTION 1: HERO BANNER */}
      <section
        style={{
          position: 'relative',
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%), url("https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1920&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#ffffff',
          padding: '80px 0',
          borderRadius: '16px',
          margin: '24px auto',
          maxWidth: '1280px',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-md)'
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{ maxWidth: '640px' }}
          >
            <span
              style={{
                display: 'inline-block',
                padding: '6px 16px',
                marginBottom: '20px',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#ffffff',
                backgroundColor: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(8px)',
                borderRadius: '4px',
                border: '1px solid rgba(255,255,255,0.2)'
              }}
            >
              SS / 2024 COLLECTION
            </span>
            <h1
              style={{
                fontSize: 'clamp(2.75rem, 5.5vw, 4.5rem)',
                color: '#ffffff',
                fontFamily: 'var(--font-heading)',
                lineHeight: '1.05',
                marginBottom: '20px',
                letterSpacing: '-0.02em',
                fontWeight: 700
              }}
            >
              Crafted Luxury. <br />Timeless Elegance.
            </h1>
            <p style={{ fontSize: '1.1rem', color: '#E5E7EB', marginBottom: '36px', lineHeight: '1.6', fontWeight: 300 }}>
              Discover handcrafted couture, contemporary tailoring, and refined essentials made from the finest ethical textiles.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
              <Link
                to="/shop"
                className="btn"
                style={{
                  backgroundColor: '#ffffff',
                  color: '#111827',
                  padding: '16px 36px',
                  borderRadius: '9999px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                  transition: 'all 0.2s ease'
                }}
              >
                {t('hero.shop_now')} <FiArrowRight />
              </Link>
              <Link
                to="/sale"
                className="btn"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  color: '#ffffff',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  padding: '16px 32px',
                  borderRadius: '9999px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em'
                }}
              >
                {t('hero.view_sale')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: FEATURED CATEGORIES */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{ color: 'var(--color-primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem' }}>
              ROYAL SELECTIONS
            </span>
            <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', marginTop: '8px' }}>
              {t('categories.title')}
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', marginTop: '6px' }}>
              {t('categories.subtitle')}
            </p>
          </div>

          {safeCategories.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              {safeCategories.map((cat) => (
                <CategoryCard key={cat?.id ?? cat?.slug} category={cat} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--color-text-muted)' }}>
              <p style={{ fontSize: '0.95rem' }}>No categories available.</p>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 3: NEW ARRIVALS */}
      <section style={{ padding: '80px 0', backgroundColor: '#ffffff' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span style={{ color: 'var(--color-primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem' }}>
                JUST UNVEILED
              </span>
              <h2 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-heading)' }}>New Couture Arrivals</h2>
            </div>
            <Link to="/new-arrivals" className="btn btn-outline btn-sm">
              Explore All New Releases <FiArrowRight />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {newArrivals.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: BEST SELLERS */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="badge badge-gold" style={{ marginBottom: '8px' }}>MOST CELEBRATED</span>
            <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)' }}>Sagarm Best Sellers</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {bestSellers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: MEN'S COLLECTION BANNER & GRID */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--color-surface-soft)' }}>
        <div className="container">
          <div
            style={{
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              backgroundImage: 'linear-gradient(90deg, rgba(28,25,23,0.9) 0%, rgba(28,25,23,0.4) 100%), url("https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80")',
              backgroundSize: 'cover',
              padding: '60px 40px',
              color: '#ffffff',
              marginBottom: '40px'
            }}
          >
            <span className="badge badge-gold" style={{ marginBottom: '12px' }}>GENTLEMEN'S ROYALTY</span>
            <h2 style={{ fontSize: '2.5rem', color: '#ffffff', fontFamily: 'var(--font-heading)' }}>Men's Luxury Ensemble</h2>
            <p style={{ color: '#E2ECBF', maxWidth: '500px', margin: '12px 0 24px 0' }}>
              Handcrafted velvet sherwanis, embroidered raw silk kurta sets, and bespoke tuxedos tailored for royal presence.
            </p>
            <Link to="/men" className="btn btn-gold btn-sm">Shop Men's Line</Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {menProds.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: WOMEN'S COLLECTION BANNER & GRID */}
      <section style={{ padding: '80px 0', backgroundColor: '#ffffff' }}>
        <div className="container">
          <div
            style={{
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              backgroundImage: 'linear-gradient(90deg, rgba(212,0,0,0.85) 0%, rgba(225,44,44,0.5) 100%), url("https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80")',
              backgroundSize: 'cover',
              padding: '60px 40px',
              color: '#ffffff',
              marginBottom: '40px'
            }}
          >
            <span className="badge badge-gold" style={{ marginBottom: '12px' }}>HAUTE COUTURE</span>
            <h2 style={{ fontSize: '2.5rem', color: '#ffffff', fontFamily: 'var(--font-heading)' }}>Women's Bridal & Formal Edit</h2>
            <p style={{ color: '#ffffff', maxWidth: '500px', margin: '12px 0 24px 0' }}>
              Enchanting bridal lehengas, pure chiffon maxis, and zardozi embroidered silks designed to captivate every room.
            </p>
            <Link to="/women" className="btn btn-gold btn-sm">Shop Women's Line</Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {womenProds.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: KIDS COLLECTION */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span style={{ color: 'var(--color-primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem' }}>
              LITTLE ROYALTY
            </span>
            <h2 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-heading)' }}>Kids' Festive & Wedding Line</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {kidsProds.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: FEATURED PRODUCTS */}
      <section style={{ padding: '80px 0', backgroundColor: '#ffffff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
              Curated Masterpieces
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {featuredProds.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: TRENDING PRODUCTS */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-heading)' }}>
              Trending This Season
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {trendingProds.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10: SEASONAL FESTIVE COLLECTION */}
      <section style={{ padding: '80px 0', backgroundColor: '#1C1917', color: '#ffffff' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}>
          <div>
            <span className="badge badge-gold" style={{ marginBottom: '16px' }}>LIMITED EDITION 2026</span>
            <h2 style={{ fontSize: '2.8rem', color: '#ffffff', fontFamily: 'var(--font-heading)', lineHeight: '1.15' }}>
              The Royal Velvet & Raw Silk Festive Edit
            </h2>
            <p style={{ color: '#D6D3D1', fontSize: '1rem', margin: '20px 0 32px 0', lineHeight: '1.6' }}>
              Hand-spun raw silk, heavy zardozi embroideries, and micro-velvet shawls. Crafted for the grandest wedding celebrations and formal galas.
            </p>
            <Link to="/shop?category=seasonal" className="btn btn-gold btn-lg">
              Explore Seasonal Collection
            </Link>
          </div>
          <div style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', border: '2px solid var(--color-accent-gold)' }}>
            <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80" alt="Festive Edit" style={{ width: '100%', height: '420px', objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      {/* SECTION 11: WHY CHOOSE SAGARM */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)' }}>
              {t('benefits.title')}
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '32px' }}>
            <div className="card" style={{ padding: '32px', textAlign: 'center' }}>
              <FiAward style={{ fontSize: '3rem', color: 'var(--color-primary)', marginBottom: '16px' }} />
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{t('benefits.handcrafted')}</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{t('benefits.handcrafted_desc')}</p>
            </div>

            <div className="card" style={{ padding: '32px', textAlign: 'center' }}>
              <FiTruck style={{ fontSize: '3rem', color: 'var(--color-primary)', marginBottom: '16px' }} />
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{t('benefits.fast_delivery')}</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{t('benefits.fast_delivery_desc')}</p>
            </div>

            <div className="card" style={{ padding: '32px', textAlign: 'center' }}>
              <FiRefreshCw style={{ fontSize: '3rem', color: 'var(--color-primary)', marginBottom: '16px' }} />
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{t('benefits.easy_returns')}</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{t('benefits.easy_returns_desc')}</p>
            </div>

            <div className="card" style={{ padding: '32px', textAlign: 'center' }}>
              <FiHeadphones style={{ fontSize: '3rem', color: 'var(--color-primary)', marginBottom: '16px' }} />
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{t('benefits.support')}</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{t('benefits.support_desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 12: CUSTOMER REVIEWS */}
      <section style={{ padding: '80px 0', backgroundColor: '#ffffff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{ color: 'var(--color-primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem' }}>
              CLIENT TESTIMONIALS
            </span>
            <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', marginTop: '8px' }}>
              What Our Royal Patrons Say
            </h2>
          </div>

          {safeReviews.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
              {safeReviews.map((rev) => (
                <div key={rev?.id} className="card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <RatingStars rating={rev?.rating ?? 5} showCount={false} />
                    <p style={{ fontStyle: 'italic', color: 'var(--color-text-main)', marginTop: '16px', fontSize: '0.95rem', lineHeight: '1.6' }}>
                      "{rev?.comment}"
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--color-border)' }}>
                    <img src={rev?.avatar} alt={rev?.customerName} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                      <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>{rev?.customerName}</h4>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{rev?.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--color-text-muted)' }}>
              <p style={{ fontSize: '0.95rem' }}>No customer reviews available yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 13: FASHION INSPIRATION */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--color-surface-soft)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-heading)', marginBottom: '16px' }}>
            Fashion & Royal Styling Inspiration
          </h2>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto 40px auto' }}>
            Learn how to pair traditional sherwanis with velvet waistcoats or select the perfect bridal jewelry for your big day.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div className="card" style={{ overflow: 'hidden' }}>
              <img src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80" alt="Groom Styling Guide" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <div style={{ padding: '20px', textAlign: 'left' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: 700 }}>GENTLEMEN GUIDE</span>
                <h3 style={{ fontSize: '1.1rem', marginTop: '4px' }}>How to Choose Your Dream Wedding Sherwani</h3>
              </div>
            </div>

            <div className="card" style={{ overflow: 'hidden' }}>
              <img src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80" alt="Bridal Couture Guide" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <div style={{ padding: '20px', textAlign: 'left' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: 700 }}>BRIDAL GUIDE</span>
                <h3 style={{ fontSize: '1.1rem', marginTop: '4px' }}>5 Secrets of Perfect Custom Lehenga Fitting</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 14: NEWSLETTER */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--color-primary)', color: '#ffffff' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '600px' }}>
          <h2 style={{ fontSize: '2.5rem', color: '#ffffff', fontFamily: 'var(--font-heading)', marginBottom: '12px' }}>
            Join The Sagarm VIP Club
          </h2>
          <p style={{ color: '#ffffff', fontSize: '1rem', marginBottom: '28px' }}>
            Receive private trunk show invitations, early access to new releases, and an exclusive 10% discount code.
          </p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="email"
              placeholder="Enter your email address..."
              style={{
                flex: 1,
                padding: '14px 20px',
                borderRadius: 'var(--radius-md)',
                border: 'none',
                outline: 'none',
                fontSize: '1rem'
              }}
            />
            <button className="btn btn-gold btn-md">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 15: INSTAGRAM GALLERY */}
      <section style={{ padding: '80px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary)', fontWeight: 700, marginBottom: '8px' }}>
            <FiInstagram style={{ fontSize: '1.2rem' }} /> @sagarm.shop
          </div>
          <h2 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-heading)', marginBottom: '32px' }}>
            Follow #SagarmRoyalty On Instagram
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
            {['1507679799987-c73779587ccf', '1583391733956-3750e0ff4e8b', '1518831959646-742c3a14ebf7', '1595777457583-95e059d581b8', '1617137984095-74e4e5e3613f'].map((imgId, idx) => (
              <div key={idx} style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', height: '200px' }}>
                <img src={`https://images.unsplash.com/photo-${imgId}?auto=format&fit=crop&w=400&q=80`} alt="Instagram Feed" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 16: STORE BENEFITS */}
      <section style={{ padding: '60px 0', backgroundColor: '#ffffff', borderTop: '1px solid var(--color-border)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', textAlign: 'center' }}>
          <div>
            <FiCheck style={{ fontSize: '1.5rem', color: 'var(--color-primary)' }} />
            <h4 style={{ fontSize: '1rem', marginTop: '8px' }}>Tailored to Measure</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Custom fittings available</p>
          </div>
          <div>
            <FiClock style={{ fontSize: '1.5rem', color: 'var(--color-primary)' }} />
            <h4 style={{ fontSize: '1rem', marginTop: '8px' }}>Priority Dispatch</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Fast 24hr order processing</p>
          </div>
          <div>
            <FiShield style={{ fontSize: '1.5rem', color: 'var(--color-primary)' }} />
            <h4 style={{ fontSize: '1rem', marginTop: '8px' }}>Insured Delivery</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>100% loss-protected shipping</p>
          </div>
        </div>
      </section>

      {/* SECTION 17: DELIVERY INFORMATION */}
      <section style={{ padding: '60px 0', backgroundColor: 'var(--color-surface-soft)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
              Nationwide Delivery Across Pakistan
            </h3>
            <p style={{ color: 'var(--color-text-muted)', marginTop: '12px', lineHeight: '1.6' }}>
              Delivery Available All Over Pakistan. All orders are packed in climate-sealed luxury garbing bags and dispatched via insured courier networks.
            </p>
          </div>
          <div className="card" style={{ padding: '24px', backgroundColor: '#ffffff' }}>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '12px' }}>Pakistan Delivery Timelines</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem' }}>
              <li><strong>Lahore, Karachi, Islamabad:</strong> 1 - 2 Business Days</li>
              <li><strong>Faisalabad, Multan, Sialkot, Rawalpindi:</strong> 2 - 3 Business Days</li>
              <li><strong>Peshawar, Quetta, Gujranwala:</strong> 2 - 4 Business Days</li>
              <li><strong>All Other Pakistan Cities & Towns:</strong> 3 - 4 Business Days</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 18: RETURN POLICY BANNER */}
      <section style={{ padding: '60px 0', backgroundColor: '#ffffff' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '700px' }}>
          <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)' }}>
            30-Day Effortless Return Policy
          </h3>
          <p style={{ color: 'var(--color-text-muted)', marginTop: '8px' }}>
            If your garment size is not ideal, exchange it effortlessly with free pickup service in major cities.
          </p>
        </div>
      </section>

      {/* SECTION 19: CONTACT BANNER */}
      <section style={{ padding: '60px 0', backgroundColor: '#1C1917', color: '#ffffff' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.8rem', color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
              Need Styling Advice For An Event?
            </h3>
            <p style={{ color: '#D6D3D1', fontSize: '0.95rem' }}>
              Speak with a dedicated Sagarm Master Stylist right now.
            </p>
          </div>
          <Link to="/contact" className="btn btn-gold btn-md">
            <FiPhoneCall /> Contact Concierge
          </Link>
        </div>
      </section>

      {/* SECTION 20: PREMIUM FOOTER is rendered in App layout */}
    </div>
  );
}
