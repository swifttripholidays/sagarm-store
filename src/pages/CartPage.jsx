import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import Breadcrumb from '../components/Breadcrumb';
import EmptyState from '../components/EmptyState';
import { FiTrash2, FiShoppingBag, FiArrowRight, FiTag, FiX } from 'react-icons/fi';
import { formatPrice } from '../utils/formatPrice';

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    subtotal,
    discountAmount,
    taxAmount,
    shippingCost,
    grandTotal
  } = useCart();

  const [couponCodeInput, setCouponCodeInput] = useState('');
  const navigate = useNavigate();

  const handleCouponSubmit = (e) => {
    e.preventDefault();
    if (couponCodeInput.trim()) {
      const ok = applyCoupon(couponCodeInput.trim());
      if (ok) setCouponCodeInput('');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '80vh', paddingBottom: '80px' }}>
        <Breadcrumb items={[{ label: 'Shopping Cart' }]} />
        <div className="container">
          <EmptyState
            icon={FiShoppingBag}
            title="Your Cart is Empty"
            description="Explore Sagarm's handcrafted designer wear and build your dream wardrobe."
            actionText="Browse Collections"
            actionLink="/shop"
          />
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '80vh', paddingBottom: '80px' }}>
      <Breadcrumb items={[{ label: 'Shopping Cart' }]} />

      <div className="container">
        <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', marginBottom: '32px' }}>
          Your Shopping Cart ({cartItems.length} items)
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '32px' }}>
          {/* Left Table */}
          <div>
            <div className="card" style={{ padding: '24px', backgroundColor: '#ffffff', marginBottom: '20px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--color-border)', textAlign: 'left' }}>
                    <th style={{ paddingBottom: '12px', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Product</th>
                    <th style={{ paddingBottom: '12px', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Price</th>
                    <th style={{ paddingBottom: '12px', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Quantity</th>
                    <th style={{ paddingBottom: '12px', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Total</th>
                    <th style={{ paddingBottom: '12px' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--color-card-border)' }}>
                      <td style={{ padding: '16px 0', display: 'flex', gap: '16px', alignItems: 'center' }}>
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          style={{ width: '70px', height: '90px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
                        />
                        <div>
                          <Link to={`/product/${item.product.id}`} style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>
                            {item.product.name}
                          </Link>
                          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                            Color: {item.color} | Size: {item.size}
                          </p>
                        </div>
                      </td>

                      <td style={{ padding: '16px 0' }} className="price">
                        {formatPrice(item.product.price)}
                      </td>

                      <td style={{ padding: '16px 0' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }}>
                          <button onClick={() => updateQuantity(idx, -1)} style={{ padding: '4px 10px', fontWeight: 700 }}>-</button>
                          <span className="num-font" style={{ padding: '4px 10px', fontSize: '0.9rem' }}>{item.quantity}</span>
                          <button onClick={() => updateQuantity(idx, 1)} style={{ padding: '4px 10px', fontWeight: 700 }}>+</button>
                        </div>
                      </td>

                      <td style={{ padding: '16px 0', fontWeight: 700, color: 'var(--color-primary)' }} className="price">
                        {formatPrice(item.product.price * item.quantity)}
                      </td>

                      <td style={{ padding: '16px 0', textAlign: 'right' }}>
                        <button onClick={() => removeFromCart(idx)} style={{ color: 'var(--color-error)' }} title="Remove">
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px' }}>
                <Link to="/shop" className="btn btn-outline btn-sm">
                  Continue Shopping
                </Link>
                <button onClick={clearCart} style={{ color: 'var(--color-error)', fontSize: '0.875rem', fontWeight: 600 }}>
                  Clear Entire Cart
                </button>
              </div>
            </div>
          </div>

          {/* Right Order Summary & Coupon */}
          <div>
            {/* Coupon Code Card */}
            <div className="card" style={{ padding: '24px', backgroundColor: '#ffffff', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-heading)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FiTag style={{ color: 'var(--color-primary)' }} /> Have a Coupon?
              </h3>

              {appliedCoupon ? (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', backgroundColor: 'var(--color-success-bg)', borderRadius: 'var(--radius-md)' }}>
                  <div>
                    <span style={{ fontWeight: 700, color: 'var(--color-success)' }}>{appliedCoupon.code}</span>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{appliedCoupon.discountPercent}% Discount Applied</p>
                  </div>
                  <button onClick={removeCoupon} style={{ color: 'var(--color-error)' }}>
                    <FiX />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleCouponSubmit} style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    placeholder="e.g. SAGARM10 or GOLDVIP"
                    className="form-input"
                    value={couponCodeInput}
                    onChange={(e) => setCouponCodeInput(e.target.value)}
                    style={{ textTransform: 'uppercase' }}
                  />
                  <button type="submit" className="btn btn-primary btn-sm">
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Order Summary Box */}
            <div className="card" style={{ padding: '24px', backgroundColor: '#ffffff' }}>
              <h3 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-heading)', borderBottom: '2px solid var(--color-primary)', paddingBottom: '10px', marginBottom: '20px' }}>
                Order Summary
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.95rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Subtotal</span>
                  <span className="price" style={{ fontWeight: 600 }}>{formatPrice(subtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-success)' }}>
                    <span>Coupon Discount</span>
                    <span className="price" style={{ fontWeight: 600 }}>-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Estimated Sales Tax (GST)</span>
                  <span className="price" style={{ fontWeight: 600 }}>{formatPrice(taxAmount)}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Nationwide Delivery</span>
                  <span style={{ fontWeight: 600 }}>{shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}</span>
                </div>

                <div style={{ borderTop: '2px solid var(--color-border)', paddingTop: '16px', marginTop: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 800 }}>
                  <span>Total</span>
                  <span className="price" style={{ color: 'var(--color-primary)' }}>{formatPrice(grandTotal)}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="btn btn-primary btn-lg"
                style={{ width: '100%', marginTop: '24px' }}
              >
                Proceed to Checkout <FiArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
