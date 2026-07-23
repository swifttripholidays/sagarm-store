import React from 'react';
import AdminSidebar from '../components/AdminSidebar';
import Breadcrumb from '../components/Breadcrumb';
import { useAuth } from '../contexts/AuthContext';
import { formatPrice } from '../utils/formatPrice';
import { FiPackage } from 'react-icons/fi';

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useAuth();

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', paddingBottom: '80px' }}>
      <Breadcrumb items={[{ label: 'Admin', link: '/admin' }, { label: 'Orders Dispatch' }]} />

      <div className="container" style={{ marginTop: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '32px' }}>
          <AdminSidebar />

          <div className="card" style={{ padding: '28px', backgroundColor: '#ffffff' }}>
            <h1 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)', borderBottom: '2px solid var(--color-primary)', paddingBottom: '10px', marginBottom: '24px' }}>
              Customer Orders Management
            </h1>

            {orders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '48px 20px', color: 'var(--color-text-muted)' }}>
                <FiPackage size={48} style={{ margin: '0 auto 16px', opacity: 0.4 }} />
                <h3>No Orders Found</h3>
                <p style={{ marginTop: '8px', fontSize: '0.9rem' }}>No customer orders have been placed yet.</p>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
                      <th style={{ padding: '10px' }}>Order ID</th>
                      <th style={{ padding: '10px' }}>Customer</th>
                      <th style={{ padding: '10px' }}>Date</th>
                      <th style={{ padding: '10px' }}>Amount</th>
                      <th style={{ padding: '10px' }}>Dispatch Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((ord) => (
                      <tr key={ord.firestoreId || ord.id} style={{ borderBottom: '1px solid var(--color-card-border)' }}>
                        <td style={{ padding: '12px', fontWeight: 700 }}>#{ord.id}</td>
                        <td style={{ padding: '12px' }}>{ord.customerName || ord.email}</td>
                        <td style={{ padding: '12px' }}>{new Date(ord.date).toLocaleDateString()}</td>
                        <td style={{ padding: '12px', fontWeight: 700 }} className="price">{formatPrice(ord.total)}</td>
                        <td style={{ padding: '12px' }}>
                          <select
                            className="form-select"
                            value={ord.status}
                            onChange={(e) => updateOrderStatus(ord.firestoreId, e.target.value)}
                            style={{ padding: '4px 8px', fontSize: '0.85rem' }}
                          >
                            <option value="Pending Verification">Pending Verification</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Packing">Packing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
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
  );
}
