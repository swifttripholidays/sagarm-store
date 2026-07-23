import React from 'react';
import Breadcrumb from '../components/Breadcrumb';

export default function TermsPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-bg)', paddingBottom: '80px' }}>
      <Breadcrumb items={[{ label: 'Terms & Conditions' }]} />

      <div className="container" style={{ maxWidth: '900px', marginTop: '20px' }}>
        <div className="card" style={{ padding: '40px', backgroundColor: '#ffffff', lineHeight: '1.7' }}>
          <h1 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', marginBottom: '8px' }}>
            Terms & Conditions
          </h1>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '32px' }}>
            Terms of Service for Sagarm Online Store (sagarm.shop)
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', marginBottom: '8px' }}>
                1. Single-Brand Store Policy
              </h3>
              <p>
                sagarm.shop is the exclusive personal online retail store of Sagarm. All garments and accessories listed are authentic Sagarm original designs.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', marginBottom: '8px' }}>
                2. Pricing & Currency
              </h3>
              <p>
                All prices listed on sagarm.shop are in Pakistani Rupees (PKR) and include applicable sales tax. We reserve the right to modify prices without prior notice.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', marginBottom: '8px' }}>
                3. Order Acceptance
              </h3>
              <p>
                Placement of an order constitutes an offer to purchase. Sagarm reserves the right to decline or cancel orders due to stock unavailability or address verification issues.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
