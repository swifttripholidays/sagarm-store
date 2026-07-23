import React from 'react';
import AdminSidebar from '../components/AdminSidebar';
import Breadcrumb from '../components/Breadcrumb';
import { useToast } from '../contexts/ToastContext';
import { FiSave } from 'react-icons/fi';

export default function AdminSettingsPage() {
  const { addToast } = useToast();

  const handleSave = (e) => {
    e.preventDefault();
    addToast('Store settings updated successfully!', 'success');
  };

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', paddingBottom: '80px' }}>
      <Breadcrumb items={[{ label: 'Admin', link: '/admin' }, { label: 'Store Settings' }]} />

      <div className="container" style={{ marginTop: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '32px' }}>
          <AdminSidebar />

          <div className="card" style={{ padding: '28px', backgroundColor: '#ffffff', maxWidth: '600px' }}>
            <h1 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)', borderBottom: '2px solid var(--color-primary)', paddingBottom: '10px', marginBottom: '24px' }}>
              Sagarm Store Configuration
            </h1>

            <form onSubmit={handleSave}>
              <div className="form-group">
                <label className="form-label">Brand Name</label>
                <input type="text" className="form-input" defaultValue="Sagarm" disabled />
              </div>

              <div className="form-group">
                <label className="form-label">Store Domain</label>
                <input type="text" className="form-input" defaultValue="sagarm.shop" disabled />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Default Tax Rate (%)</label>
                  <input type="number" className="form-input" defaultValue="5" />
                </div>

                <div className="form-group">
                  <label className="form-label">Free Shipping Threshold ($)</label>
                  <input type="number" className="form-input" defaultValue="300" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Announcement Top Bar Text</label>
                <input type="text" className="form-input" defaultValue="✨ Free Worldwide Express Shipping on Orders Over $300 | Use Code SAGARM10 For 10% Off ✨" />
              </div>

              <button type="submit" className="btn btn-primary btn-md" style={{ marginTop: '16px' }}>
                <FiSave /> Save Store Configuration
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
