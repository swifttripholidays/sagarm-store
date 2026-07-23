import React from 'react';
import { useWishlist } from '../contexts/WishlistContext';
import CustomerSidebar from '../components/CustomerSidebar';
import Breadcrumb from '../components/Breadcrumb';
import ProductCard from '../components/ProductCard';
import EmptyState from '../components/EmptyState';
import { FiHeart } from 'react-icons/fi';

export default function CustomerWishlistPage() {
  const { wishlist } = useWishlist();

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', paddingBottom: '80px' }}>
      <Breadcrumb items={[{ label: 'My Account', link: '/customer/dashboard' }, { label: 'Saved Wishlist' }]} />

      <div className="container" style={{ marginTop: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '32px' }}>
          <CustomerSidebar />

          <div className="card" style={{ padding: '28px', backgroundColor: '#ffffff' }}>
            <h1 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)', borderBottom: '2px solid var(--color-primary)', paddingBottom: '10px', marginBottom: '24px' }}>
              My Saved Wishlist ({wishlist.length})
            </h1>

            {wishlist.length === 0 ? (
              <EmptyState
                icon={FiHeart}
                title="Your Wishlist is Empty"
                description="Save your favorite couture items while browsing our collections."
                actionText="Explore Shop"
                actionLink="/shop"
              />
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
                {wishlist.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
