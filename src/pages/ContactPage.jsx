import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useToast } from '../contexts/ToastContext';
import Breadcrumb from '../components/Breadcrumb';
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend } from 'react-icons/fi';

const contactSchema = yup.object().shape({
  fullName: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  subject: yup.string().required('Subject is required'),
  message: yup.string().min(10, 'Message must be at least 10 characters').required('Message is required')
});

export default function ContactPage() {
  const { addToast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(contactSchema)
  });

  const onSubmit = (data) => {
    addToast('Thank you! Your message has been sent to Sagarm VIP Concierge.', 'success');
    reset();
  };

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', paddingBottom: '80px' }}>
      <Breadcrumb items={[{ label: 'Contact VIP Concierge' }]} />

      <div className="container" style={{ marginTop: '20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ color: 'var(--color-primary)', fontWeight: 700, letterSpacing: '2px', fontSize: '0.85rem' }}>
            PERSONALIZED ATELIER ASSISTANCE
          </span>
          <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', marginTop: '8px' }}>
            Contact Sagarm Concierge
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', marginTop: '6px' }}>
            Get in touch for custom bridal fittings, order status updates, or bespoke styling.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }}>
          {/* Contact Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="card" style={{ padding: '24px', backgroundColor: '#ffffff', display: 'flex', gap: '16px', alignItems: 'center' }}>
              <FiMapPin style={{ fontSize: '2rem', color: 'var(--color-primary)' }} />
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Flagship Atelier Store</h4>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                  Suite 402, Royal Fashion Tower, Main Boulevard, Gulberg III, Lahore, Pakistan
                </p>
              </div>
            </div>

            <div className="card" style={{ padding: '24px', backgroundColor: '#ffffff', display: 'flex', gap: '16px', alignItems: 'center' }}>
              <FiPhone style={{ fontSize: '2rem', color: 'var(--color-primary)' }} />
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>VIP Concierge Hotline</h4>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                  +92 300 SAGARM (+92 300 724276) | WhatsApp Available 24/7
                </p>
              </div>
            </div>

            <div className="card" style={{ padding: '24px', backgroundColor: '#ffffff', display: 'flex', gap: '16px', alignItems: 'center' }}>
              <FiMail style={{ fontSize: '2rem', color: 'var(--color-primary)' }} />
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Direct Email Support</h4>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                  care@sagarm.shop | sales@sagarm.shop
                </p>
              </div>
            </div>

            <div className="card" style={{ padding: '24px', backgroundColor: '#ffffff', display: 'flex', gap: '16px', alignItems: 'center' }}>
              <FiClock style={{ fontSize: '2rem', color: 'var(--color-primary)' }} />
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Atelier Operating Hours</h4>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                  Monday - Saturday: 10:00 AM - 9:00 PM (PKT)
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card" style={{ padding: '36px', backgroundColor: '#ffffff' }}>
            <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', marginBottom: '20px' }}>
              Send Us A Direct Message
            </h3>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input type="text" {...register('fullName')} className="form-input" placeholder="Your Name" />
                {errors.fullName && <p className="form-error">{errors.fullName.message}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input type="email" {...register('email')} className="form-input" placeholder="you@example.com" />
                {errors.email && <p className="form-error">{errors.email.message}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">Subject</label>
                <input type="text" {...register('subject')} className="form-input" placeholder="e.g. Custom Bridal Fitting Request" />
                {errors.subject && <p className="form-error">{errors.subject.message}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea {...register('message')} className="form-textarea" rows="4" placeholder="How can we assist you?" />
                {errors.message && <p className="form-error">{errors.message.message}</p>}
              </div>

              <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                <FiSend /> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
