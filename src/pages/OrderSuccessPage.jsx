import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import { FiCheckCircle, FiPackage, FiMapPin, FiPrinter, FiHome } from 'react-icons/fi';
import { formatPrice } from '../utils/formatPrice';

export default function OrderSuccessPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('sagarm_latest_order');
    if (saved) {
      setOrder(JSON.parse(saved));
    }
  }, []);

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '80vh', paddingBottom: '80px' }}>
      <Breadcrumb items={[{ label: 'Order Confirmation' }]} />

      <div className="container" style={{ maxWidth: '800px', marginTop: '20px' }}>
        <div className="card" style={{ padding: '40px', backgroundColor: '#ffffff', textAlign: 'center' }}>
          <FiCheckCircle style={{ fontSize: '4rem', color: 'var(--color-success)', marginBottom: '16px' }} />
          <h1 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
            Thank You For Your Order!
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--color-text-main)', marginTop: '8px' }}>
            Your order <strong>#{orderId}</strong> has been received and sent to the Sagarm Atelier for priority dispatch.
          </p>

          <span className="badge badge-gold" style={{ marginTop: '16px', fontSize: '0.85rem' }}>
            ORDER STATUS: PROCESSING
          </span>

          {order && (
            <div style={{ margin: '32px 0', textAlign: 'left', backgroundColor: 'var(--color-surface-soft)', padding: '24px', borderRadius: 'var(--radius-lg)' }}>
              <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-heading)', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px', marginBottom: '16px' }}>
                Order Receipt Summary
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '0.9rem', marginBottom: '20px' }}>
                <div>
                  <strong>Shipping Address:</strong>
                  <p>{order.shippingData?.fullName}</p>
                  <p>{order.shippingData?.street}</p>
                  <p>{order.shippingData?.city}, {order.shippingData?.country}</p>
                  <p>Phone: {order.shippingData?.phone}</p>
                </div>
                <div>
                  <strong>Order Info:</strong>
                  <p>Order ID: {order.orderId}</p>
                  <p>Date: {order.date}</p>
                  <p>Payment: {order.shippingData?.paymentMethod?.toUpperCase()}</p>
                  <p style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: '1.1rem', marginTop: '8px' }}>
                    Total Amount: {formatPrice(order.grandTotal)}
                  </p>
                </div>
              </div>

              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '10px' }}>Ordered Items:</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {order.items?.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span>{item.quantity}x {item.product?.name} ({item.size})</span>
                    <span className="price" style={{ fontWeight: 700 }}>{formatPrice(item.product?.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <button onClick={() => window.print()} className="btn btn-outline btn-sm">
              <FiPrinter /> Print Receipt
            </button>
            <Link to="/customer/orders" className="btn btn-secondary btn-sm">
              <FiPackage /> View Orders in Dashboard
            </Link>
            <Link to="/" className="btn btn-primary btn-sm">
              <FiHome /> Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
