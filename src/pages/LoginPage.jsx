import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../contexts/AuthContext';
import Breadcrumb from '../components/Breadcrumb';
import { FiEye, FiEyeOff, FiLock, FiMail } from 'react-icons/fi';

const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  gender: yup.string().required('Gender preference selection is required'),
  rememberMe: yup.boolean()
});

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(loginSchema)
  });

  const onSubmit = (data) => {
    const res = login(data.email, data.password);
    if (res.isAdmin) {
      navigate('/admin');
    } else {
      navigate('/customer/dashboard');
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '80vh', paddingBottom: '80px' }}>
      <Breadcrumb items={[{ label: 'Login' }]} />

      <div className="container" style={{ maxWidth: '480px', marginTop: '20px' }}>
        <div className="card" style={{ padding: '36px', backgroundColor: '#ffffff' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
              Welcome Back To Sagarm
            </h1>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
              Access your saved wishlist, orders, and VIP perks
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  {...register('email')}
                  className="form-input"
                  placeholder="e.g. example@mail.com"
                />
                <FiMail style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
              </div>
              {errors.email && <p className="form-error">{errors.email.message}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  className="form-input"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.password && <p className="form-error">{errors.password.message}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">Gender / Shopping Preference</label>
              <select {...register('gender')} className="form-input" defaultValue="all">
                <option value="male">Men's Apparel</option>
                <option value="female">Women's Apparel</option>
                <option value="non-binary">Unisex / All Collections</option>
                <option value="all">Kids & Family</option>
              </select>
              {errors.gender && <p className="form-error">{errors.gender.message}</p>}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', fontSize: '0.85rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" {...register('rememberMe')} />
                <span>Remember Me</span>
              </label>

              <Link to="/forgot-password" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
                Forgot Password?
              </Link>
            </div>

            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
              <FiLock /> Sign In
            </button>
          </form>

          <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
            Don't have an account?{' '}
            <Link to="/signup" style={{ color: 'var(--color-primary)', fontWeight: 700 }}>
              Create Account
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
