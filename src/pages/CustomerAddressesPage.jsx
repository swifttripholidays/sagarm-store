import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../contexts/AuthContext';
import CustomerSidebar from '../components/CustomerSidebar';
import Breadcrumb from '../components/Breadcrumb';
import { FiMapPin, FiPlus, FiTrash2, FiCheck } from 'react-icons/fi';

const addressSchema = yup.object().shape({
  fullName: yup.string().required('Full name is required'),
  phone: yup.string().required('Phone is required'),
  street: yup.string().required('Street address is required'),
  city: yup.string().required('City is required'),
  country: yup.string().required('Country is required'),
  postalCode: yup.string().required('Postal code is required')
});

export default function CustomerAddressesPage() {
  const { addresses, addAddress, deleteAddress } = useAuth();
  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(addressSchema)
  });

  const onSubmit = (data) => {
    addAddress(data);
    reset();
    setShowForm(false);
  };

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', paddingBottom: '80px' }}>
      <Breadcrumb items={[{ label: 'My Account', link: '/customer/dashboard' }, { label: 'Saved Addresses' }]} />

      <div className="container" style={{ marginTop: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '32px' }}>
          <CustomerSidebar />

          <div className="card" style={{ padding: '28px', backgroundColor: '#ffffff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid var(--color-primary)', paddingBottom: '10px', marginBottom: '24px' }}>
              <h1 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)' }}>Saved Address Book</h1>
              <button onClick={() => setShowForm(!showForm)} className="btn btn-primary btn-sm">
                <FiPlus /> {showForm ? 'Cancel' : 'Add New Address'}
              </button>
            </div>

            {/* Add Address Form */}
            {showForm && (
              <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: '32px', padding: '20px', backgroundColor: 'var(--color-surface-soft)', borderRadius: 'var(--radius-lg)' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>New Shipping Address</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input type="text" {...register('fullName')} className="form-input" />
                    {errors.fullName && <p className="form-error">{errors.fullName.message}</p>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input type="text" {...register('phone')} className="form-input" />
                    {errors.phone && <p className="form-error">{errors.phone.message}</p>}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Street Address</label>
                  <input type="text" {...register('street')} className="form-input" />
                  {errors.street && <p className="form-error">{errors.street.message}</p>}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">City</label>
                    <input type="text" {...register('city')} className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Country</label>
                    <input type="text" {...register('country')} className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Postal Code</label>
                    <input type="text" {...register('postalCode')} className="form-input" />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-sm" style={{ marginTop: '12px' }}>
                  Save Address
                </button>
              </form>
            )}

            {/* Existing Addresses List */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  style={{
                    padding: '20px',
                    border: addr.isDefault ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-lg)',
                    position: 'relative'
                  }}
                >
                  {addr.isDefault && (
                    <span className="badge badge-gold" style={{ position: 'absolute', top: '16px', right: '16px' }}>
                      DEFAULT
                    </span>
                  )}
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{addr.fullName}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginTop: '6px', lineHeight: '1.6' }}>
                    {addr.street}<br />
                    {addr.city}, {addr.country} - {addr.postalCode}<br />
                    Phone: {addr.phone}
                  </p>
                  {!addr.isDefault && (
                    <button
                      onClick={() => deleteAddress(addr.id)}
                      style={{ color: 'var(--color-error)', fontSize: '0.85rem', fontWeight: 600, marginTop: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <FiTrash2 /> Remove Address
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
