import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { FiX, FiTrash2, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { formatPrice } from '../utils/formatPrice';

export default function CartDrawer() {
  const { isCartOpen, closeCart, cartItems, removeFromCart, updateQuantity, subtotal, grandTotal } = useCart();
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: '#000000',
              zIndex: 1000
            }}
          />

          {/* Drawer Slide */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              maxWidth: '420px',
              backgroundColor: '#ffffff',
              boxShadow: '-10px 0 30px rgba(0,0,0,0.2)',
              zIndex: 1001,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '20px 24px',
                borderBottom: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'var(--color-surface-soft)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FiShoppingBag style={{ fontSize: '1.25rem', color: 'var(--color-primary)' }} />
                <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)' }}>Your Shopping Cart</h3>
              </div>
              <button onClick={closeCart} style={{ fontSize: '1.25rem', color: 'var(--color-text-main)' }}>
                <FiX />
              </button>
            </div>

            {/* Cart Items List */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
              {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                  <FiShoppingBag style={{ fontSize: '3rem', color: 'var(--color-border)', marginBottom: '16px' }} />
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Your Cart is Empty</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '24px' }}>
                    Explore Sagarm's exclusive luxury collections.
                  </p>
                  <button onClick={closeCart} className="btn btn-primary btn-sm">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {cartItems.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        gap: '14px',
                        paddingBottom: '16px',
                        borderBottom: '1px solid var(--color-card-border)'
                      }}
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        style={{ width: '70px', height: '90px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
                      />
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-text-main)' }}>
                          {item.product.name}
                        </h4>
                        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                          Color: {item.color} | Size: {item.size}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }}>
                            <button
                              onClick={() => updateQuantity(idx, -1)}
                              style={{ padding: '2px 8px', fontWeight: 700 }}
                            >
                              -
                            </button>
                            <span className="num-font" style={{ padding: '2px 8px', fontSize: '0.85rem' }}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(idx, 1)}
                              style={{ padding: '2px 8px', fontWeight: 700 }}
                            >
                              +
                            </button>
                          </div>
                          <span className="price" style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(idx)}
                        style={{ color: 'var(--color-text-light)', alignSelf: 'flex-start' }}
                        title="Remove"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Summary */}
            {cartItems.length > 0 && (
              <div
                style={{
                  padding: '20px 24px',
                  borderTop: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-bg)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Subtotal</span>
                  <span className="price" style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-main)' }}>
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', marginBottom: '16px' }}>
                  Taxes and shipping calculated at checkout.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <button
                    onClick={() => {
                      closeCart();
                      navigate('/cart');
                    }}
                    className="btn btn-outline btn-sm"
                  >
                    View Cart
                  </button>
                  <button
                    onClick={() => {
                      closeCart();
                      navigate('/checkout');
                    }}
                    className="btn btn-primary btn-sm"
                  >
                    Checkout <FiArrowRight />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
