import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import UserAvatar from './UserAvatar';
import {
  FiSearch,
  FiHeart,
  FiShoppingBag,
  FiUser,
  FiMenu,
  FiX,
  FiGlobe,
  FiPhoneCall,
  FiBell,
  FiLogOut,
  FiShield,
  FiCheckCircle,
  FiClock,
  FiAlertCircle
} from 'react-icons/fi';
import MegaMenu from './MegaMenu';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { user, isAuthenticated, isAdmin, logout, orders, requireAuth } = useAuth();
  const { itemCount, openCart } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeMegaCategory, setActiveMegaCategory] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // User's recent notifications based on orders
  const safeOrders = Array.isArray(orders) ? orders : [];
  const safeWishlist = Array.isArray(wishlist) ? wishlist : [];
  const userOrders = safeOrders.filter((o) => o?.email === user?.email || !user);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on page route change
  useEffect(() => {
    setActiveMegaCategory(null);
    setIsMobileMenuOpen(false);
    setShowNotifications(false);
  }, [location.pathname]);

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    document.documentElement.dir = lang === 'ur' ? 'rtl' : 'ltr';
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    requireAuth(() => navigate('/customer/wishlist'), 'Please login or create an account to view your Wishlist.');
  };

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 1000, width: '100%' }}>
      {/* 1. Top Announcement Bar */}
      <div
        style={{
          backgroundColor: '#1C1917',
          color: '#ffffff',
          fontSize: '0.8rem',
          padding: '6px 0',
          borderBottom: '1px solid var(--color-primary)'
        }}
      >
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>OFFICIAL BRAND</span>
            <span style={{ fontSize: '0.75rem' }}>Worldwide Express Delivery | Free Nationwide Shipping</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem' }}>
              <FiPhoneCall style={{ color: 'var(--color-accent-gold)' }} />
              <span>VIP Concierge: +92 300 SAGARM</span>
            </div>

            {/* Language Switcher */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem' }}>
              <FiGlobe style={{ color: 'var(--color-accent-orange)' }} />
              <button
                type="button"
                onClick={() => handleLanguageChange('en')}
                style={{
                  color: i18n.language === 'en' ? 'var(--color-accent-gold)' : '#A8A29E',
                  fontWeight: i18n.language === 'en' ? '700' : '400',
                  cursor: 'pointer'
                }}
              >
                EN
              </button>
              <span>|</span>
              <button
                type="button"
                onClick={() => handleLanguageChange('ur')}
                style={{
                  color: i18n.language === 'ur' ? 'var(--color-accent-gold)' : '#A8A29E',
                  fontWeight: i18n.language === 'ur' ? '700' : '400',
                  cursor: 'pointer'
                }}
              >
                اردو
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Navbar Container */}
      <nav
        style={{
          backgroundColor: '#ffffff',
          boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.08)' : 'var(--color-border) 0 1px 0',
          transition: 'box-shadow 0.3s ease'
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px' }}>
          {/* Logo Placeholder / Brand Banner */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-primary)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: '1.4rem',
                border: '2px solid var(--color-accent-gold)'
              }}
            >
              S
            </div>
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.65rem',
                  fontWeight: 800,
                  letterSpacing: '2px',
                  color: 'var(--color-primary)',
                  display: 'block',
                  lineHeight: '1'
                }}
              >
                SAGARM
              </span>
              <span style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                sagarm.shop
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <ul
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              listStyle: 'none',
              height: '100%'
            }}
            className="desktop-only"
          >
            <li>
              <Link to="/" style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-main)' }}>
                {t('nav.home')}
              </Link>
            </li>

            <li
              onMouseEnter={() => setActiveMegaCategory('men')}
              style={{ height: '100%', display: 'flex', alignItems: 'center' }}
            >
              <Link to="/shop?category=men" style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-main)' }}>
                {t('nav.men')}
              </Link>
            </li>

            <li
              onMouseEnter={() => setActiveMegaCategory('women')}
              style={{ height: '100%', display: 'flex', alignItems: 'center' }}
            >
              <Link to="/shop?category=women" style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-main)' }}>
                {t('nav.women')}
              </Link>
            </li>

            <li
              onMouseEnter={() => setActiveMegaCategory('kids')}
              style={{ height: '100%', display: 'flex', alignItems: 'center' }}
            >
              <Link to="/shop?category=kids" style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-main)' }}>
                {t('nav.kids')}
              </Link>
            </li>

            <li>
              <Link to="/shop?sort=newest" style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-main)' }}>
                {t('nav.new_arrivals')}
              </Link>
            </li>

            <li>
              <Link to="/shop?onSale=true" style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-primary)' }}>
                {t('nav.sale')}
              </Link>
            </li>

            <li>
              <Link to="/about" style={{ fontWeight: 500, fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                {t('nav.about')}
              </Link>
            </li>

            <li>
              <Link to="/faq" style={{ fontWeight: 500, fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                {t('nav.faq')}
              </Link>
            </li>
          </ul>

          {/* Right Action Icons & Search */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>

            {/* Search Input Box */}
            <form onSubmit={handleSearchSubmit} style={{ position: 'relative' }} className="desktop-only">
              <input
                type="text"
                placeholder={t('nav.search_placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  padding: '8px 36px 8px 14px',
                  borderRadius: 'var(--radius-full)',
                  border: '1.5px solid var(--color-border)',
                  fontSize: '0.85rem',
                  width: '200px',
                  outline: 'none',
                  backgroundColor: 'var(--color-bg)'
                }}
              />
              <button
                type="submit"
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--color-text-muted)'
                }}
              >
                <FiSearch />
              </button>
            </form>

            {/* Wishlist Link */}
            <button
              onClick={handleWishlistClick}
              style={{ position: 'relative', fontSize: '1.25rem', color: 'var(--color-text-main)', cursor: 'pointer' }}
              title={t('nav.wishlist')}
            >
              <FiHeart />
              {safeWishlist.length > 0 && (
                <span
                  className="num-font"
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-8px',
                    backgroundColor: 'var(--color-primary)',
                    color: '#ffffff',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {safeWishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={openCart}
              style={{ position: 'relative', fontSize: '1.25rem', color: 'var(--color-text-main)', cursor: 'pointer' }}
              title={t('nav.cart')}
            >
              <FiShoppingBag />
              {itemCount > 0 && (
                <span
                  className="num-font"
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-8px',
                    backgroundColor: 'var(--color-accent-orange)',
                    color: '#ffffff',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {itemCount}
                </span>
              )}
            </button>

            {/* REQUIREMENT 9: Logged In vs Logged Out Navigation Controls */}
            {isAuthenticated ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', position: 'relative' }}>

                {/* Notifications Icon & Dropdown */}
                <div style={{ position: 'relative' }}>
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    style={{ position: 'relative', fontSize: '1.2rem', color: 'var(--color-text-main)', cursor: 'pointer' }}
                    title="Order Status Notifications"
                  >
                    <FiBell />
                    {userOrders.length > 0 && (
                      <span
                        style={{
                          position: 'absolute',
                          top: '-4px',
                          right: '-4px',
                          backgroundColor: 'var(--color-accent-gold)',
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%'
                        }}
                      />
                    )}
                  </button>

                  {/* Notifications Popup */}
                  {showNotifications && (
                    <div
                      className="card fade-in"
                      style={{
                        position: 'absolute',
                        right: 0,
                        top: '40px',
                        width: '320px',
                        backgroundColor: '#ffffff',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                        zIndex: 1100,
                        padding: '16px'
                      }}
                    >
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>Order Updates</span>
                        <FiBell style={{ color: 'var(--color-primary)' }} />
                      </h4>

                      {userOrders.length === 0 ? (
                        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textAlign: 'center', padding: '12px 0' }}>
                          No recent order notifications.
                        </p>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '240px', overflowY: 'auto' }}>
                          {userOrders.map((ord) => (
                            <Link
                              key={ord.id}
                              to={isAdmin ? '/admin/payments' : `/customer/orders/${ord.id}`}
                              style={{
                                padding: '10px',
                                backgroundColor: 'var(--color-surface-soft)',
                                borderRadius: '8px',
                                fontSize: '0.8rem',
                                display: 'block'
                              }}
                            >
                              <div style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
                                Order #{ord.id}
                              </div>
                              <div style={{ color: 'var(--color-text-main)', marginTop: '2px' }}>
                                Status: <strong>{ord.status}</strong>
                              </div>
                              <div style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', marginTop: '2px' }}>
                                {new Date(ord.date).toLocaleDateString()}
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Profile Circle Avatar */}
                <Link
                  to={isAdmin ? '/admin' : '/customer/dashboard'}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                  title={user?.fullName || 'My Profile'}
                >
                  <UserAvatar user={user} size="sm" />
                </Link>

                {/* Logout Button */}
                <button
                  onClick={logout}
                  className="btn btn-outline btn-sm desktop-only"
                  style={{ padding: '6px 10px', fontSize: '0.8rem', color: 'var(--color-primary)', borderColor: 'var(--color-primary)' }}
                  title="Logout"
                >
                  <FiLogOut /> Logout
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Link to="/login" className="btn btn-primary btn-sm" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                  <FiUser /> {t('nav.login')}
                </Link>

                <Link to="/signup" className="btn btn-outline btn-sm desktop-only" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                  {t('nav.signup')}
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="mobile-only"
              style={{ fontSize: '1.5rem', color: 'var(--color-text-main)', cursor: 'pointer' }}
            >
              {isMobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        {/* Mega Menu Overlay */}
        <AnimatePresence>
          {activeMegaCategory && (
            <MegaMenu activeCategory={activeMegaCategory} onClose={() => setActiveMegaCategory(null)} />
          )}
        </AnimatePresence>
      </nav>

      {/* Responsive Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              backgroundColor: '#ffffff',
              borderBottom: '2px solid var(--color-primary)',
              padding: '20px',
              overflow: 'hidden'
            }}
          >
            <form onSubmit={handleSearchSubmit} style={{ marginBottom: '16px' }}>
              <input
                type="text"
                placeholder={t('nav.search_placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
              />
            </form>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link to="/" style={{ fontWeight: 600 }}>
                {t('nav.home')}
              </Link>
              <Link to="/shop?category=men" style={{ fontWeight: 600 }}>
                {t('nav.men')}
              </Link>
              <Link to="/shop?category=women" style={{ fontWeight: 600 }}>
                {t('nav.women')}
              </Link>
              <Link to="/shop?category=kids" style={{ fontWeight: 600 }}>
                {t('nav.kids')}
              </Link>
              <Link to="/shop?sort=newest" style={{ fontWeight: 600 }}>
                {t('nav.new_arrivals')}
              </Link>
              <Link to="/shop?onSale=true" style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
                {t('nav.sale')}
              </Link>
              <Link to="/about" style={{ color: 'var(--color-text-muted)' }}>
                {t('nav.about')}
              </Link>
              <Link to="/contact" style={{ color: 'var(--color-text-muted)' }}>
                {t('nav.contact')}
              </Link>
              <Link to="/faq" style={{ color: 'var(--color-text-muted)' }}>
                {t('nav.faq')}
              </Link>

              {isAuthenticated ? (
                <>
                  <Link to="/customer/dashboard" style={{ fontWeight: 700, color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <UserAvatar user={user} size="sm" /> My Profile
                  </Link>
                  <button onClick={logout} style={{ color: 'var(--color-error)', fontWeight: 600, textAlign: 'left' }}>
                    Logout
                  </button>
                </>
              ) : (
                <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                  <Link to="/login" className="btn btn-primary btn-sm" style={{ flex: 1 }}>
                    Login
                  </Link>
                  <Link to="/signup" className="btn btn-outline btn-sm" style={{ flex: 1 }}>
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 992px) {
          .desktop-only { display: none !important; }
        }
        @media (min-width: 993px) {
          .mobile-only { display: none !important; }
        }
      `}</style>
    </header>
  );
}
