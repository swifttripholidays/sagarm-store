import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useToast } from '../contexts/ToastContext';
import Breadcrumb from '../components/Breadcrumb';
import { FiMail, FiSend } from 'react-icons/fi';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email address').required('Email is required')
});

export default function ForgotPasswordPage() {
  const { addToast } = useToast();
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    setSent(true);
    addToast(`Password reset link sent to ${data.email}`, 'success');
  };

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '80vh', paddingBottom: '80px' }}>
      <Breadcrumb items={[{ label: 'Login', link: '/login' }, { label: 'Forgot Password' }]} />

      <div className="container" style={{ maxWidth: '440px', marginTop: '20px' }}>
        <div className="card" style={{ padding: '36px', backgroundColor: '#ffffff', textAlign: 'center' }}>
          <FiMail style={{ fontSize: '3rem', color: 'var(--color-primary)', marginBottom: '16px' }} />
          <h1 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)' }}>
            Reset Password
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginTop: '8px', marginBottom: '24px' }}>
            Enter your registered email address and we'll send you instructions to reset your password.
          </p>

          {sent ? (
            <div style={{ padding: '16px', backgroundColor: 'var(--color-success-bg)', borderRadius: 'var(--radius-md)' }}>
              <p style={{ color: 'var(--color-success)', fontWeight: 600 }}>Reset link dispatched to your inbox!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group" style={{ textAlign: 'left' }}>
                <label className="form-label">Email Address</label>
                <input type="email" {...register('email')} className="form-input" placeholder="you@example.com" />
                {errors.email && <p className="form-error">{errors.email.message}</p>}
              </div>

              <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '16px' }}>
                <FiSend /> Send Recovery Link
              </button>
            </form>
          )}

          <div style={{ marginTop: '24px' }}>
            <Link to="/login" style={{ fontSize: '0.875rem', color: 'var(--color-primary)', fontWeight: 600 }}>
              &larr; Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
