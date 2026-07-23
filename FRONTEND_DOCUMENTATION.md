# Sagarm Atelier - Luxury E-Commerce Frontend Documentation

Welcome to the comprehensive technical documentation for **Sagarm Atelier** (`sagarm.shop`), a single-brand luxury fashion e-commerce application tailored exclusively for Pakistan.

---

## 1. Project Overview & Architecture

### Core Architecture
Sagarm Atelier is built as a single-page client-side web application using modern **React (v18)** and **Vite** with **React Router v6**. Global application state is managed using React's **Context API**, and styling is implemented via **Tailwind CSS** paired with custom CSS design tokens.

- **Market Target:** Pakistan Only (Nationwide Delivery across all cities & towns).
- **Currency:** Pakistani Rupees (PKR) formatted as `Rs. X,XXX`.
- **Supported Payment Methods:** JazzCash, EasyPaisa, NayaPay, SadaPay, and Cash on Delivery (COD).
- **Authentication:** Dual-role system (Customer & Admin) with strict OTP verification for Admin accounts.
- **Data Policy:** No hardcoded mock datasets or fake numbers. Empty states are displayed until connected to live backend APIs.

---

## 2. Complete Folder Structure

```
sagarm-atelier/
├── index.html                  # Main HTML entry point
├── package.json                # Project dependencies and scripts
├── vite.config.js              # Vite configuration
├── metadata.json               # Application metadata and permissions
├── FRONTEND_DOCUMENTATION.md   # Complete frontend architectural guide
├── API_REFERENCE.md            # Complete REST API specification
├── public/                     # Static assets (favicons, icons)
└── src/
    ├── main.jsx                # React app entry point
    ├── App.jsx                 # Main Router & Provider setup
    ├── index.css               # Global CSS styles & design tokens
    ├── components/             # Reusable UI Components
    │   ├── AdminSidebar.jsx            # Admin portal navigation drawer
    │   ├── AuthRequiredModal.jsx       # Modal prompting guest login
    │   ├── Breadcrumb.jsx              # Dynamic breadcrumb navigation bar
    │   ├── CartDrawer.jsx              # Slide-over slide cart panel
    │   ├── CustomerSidebar.jsx         # Customer dashboard navigation drawer
    │   ├── EmptyState.jsx              # Reusable empty data placeholder view
    │   ├── Footer.jsx                  # Global footer with brand links
    │   ├── LanguageSwitcher.jsx        # English / Urdu language selector
    │   ├── MegaMenu.jsx                # Multi-column drop-down navigation
    │   ├── Navbar.jsx                  # Main header with search and account controls
    │   ├── NotificationBell.jsx        # Real-time alert notifications dropdown
    │   ├── OTPVerificationModal.jsx    # 6-digit admin OTP input modal
    │   ├── Pagination.jsx              # Dynamic catalog page navigation
    │   ├── ProductCard.jsx             # Individual product grid item with hover states
    │   ├── QuickViewModal.jsx          # Fast product detail modal overlay
    │   ├── RatingStars.jsx             # Star rating display component
    │   ├── SizeGuideModal.jsx          # Measurement & size chart modal
    │   ├── Toast.jsx                   # Toast notification alert container
    │   └── UserAvatar.jsx              # User profile avatar displaying initials/image
    ├── contexts/               # Global State Context Providers
    │   ├── AuthContext.jsx             # Auth, User Session, Addresses, Orders & OTP state
    │   ├── CartContext.jsx             # Shopping cart items, coupon discounts & total calculation
    │   ├── ToastContext.jsx            # System notification messages queue
    │   └── WishlistContext.jsx         # Customer saved wishlist items
    ├── data/                   # Dynamic Data Manifests (Empty Initial States)
    │   ├── categories.js               # Category definitions array (Empty)
    │   ├── coupons.js                  # Discount vouchers & Pakistan FAQ dataset
    │   ├── products.js                 # Product catalog array (Empty)
    │   └── reviews.js                  # Customer reviews array (Empty)
    ├── i18n/                   # Internationalization Configuration
    │   └── i18n.js                     # i18next setup and language initialization
    ├── locales/                # Translation Dictionaries
    │   ├── en.json                     # English translation strings
    │   └── ur.json                     # Urdu translation strings
    ├── pages/                  # Page Route Views
    │   ├── AboutPage.jsx               # Brand heritage and atelier story
    │   ├── AdminCategoriesPage.jsx     # Admin category management view
    │   ├── AdminCouponsPage.jsx        # Admin promo vouchers management view
    │   ├── AdminCustomersPage.jsx      # Admin client directory view
    │   ├── AdminDashboardPage.jsx      # Admin analytics and metrics hub
    │   ├── AdminLoginPage.jsx          # Secure two-step admin login & OTP form
    │   ├── AdminOrdersPage.jsx         # Admin order dispatch management view
    │   ├── AdminPaymentVerificationsPage.jsx # Admin payment screenshot verification
    │   ├── AdminProductsPage.jsx       # Admin inventory & product management
    │   ├── AdminSettingsPage.jsx       # Admin store configuration settings
    │   ├── CartPage.jsx                # Dedicated shopping cart page
    │   ├── CheckoutPage.jsx            # Multi-step checkout & payment upload
    │   ├── ContactPage.jsx             # Customer support & VIP Concierge contact form
    │   ├── CustomerAddressesPage.jsx   # Customer address book management
    │   ├── CustomerDashboardPage.jsx   # Customer overview & recent orders hub
    │   ├── CustomerOrderDetailsPage.jsx# Live order tracking and receipt timeline
    │   ├── CustomerOrdersPage.jsx      # Customer order history list
    │   ├── CustomerSettingsPage.jsx    # Customer profile & security settings
    │   ├── CustomerWishlistPage.jsx    # Customer saved items grid
    │   ├── FAQPage.jsx                 # Frequently Asked Questions view
    │   ├── ForgotPasswordPage.jsx      # Password reset request form
    │   ├── HomePage.jsx                # Main landing page with collections & banners
    │   ├── LoginPage.jsx               # Customer login form
    │   ├── NotFoundPage.jsx            # 404 Error page
    │   ├── OrderSuccessPage.jsx        # Order confirmation & receipt summary
    │   ├── PrivacyPage.jsx             # Privacy policy documentation
    │   ├── ProductDetailPage.jsx       # Comprehensive garment product page
    │   ├── ReturnsPage.jsx             # 30-day exchange & return policy
    │   ├── SearchPage.jsx              # Real-time catalog search & filter results
    │   ├── ShippingPage.jsx            # Pakistan delivery policy and timelines
    │   ├── ShopPage.jsx                # Main catalog browsing with filters
    │   ├── SignupPage.jsx              # Customer account creation form
    │   └── TermsPage.jsx               # Terms and conditions documentation
    ├── services/               # API Service Layer
    │   └── api.js                      # Axios instance configured for backend requests
    └── utils/                  # Helper Utilities
        └── formatPrice.js              # Currency formatter (`Rs. X,XXX`)
```

