import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProducts } from '../services/productService';
import { REVIEWS } from '../data/reviews';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useAuth } from '../contexts/AuthContext';
import { formatPrice } from '../utils/formatPrice';
import { useToast } from '../contexts/ToastContext';
import Breadcrumb from '../components/Breadcrumb';
import RatingStars from '../components/RatingStars';
import ProductCard from '../components/ProductCard';
import SizeGuideModal from '../components/SizeGuideModal';
import {
  FiHeart,
  FiShoppingBag,
  FiShare2,
  FiScissors,
  FiCheckCircle,
  FiTruck,
  FiShield,
  FiChevronDown,
  FiChevronUp
} from 'react-icons/fi';
import { FaHeart, FaWhatsapp, FaFacebook, FaTwitter } from 'react-icons/fa';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { requireAuth } = useAuth();
  const { addToast } = useToast();

  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  // const inWishlist = isInWishlist(product.id);

  const [activeImage, setActiveImage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('desc'); // desc | specs | reviews

  // New review form state
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  const handleAddToCart = () => {
    requireAuth(() => {
      addToCart(product, selectedSize, selectedColor, quantity);
    }, 'Please login or create an account to add items to your Cart.');
  };

  const handleBuyNow = () => {
    requireAuth(() => {
      addToCart(product, selectedSize, selectedColor, quantity);
      navigate('/checkout');
    }, 'Please login or create an account to proceed with Buy Now.');
  };

  const handleWishlistToggle = () => {
    requireAuth(() => {
      toggleWishlist(product);
    }, 'Please login or create an account to save items to your Wishlist.');
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    if (platform === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`, '_blank');
    } else {
      navigator.clipboard.writeText(url);
      addToast('Product link copied to clipboard!', 'info');
    }
  };

  const submitReview = (e) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;
    addToast('Thank you for submitting your review! It is pending moderation.', 'success');
    setReviewComment('');
    setReviewName('');
  };

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await getProducts();
        const allProducts = Array.isArray(data) ? data : [];

        setProducts(allProducts);

        const found = allProducts.find((p) => String(p.id) === String(id));

        if (found) {
          setProduct(found);

          setActiveImage(found.images?.[0] || "");
          setSelectedColor(found.colors?.[0]?.name || "");
          setSelectedSize(found.sizes?.[0] || "");
        }
      } catch (err) {
        console.error("Failed to load product:", err);
      }
    };

    loadProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="container" style={{ padding: "80px 0", textAlign: "center" }}>
        Loading product...
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);

  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  if (!product) {
    return (
      <div
        style={{
          minHeight: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2>Loading product...</h2>
      </div>
    );
  }
  return (
    <div style={{ backgroundColor: 'var(--color-bg)', paddingBottom: '80px' }}>
      <Breadcrumb
        items={[
          { label: 'Shop', link: '/shop' },
          { label: product.category.toUpperCase(), link: `/shop?category=${product.category}` },
          { label: product.name }
        ]}
      />

      <div className="container" style={{ marginTop: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px' }}>
          {/* Left: Image Gallery */}
          <div>
            <div
              className="card"
              style={{
                overflow: 'hidden',
                borderRadius: 'var(--radius-xl)',
                backgroundColor: '#ffffff',
                marginBottom: '16px',
                aspectRatio: '3/4'
              }}
            >
              <img src={activeImage} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Thumbnails */}
            <div style={{ display: 'flex', gap: '12px', overflowX: 'auto' }}>
              {product.images.map((img, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  style={{
                    width: '80px',
                    height: '100px',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    border: activeImage === img ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                    padding: 0,
                    cursor: 'pointer'
                  }}
                >
                  <img src={img} alt="Thumb" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Meta & Controls */}
          <div>
            <span className="badge badge-gold" style={{ marginBottom: '8px' }}>{product.badge || 'SAGARM ORIGINAL'}</span>
            <h1 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-heading)', color: 'var(--color-text-main)', marginBottom: '8px' }}>
              {product.name}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <RatingStars rating={product.rating} count={product.reviewCount} />
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>SKU: {product.sku}</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-success)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <FiCheckCircle /> In Stock ({product.stock} left)
              </span>
            </div>

            {/* Price Box */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', padding: '16px 0', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', marginBottom: '24px' }}>
              <span className="price" style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="price" style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', textDecoration: 'line-through' }}>
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {product.discountPercentage && (
                <span className="badge badge-sale">Save {product.discountPercentage}%</span>
              )}
            </div>

            <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', marginBottom: '24px', lineHeight: '1.6' }}>
              {product.shortDescription}
            </p>

            {/* Color Swatches */}
            {product.colors && (
              <div style={{ marginBottom: '20px' }}>
                <label className="form-label" style={{ marginBottom: '8px' }}>
                  <span>Select Color: <strong style={{ color: 'var(--color-primary)' }}>{selectedColor}</strong></span>
                </label>
                <div style={{ display: 'flex', gap: '12px' }}>
                  {product.colors.map((c) => (
                    <button
                      type="button"
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: c.hex,
                        border: selectedColor === c.name ? '3px solid var(--color-primary)' : '2px solid var(--color-border)',
                        boxShadow: 'var(--shadow-sm)',
                        cursor: 'pointer'
                      }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector + Size Guide */}
            {product.sizes && (
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label className="form-label">
                    <span>Select Size: <strong style={{ color: 'var(--color-primary)' }}>{selectedSize}</strong></span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsSizeGuideOpen(true)}
                    style={{ fontSize: '0.85rem', color: 'var(--color-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
                  >
                    <FiScissors /> Size Guide
                  </button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {product.sizes.map((sz) => (
                    <button
                      type="button"
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      style={{
                        padding: '10px 18px',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        border: selectedSize === sz ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                        backgroundColor: selectedSize === sz ? 'var(--color-primary)' : '#ffffff',
                        color: selectedSize === sz ? '#ffffff' : 'var(--color-text-main)',
                        cursor: 'pointer'
                      }}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div style={{ marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <label className="form-label" style={{ margin: 0 }}>Quantity:</label>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', backgroundColor: '#ffffff' }}>
                <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))} style={{ padding: '8px 16px', fontWeight: 700, cursor: 'pointer' }}>-</button>
                <span className="num-font" style={{ padding: '8px 16px', fontWeight: 600 }}>{quantity}</span>
                <button type="button" onClick={() => setQuantity((q) => q + 1)} style={{ padding: '8px 16px', fontWeight: 700, cursor: 'pointer' }}>+</button>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
              <button
                type="button"
                onClick={handleAddToCart}
                className="btn btn-outline btn-lg"
              >
                <FiShoppingBag /> Add To Cart
              </button>
              <button type="button" onClick={handleBuyNow} className="btn btn-primary btn-lg">
                Buy Now
              </button>
            </div>

            {/* Wishlist & Share Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid var(--color-border)' }}>
              <button
                type="button"
                onClick={handleWishlistToggle}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--color-text-main)', fontWeight: 600, cursor: 'pointer' }}
              >
                {inWishlist ? <FaHeart style={{ color: 'var(--color-primary)' }} /> : <FiHeart />}
                <span>{inWishlist ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Share:</span>
                <button type="button" onClick={() => handleShare('whatsapp')} style={{ color: '#25D366', fontSize: '1.2rem', cursor: 'pointer' }}>
                  <FaWhatsapp />
                </button>
                <button type="button" onClick={() => handleShare('copy')} style={{ color: 'var(--color-primary)', fontSize: '1.1rem', cursor: 'pointer' }}>
                  <FiShare2 />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Accordions: Description, Specs, Reviews */}
        <div style={{ marginTop: '64px' }}>
          <div style={{ display: 'flex', borderBottom: '2px solid var(--color-border)', gap: '24px', marginBottom: '32px' }}>
            <button
              type="button"
              onClick={() => setActiveTab('desc')}
              style={{
                padding: '12px 0',
                fontSize: '1.1rem',
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                color: activeTab === 'desc' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                borderBottom: activeTab === 'desc' ? '3px solid var(--color-primary)' : 'none',
                cursor: 'pointer'
              }}
            >
              Description & Craftsmanship
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('specs')}
              style={{
                padding: '12px 0',
                fontSize: '1.1rem',
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                color: activeTab === 'specs' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                borderBottom: activeTab === 'specs' ? '3px solid var(--color-primary)' : 'none',
                cursor: 'pointer'
              }}
            >
              Specifications & Fabric
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('reviews')}
              style={{
                padding: '12px 0',
                fontSize: '1.1rem',
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                color: activeTab === 'reviews' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                borderBottom: activeTab === 'reviews' ? '3px solid var(--color-primary)' : 'none',
                cursor: 'pointer'
              }}
            >
              Customer Reviews ({product.reviewCount})
            </button>
          </div>

          {activeTab === 'desc' && (
            <div className="card" style={{ padding: '32px', backgroundColor: '#ffffff' }}>
              <h3 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-heading)', marginBottom: '12px' }}>
                Handcrafted Designer Luxury
              </h3>
              <p style={{ lineHeight: '1.8', color: 'var(--color-text-main)', fontSize: '1rem' }}>
                {product.description}
              </p>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="card" style={{ padding: '32px', backgroundColor: '#ffffff' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <tbody>
                  {product.specifications && Object.entries(product.specifications).map(([key, val]) => (
                    <tr key={key} style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td style={{ padding: '12px', fontWeight: 700, textTransform: 'capitalize', width: '220px', color: 'var(--color-primary)' }}>
                        {key}
                      </td>
                      <td style={{ padding: '12px', color: 'var(--color-text-main)' }}>{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="card" style={{ padding: '32px', backgroundColor: '#ffffff' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '48px', marginBottom: '40px' }}>
                <div>
                  <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)' }}>Client Feedback</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '16px 0' }}>
                    <span className="num-font" style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                      {product.rating}
                    </span>
                    <div>
                      <RatingStars rating={product.rating} showCount={false} />
                      <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                        Based on {product.reviewCount} verified purchases
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit Review Form */}
                <form onSubmit={submitReview}>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '12px' }}>Write Your Experience</h4>
                  <div className="form-group">
                    <label className="form-label">Your Name</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Full Name"
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Review Comment</label>
                    <textarea
                      className="form-textarea"
                      rows="3"
                      placeholder="Share details about fit, fabric quality, and delivery..."
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-sm">
                    Submit Review
                  </button>
                </form>
              </div>

              {/* Existing Reviews */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {REVIEWS.map((rev) => (
                  <div key={rev.id} style={{ padding: '16px', borderBottom: '1px solid var(--color-border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>{rev.customerName}</h4>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{rev.date}</span>
                    </div>
                    <RatingStars rating={rev.rating} showCount={false} />
                    <p style={{ marginTop: '8px', fontSize: '0.9rem', color: 'var(--color-text-main)' }}>{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Related Products */}
        <div style={{ marginTop: '64px' }}>
          <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', marginBottom: '32px' }}>
            You May Also Admire
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' }}>
            {relatedProducts.slice(0, 3).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>

      <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />
    </div>
  );
}
