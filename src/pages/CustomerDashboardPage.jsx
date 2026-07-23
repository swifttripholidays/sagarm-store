import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useWishlist } from '../contexts/WishlistContext';
import CustomerSidebar from '../components/CustomerSidebar';
import Breadcrumb from '../components/Breadcrumb';
import UserAvatar from '../components/UserAvatar';
import { formatPrice } from '../utils/formatPrice';
import { FiShoppingBag, FiHeart, FiMapPin, FiCheckCircle, FiClock, FiArrowRight } from 'react-icons/fi';

export default function CustomerDashboardPage() {
  const { user, addresses, orders } = useAuth();
  const { wishlist } = useWishlist();

  const userOrders = orders?.filter((o) => !user?.email || o.email === user?.email || true) || [];

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', paddingBottom: '80px', minHeight: '80vh' }}>
      <Breadcrumb items={[{ label: 'My Account' }, { label: 'Dashboard' }]} />

      <div className="container" style={{ marginTop: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '32px' }}>
          <div style={{ maxWidth: '280px' }}>
            <CustomerSidebar />
          </div>

          <div style={{ flex: 1 }}>
            {/* Greeting Header with User Avatar Requirement 3 */}
            <div className="card" style={{ padding: '28px', backgroundColor: '#ffffff', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
              <UserAvatar user={user} size="xl" />
              <div>
                <h1 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
                  Hello, {user?.fullName || 'Valued Customer'}!
                </h1>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginTop: '4px' }}>
                  Welcome to your Sagarm Account Hub. Track your orders, manage saved addresses, and view your VIP rewards.
                </p>
              </div>
            </div>

            {/* Quick Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '24px' }}>
              <div className="card" style={{ padding: '20px', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--color-surface-soft)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>
                  <FiShoppingBag />
                </div>
                <div>
                  <span className="num-font" style={{ fontSize: '1.5rem', fontWeight: 800 }}>{userOrders.length}</span>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Total Orders</p>
                </div>
              </div>

              <div className="card" style={{ padding: '20px', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--color-surface-soft)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>
                  <FiHeart />
                </div>
                <div>
                  <span className="num-font" style={{ fontSize: '1.5rem', fontWeight: 800 }}>{wishlist.length}</span>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Saved Wishlist</p>
                </div>
              </div>

              <div className="card" style={{ padding: '20px', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--color-surface-soft)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>
                  <FiMapPin />
                </div>
                <div>
                  <span className="num-font" style={{ fontSize: '1.5rem', fontWeight: 800 }}>{addresses.length}</span>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Saved Addresses</p>
                </div>
              </div>
            </div>

            {/* Recent Orders List */}
            <div className="card" style={{ padding: '28px', backgroundColor: '#ffffff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)' }}>Recent Orders</h3>
                <Link to="/customer/orders" style={{ fontSize: '0.85rem', color: 'var(--color-primary)', fontWeight: 600 }}>
                  View All Orders &rarr;
                </Link>
              </div>

              {userOrders.length === 0 ? (
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>No recent orders found.</p>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
                        <th style={{ padding: '10px' }}>Order ID</th>
                        <th style={{ padding: '10px' }}>Date</th>
                        <th style={{ padding: '10px' }}>Status</th>
                        <th style={{ padding: '10px' }}>Total</th>
                        <th style={{ padding: '10px' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userOrders.slice(0, 5).map((ord) => (
                        <tr key={ord.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                          <td style={{ padding: '12px', fontWeight: 700, fontFamily: 'var(--font-number)' }}>#{ord.id}</td>
                          <td style={{ padding: '12px' }}>{new Date(ord.date).toLocaleDateString()}</td>
                          <td style={{ padding: '12px' }}>
                            <span
                              className="badge"
                              style={{
                                backgroundColor:
                                  ord.status === 'Confirmed' || ord.status === 'Delivered'
                                    ? 'var(--color-success-bg)'
                                    : 'var(--color-warning-bg)',
                                color:
                                  ord.status === 'Confirmed' || ord.status === 'Delivered'
                                    ? 'var(--color-success)'
                                    : 'var(--color-warning)',
                                border: '1px solid currentColor'
                              }}
                            >
                              {ord.status}
                            </span>
                          </td>
                          <td style={{ padding: '12px' }} className="price">{formatPrice(ord.total)}</td>
                          <td style={{ padding: '12px' }}>
                            <Link to={`/customer/orders/${ord.id}`} style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
                              Track Order
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
