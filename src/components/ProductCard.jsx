import React from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingBag } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import RatingStars from './RatingStars';
import { motion } from 'framer-motion';
import { formatPrice } from '../utils/formatPrice';

export default function ProductCard({ product }) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { requireAuth } = useAuth();

  if (!product) return null;

  const inWishlist = product?.id ? isInWishlist(product.id) : false;
  const mainImage = Array.isArray(product?.images) && product.images.length > 0
    ? product.images[0]
    : 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80';
  const hoverImage = Array.isArray(product?.images) && product.images.length > 1
    ? product.images[1]
    : mainImage;

  const handleWishlistToggle = () => {
    requireAuth(() => toggleWishlist(product), 'Please login or create an account to save items to your Wishlist.');
  };

  const handleAddToCart = () => {
    requireAuth(() => addToCart(product), 'Please login or create an account to add items to your Cart.');
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="card"
      style={{
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        height: '100%',
        backgroundColor: '#ffffff'
      }}
    >
      {/* Product Image & Badges */}
      <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', backgroundColor: 'var(--color-surface-soft)' }}>
        <Link to={`/product/${product?.id ?? ''}`}>
          <img
            src={mainImage}
            alt={product?.name ?? 'Garment'}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s ease'
            }}
            onMouseOver={(e) => {
              if (hoverImage) e.currentTarget.src = hoverImage;
            }}
            onMouseOut={(e) => {
              e.currentTarget.src = mainImage;
            }}
          />
        </Link>

        {/* Top Badges */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {product?.badge && <span className="badge badge-gold">{product.badge}</span>}
          {(product?.discountPercentage ?? 0) > 0 && (
            <span className="badge badge-sale">-{product.discountPercentage}% OFF</span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlistToggle}
          aria-label="Toggle Wishlist"
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-sm)',
            transition: 'all 0.2s',
            cursor: 'pointer'
          }}
        >
          {inWishlist ? (
            <FaHeart style={{ color: 'var(--color-primary)', fontSize: '1.1rem' }} />
          ) : (
            <FiHeart style={{ color: 'var(--color-text-main)', fontSize: '1.1rem' }} />
          )}
        </button>
      </div>

      {/* Product Information */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-primary)', fontWeight: 600 }}>
            {product?.category ?? 'Couture'}
          </span>
          <Link to={`/product/${product?.id ?? ''}`}>
            <h3
              style={{
                fontSize: '1rem',
                fontWeight: 600,
                marginTop: '4px',
                marginBottom: '8px',
                color: 'var(--color-text-main)',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                lineHeight: '1.3'
              }}
            >
              {product?.name ?? 'Designer Garment'}
            </h3>
          </Link>
          <RatingStars rating={product?.rating ?? 5} count={product?.reviewCount ?? 0} />
        </div>

        {/* Price & Action */}
        <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span className="price" style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-primary)' }}>
              {formatPrice(product?.price ?? 0)}
            </span>
            {product?.originalPrice && (
              <span className="price" style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textDecoration: 'line-through' }}>
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className="btn btn-primary btn-sm"
            style={{ borderRadius: 'var(--radius-full)', padding: '8px 14px' }}
            title="Add to Cart"
          >
            <FiShoppingBag style={{ fontSize: '1rem' }} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
