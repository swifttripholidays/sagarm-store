// import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import React, { useState, useMemo, useEffect } from 'react';
import { getProducts } from '../services/productService';
import { getCategories } from "../services/categoryService";
import ProductCard from '../components/ProductCard';
import Breadcrumb from '../components/Breadcrumb';
import Pagination from '../components/Pagination';
import EmptyState from '../components/EmptyState';
import { FiFilter, FiGrid, FiList, FiX } from 'react-icons/fi';
import { formatPrice } from '../utils/formatPrice';

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategoryParam = searchParams.get('category') || 'all';
  const activeSubcategoryParam = searchParams.get('sub') || 'all';
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(activeCategoryParam);
  const [selectedSize, setSelectedSize] = useState('all');
  const [priceLimit, setPriceLimit] = useState(150000);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        console.log("Products from Firebase:", data);
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const productData = await getProducts();
        const categoryData = await getCategories();

        setProducts(productData);
        setCategories(categoryData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category Filter
        if (
          selectedCategory !== "all" &&
          p.category?.toLowerCase() !== selectedCategory.toLowerCase()
        ) {
          return false;
        }

        // Subcategory Filter
        if (
          activeSubcategoryParam !== "all" &&
          p.subcategory &&
          p.subcategory.toLowerCase() !== activeSubcategoryParam.toLowerCase()
        ) {
          return false;
        }

        // Size Filter
        if (
          selectedSize !== "all" &&
          Array.isArray(p.sizes) &&
          !p.sizes.includes(selectedSize)
        ) {
          return false;
        }

        // Price Filter
        if (Number(p.price) > priceLimit) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "price-low":
            return a.price - b.price;

          case "price-high":
            return b.price - a.price;

          case "rating":
            return (b.rating || 0) - (a.rating || 0);

          default:
            return 0;
        }
      });
  }, [
    products,
    selectedCategory,
    activeSubcategoryParam,
    selectedSize,
    priceLimit,
    sortBy,
  ]);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleCategoryChange = (catSlug) => {
    setSelectedCategory(catSlug);
    setSearchParams({ category: catSlug });
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: '50px' }}>
        Loading products...
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '80vh', paddingBottom: '80px' }}>
      <Breadcrumb items={[{ label: 'Shop Collection', link: '/shop' }, { label: selectedCategory.toUpperCase() }]} />

      <div className="container">

        {/* Header Title */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)' }}>
              {selectedCategory === 'all' ? 'All Luxury Collections' : `${selectedCategory.toUpperCase()} Line`}
            </h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
              Showing {filteredProducts.length} exclusive designer garments
            </p>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* View Mode */}
            <div style={{ display: 'flex', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
              <button
                onClick={() => setViewMode('grid')}
                style={{
                  padding: '8px 12px',
                  backgroundColor: viewMode === 'grid' ? 'var(--color-primary)' : '#ffffff',
                  color: viewMode === 'grid' ? '#ffffff' : 'var(--color-text-main)'
                }}
              >
                <FiGrid />
              </button>
              <button
                onClick={() => setViewMode('list')}
                style={{
                  padding: '8px 12px',
                  backgroundColor: viewMode === 'list' ? 'var(--color-primary)' : '#ffffff',
                  color: viewMode === 'list' ? '#ffffff' : 'var(--color-text-main)'
                }}
              >
                <FiList />
              </button>
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="form-select"
              style={{ width: '180px', padding: '8px 12px' }}
            >
              <option value="featured">Sort by: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Main Sidebar + Grid Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '32px' }}>
          {/* Sidebar Filters */}
          <aside className="card" style={{ padding: '24px', height: 'fit-content', backgroundColor: '#ffffff' }}>
            <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)', borderBottom: '2px solid var(--color-primary)', paddingBottom: '10px', marginBottom: '20px' }}>
              Filter Products
            </h3>

            {/* Categories */}
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--color-primary)', fontWeight: 700, marginBottom: '10px' }}>
                Categories
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button
                  onClick={() => handleCategoryChange('all')}
                  style={{
                    textAlign: 'left',
                    fontWeight: selectedCategory === 'all' ? 700 : 400,
                    color: selectedCategory === 'all' ? 'var(--color-primary)' : 'var(--color-text-main)'
                  }}
                >
                  All Collections
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.slug)}
                    style={{
                      textAlign: 'left',
                      fontWeight: selectedCategory === cat.slug ? 700 : 400,
                      color: selectedCategory === cat.slug ? 'var(--color-primary)' : 'var(--color-text-main)'
                    }}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Filter */}
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--color-primary)', fontWeight: 700, marginBottom: '10px' }}>
                Size
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['all', 'XS', 'S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      border: '1px solid var(--color-border)',
                      backgroundColor: selectedSize === sz ? 'var(--color-primary)' : '#ffffff',
                      color: selectedSize === sz ? '#ffffff' : 'var(--color-text-main)'
                    }}
                  >
                    {sz.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--color-primary)', fontWeight: 700, marginBottom: '10px' }}>
                Max Price: {formatPrice(priceLimit)}
              </h4>
              <input
                type="range"
                min="2000"
                max="150000"
                step="2000"
                value={priceLimit}
                onChange={(e) => setPriceLimit(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--color-primary)' }}
              />
            </div>
          </aside>

          {/* Product Grid Area */}
          <div>
            {paginatedProducts.length === 0 ? (
              <EmptyState title="No Products Match Your Criteria" description="Try clearing filters to see more results." />
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(260px, 1fr))' : '1fr',
                  gap: '24px'
                }}
              >
                {paginatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(pg) => setCurrentPage(pg)} />
          </div>
        </div>
      </div>
    </div>
  );
}
