import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLock, FiX, FiLogIn, FiUserPlus } from 'react-icons/fi';

export default function AuthRequiredModal({ isOpen, onClose, message }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogin = () => {
    onClose();
    navigate('/login');
  };

  const handleSignup = () => {
    onClose();
    navigate('/signup');
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
      onClick={onClose}
    >
      <div
        className="card fade-in"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '440px',
          padding: '32px 24px',
          textAlign: 'center',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
          position: 'relative'
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'var(--color-surface-soft)',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--color-text-muted)',
            transition: 'all 0.2s'
          }}
          aria-label="Close"
        >
          <FiX size={20} />
        </button>

        <div
          style={{
            width: '64px',
            height: '64px',
            margin: '0 auto 20px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-error-bg)',
            color: 'var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.8rem'
          }}
        >
          <FiLock />
        </div>

        <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '8px', color: 'var(--color-text-main)' }}>
          Authentication Required
        </h3>

        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginBottom: '28px', lineHeight: 1.5 }}>
          {message || 'Please login or create an account to continue shopping.'}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button
            className="btn btn-primary"
            onClick={handleLogin}
            style={{ width: '100%', padding: '14px', fontSize: '1rem' }}
          >
            <FiLogIn /> Login
          </button>

          <button
            className="btn btn-outline"
            onClick={handleSignup}
            style={{ width: '100%', padding: '14px', fontSize: '1rem' }}
          >
            <FiUserPlus /> Create Account
          </button>

          <button
            onClick={onClose}
            style={{
              marginTop: '8px',
              color: 'var(--color-text-muted)',
              fontSize: '0.875rem',
              textDecoration: 'underline',
              cursor: 'pointer'
            }}
          >
            Continue as Guest (Browse only)
          </button>
        </div>
      </div>
    </div>
  );
}
