import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './i18n';

// Context Providers
import { ToastProvider } from './contexts/ToastContext';
import { AuthProvider } from './contexts/AuthContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { CartProvider } from './contexts/CartContext';

// Protected Route Guards
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import ProtectedCustomerRoute from './components/ProtectedCustomerRoute';

// Global Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ToastContainer from './components/ToastContainer';

// Public Pages
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import SearchPage from './pages/SearchPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import ShippingPage from './pages/ShippingPage';
import ReturnsPage from './pages/ReturnsPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import NotFoundPage from './pages/NotFoundPage';

// Customer Pages
import CustomerDashboardPage from './pages/CustomerDashboardPage';
import CustomerOrdersPage from './pages/CustomerOrdersPage';
import CustomerOrderDetailsPage from './pages/CustomerOrderDetailsPage';
import CustomerWishlistPage from './pages/CustomerWishlistPage';
import CustomerAddressesPage from './pages/CustomerAddressesPage';
import CustomerSettingsPage from './pages/CustomerSettingsPage';

// Admin Pages
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminPaymentVerificationsPage from './pages/AdminPaymentVerificationsPage';
import AdminProductsPage from './pages/AdminProductsPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
import AdminCategoriesPage from './pages/AdminCategoriesPage';
import AdminCouponsPage from './pages/AdminCouponsPage';
import AdminCustomersPage from './pages/AdminCustomersPage';
import AdminSettingsPage from './pages/AdminSettingsPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Layout wrapper to hide Navbar/Footer on Admin Dashboard pages
function MainLayout({ children }) {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin') && location.pathname !== '/admin/login';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {!isAdminPath && <Navbar />}
      <CartDrawer />
      <ToastContainer />
      <main style={{ flex: 1 }}>{children}</main>
      {!isAdminPath && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <ScrollToTop />
              <MainLayout>
                <Routes>
                  {/* Public Store Routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/shop" element={<ShopPage />} />
                  <Route path="/men" element={<ShopPage category="men" />} />
                  <Route path="/women" element={<ShopPage category="women" />} />
                  <Route path="/kids" element={<ShopPage category="kids" />} />
                  <Route path="/new-arrivals" element={<ShopPage sort="newest" />} />
                  <Route path="/sale" element={<ShopPage onSale={true} />} />
                  <Route path="/product/:id" element={<ProductDetailPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/search" element={<SearchPage />} />

                  {/* Customer Protected Checkout & Order Success */}
                  <Route
                    path="/checkout"
                    element={
                      <ProtectedCustomerRoute>
                        <CheckoutPage />
                      </ProtectedCustomerRoute>
                    }
                  />
                  <Route path="/order-success/:orderId" element={<OrderSuccessPage />} />

                  {/* Customer Auth Routes */}
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />

                  {/* Brand Info Pages */}
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/faq" element={<FAQPage />} />
                  <Route path="/shipping" element={<ShippingPage />} />
                  <Route path="/returns" element={<ReturnsPage />} />
                  <Route path="/privacy" element={<PrivacyPage />} />
                  <Route path="/terms" element={<TermsPage />} />

                  {/* Protected Customer Portal */}
                  <Route
                    path="/customer/dashboard"
                    element={
                      <ProtectedCustomerRoute>
                        <CustomerDashboardPage />
                      </ProtectedCustomerRoute>
                    }
                  />
                  <Route
                    path="/customer/orders"
                    element={
                      <ProtectedCustomerRoute>
                        <CustomerOrdersPage />
                      </ProtectedCustomerRoute>
                    }
                  />
                  <Route
                    path="/customer/orders/:id"
                    element={
                      <ProtectedCustomerRoute>
                        <CustomerOrderDetailsPage />
                      </ProtectedCustomerRoute>
                    }
                  />
                  <Route
                    path="/customer/wishlist"
                    element={
                      <ProtectedCustomerRoute>
                        <CustomerWishlistPage />
                      </ProtectedCustomerRoute>
                    }
                  />
                  <Route
                    path="/customer/addresses"
                    element={
                      <ProtectedCustomerRoute>
                        <CustomerAddressesPage />
                      </ProtectedCustomerRoute>
                    }
                  />
                  <Route
                    path="/customer/settings"
                    element={
                      <ProtectedCustomerRoute>
                        <CustomerSettingsPage />
                      </ProtectedCustomerRoute>
                    }
                  />

                  {/* Admin Login Route (Unprotected) */}
                  <Route path="/admin/login" element={<AdminLoginPage />} />

                  {/* Strictly Protected Admin Portal Routes */}
                  <Route
                    path="/admin"
                    element={
                      <ProtectedAdminRoute>
                        <AdminDashboardPage />
                      </ProtectedAdminRoute>
                    }
                  />
                  <Route
                    path="/admin/payments"
                    element={
                      <ProtectedAdminRoute>
                        <AdminPaymentVerificationsPage />
                      </ProtectedAdminRoute>
                    }
                  />
                  <Route
                    path="/admin/products"
                    element={
                      <ProtectedAdminRoute>
                        <AdminProductsPage />
                      </ProtectedAdminRoute>
                    }
                  />
                  <Route
                    path="/admin/orders"
                    element={
                      <ProtectedAdminRoute>
                        <AdminOrdersPage />
                      </ProtectedAdminRoute>
                    }
                  />
                  <Route
                    path="/admin/categories"
                    element={
                      <ProtectedAdminRoute>
                        <AdminCategoriesPage />
                      </ProtectedAdminRoute>
                    }
                  />
                  <Route
                    path="/admin/coupons"
                    element={
                      <ProtectedAdminRoute>
                        <AdminCouponsPage />
                      </ProtectedAdminRoute>
                    }
                  />
                  <Route
                    path="/admin/customers"
                    element={
                      <ProtectedAdminRoute>
                        <AdminCustomersPage />
                      </ProtectedAdminRoute>
                    }
                  />
                  <Route
                    path="/admin/settings"
                    element={
                      <ProtectedAdminRoute>
                        <AdminSettingsPage />
                      </ProtectedAdminRoute>
                    }
                  />

                  {/* 404 Catch All */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </MainLayout>
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
