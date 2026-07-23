import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import { FiLock, FiShield } from 'react-icons/fi';

export default function PrivacyPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-bg)', paddingBottom: '80px' }}>
      <Breadcrumb items={[{ label: 'Privacy Policy' }]} />

      <div className="container" style={{ maxWidth: '900px', marginTop: '20px' }}>
        <div className="card" style={{ padding: '40px', backgroundColor: '#ffffff', lineHeight: '1.7' }}>
          <h1 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', marginBottom: '8px' }}>
            Privacy & Data Security Policy
          </h1>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '32px' }}>
            Sagarm (sagarm.shop) respects your privacy and is committed to protecting your personal information.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', marginBottom: '8px' }}>
                1. Information We Collect
              </h3>
              <p>
                When you browse sagarm.shop, register an account, or place an order, we collect details necessary for fulfillment:
                Full Name, Email Address, Delivery Address in Pakistan, Contact Phone Number, and Shopping/Gender Preferences.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', marginBottom: '8px' }}>
                2. How We Use Your Data
              </h3>
              <p>
                Your information is used strictly to process orders, send courier tracking updates, provide personalized recommendations based on your gender/shopping preference, and improve your atelier shopping experience.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', marginBottom: '8px' }}>
                3. Data Security & Third Parties
              </h3>
              <p>
                We NEVER sell, rent, or trade your personal data to third-party advertisers. Information is shared only with verified delivery couriers in Pakistan for package arrival.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
