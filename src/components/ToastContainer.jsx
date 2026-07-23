import React from 'react';
import { useToast } from '../contexts/ToastContext';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <FiCheckCircle style={{ color: 'var(--color-success)', fontSize: '1.25rem' }} />;
      case 'error':
        return <FiAlertCircle style={{ color: 'var(--color-error)', fontSize: '1.25rem' }} />;
      default:
        return <FiInfo style={{ color: 'var(--color-accent-orange)', fontSize: '1.25rem' }} />;
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        pointerEvents: 'none'
      }}
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.9 }}
            style={{
              pointerEvents: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: '#ffffff',
              color: 'var(--color-text-main)',
              padding: '14px 20px',
              borderRadius: 'var(--radius-lg)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
              borderLeft: `4px solid ${
                toast.type === 'success'
                  ? 'var(--color-success)'
                  : toast.type === 'error'
                  ? 'var(--color-error)'
                  : 'var(--color-accent-gold)'
              }`,
              minWidth: '280px',
              maxWidth: '400px'
            }}
          >
            {getIcon(toast.type)}
            <span style={{ fontSize: '0.9rem', fontWeight: 500, flex: 1 }}>{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              style={{ color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center' }}
            >
              <FiX />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
