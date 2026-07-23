import React, { useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import Breadcrumb from '../components/Breadcrumb';
import { COUPONS } from '../data/coupons';
import { FiPlus, FiTag, FiTrash2 } from 'react-icons/fi';
import { formatPrice } from '../utils/formatPrice';

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState(COUPONS);
  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState('15');

  const handleAddCoupon = (e) => {
    e.preventDefault();
    if (!code.trim()) return;
    const newC = {
      id: `c-${Date.now()}`,
      code: code.toUpperCase().trim(),
      discountPercent: Number(discount),
      minAmount: 5000,
      active: true
    };
    setCoupons([...coupons, newC]);
    setCode('');
  };

  const deleteCoupon = (id) => {
    setCoupons(coupons.filter((c) => c.id !== id));
  };

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', paddingBottom: '80px' }}>
      <Breadcrumb items={[{ label: 'Admin', link: '/admin' }, { label: 'Discount Coupons' }]} />

      <div className="container" style={{ marginTop: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '32px' }}>
          <AdminSidebar />

          <div className="card" style={{ padding: '28px', backgroundColor: '#ffffff' }}>
            <h1 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)', borderBottom: '2px solid var(--color-primary)', paddingBottom: '10px', marginBottom: '24px' }}>
              Promotional Coupons & Vouchers
            </h1>

            <form onSubmit={handleAddCoupon} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '12px', marginBottom: '32px' }}>
              <input
                type="text"
                className="form-input"
                placeholder="Coupon Code (e.g. SAGARM25)"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                style={{ textTransform: 'uppercase' }}
              />
              <input
                type="number"
                className="form-input"
                placeholder="Discount %"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
              <button type="submit" className="btn btn-primary btn-sm">
                <FiPlus /> Create Coupon
              </button>
            </form>

            {coupons.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '48px 20px', color: 'var(--color-text-muted)' }}>
                <FiTag size={48} style={{ margin: '0 auto 16px', opacity: 0.4 }} />
                <h3>No Active Coupons</h3>
                <p style={{ marginTop: '8px', fontSize: '0.9rem' }}>Create a new voucher code above for customer discounts.</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
                {coupons.map((c) => (
                  <div key={c.id} style={{ padding: '20px', border: '1px dashed var(--color-primary)', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--color-surface-soft)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
                        <FiTag /> {c.code}
                      </h3>
                      <p style={{ fontSize: '0.85rem', fontWeight: 700, marginTop: '4px' }}>{c.discountPercent}% OFF</p>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Min Spend: {formatPrice(c.minAmount)}</span>
                    </div>
                    <button onClick={() => deleteCoupon(c.id)} style={{ color: 'var(--color-error)' }}>
                      <FiTrash2 />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
