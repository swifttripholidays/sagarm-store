import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FiUser, FiShoppingBag, FiHeart, FiMapPin, FiSettings, FiLogOut } from 'react-icons/fi';

export default function CustomerSidebar() {
  const { user, logout } = useAuth();

  const navItems = [
    { label: 'Overview', icon: FiUser, to: '/customer/dashboard' },
    { label: 'My Orders', icon: FiShoppingBag, to: '/customer/orders' },
    { label: 'Wishlist', icon: FiHeart, to: '/customer/wishlist' },
    { label: 'Saved Addresses', icon: FiMapPin, to: '/customer/addresses' },
    { label: 'Account Settings', icon: FiSettings, to: '/customer/settings' }
  ];

  return (
    <div className="card" style={{ padding: '24px', backgroundColor: '#ffffff' }}>
      {/* User Header */}
      <div style={{ textAlign: 'center', paddingBottom: '20px', borderBottom: '1px solid var(--color-border)', marginBottom: '20px' }}>
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-primary)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px auto',
            fontSize: '1.5rem',
            fontWeight: 700
          }}
        >
          {user?.fullName?.charAt(0) || 'S'}
        </div>
        <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-heading)' }}>{user?.fullName}</h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>{user?.email}</p>
        <span className="badge badge-gold" style={{ marginTop: '8px' }}>Sagarm Gold VIP Member</span>
      </div>

      {/* Nav List */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: isActive ? '#ffffff' : 'var(--color-text-main)',
                backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
                transition: 'all 0.2s'
              })}
            >
              <Icon style={{ fontSize: '1.1rem' }} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}

        <button
          onClick={logout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.9rem',
            fontWeight: 600,
            color: 'var(--color-error)',
            marginTop: '12px',
            textAlign: 'left'
          }}
        >
          <FiLogOut style={{ fontSize: '1.1rem' }} />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
}
