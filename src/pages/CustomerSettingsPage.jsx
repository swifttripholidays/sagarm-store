import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import CustomerSidebar from '../components/CustomerSidebar';
import Breadcrumb from '../components/Breadcrumb';
import { FiSave } from 'react-icons/fi';

const settingsSchema = yup.object().shape({
  fullName: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone is required')
});

export default function CustomerSettingsPage() {
  const { user, updateProfile } = useAuth();
  const { addToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(settingsSchema),
    defaultValues: {
      fullName: user?.fullName || '',
      email: user?.email || '',
      phone: user?.phone || ''
    }
  });

  const onSubmit = (data) => {
    updateProfile(data);
    addToast('Account profile updated successfully!', 'success');
  };

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', paddingBottom: '80px' }}>
      <Breadcrumb items={[{ label: 'My Account', link: '/customer/dashboard' }, { label: 'Account Settings' }]} />

      <div className="container" style={{ marginTop: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '32px' }}>
          <CustomerSidebar />

          <div className="card" style={{ padding: '28px', backgroundColor: '#ffffff', maxWidth: '600px' }}>
            <h1 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)', borderBottom: '2px solid var(--color-primary)', paddingBottom: '10px', marginBottom: '24px' }}>
              Account & Security Settings
            </h1>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input type="text" {...register('fullName')} className="form-input" />
                {errors.fullName && <p className="form-error">{errors.fullName.message}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input type="email" {...register('email')} className="form-input" />
                {errors.email && <p className="form-error">{errors.email.message}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input type="text" {...register('phone')} className="form-input" />
                {errors.phone && <p className="form-error">{errors.phone.message}</p>}
              </div>

              <button type="submit" className="btn btn-primary btn-md" style={{ marginTop: '16px' }}>
                <FiSave /> Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
