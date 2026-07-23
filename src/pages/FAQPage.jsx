import React, { useState } from 'react';
import { FAQ_DATA } from '../data/coupons';
import Breadcrumb from '../components/Breadcrumb';
import { FiChevronDown, FiChevronUp, FiHelpCircle } from 'react-icons/fi';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState('0-0');

  const toggleAccordion = (indexKey) => {
    setOpenIndex(openIndex === indexKey ? null : indexKey);
  };

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', paddingBottom: '80px' }}>
      <Breadcrumb items={[{ label: 'Frequently Asked Questions' }]} />

      <div className="container" style={{ maxWidth: '800px', marginTop: '20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <FiHelpCircle style={{ fontSize: '3rem', color: 'var(--color-primary)', marginBottom: '12px' }} />
          <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)' }}>
            Frequently Asked Questions
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', marginTop: '6px' }}>
            Find clear answers regarding Sagarm custom orders, worldwide shipping, and sizing.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {FAQ_DATA.map((cat, cIdx) => (
            <div key={cIdx} className="card" style={{ padding: '28px', backgroundColor: '#ffffff' }}>
              <h2 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', marginBottom: '20px' }}>
                {cat.category}
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {cat.items.map((item, iIdx) => {
                  const key = `${cIdx}-${iIdx}`;
                  const isOpen = openIndex === key;

                  return (
                    <div
                      key={iIdx}
                      style={{
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-md)',
                        overflow: 'hidden'
                      }}
                    >
                      <button
                        onClick={() => toggleAccordion(key)}
                        style={{
                          width: '100%',
                          padding: '16px 20px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          backgroundColor: isOpen ? 'var(--color-surface-soft)' : '#ffffff',
                          fontWeight: 700,
                          fontSize: '0.95rem',
                          textAlign: 'left',
                          color: 'var(--color-text-main)'
                        }}
                      >
                        <span>{item.q}</span>
                        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
                      </button>

                      {isOpen && (
                        <div style={{ padding: '16px 20px', fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: '1.6', backgroundColor: '#ffffff', borderTop: '1px solid var(--color-border)' }}>
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