---

## 3. Route Hierarchy & Protected Route Guards

The app implements two distinct route guards to ensure security:

1. **`ProtectedAdminRoute`**: Prevents unauthenticated users and non-admin customers from accessing `/admin/*`. Automatically redirects unauthorized visitors to `/admin/login`.
2. **`ProtectedCustomerRoute`**: Protects customer account routes (`/customer/*` and `/checkout`). Automatically triggers the `AuthRequiredModal` prompting guest visitors to log in.

### Route Map
| URL Path | View Component | Protection Guard | Access Role |
| :--- | :--- | :--- | :--- |
| `/` | `HomePage` | Public | Everyone |
| `/shop` | `ShopPage` | Public | Everyone |
| `/product/:id` | `ProductDetailPage` | Public | Everyone |
| `/search` | `SearchPage` | Public | Everyone |
| `/cart` | `CartPage` | Public | Everyone |
| `/checkout` | `CheckoutPage` | `ProtectedCustomerRoute` | Customer |
| `/order-success/:orderId` | `OrderSuccessPage` | Public | Everyone |
| `/login` | `LoginPage` | Public | Everyone |
| `/signup` | `SignupPage` | Public | Everyone |
| `/forgot-password` | `ForgotPasswordPage` | Public | Everyone |
| `/about` | `AboutPage` | Public | Everyone |
| `/contact` | `ContactPage` | Public | Everyone |
| `/faq` | `FAQPage` | Public | Everyone |
| `/shipping` | `ShippingPage` | Public | Everyone |
| `/returns` | `ReturnsPage` | Public | Everyone |
| `/privacy` | `PrivacyPage` | Public | Everyone |
| `/terms` | `TermsPage` | Public | Everyone |
| `/customer/dashboard` | `CustomerDashboardPage` | `ProtectedCustomerRoute` | Customer |
| `/customer/orders` | `CustomerOrdersPage` | `ProtectedCustomerRoute` | Customer |
| `/customer/orders/:id` | `CustomerOrderDetailsPage` | `ProtectedCustomerRoute` | Customer |
| `/customer/wishlist` | `CustomerWishlistPage` | `ProtectedCustomerRoute` | Customer |
| `/customer/addresses` | `CustomerAddressesPage` | `ProtectedCustomerRoute` | Customer |
| `/customer/settings` | `CustomerSettingsPage` | `ProtectedCustomerRoute` | Customer |
| `/admin/login` | `AdminLoginPage` | Unprotected Admin Portal | Everyone |
| `/admin` | `AdminDashboardPage` | `ProtectedAdminRoute` | Master Admin |
| `/admin/payments` | `AdminPaymentVerificationsPage` | `ProtectedAdminRoute` | Master Admin |
| `/admin/products` | `AdminProductsPage` | `ProtectedAdminRoute` | Master Admin |
| `/admin/orders` | `AdminOrdersPage` | `ProtectedAdminRoute` | Master Admin |
| `/admin/categories` | `AdminCategoriesPage` | `ProtectedAdminRoute` | Master Admin |
| `/admin/coupons` | `AdminCouponsPage` | `ProtectedAdminRoute` | Master Admin |
| `/admin/customers` | `AdminCustomersPage` | `ProtectedAdminRoute` | Master Admin |
| `/admin/settings` | `AdminSettingsPage` | `ProtectedAdminRoute` | Master Admin |
| `*` | `NotFoundPage` | Public | Everyone |

