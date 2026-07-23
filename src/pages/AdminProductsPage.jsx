import React, { useEffect, useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import Breadcrumb from '../components/Breadcrumb';
import { getProducts, addProduct, deleteProduct } from '../services/productService';
import { FiPlus, FiTrash2, FiX, FiBox } from 'react-icons/fi';
import { formatPrice } from '../utils/formatPrice';

export default function AdminProductsPage() {
  const [productList, setProductList] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [discount, setDiscount] = useState("0");
  // Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState('men');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('15');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await getProducts();
    setProductList(data);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    await deleteProduct(id);

    await loadProducts();
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      const newProduct = {
        name,
        category,
        price: Number(price),
        stock: Number(stock),
        images: [imageUrl],
        sku: `SGM-${Math.floor(100 + Math.random() * 900)}`,
        rating: 5,
        reviewCount: 0,
        discountPercentage: Number(discount),
        createdAt: Date.now(),
      };

      console.log(newProduct);

      await addProduct(newProduct);

      await loadProducts();

      setShowAddModal(false);

      setName("");
      setCategory("men");
      setPrice("");
      setStock("15");
      setImageUrl("");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  return (
    <div style={{ backgroundColor: 'var(--color-bg)', paddingBottom: '80px' }}>
      <Breadcrumb items={[{ label: 'Admin', link: '/admin' }, { label: 'Manage Products' }]} />

      <div className="container" style={{ marginTop: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '32px' }}>
          <AdminSidebar />

          <div className="card" style={{ padding: '28px', backgroundColor: '#ffffff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid var(--color-primary)', paddingBottom: '12px', marginBottom: '24px' }}>
              <h1 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)' }}>Product Inventory</h1>
              <button onClick={() => setShowAddModal(true)} className="btn btn-primary btn-sm">
                <FiPlus /> Add New Designer Garment
              </button>
            </div>

            {productList.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '48px 20px', color: 'var(--color-text-muted)' }}>
                <FiBox size={48} style={{ margin: '0 auto 16px', opacity: 0.4 }} />
                <h3>No Products Found</h3>
                <p style={{ marginTop: '8px', fontSize: '0.9rem' }}>The product inventory is currently empty. Click above to add garments.</p>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
                      <th style={{ padding: '10px' }}>Garment</th>
                      <th style={{ padding: '10px' }}>SKU</th>
                      <th style={{ padding: '10px' }}>Category</th>
                      <th style={{ padding: '10px' }}>Price</th>
                      <th style={{ padding: '10px' }}>Stock</th>
                      <th style={{ padding: '10px' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productList.map((p) => (
                      <tr key={p.id} style={{ borderBottom: '1px solid var(--color-card-border)' }}>
                        <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img src={p.images[0]} alt={p.name} style={{ width: '40px', height: '50px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
                          <strong style={{ fontSize: '0.875rem' }}>{p.name}</strong>
                        </td>
                        <td style={{ padding: '12px' }}>{p.sku}</td>
                        <td style={{ padding: '12px', textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: 600 }}>{p.category}</td>
                        <td style={{ padding: '12px', fontWeight: 700 }} className="price">{formatPrice(p.price)}</td>
                        <td style={{ padding: '12px' }}>
                          <span style={{ color: p.stock < 10 ? 'var(--color-error)' : 'var(--color-success)', fontWeight: 700 }}>
                            {p.stock}
                          </span>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <button onClick={() => handleDelete(p.id)} style={{ color: 'var(--color-error)' }} title="Delete">
                            <FiTrash2 />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div className="card" style={{ width: '100%', maxWidth: '500px', padding: '32px', backgroundColor: '#ffffff', position: 'relative' }}>
            <button onClick={() => setShowAddModal(false)} style={{ position: 'absolute', top: '16px', right: '16px', fontSize: '1.2rem' }}>
              <FiX />
            </button>
            <h2 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', marginBottom: '20px' }}>Add Garment to Catalog</h2>

            <form onSubmit={handleAddProduct}>
              <div className="form-group">
                <label className="form-label">Garment Name</label>
                <input type="text" className="form-input" required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Imperial Velvet Sherwani" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="kids">Kids</option>
                    <option value="bridal">Bridal</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Price (PKR)</label>
                  <input type="number" className="form-input" required value={price} onChange={(e) => setPrice(e.target.value)} placeholder="45000" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Discount (%)</label>

                <input
                  type="number"
                  className="form-input"
                  min="0"
                  max="100"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  placeholder="0"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Stock Quantity</label>
                <input type="number" className="form-input" value={stock} onChange={(e) => setStock(e.target.value)} />
              </div>

              <div className="form-group">
                <label className="form-label">Product Image URL</label>

                <input
                  type="url"
                  className="form-input"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <button type="submit" className="btn btn-primary btn-md" style={{ width: '100%', marginTop: '12px' }}>
                Save Garment
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
