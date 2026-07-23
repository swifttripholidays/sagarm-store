import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  FiGrid,
  FiBox,
  FiPlusCircle,
  FiFolder,
  FiShoppingBag,
  FiUsers,
  FiTag,
  FiStar,
  FiBarChart2,
  FiMail,
  FiSettings,
  FiLogOut,
  FiCheckSquare
} from 'react-icons/fi';

export default function AdminSidebar() {
  const { logout, orders } = useAuth();

  const pendingPaymentsCount = orders?.filter((o) => o.status === 'Pending Verification').length || 0;

  const menuGroups = [
    {
      title: 'Core Store Management',
      items: [
        { label: 'Admin Dashboard', icon: FiGrid, to: '/admin' },
        { label: 'All Products', icon: FiBox, to: '/admin/products' },
        { label: 'Add New Product', icon: FiPlusCircle, to: '/admin/products/add' },
        { label: 'Categories', icon: FiFolder, to: '/admin/categories' }
      ]
    },
    {
      title: 'Sales & Verifications',
      items: [
        { label: 'Payment Verifications', icon: FiCheckSquare, to: '/admin/payments', badge: pendingPaymentsCount },
        { label: 'Orders & Fulfillment', icon: FiShoppingBag, to: '/admin/orders' },
        { label: 'Registered Customers', icon: FiUsers, to: '/admin/customers' },
        { label: 'Discount Coupons', icon: FiTag, to: '/admin/coupons' },
        { label: 'Reviews Moderation', icon: FiStar, to: '/admin/reviews' }
      ]
    },
    {
      title: 'Insights & System',
      items: [
        { label: 'Sales Analytics', icon: FiBarChart2, to: '/admin/analytics' },
        { label: 'Customer Messages', icon: FiMail, to: '/admin/messages' },
        { label: 'Store Settings', icon: FiSettings, to: '/admin/settings' }
      ]
    }
  ];

  return (
    <div
      style={{
        width: '260px',
        backgroundColor: '#1C1917',
        color: '#ffffff',
        minHeight: '100vh',
        padding: '24px 16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexShrink: 0
      }}
    >
      <div>
        {/* Brand Admin Title */}
        <div style={{ paddingBottom: '20px', borderBottom: '1px solid #2C2825', marginBottom: '24px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-accent-gold)', fontSize: '1.4rem' }}>
            SAGARM ADMIN
          </h2>
          <span style={{ fontSize: '0.75rem', color: '#A8A29E', letterSpacing: '1px' }}>sagarm.shop Control Center</span>
        </div>

        {/* Navigation Sections */}
        {menuGroups.map((group, idx) => (
          <div key={idx} style={{ marginBottom: '20px' }}>
            <span
              style={{
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                color: 'var(--color-accent-orange)',
                fontWeight: 700,
                display: 'block',
                marginBottom: '8px',
                paddingLeft: '8px'
              }}
            >
              {group.title}
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/admin'}
                    style={({ isActive }) => ({
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: isActive ? '#ffffff' : '#D6D3D1',
                      backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
                      transition: 'all 0.2s'
                    })}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Icon style={{ fontSize: '1rem' }} />
                      <span>{item.label}</span>
                    </div>

                    {item.badge > 0 && (
                      <span
                        style={{
                          backgroundColor: 'var(--color-accent-gold)',
                          color: '#1C1917',
                          fontSize: '0.75rem',
                          fontWeight: 800,
                          padding: '2px 8px',
                          borderRadius: '9999px',
                          fontFamily: 'var(--font-number)'
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={logout}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '12px',
          borderRadius: 'var(--radius-md)',
          fontSize: '0.875rem',
          fontWeight: 600,
          color: '#FCA5A5',
          backgroundColor: '#2C1515',
          border: '1px solid #7F1D1D',
          cursor: 'pointer'
        }}
      >
        <FiLogOut />
        <span>Exit Admin</span>
      </button>
    </div>
  );
}
