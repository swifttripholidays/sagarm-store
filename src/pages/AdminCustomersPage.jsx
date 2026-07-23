import React from 'react';
import AdminSidebar from '../components/AdminSidebar';
import Breadcrumb from '../components/Breadcrumb';
import { useAuth } from '../contexts/AuthContext';
import { formatPrice } from '../utils/formatPrice';
import { FiUsers } from 'react-icons/fi';

export default function AdminCustomersPage() {
  const { orders } = useAuth();

  // Extract unique customers from orders or state
  const customerMap = {};
  orders.forEach((o) => {
    if (o.email) {
      if (!customerMap[o.email]) {
        customerMap[o.email] = {
          email: o.email,
          name: o.customerName || o.email.split('@')[0],
          ordersCount: 0,
          totalSpent: 0,
          joinedDate: o.date
        };
      }
      customerMap[o.email].ordersCount += 1;
      customerMap[o.email].totalSpent += o.total || 0;
    }
  });

  const customersList = Object.values(customerMap);

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', paddingBottom: '80px' }}>
      <Breadcrumb items={[{ label: 'Admin', link: '/admin' }, { label: 'Registered Clients' }]} />

      <div className="container" style={{ marginTop: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '32px' }}>
          <AdminSidebar />

          <div className="card" style={{ padding: '28px', backgroundColor: '#ffffff' }}>
            <h1 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)', borderBottom: '2px solid var(--color-primary)', paddingBottom: '10px', marginBottom: '24px' }}>
              Sagarm VIP Clients Directory
            </h1>

            {customersList.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '48px 20px', color: 'var(--color-text-muted)' }}>
                <FiUsers size={48} style={{ margin: '0 auto 16px', opacity: 0.4 }} />
                <h3>No Customers Found</h3>
                <p style={{ marginTop: '8px', fontSize: '0.9rem' }}>Registered customer profiles will appear here once orders or accounts are created.</p>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
                      <th style={{ padding: '10px' }}>Client Name</th>
                      <th style={{ padding: '10px' }}>Email</th>
                      <th style={{ padding: '10px' }}>First Order Date</th>
                      <th style={{ padding: '10px' }}>Orders</th>
                      <th style={{ padding: '10px' }}>Total Spent</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customersList.map((c, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid var(--color-card-border)' }}>
                        <td style={{ padding: '12px', fontWeight: 700 }}>{c.name}</td>
                        <td style={{ padding: '12px' }}>{c.email}</td>
                        <td style={{ padding: '12px' }}>{new Date(c.joinedDate).toLocaleDateString()}</td>
                        <td style={{ padding: '12px' }}>{c.ordersCount}</td>
                        <td style={{ padding: '12px', fontWeight: 700, color: 'var(--color-primary)' }} className="price">{formatPrice(c.totalSpent)}</td>
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
