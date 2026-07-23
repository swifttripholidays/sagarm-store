import React from 'react';
import { useParams, Link } from 'react-router-dom';
import CustomerSidebar from '../components/CustomerSidebar';
import Breadcrumb from '../components/Breadcrumb';
import { useAuth } from '../contexts/AuthContext';
import { formatPrice } from '../utils/formatPrice';
import {
  FiCheckCircle,
  FiClock,
  FiTruck,
  FiMapPin,
  FiPrinter,
  FiPackage,
  FiCreditCard,
  FiAlertTriangle,
  FiUser,
  FiPhone
} from 'react-icons/fi';

export default function CustomerOrderDetailsPage() {
  const { id } = useParams();
  const { orders } = useAuth();

  // Find order by ID or use default fallback order
  const order = orders.find((o) => o.id === id) || orders[0] || {
    id: id || 'SGM-ORD-984210',
    date: new Date().toISOString(),
    status: 'Pending Verification',
    total: 89500,
    paymentMethod: 'JazzCash',
    customerName: 'Sagar Ali',
    phone: '+92 300 1234567',
    shippingAddress: {
      fullName: 'Sagar Ali',
      street: 'Suite 402, Royal Fashion Tower, Gulberg III',
      city: 'Lahore',
      postalCode: '54000',
      phone: '+92 300 1234567'
    },
    items: [
      {
        name: 'Royal Gold Embroidered Sherwani',
        price: 75000,
        quantity: 1,
        selectedSize: 'L',
        image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80'
      }
    ]
  };

  // Status progress steps mapping
  const trackingSteps = [
    { label: 'Pending Payment / Verification', status: 'Pending Verification' },
    { label: 'Order Confirmed', status: 'Confirmed' },
    { label: 'Packing & Quality Check', status: 'Packing' },
    { label: 'Shipped via Courier', status: 'Shipped' },
    { label: 'Out For Delivery', status: 'Out For Delivery' },
    { label: 'Delivered', status: 'Delivered' }
  ];

  const currentStatusIndex = trackingSteps.findIndex((step) => step.status === order.status);
  const activeStep = currentStatusIndex !== -1 ? currentStatusIndex : 0;

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', paddingBottom: '80px', minHeight: '80vh' }}>
      <Breadcrumb items={[{ label: 'My Account', link: '/customer/dashboard' }, { label: 'My Orders', link: '/customer/orders' }, { label: order.firestoreId }]} />

      <div className="container" style={{ marginTop: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '32px' }}>
          <div style={{ maxWidth: '280px' }}>
            <CustomerSidebar />
          </div>

          <div className="card" style={{ padding: '28px', backgroundColor: '#ffffff', flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h1 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)' }}>
                  Order Details #{order.firestoreId}
                </h1>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  Placed on {new Date(order.date).toLocaleDateString()} at {new Date(order.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              <button onClick={() => window.print()} className="btn btn-outline btn-sm">
                <FiPrinter /> Print Receipt
              </button>
            </div>

            {/* Tracking Progress Timeline */}
            <div style={{ padding: '24px', backgroundColor: 'var(--color-surface-soft)', borderRadius: 'var(--radius-lg)', marginBottom: '32px', border: '1px solid var(--color-border)' }}>
              <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-heading)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FiTruck style={{ color: 'var(--color-primary)' }} /> Live Order Status Timeline
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '12px', textAlign: 'center' }}>
                {trackingSteps.map((step, idx) => {
                  const isCompleted = idx <= activeStep;
                  const isCurrent = idx === activeStep;

                  return (
                    <div key={idx} style={{ position: 'relative' }}>
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          backgroundColor: isCompleted ? 'var(--color-primary)' : '#E7E5E4',
                          color: isCompleted ? '#ffffff' : '#A8A29E',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 8px',
                          fontWeight: 700,
                          fontSize: '0.9rem',
                          border: isCurrent ? '2px solid var(--color-accent-gold)' : 'none',
                          boxShadow: isCurrent ? '0 0 10px rgba(212, 175, 55, 0.5)' : 'none'
                        }}
                      >
                        {isCompleted ? <FiCheckCircle /> : idx + 1}
                      </div>

                      <p style={{
                        fontSize: '0.75rem',
                        fontWeight: isCurrent ? 800 : 600,
                        color: isCurrent ? 'var(--color-primary)' : isCompleted ? 'var(--color-text-main)' : 'var(--color-text-muted)'
                      }}>
                        {step.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Address & Payment Info */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '32px' }}>
              <div style={{ padding: '16px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: '#ffffff' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FiMapPin style={{ color: 'var(--color-primary)' }} /> Delivery Address
                </h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                  <strong>{order.shippingAddress?.fullName || order.customerName}</strong><br />
                  {order.shippingAddress?.street}<br />
                  {order.shippingAddress?.city}, {order.shippingAddress?.postalCode || 'Pakistan'}<br />
                  Phone: {order.shippingAddress?.phone || order.phone}
                </p>
              </div>

              <div style={{ padding: '16px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: '#ffffff' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FiCreditCard style={{ color: 'var(--color-primary)' }} /> Payment Details
                </h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                  Payment Method: <strong>{order.paymentMethod}</strong><br />
                  Status: <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>{order.status}</span><br />
                  {order.paymentDetails?.transactionId && (
                    <>TRX ID: <code style={{ color: 'var(--color-secondary)' }}>{order.paymentDetails.transactionId}</code><br /></>
                  )}
                  Total Amount: <strong className="num-font" style={{ color: 'var(--color-primary)', fontSize: '1.05rem' }}>{formatPrice(order.total)}</strong>
                </p>
              </div>
            </div>

            {/* Ordered Items List */}
            <div>
              <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-heading)', marginBottom: '16px' }}>
                Items in this Order ({order.items?.length || 1})
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {order.items?.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      padding: '12px',
                      border: '1px solid var(--color-border)',
                      borderRadius: '8px'
                    }}
                  >
                    <img
                      src={item.image || 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=300&q=80'}
                      alt={item.name}
                      style={{ width: '60px', height: '75px', objectFit: 'cover', borderRadius: '6px' }}
                    />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>{item.name}</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                        Size: {item.selectedSize || 'Standard'} | Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="price" style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--color-primary)' }}>
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
