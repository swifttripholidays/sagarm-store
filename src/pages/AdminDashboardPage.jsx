import React, { useState, useEffect } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import Breadcrumb from '../components/Breadcrumb';
import { getProducts, addProduct, deleteProduct } from '../services/productService';
import { useAuth } from '../contexts/AuthContext';
import { FiShoppingBag, FiUsers, FiBox, FiAlertCircle, FiTrendingUp } from 'react-icons/fi';
import { formatPrice } from '../utils/formatPrice';

export default function AdminDashboardPage() {
  const { orders = [] } = useAuth();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(Array.isArray(data) ? data : data.products || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  const lowStockProducts = products.filter((p) => p.stock < 10);

  const totalRevenue = orders.reduce((sum, ord) => {
    if (ord.status === 'Confirmed' || ord.status === 'Delivered') {
      return sum + (ord.total || 0);
    }
    return sum;
  }, 0);

  const uniqueCustomersCount = new Set(orders.map((o) => o.email)).size;

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', paddingBottom: '80px' }}>
      <Breadcrumb items={[{ label: 'Admin Portal' }, { label: 'Dashboard' }]} />

      <div className="container" style={{ marginTop: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '32px' }}>
          <AdminSidebar />

          <div>
            <div className="card" style={{ padding: '28px', backgroundColor: '#ffffff', marginBottom: '24px' }}>
              <h1 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
                Sagarm Atelier Master Admin
              </h1>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
                Real-time inventory analytics, revenue metrics, and order dispatch monitoring.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '28px' }}>
              <div className="card" style={{ padding: '20px', backgroundColor: '#ffffff' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Total Revenue
                </span>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                  <span className="price num-font" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                    {formatPrice(totalRevenue)}
                  </span>
                  <FiTrendingUp style={{ fontSize: '1.8rem', color: 'var(--color-primary)' }} />
                </div>
              </div>

              <div className="card" style={{ padding: '20px', backgroundColor: '#ffffff' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Total Orders
                </span>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                  <span className="num-font" style={{ fontSize: '2rem', fontWeight: 800 }}>
                    {orders.length}
                  </span>
                  <FiShoppingBag style={{ fontSize: '1.8rem', color: 'var(--color-secondary)' }} />
                </div>
              </div>

              <div className="card" style={{ padding: '20px', backgroundColor: '#ffffff' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Active Products
                </span>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                  <span className="num-font" style={{ fontSize: '2rem', fontWeight: 800 }}>
                    {products.length}
                  </span>
                  <FiBox style={{ fontSize: '1.8rem', color: 'var(--color-primary)' }} />
                </div>
              </div>

              <div className="card" style={{ padding: '20px', backgroundColor: '#ffffff' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Registered Customers
                </span>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                  <span className="num-font" style={{ fontSize: '2rem', fontWeight: 800 }}>
                    {uniqueCustomersCount}
                  </span>
                  <FiUsers style={{ fontSize: '1.8rem', color: 'var(--color-accent-orange)' }} />
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: '24px', backgroundColor: '#ffffff', marginBottom: '28px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
              <p style={{ fontSize: '0.9rem', fontStyle: 'italic' }}>
                Analytics will appear when backend data becomes available.
              </p>
            </div>

            {lowStockProducts.length > 0 && (
              <div className="card" style={{ padding: '24px', backgroundColor: '#ffffff', borderLeft: '4px solid var(--color-warning)', marginBottom: '28px' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <FiAlertCircle style={{ color: 'var(--color-warning)' }} /> Low Stock Inventory Warning ({lowStockProducts.length} items)
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {lowStockProducts.map((p) => (
                    <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                      <span>{p.name} (SKU: {p.sku})</span>
                      <strong style={{ color: 'var(--color-error)' }}>Only {p.stock} remaining</strong>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
