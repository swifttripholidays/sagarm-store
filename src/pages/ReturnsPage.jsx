import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import { FiRotateCcw, FiShield, FiCheckCircle, FiHelpCircle, FiLock, FiXCircle } from 'react-icons/fi';

export default function ReturnsPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-bg)', paddingBottom: '80px' }}>
      <Breadcrumb items={[{ label: 'Returns & Exchange' }]} />

      <div className="container" style={{ maxWidth: '900px', marginTop: '20px' }}>
        {/* --- NO RETURN HERO SECTION --- */}
        <div 
          className="card" 
          style={{ 
            padding: '50px 40px', 
            backgroundColor: '#1a1a1a', 
            borderRadius: 'var(--radius-lg)',
            marginBottom: '24px',
            textAlign: 'center',
            border: '1px solid #333',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ 
            position: 'absolute', 
            top: '-60px', 
            right: '-60px', 
            width: '200px', 
            height: '200px', 
            borderRadius: '50%', 
            backgroundColor: 'rgba(255, 215, 0, 0.04)',
            pointerEvents: 'none'
          }} />
          
          <FiXCircle style={{ 
            fontSize: '3.2rem', 
            color: '#c9a84c', 
            marginBottom: '12px',
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto'
          }} />
          
          <h1 style={{ 
            fontSize: '2.6rem', 
            fontFamily: 'var(--font-heading)', 
            color: '#ffffff', 
            marginBottom: '6px',
            letterSpacing: '0.5px'
          }}>
            No Returns. Final. Forever. Yours.
          </h1>
          
          <p style={{ 
            color: '#aaaaaa', 
            fontSize: '1.05rem',
            maxWidth: '620px',
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: '1.7'
          }}>
            Every piece from Sagarm is crafted with such precision and care that the thought of 
            parting with it becomes unthinkable. This is not a transaction—it is a lifetime 
            commitment between you and the artistry you now possess.
          </p>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '40px', 
            marginTop: '28px',
            flexWrap: 'wrap'
          }}>
            <div>
              <span style={{ color: '#c9a84c', fontSize: '1.6rem', fontWeight: 700, display: 'block' }}>0%</span>
              <span style={{ color: '#888', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Return Rate</span>
            </div>
            <div style={{ width: '1px', backgroundColor: '#333' }} />
            <div>
              <span style={{ color: '#c9a84c', fontSize: '1.6rem', fontWeight: 700, display: 'block' }}>100%</span>
              <span style={{ color: '#888', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Certified Quality</span>
            </div>
            <div style={{ width: '1px', backgroundColor: '#333' }} />
            <div>
              <span style={{ color: '#c9a84c', fontSize: '1.6rem', fontWeight: 700, display: 'block' }}>∞</span>
              <span style={{ color: '#888', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Lifetime Assurance</span>
            </div>
          </div>

          <div style={{ 
            marginTop: '24px', 
            paddingTop: '20px', 
            borderTop: '1px solid #2a2a2a',
            fontSize: '0.85rem',
            color: '#666'
          }}>
            <FiLock style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
            <span style={{ verticalAlign: 'middle' }}>
              Every purchase is sealed with an irrevocable bond of trust and craftsmanship
            </span>
          </div>
        </div>

        {/* --- ORIGINAL CARD WITH MODIFIED CONTENT --- */}
        <div className="card" style={{ padding: '40px', backgroundColor: '#ffffff' }}>
          <h1 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', marginBottom: '8px' }}>
            Our No-Return Promise
          </h1>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '32px' }}>
            At Sagarm, we believe that true luxury leaves no room for second thoughts. 
            Every garment is a masterpiece—final, complete, and destined to be cherished forever.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' }}>
            <div style={{ padding: '20px', backgroundColor: 'var(--color-surface-soft)', borderRadius: 'var(--radius-md)' }}>
              <FiCheckCircle style={{ fontSize: '2rem', color: '#c9a84c', marginBottom: '12px' }} />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px' }}>Zero Compromise</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                Every piece undergoes 47 quality checks before it reaches you—because we refuse to let anything less than perfection leave our atelier.
              </p>
            </div>

            <div style={{ padding: '20px', backgroundColor: 'var(--color-surface-soft)', borderRadius: 'var(--radius-md)' }}>
              <FiShield style={{ fontSize: '2rem', color: '#c9a84c', marginBottom: '12px' }} />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px' }}>Crafted for Eternity</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                We don't make clothes that fade, tear, or disappoint. We make heirlooms. And heirlooms are never returned—they are passed down.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', lineHeight: '1.7', color: 'var(--color-text-main)' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', marginBottom: '8px' }}>
                1. The Sagarm Commitment
              </h3>
              <p>
                We do not offer returns because we do not believe in uncertainty. Our garments are 
                meticulously crafted with premium fabrics, time-honored techniques, and an obsession 
                for detail that borders on the divine. When you purchase from Sagarm, you are not 
                buying a product—you are acquiring a piece of art that will outlast seasons, trends, 
                and time itself.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', marginBottom: '8px' }}>
                2. A Bond of Trust
              </h3>
              <p>
                We understand that buying online without trying can feel uncertain. That is exactly 
                why we have eliminated the need for returns entirely. Our virtual consultation, 
                precise size guides, and handcrafted-to-order process ensure that what arrives at 
                your doorstep is not just what you expected—it is what you never knew you needed. 
                Our concierge team remains available for any query, guidance, or reassurance, 
                because our relationship with you does not end at checkout.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', marginBottom: '8px' }}>
                3. The Final Word
              </h3>
              <p>
                In a world of disposable fashion and regretful purchases, Sagarm stands apart. 
                We do not offer a return policy because we refuse to participate in the culture 
                of hesitancy. We offer something rarer: the absolute certainty that once you wear 
                Sagarm, you will never want to take it off. This is not a guarantee you can exchange—it is 
                a guarantee you live with. And that, we believe, is the truest form of luxury.
              </p>
            </div>

            <div style={{ 
              marginTop: '12px', 
              padding: '20px 24px', 
              backgroundColor: '#f8f6f0', 
              borderRadius: 'var(--radius-md)',
              borderLeft: '4px solid #c9a84c'
            }}>
              <p style={{ 
                fontSize: '0.95rem', 
                fontStyle: 'italic', 
                color: '#3d3d3d',
                margin: 0
              }}>
                <FiCheckCircle style={{ display: 'inline', marginRight: '10px', color: '#c9a84c', verticalAlign: 'middle' }} />
                <span style={{ verticalAlign: 'middle' }}>
                  <strong>Our word is our bond.</strong> No returns. No exchanges. No exceptions. 
                  Only the enduring truth of exceptional craftsmanship, delivered to you without hesitation.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}