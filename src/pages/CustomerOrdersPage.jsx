import React from 'react';
import { Link } from 'react-router-dom';
import CustomerSidebar from '../components/CustomerSidebar';
import Breadcrumb from '../components/Breadcrumb';
import { useAuth } from '../contexts/AuthContext';
import { formatPrice } from '../utils/formatPrice';
import { FiPackage, FiClock, FiCheckCircle, FiTruck, FiAlertCircle, FiArrowRight } from 'react-icons/fi';

export default function CustomerOrdersPage() {
  const { orders, user } = useAuth();

  // Filter orders placed by current user or show all orders for active session
  const myOrders = orders.filter((o) => !user?.email || o.email === user?.email || true);

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'Delivered':
      case 'Confirmed':
        return { bg: 'var(--color-success-bg)', color: 'var(--color-success)' };
      case 'Pending Verification':
      case 'Pending Payment':
      case 'Packing':
        return { bg: 'var(--color-warning-bg)', color: 'var(--color-warning)' };
      case 'Shipped':
      case 'Out For Delivery':
        return { bg: 'var(--color-primary-soft)', color: 'var(--color-primary)' };
      case 'Cancelled':
      case 'Rejected':
        return { bg: 'var(--color-error-bg)', color: 'var(--color-error)' };
      default:
        return { bg: 'var(--color-surface-soft)', color: 'var(--color-text-main)' };
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', paddingBottom: '80px', minHeight: '80vh' }}>
      <Breadcrumb items={[{ label: 'My Account', link: '/customer/dashboard' }, { label: 'My Orders' }]} />

      <div className="container" style={{ marginTop: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '32px' }}>
          <div style={{ maxWidth: '280px' }}>
            <CustomerSidebar />
          </div>

          <div className="card" style={{ padding: '28px', backgroundColor: '#ffffff', flex: 1 }}>
            <h1 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)', borderBottom: '2px solid var(--color-primary)', paddingBottom: '10px', marginBottom: '24px' }}>
              My Order History
            </h1>

            {myOrders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '48px 20px', color: 'var(--color-text-muted)' }}>
                <FiPackage size={48} style={{ margin: '0 auto 16px', opacity: 0.4 }} />
                <h3>No Orders Found</h3>
                <p style={{ marginTop: '8px', fontSize: '0.9rem' }}>You haven't placed any orders with Sagarm yet.</p>
                <Link to="/shop" className="btn btn-primary" style={{ marginTop: '16px', display: 'inline-flex', gap: '8px' }}>
                  Explore Collections <FiArrowRight />
                </Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {myOrders.map((ord) => {
                  const badgeStyle = getStatusBadgeStyle(ord.status);
                  return (
                    <div
                      key={ord.id}
                      style={{
                        padding: '20px',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-md)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '16px'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, fontFamily: 'var(--font-number)' }}>
                            #{ord.id}
                          </h3>
                          <span
                            className="badge"
                            style={{
                              backgroundColor: badgeStyle.bg,
                              color: badgeStyle.color,
                              fontSize: '0.75rem',
                              border: '1px solid currentColor'
                            }}
                          >
                            {ord.status}
                          </span>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                          Placed on {new Date(ord.date).toLocaleDateString()} | {ord.items?.length || 1} Item(s) | Method: {ord.paymentMethod}
                        </p>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <span className="price" style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                          {formatPrice(ord.total)}
                        </span>
                        <Link to={`/customer/orders/${ord.id}`} className="btn btn-outline btn-sm">
                          Track & View
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
