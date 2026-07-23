import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { FiShield, FiMail, FiLock, FiKey, FiArrowRight, FiRefreshCw, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { user, isAdmin, initiateAdminLogin, adminPendingLogin, adminOtpState, verifyAdminOtp, resendAdminOtp } = useAuth();
  const { addToast } = useToast();

  const [step, setStep] = useState('credentials'); // 'credentials' | 'otp'
  const [email, setEmail] = useState('sagarshop.pk@gmail.com');
  const [password, setPassword] = useState('admin123456');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [errorMessage, setErrorMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState(120);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If already logged in as admin, redirect to /admin
  useEffect(() => {
    if (user && isAdmin) {
      navigate('/admin', { replace: true });
    }
  }, [user, isAdmin, navigate]);

  // OTP Countdown timer
  useEffect(() => {
    let timer;
    if (step === 'otp' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, timeLeft]);

  // Handle Step 1: Submit Credentials
  const handleCredentialsSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim()) {
      setErrorMessage('Admin email is required.');
      return;
    }
    if (!password || password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const res = initiateAdminLogin(email, password);
      setIsSubmitting(false);

      if (res.success) {
        setStep('otp');
        setTimeLeft(120);
        setErrorMessage('');
      } else {
        setErrorMessage(res.error || 'Invalid Admin Credentials');
      }
    }, 400);
  };

  // Handle OTP digit change
  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  // Handle Step 2: Submit OTP
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    const fullOtp = otp.join('');

    if (fullOtp.length !== 6) {
      setErrorMessage('Please enter the complete 6-digit OTP code.');
      return;
    }

    if (timeLeft <= 0) {
      setErrorMessage('OTP Expired! Please click "Resend OTP" to receive a new code.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const res = verifyAdminOtp(fullOtp);
      setIsSubmitting(false);

      if (res.success) {
        addToast('Admin Login Successful!', 'success');
        navigate('/admin', { replace: true });
      } else {
        setErrorMessage(res.error || 'Invalid OTP');
      }
    }, 500);
  };

  // Resend OTP handler
  const handleResendOtp = () => {
    setErrorMessage('');
    const res = resendAdminOtp();
    if (res.success) {
      setTimeLeft(120);
      setOtp(['', '', '', '', '', '']);
    }
  };

  return (
    <div style={{
      minHeight: '85vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#1C1917',
      backgroundImage: 'radial-gradient(circle at 50% 30%, rgba(212, 175, 55, 0.12) 0%, rgba(28, 25, 23, 0.95) 70%)',
      padding: '24px 16px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '460px',
        backgroundColor: '#262220',
        borderRadius: '20px',
        border: '1px solid rgba(212, 175, 55, 0.3)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
        padding: '36px 28px',
        color: '#ffffff'
      }} className="fade-in">

        {/* Top Header Icon */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: '68px',
            height: '68px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--color-primary) 0%, #102A1E 100%)',
            border: '2px solid var(--color-accent-gold)',
            color: 'var(--color-accent-gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            fontSize: '1.8rem',
            boxShadow: '0 8px 20px rgba(212, 175, 55, 0.2)'
          }}>
            <FiShield />
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '0.5px', fontFamily: 'var(--font-heading)' }}>
            Sagarm Admin Portal
          </h2>
          <p style={{ color: '#A8A29E', fontSize: '0.875rem', marginTop: '6px' }}>
            {step === 'credentials' ? 'Strict Role-Based Security Gateway' : '2-Factor OTP Security Verification'}
          </p>
        </div>

        {/* Error Alert Box */}
        {errorMessage && (
          <div style={{
            backgroundColor: 'rgba(220, 38, 38, 0.15)',
            border: '1px solid var(--color-error)',
            borderRadius: '10px',
            padding: '12px 16px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: '#FCA5A5',
            fontSize: '0.875rem'
          }}>
            <FiAlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* STEP 1: CREDENTIALS FORM */}
        {step === 'credentials' && (
          <form onSubmit={handleCredentialsSubmit}>
            <div className="form-group">
              <label className="form-label" style={{ color: '#D6D3D1' }}>
                <span>Admin Email Address</span>
              </label>
              <div style={{ position: 'relative' }}>
                <FiMail style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#A8A29E' }} />
                <input
                  type="email"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@mail.com"
                  required
                  style={{
                    paddingLeft: '42px',
                    backgroundColor: '#1C1917',
                    borderColor: 'rgba(212, 175, 55, 0.2)',
                    color: '#ffffff'
                  }}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label className="form-label" style={{ color: '#D6D3D1' }}>
                <span>Admin Password</span>
              </label>
              <div style={{ position: 'relative' }}>
                <FiLock style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#A8A29E' }} />
                <input
                  type="password"
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  style={{
                    paddingLeft: '42px',
                    backgroundColor: '#1C1917',
                    borderColor: 'rgba(212, 175, 55, 0.2)',
                    color: '#ffffff'
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-gold"
              disabled={isSubmitting}
              style={{ width: '100%', padding: '14px', fontSize: '1rem', marginTop: '8px' }}
            >
              {isSubmitting ? 'Verifying...' : <>Proceed to OTP Verification <FiArrowRight /></>}
            </button>

            <div style={{
              marginTop: '20px',
              padding: '12px',
              backgroundColor: '#1C1917',
              borderRadius: '8px',
              border: '1px dashed rgba(212, 175, 55, 0.3)',
              fontSize: '0.8rem',
              color: '#A8A29E',
              textAlign: 'center'
            }}>
              
            </div>
          </form>
        )}

        {/* STEP 2: OTP VERIFICATION FORM */}
        {step === 'otp' && (
          <form onSubmit={handleOtpSubmit} className="fade-in">
            <div style={{
              backgroundColor: 'rgba(212, 175, 55, 0.1)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              borderRadius: '10px',
              padding: '12px 16px',
              marginBottom: '24px',
              fontSize: '0.85rem',
              color: '#FDE68A',
              textAlign: 'center'
            }}>
              📩 6-Digit Security OTP sent to: <strong>{adminPendingLogin?.email}</strong>
              <div style={{ marginTop: '4px', fontWeight: 700 }}>
                Demo Verification Code: <span style={{ textDecoration: 'underline', color: '#ffffff' }}>{adminOtpState.code || '123456'}</span>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" style={{ color: '#D6D3D1', justifyContent: 'center', marginBottom: '12px' }}>
                <span>Enter 6-Digit OTP Code</span>
              </label>

              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-input-${idx}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    style={{
                      width: '48px',
                      height: '56px',
                      textAlign: 'center',
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      backgroundColor: '#1C1917',
                      border: digit ? '2px solid var(--color-accent-gold)' : '1px solid #44403C',
                      borderRadius: '8px',
                      color: '#ffffff',
                      outline: 'none'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Countdown timer & resend */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', fontSize: '0.875rem' }}>
              <span style={{ color: timeLeft > 0 ? '#A8A29E' : '#FCA5A5' }}>
                {timeLeft > 0 ? `Code expires in: ${timeLeft}s` : 'OTP Expired'}
              </span>

              <button
                type="button"
                onClick={handleResendOtp}
                style={{
                  color: 'var(--color-accent-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                <FiRefreshCw /> Resend OTP
              </button>
            </div>

            <button
              type="submit"
              className="btn btn-gold"
              disabled={isSubmitting}
              style={{ width: '100%', padding: '14px', fontSize: '1rem' }}
            >
              {isSubmitting ? 'Authenticating...' : <>Verify & Open Admin Dashboard <FiCheckCircle /></>}
            </button>

            <button
              type="button"
              onClick={() => { setStep('credentials'); setErrorMessage(''); }}
              style={{
                width: '100%',
                marginTop: '16px',
                color: '#A8A29E',
                fontSize: '0.875rem',
                textAlign: 'center',
                cursor: 'pointer'
              }}
            >
              ← Back to Admin Login
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
