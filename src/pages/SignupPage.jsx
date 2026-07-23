import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../contexts/AuthContext';
import Breadcrumb from '../components/Breadcrumb';
import { FiEye, FiEyeOff, FiUser, FiMail, FiCalendar, FiLock } from 'react-icons/fi';

const signupSchema = yup.object().shape({
  fullName: yup.string().min(3, 'Full name must be at least 3 letters').required('Full Name is required'),
  gender: yup.string().required('Gender preference selection is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  dob: yup.string().required('Date of birth is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
  rememberMe: yup.boolean(),
  acceptTerms: yup.boolean().oneOf([true], 'You must accept the terms and privacy policy')
});

export default function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(signupSchema)
  });

  const onSubmit = (data) => {
    signup(data);
    navigate('/customer/dashboard');
  };

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '80vh', paddingBottom: '80px' }}>
      <Breadcrumb items={[{ label: 'Register Account' }]} />

      <div className="container" style={{ maxWidth: '520px', marginTop: '20px' }}>
        <div className="card" style={{ padding: '36px', backgroundColor: '#ffffff' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
              Register Sagarm 
            </h1>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
              Create an account for personalized fitting advice and VIP rewards
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div style={{ position: 'relative' }}>
                <input type="text" {...register('fullName')} className="form-input" placeholder="Full Name" />
                <FiUser style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
              </div>
              {errors.fullName && <p className="form-error">{errors.fullName.message}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">Gender</label>
              <select {...register('gender')} className="form-input" defaultValue="">
                <option value="" disabled>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Gay</option>
                <option value="prefer-not-to-say">Prefer Not To Say</option>
              </select>
              {errors.gender && <p className="form-error">{errors.gender.message}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">Date of Birth</label>
              <div style={{ position: 'relative' }}>
                <input type="date" {...register('dob')} className="form-input" />
                <FiCalendar style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
              </div>
              {errors.dob && <p className="form-error">{errors.dob.message}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <input type="email" {...register('email')} className="form-input" placeholder="you@example.com" />
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
              <label className="form-label">Confirm Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('confirmPassword')}
                className="form-input"
                placeholder="••••••••"
              />
              {errors.confirmPassword && <p className="form-error">{errors.confirmPassword.message}</p>}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px', fontSize: '0.85rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" {...register('rememberMe')} defaultChecked />
                <span>Remember me on this device</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" {...register('acceptTerms')} defaultChecked />
                <span>I accept Sagarm's Terms & Conditions and Privacy Policy</span>
              </label>
              {errors.acceptTerms && <p className="form-error">{errors.acceptTerms.message}</p>}
            </div>

            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
              <FiLock /> Create Account
            </button>
          </form>

          <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: 700 }}>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