---

## 4. State Management & Context API

The frontend relies on 4 React Context Providers wrapped at the root in `App.jsx`:

### 1. `AuthContext`
Manages user session, authentication, saved address book, orders, and Admin OTP logic.
- **State Properties:**
  - `user`: Currently logged-in user object (`null` if guest).
  - `addresses`: Array of customer saved shipping addresses.
  - `orders`: Global array of customer orders.
  - `adminPendingLogin`: Holds `{ email, password }` during OTP verification step.
  - `adminOtpState`: Holds `{ code, email, expiresAt }` for 6-digit OTP verification.
- **Key Methods:**
  - `requireAuth(callback, customMessage)`: Guards guest actions; opens `AuthRequiredModal` if unauthenticated.
  - `login(email, password)`: Logs in customer account.
  - `initiateAdminLogin(email, password)`: Verifies credentials, generates 6-digit OTP, sets 2-minute expiry, and triggers OTP screen.
  - `verifyAdminOtp(enteredOtp)`: Validates entered OTP code against generated code. Sets admin session on success.
  - `resendAdminOtp()`: Generates new 6-digit OTP code and resets 2-minute timer.
  - `approvePayment(orderId)`: Admin approves customer payment proof (sets order status to `Confirmed`).
  - `rejectPayment(orderId)`: Admin rejects invalid payment screenshot (sets order status to `Rejected`).

### 2. `CartContext`
Manages shopping cart items, quantity adjustments, applied coupon discounts, and pricing totals.
- **Key Methods:**
  - `addToCart(product, quantity, size, color)`: Adds item or updates existing item quantity.
  - `removeFromCart(itemId)`: Removes item from cart.
  - `updateQuantity(itemId, newQty)`: Updates quantity of item.
  - `applyCoupon(code)`: Validates code against active coupons and applies percentage discount.
  - `clearCart()`: Empties cart upon successful order placement.

### 3. `WishlistContext`
Manages customer saved items list with persistent local storage.
- **Key Methods:**
  - `toggleWishlist(product)`: Adds or removes garment from saved wishlist.
  - `isInWishlist(productId)`: Returns boolean indicating if product is saved.

### 4. `ToastContext`
Manages real-time alert notifications queue (success, error, info, warning).

---

## 5. Form Validation Logic

Form handling across signup, address entry, and checkout forms uses **React Hook Form** paired with **Yup** schema validation:

- **Email Validation:** Required valid RFC email pattern.
- **Phone Validation:** Requires Pakistani phone number format (e.g. `+92 300 1234567` or `03001234567`).
- **Payment Verification:** Transaction ID (TRX ID) and screenshot file upload are strictly validated during checkout for JazzCash, EasyPaisa, NayaPay, and SadaPay.

