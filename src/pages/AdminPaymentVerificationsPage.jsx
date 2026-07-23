import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import AdminSidebar from '../components/AdminSidebar';
import {
  FiCheckCircle,
  FiXCircle,
  FiEye,
  FiX,
  FiSearch,
  FiClock,
  FiDollarSign,
  FiCreditCard,
  FiUser,
  FiPhone,
  FiCalendar,
  FiFileText,
  FiCheck,
  FiAlertTriangle
} from 'react-icons/fi';

export default function AdminPaymentVerificationsPage() {
  const { orders, approvePayment, rejectPayment } = useAuth();
  const [activeTab, setActiveTab] = useState('Pending Verification'); // 'Pending Verification' | 'Confirmed' | 'Rejected' | 'All'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState(null); // For screenshot preview modal

  const formatPKR = (amount) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 0
    }).format(amount || 0);
  };

  const filteredOrders = orders.filter((order) => {
    const matchesTab =
      activeTab === 'All'
        ? true
        : order.status === activeTab;

    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (order.customerName && order.customerName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (order.paymentDetails?.transactionId && order.paymentDetails.transactionId.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (order.paymentMethod && order.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesTab && matchesSearch;
  });

  const pendingCount = orders.filter((o) => o.status === 'Pending Verification').length;
  const confirmedCount = orders.filter((o) => o.status === 'Confirmed').length;
  const rejectedCount = orders.filter((o) => o.status === 'Rejected').length;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
      <AdminSidebar />

      <main style={{ flex: 1, padding: '32px 24px', overflowX: 'auto' }}>
        <div style={{ marginBottom: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-text-main)' }}>
                Payment Verifications
              </h1>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
                Review customer bank transfer, JazzCash, EasyPaisa, NayaPay & SadaPay transaction screenshots and approve orders.
              </p>
            </div>

            {/* Quick Stats Badges */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <div style={{
                padding: '8px 16px',
                backgroundColor: 'var(--color-warning-bg)',
                border: '1px solid var(--color-warning)',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--color-warning)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <FiClock /> Pending Verification: <strong>{pendingCount}</strong>
              </div>

              <div style={{
                padding: '8px 16px',
                backgroundColor: 'var(--color-success-bg)',
                border: '1px solid var(--color-success)',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--color-success)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <FiCheckCircle /> Confirmed: <strong>{confirmedCount}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs & Search */}
        <div className="card" style={{ padding: '20px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {[
                { id: 'Pending Verification', label: `Pending (${pendingCount})`, icon: FiClock },
                { id: 'Confirmed', label: `Confirmed (${confirmedCount})`, icon: FiCheckCircle },
                { id: 'Rejected', label: `Rejected (${rejectedCount})`, icon: FiXCircle },
                { id: 'All', label: `All Orders (${orders.length})`, icon: FiFileText }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '10px 18px',
                      borderRadius: '8px',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: '1px solid',
                      borderColor: isActive ? 'var(--color-primary)' : 'var(--color-border)',
                      backgroundColor: isActive ? 'var(--color-primary)' : 'var(--color-surface)',
                      color: isActive ? '#ffffff' : 'var(--color-text-main)',
                      transition: 'all 0.2s'
                    }}
                  >
                    <Icon /> {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div style={{ position: 'relative', width: '280px' }}>
              <FiSearch style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
              <input
                type="text"
                className="form-input"
                placeholder="Search Order ID, Name or TRX ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '38px', fontSize: '0.875rem' }}
              />
            </div>
          </div>
        </div>

        {/* Orders Verification Cards / Table */}
        {filteredOrders.length === 0 ? (
          <div className="card" style={{ padding: '48px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
            <FiCheckCircle size={48} style={{ margin: '0 auto 16px', opacity: 0.4, color: 'var(--color-primary)' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px', color: 'var(--color-text-main)' }}>
              No Payments to Display
            </h3>
            <p style={{ fontSize: '0.9rem' }}>
              {activeTab === 'Pending Verification'
                ? 'All pending payment screenshots have been processed!'
                : 'No orders match your filter and search criteria.'}
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px' }}>
            {filteredOrders.map((order) => {
              const details = order.paymentDetails || {};
              const isPending = order.status === 'Pending Verification';

              return (
                <div key={order.firestoreId} className="card" style={{ padding: '20px', position: 'relative' }}>
                  {/* Top Status Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid var(--color-border)' }}>
                    <div>
                      <span style={{ fontFamily: 'var(--font-number)', fontWeight: 700, fontSize: '1rem', color: 'var(--color-primary)' }}>
                        #{order.firestoreId}
                      </span>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <FiCalendar size={12} /> {new Date(order.date).toLocaleDateString()} at {new Date(order.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>

                    <span
                      className="badge"
                      style={{
                        backgroundColor:
                          order.status === 'Confirmed'
                            ? 'var(--color-success-bg)'
                            : order.status === 'Rejected'
                            ? 'var(--color-error-bg)'
                            : 'var(--color-warning-bg)',
                        color:
                          order.status === 'Confirmed'
                            ? 'var(--color-success)'
                            : order.status === 'Rejected'
                            ? 'var(--color-error)'
                            : 'var(--color-warning)',
                        border: '1px solid currentColor'
                      }}
                    >
                      {order.status}
                    </span>
                  </div>

                  {/* Customer & Amount Details */}
                  <div style={{ marginBottom: '16px', fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FiUser style={{ color: 'var(--color-text-muted)' }} />
                      <strong>{order.customerName}</strong>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FiPhone style={{ color: 'var(--color-text-muted)' }} />
                      <span>{order.phone || order.shippingAddress?.phone || 'N/A'}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FiCreditCard style={{ color: 'var(--color-text-muted)' }} />
                      <span>Method: <strong style={{ color: 'var(--color-primary)' }}>{order.paymentMethod}</strong></span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem', marginTop: '4px' }}>
                      <FiDollarSign style={{ color: 'var(--color-accent-gold)' }} />
                      <span>Amount: <strong className="num-font" style={{ color: 'var(--color-text-main)' }}>{formatPKR(order.total)}</strong></span>
                    </div>
                  </div>

                  {/* Transaction ID & Screenshot Box */}
                  <div style={{
                    backgroundColor: 'var(--color-surface-soft)',
                    borderRadius: '8px',
                    padding: '12px',
                    marginBottom: '16px',
                    border: '1px solid var(--color-border)'
                  }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
                      TRANSACTION ID (TRX ID):
                    </div>
                    <div style={{ fontFamily: 'var(--font-number)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-secondary)' }}>
                      {details.transactionId || 'No Transaction ID Provided'}
                    </div>

                    {details.notes && (
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>
                        Notes: <em>{details.notes}</em>
                      </div>
                    )}

                    {/* Screenshot Preview Thumbnail */}
                    {details.screenshotUrl ? (
                      <div style={{ marginTop: '12px' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '6px' }}>
                          Payment Screenshot:
                        </div>
                        <div
                          onClick={() => setSelectedImage(details.screenshotUrl)}
                          style={{
                            height: '140px',
                            borderRadius: '6px',
                            overflow: 'hidden',
                            position: 'relative',
                            cursor: 'pointer',
                            border: '1px solid var(--color-border)',
                            backgroundColor: '#000000'
                          }}
                        >
                          <img
                            src={details.screenshotUrl}
                            alt="Payment Proof"
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                          />
                          <div style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundColor: 'rgba(0,0,0,0.4)',
                            color: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            opacity: 0.9
                          }}>
                            <FiEye /> Click to Inspect Full Screenshot
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div style={{ marginTop: '12px', fontSize: '0.8rem', color: 'var(--color-error)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <FiAlertTriangle /> No Screenshot Uploaded
                      </div>
                    )}
                  </div>

                  {/* Actions Buttons */}
                  {isPending && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <button
                        className="btn"
                        onClick={() => approvePayment(order.firestoreId)}
                        style={{
                          backgroundColor: 'var(--color-success)',
                          color: '#ffffff',
                          padding: '10px',
                          fontSize: '0.875rem'
                        }}
                      >
                        <FiCheck /> Approve
                      </button>

                      <button
                        className="btn"
                        onClick={() => rejectPayment(order.firestoreId)}
                        style={{
                          backgroundColor: 'var(--color-error)',
                          color: '#ffffff',
                          padding: '10px',
                          fontSize: '0.875rem'
                        }}
                      >
                        <FiX /> Reject
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Screenshot Modal Viewer */}
        {selectedImage && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              backgroundColor: 'rgba(0,0,0,0.85)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px'
            }}
            onClick={() => setSelectedImage(null)}
          >
            <div
              style={{
                position: 'relative',
                maxWidth: '90vw',
                maxHeight: '90vh',
                backgroundColor: '#1F1F1F',
                borderRadius: '12px',
                padding: '16px',
                boxShadow: '0 25px 50px rgba(0,0,0,0.5)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                style={{
                  position: 'absolute',
                  top: '-16px',
                  right: '-16px',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-primary)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                }}
              >
                <FiX />
              </button>

              <img
                src={selectedImage}
                alt="Full Payment Screenshot"
                style={{
                  maxWidth: '100%',
                  maxHeight: '80vh',
                  objectFit: 'contain',
                  borderRadius: '8px'
                }}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
