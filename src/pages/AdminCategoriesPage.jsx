import React, { useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import Breadcrumb from '../components/Breadcrumb';
import { FiPlus, FiGrid } from 'react-icons/fi';

export default function AdminCategoriesPage() {
  const [cats, setCats] = useState([]);
  const [newCatName, setNewCatName] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    const cat = {
      id: `cat-${Date.now()}`,
      name: newCatName,
      slug: newCatName.toLowerCase().replace(/\s+/g, '-'),
      subcategories: ['Couture', 'Pret']
    };
    setCats([...cats, cat]);
    setNewCatName('');
  };

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', paddingBottom: '80px' }}>
      <Breadcrumb items={[{ label: 'Admin', link: '/admin' }, { label: 'Categories' }]} />

      <div className="container" style={{ marginTop: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '32px' }}>
          <AdminSidebar />

          <div className="card" style={{ padding: '28px', backgroundColor: '#ffffff' }}>
            <h1 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)', borderBottom: '2px solid var(--color-primary)', paddingBottom: '10px', marginBottom: '24px' }}>
              Collection Categories
            </h1>

            <form onSubmit={handleAdd} style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
              <input
                type="text"
                className="form-input"
                placeholder="New Category Name..."
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
              />
              <button type="submit" className="btn btn-primary btn-sm" style={{ flexShrink: 0 }}>
                <FiPlus /> Add Category
              </button>
            </form>

            {cats.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '48px 20px', color: 'var(--color-text-muted)' }}>
                <FiGrid size={48} style={{ margin: '0 auto 16px', opacity: 0.4 }} />
                <h3>No Categories Found</h3>
                <p style={{ marginTop: '8px', fontSize: '0.9rem' }}>No categories defined yet. Enter a category name above to create one.</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
                {cats.map((c) => (
                  <div key={c.id} style={{ padding: '20px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
                    <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)' }}>{c.name}</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>Slug: /{c.slug}</p>
                    <div style={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {c.subcategories?.map((sub, idx) => (
                        <span key={idx} className="badge badge-gold" style={{ fontSize: '0.75rem' }}>{sub}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