---

## 6. Key Application Flows

### Admin OTP Authentication Flow
```
Admin visits /admin or /admin/login
  └─> Email & Password Input
  └─> Initiate Admin Login (Generate 6-Digit OTP, 120s timer)
  └─> Display OTP Verification Modal
        ├─> Invalid OTP ──> Show "Invalid OTP" error
        ├─> OTP Expired ──> Show "OTP Expired" error + "Resend OTP" button
        └─> Valid OTP   ──> Authenticate Admin Session ──> Open Admin Dashboard
```

### Checkout & Payment Proof Upload Flow
```
Customer Cart
  └─> Proceed to Checkout (Guard via ProtectedCustomerRoute)
  └─> Select Shipping Address
  └─> Choose Payment Method:
        ├─> Cash on Delivery (COD)
        └─> Digital Payment (JazzCash / EasyPaisa / NayaPay / SadaPay)
              └─> Display Official Account Number & Account Title
              └─> Enter Transaction TRX ID
              └─> Upload Payment Screenshot Proof
  └─> Place Order
  └─> Order Created with Status: "Pending Verification"
  └─> Redirect to /order-success/:orderId
```

### Admin Payment Verification Flow
```
Admin Dashboard -> /admin/payments
  └─> View Pending Payment Verifications
  └─> Inspect Customer TRX ID & Full-Res Payment Screenshot
  ├─> Click "Approve" ──> Order Status updated to "Confirmed"
  └─> Click "Reject"  ──> Order Status updated to "Rejected"
```

---

## 7. Firebase & FastAPI Backend Integration Guide

To connect this frontend to a production backend (Firebase Firestore or FastAPI Python server):

### Step 1: Connecting with Firebase
1. Install Firebase package: `npm install firebase`.
2. Create `/src/services/firebase.js`:
```javascript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

### Step 2: Connecting with FastAPI Backend
1. Configure Environment Variable in `.env`:
```env
VITE_API_BASE_URL=https://api.sagarm.shop/v1
```
2. Update `/src/services/api.js` to enable automatic bearer token headers:
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('sagarm_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

---

## 8. Database Schema Recommendations

### Firestore Collections / PostgreSQL Tables Structure

#### `users`
- `id` (string/UUID, Primary Key)
- `fullName` (string)
- `email` (string, Unique)
- `phone` (string)
- `role` (string: `'customer'` | `'admin'`)
- `createdAt` (timestamp)

#### `products`
- `id` (string/UUID, Primary Key)
- `name` (string)
- `slug` (string, Unique)
- `sku` (string, Unique)
- `category` (string: `'men'` | `'women'` | `'kids'` | `'bridal'`)
- `price` (number, PKR)
- `stock` (integer)
- `images` (array of image URL strings)
- `sizes` (array: `['S', 'M', 'L', 'XL']`)
- `rating` (number)
- `createdAt` (timestamp)

#### `orders`
- `id` (string, e.g. `SGM-ORD-984210`)
- `userId` (string, Foreign Key -> users.id)
- `customerName` (string)
- `email` (string)
- `phone` (string)
- `shippingAddress` (object: `{ street, city, postalCode, country }`)
- `paymentMethod` (string: `'JazzCash'` | `'EasyPaisa'` | `'NayaPay'` | `'SadaPay'` | `'COD'`)
- `paymentDetails` (object: `{ transactionId, screenshotUrl, notes }`)
- `status` (string: `'Pending Verification'` | `'Confirmed'` | `'Packing'` | `'Shipped'` | `'Delivered'` | `'Rejected'` | `'Cancelled'`)
- `total` (number, PKR)
- `items` (array of ordered items)
- `createdAt` (timestamp)

---

## 9. Required Environment Variables

Add these to your deployment configuration or `.env` file:

```env
# API Base URL
VITE_API_BASE_URL=https://api.sagarm.shop/v1

# Firebase Configuration (Optional if using Firebase)
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

## 10. Deployment Guide

### Deployment on Vercel / Cloud Run / Netlify
1. Build static production assets:
   ```bash
   npm run build
   ```
2. Output directory: `dist/`
3. Ensure single-page application fallback is enabled so all client requests route to `index.html`.
