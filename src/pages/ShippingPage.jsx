import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import { FiTruck, FiClock, FiShield, FiMapPin, FiCheckCircle } from 'react-icons/fi';

export default function ShippingPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-bg)', paddingBottom: '80px' }}>
      <Breadcrumb items={[{ label: 'Shipping & Delivery' }]} />

      <div className="container" style={{ maxWidth: '900px', marginTop: '20px' }}>
        <div className="card" style={{ padding: '40px', backgroundColor: '#ffffff' }}>
          <h1 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', marginBottom: '8px' }}>
            Nationwide Delivery Policy
          </h1>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '32px' }}>
            Sagarm delivers handcrafted designer apparel across all major cities and towns in Pakistan.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' }}>
            <div style={{ padding: '20px', backgroundColor: 'var(--color-surface-soft)', borderRadius: 'var(--radius-md)' }}>
              <FiTruck style={{ fontSize: '2rem', color: 'var(--color-primary)', marginBottom: '12px' }} />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px' }}>Express City Delivery</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad & Multan (2-3 Business Days).
              </p>
            </div>

            <div style={{ padding: '20px', backgroundColor: 'var(--color-surface-soft)', borderRadius: 'var(--radius-md)' }}>
              <FiClock style={{ fontSize: '2rem', color: 'var(--color-gold)', marginBottom: '12px' }} />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px' }}>Other Pakistan Regions</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                Peshawar, Quetta, Sialkot, Gujranwala, Sukkur, Hyderabad & All Districts (3-5 Business Days).
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', lineHeight: '1.7', color: 'var(--color-text-main)' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', marginBottom: '8px' }}>
                1. Delivery Charges & Free Shipping Threshold
              </h3>
              <p>
                We offer <strong>FREE Shipping</strong> across Pakistan on all orders over <strong>Rs. 10,000</strong>.
                For orders under Rs. 10,000, a flat standard courier fee of <strong>Rs. 250</strong> applies.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', marginBottom: '8px' }}>
                2. Cash on Delivery (COD) Rules
              </h3>
              <p>
                COD is supported for all addresses in Pakistan up to an order value of <strong>Rs. 100,000</strong>.
                For high-value custom bridal ensembles exceeding Rs. 100,000, a 20% advance transfer via JazzCash, EasyPaisa, or Online Bank Transfer is required prior to crafting.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', marginBottom: '8px' }}>
                3. Courier Partners & Tracking
              </h3>
              <p>
                All parcels are dispatched via premium logistics partners including TCS, Leopard Courier, and M&P.
                Once dispatched, an automated SMS and email containing your tracking number will be sent to your registered phone number.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
