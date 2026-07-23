import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { addOrder as saveOrderToFirebase } from "../services/orderService";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import Breadcrumb from '../components/Breadcrumb';
import {
  FiTruck,
  FiLock,
  FiCopy,
  FiUploadCloud,
  FiCheck,
  FiX,
  FiSmartphone,
  FiCheckCircle,
  FiAlertCircle,
  FiDollarSign
} from 'react-icons/fi';
import { formatPrice } from '../utils/formatPrice';

const checkoutSchema = yup.object().shape({
  fullName: yup.string().required('Full Name is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  phone: yup.string().min(10, 'Enter valid phone number e.g., 03001234567').required('Phone is required'),
  street: yup.string().required('Shipping address street is required'),
  city: yup.string().required('City is required'),
  country: yup.string().required('Country is required'),
  postalCode: yup.string().required('Postal code is required'),
  paymentMethod: yup.string().required('Please select a payment method'),
  acceptTerms: yup.boolean().oneOf([true], 'You must accept the terms and return policy')
});

// Firestore rejects `undefined` values and non-plain-object instances (like
// File/Blob) anywhere in a document, including inside nested fields such as
// `paymentDetails`. This walks the whole order object recursively and makes
// sure everything left is a plain, serializable value before it gets written.
function sanitizeForFirestore(value) {
  if (value === undefined || value === null) {
    return null;
  }

  if (typeof File !== 'undefined' && value instanceof File) {
    // Never write File objects to Firestore.
    return null;
  }

  if (typeof Blob !== 'undefined' && value instanceof Blob) {
    // Never write Blob objects to Firestore.
    return null;
  }

  if (Array.isArray(value)) {
    return value.map((item) => sanitizeForFirestore(item));
  }

  if (typeof value === 'object' && value.constructor === Object) {
    const sanitized = {};
    Object.keys(value).forEach((key) => {
      const cleanValue = sanitizeForFirestore(value[key]);
      // Firestore doesn't accept `undefined`, but it does accept `null`.
      sanitized[key] = cleanValue === undefined ? null : cleanValue;
    });
    return sanitized;
  }

  return value;
}

export default function CheckoutPage() {
  const { cartItems, subtotal, discountAmount, taxAmount, shippingCost, grandTotal, clearCart } = useCart();
  const { user, addresses, addOrder } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const defaultAddr = addresses.find((a) => a.isDefault) || addresses[0];

  const [selectedMethod, setSelectedMethod] = useState('JazzCash'); // 'JazzCash' | 'EasyPaisa' | 'NayaPay' | 'SadaPay' | 'COD'
  const [transactionId, setTransactionId] = useState('');
  const [paymentNotes, setPaymentNotes] = useState('');
  const [screenshotPreview, setScreenshotPreview] = useState(null);
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const isSubmittingRef = useRef(false);

  const paymentAccounts = {
    JazzCash: {
      name: 'Sagar Ali',
      number: '0304 3313210',
      color: '#DC2626', // JazzCash Red
      badgeBg: '#FEF2F2',
      qrUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=JazzCash:03007242767:Sagarm'
    },
    EasyPaisa: {
      name: 'Sagar Ali',
      number: '0304 3313210',
      color: '#16A34A', // EasyPaisa Green
      badgeBg: '#F0FDF4',
      qrUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=EasyPaisa:03007242767:Sagarm'
    },
    NayaPay: {
      name: 'Sagar Ali',
      number: '0304 3313210',
      color: '#EA580C', // NayaPay Orange
      badgeBg: '#FFF7ED',
      qrUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=NayaPay:03007242767:Sagarm'
    },
    // SadaPay: {
    //   name: 'Sagar Ali',
    //   number: '0304 3313210',
    //   color: '#0D9488', // SadaPay Teal
    //   badgeBg: '#F0FDFA',
    //   qrUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=SadaPay:03007242767:Sagarm'
    // },
    COD: {
      name: 'Cash on Delivery',
      number: 'Pay Cash to Courier',
      color: '#1F1F1F',
      badgeBg: '#F4F4F2'
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(checkoutSchema),
    defaultValues: {
      fullName: user?.fullName || defaultAddr?.fullName || '',
      email: user?.email || '',
      phone: user?.phone || defaultAddr?.phone || '',
      street: defaultAddr?.street || '',
      city: defaultAddr?.city || '',
      country: defaultAddr?.country || '',
      postalCode: defaultAddr?.postalCode || '',
      paymentMethod: 'JazzCash',
      acceptTerms: true
    }
  });

  const handleCopyAccount = (num) => {
    navigator.clipboard.writeText(num);
    setCopiedAccount(true);
    addToast(`Account Number ${num} Copied to Clipboard!`, 'success');
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  const handleScreenshotUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        addToast('File size exceeds 5MB. Please upload a smaller image.', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshotPreview(reader.result);
        setPaymentError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const onPlaceOrder = async (formData) => {
    if (isSubmittingRef.current) {
      return;
    }

    setPaymentError('');

    // Check digital payment verification requirements
    if (selectedMethod !== 'COD') {
      if (!transactionId.trim()) {
        setPaymentError(`Transaction ID (TRX ID) is required for ${selectedMethod} payment.`);
        return;
      }
      if (!screenshotPreview) {
        setPaymentError(`Payment Screenshot proof is required for ${selectedMethod} payment.`);
        return;
      }
    }

    isSubmittingRef.current = true;

    const orderId = `SGM-ORD-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder = {
      id: orderId,
      date: new Date().toISOString(),
      userId: user.id,
      customerName: formData.fullName || "",
      email: formData.email || "",
      phone: formData.phone || "",

      total: Number(grandTotal) || 0,

      status:
        selectedMethod === "COD"
          ? "Pending Payment"
          : "Pending Verification",

      paymentMethod: selectedMethod || "",

      paymentDetails:
        selectedMethod === "COD"
          ? null
          : {
            accountName: paymentAccounts[selectedMethod]?.name || "",
            accountNumber: paymentAccounts[selectedMethod]?.number || "",
            transactionId: transactionId.trim(),
            notes: paymentNotes.trim()

          },

      items: cartItems.map((item) => ({
        id: item.product.id || "",
        name: item.product.name || "",
        price: Number(item.product.price) || 0,
        quantity: Number(item.quantity) || 0,
        selectedSize: item.size || "",
        selectedColor: item.color || "",
        image: item.product.images?.[0] || ""
      })),

      shippingAddress: {
        fullName: formData.fullName || "",
        phone: formData.phone || "",
        street: formData.street || "",
        city: formData.city || "",
        country: formData.country || "",
        postalCode: formData.postalCode || ""
      }
    };

    // Final safety pass: strips out any stray `undefined` values or
    // File/Blob instances so what we send to Firestore is guaranteed
    // to be a plain, serializable object.
    const sanitizedOrder = sanitizeForFirestore(newOrder);

    try {
      await saveOrderToFirebase(sanitizedOrder);

      clearCart();

      if (selectedMethod === 'COD') {
        addToast('Order Placed Successfully via Cash on Delivery!', 'success');
      } else {
        addToast(`Payment Submitted! Order ${orderId} is now Pending Verification.`, 'success');
      }

      navigate(`/order-success/${orderId}`);
    } catch (error) {
      console.error('Failed to save order to Firestore:', error);
      setPaymentError('Something went wrong while placing your order. Please try again.');
      addToast('Failed to place your order. Please try again.', 'error');
    } finally {
      isSubmittingRef.current = false;
    }
  };

  if (cartItems.length === 0) {
    return (
      <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '80vh', padding: '60px 0', textAlign: 'center' }}>
        <div className="container">
          <h2>Your Cart is Empty</h2>
          <p style={{ marginTop: '8px', color: 'var(--color-text-muted)' }}>Add items to your cart before proceeding to checkout.</p>
        </div>
      </div>
    );
  }

  const currentAcc = paymentAccounts[selectedMethod];

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '80vh', paddingBottom: '80px' }}>
      <Breadcrumb items={[{ label: 'Cart', link: '/cart' }, { label: 'Checkout' }]} />

      <div className="container">
        <h1 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-heading)', marginBottom: '28px', color: 'var(--color-text-main)' }}>
          Checkout & Payment
        </h1>

        <form onSubmit={handleSubmit(onPlaceOrder)}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>

            {/* Left Column: Shipping + Local Pakistani Payment Methods */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

              {/* 1. Shipping Address Form */}
              <div className="card" style={{ padding: '28px', backgroundColor: '#ffffff' }}>
                <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', borderBottom: '2px solid var(--color-primary)', paddingBottom: '10px', marginBottom: '20px' }}>
                  1. Delivery Information
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input type="text" {...register('fullName')} className="form-input" />
                    {errors.fullName && <p className="form-error">{errors.fullName.message}</p>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input type="email" {...register('email')} className="form-input" />
                    {errors.email && <p className="form-error">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Pakistani Phone Number (03XX-XXXXXXX)</label>
                  <input type="text" {...register('phone')} className="form-input" placeholder="03001234567" />
                  {errors.phone && <p className="form-error">{errors.phone.message}</p>}
                </div>

                <div className="form-group">
                  <label className="form-label">Street Address / House / Suite</label>
                  <input type="text" {...register('street')} className="form-input" placeholder="House #, Street name..." />
                  {errors.street && <p className="form-error">{errors.street.message}</p>}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">City</label>
                    <input type="text" {...register('city')} className="form-input" />
                    {errors.city && <p className="form-error">{errors.city.message}</p>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Country</label>
                    <input type="text" {...register('country')} className="form-input" readOnly value="Pakistan" />
                    {errors.country && <p className="form-error">{errors.country.message}</p>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Postal Code</label>
                    <input type="text" {...register('postalCode')} className="form-input" />
                    {errors.postalCode && <p className="form-error">{errors.postalCode.message}</p>}
                  </div>
                </div>
              </div>

              {/* 2. Pakistani Local Payment Methods */}
              <div className="card" style={{ padding: '28px', backgroundColor: '#ffffff' }}>
                <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', borderBottom: '2px solid var(--color-primary)', paddingBottom: '10px', marginBottom: '20px' }}>
                  2. Select Payment Method
                </h3>

                {/* Local Payment Radio Buttons */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px', marginBottom: '24px' }}>
                  {[
                    { id: 'JazzCash', name: 'JazzCash', color: '#DC2626' },
                    { id: 'EasyPaisa', name: 'EasyPaisa', color: '#16A34A' },
                    { id: 'NayaPay', name: 'NayaPay', color: '#EA580C' },
                    { id: 'COD', name: 'Cash on Delivery', color: '#1F1F1F' }
                  ].map((method) => {
                    const isSelected = selectedMethod === method.id;
                    return (
                      <button
                        type="button"
                        key={method.id}
                        onClick={() => {
                          setSelectedMethod(method.id);
                          setValue('paymentMethod', method.id);
                          setPaymentError('');
                        }}
                        style={{
                          padding: '14px 10px',
                          borderRadius: '10px',
                          border: isSelected ? `2px solid ${method.color}` : '1px solid var(--color-border)',
                          backgroundColor: isSelected ? 'var(--color-surface-soft)' : '#ffffff',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '6px',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        <FiSmartphone size={22} style={{ color: method.color }} />
                        <strong style={{ fontSize: '0.85rem', color: 'var(--color-text-main)' }}>{method.name}</strong>
                      </button>
                    );
                  })}
                </div>

                {/* DIGITAL PAYMENT METHOD SCREEN DETAILS */}
                {selectedMethod !== 'COD' ? (
                  <div style={{
                    backgroundColor: currentAcc.badgeBg,
                    border: `1.5px solid ${currentAcc.color}`,
                    borderRadius: '12px',
                    padding: '20px',
                    marginBottom: '20px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                      <span className="badge" style={{ backgroundColor: currentAcc.color, color: '#ffffff', fontSize: '0.85rem', padding: '6px 12px' }}>
                        {selectedMethod} Payment Details
                      </span>

                      <button
                        type="button"
                        onClick={() => handleCopyAccount(currentAcc.number)}
                        className="btn btn-sm"
                        style={{ backgroundColor: '#ffffff', border: `1px solid ${currentAcc.color}`, color: currentAcc.color, fontSize: '0.8rem' }}
                      >
                        <FiCopy /> {copiedAccount ? 'Copied!' : 'Copy Account Number'}
                      </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', alignItems: 'center', marginBottom: '20px' }}>
                      <div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '2px' }}>Account Title:</div>
                        <strong style={{ fontSize: '1.05rem', color: 'var(--color-text-main)' }}>{currentAcc.name}</strong>

                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '12px', marginBottom: '2px' }}>Account Number:</div>
                        <strong style={{ fontSize: '1.25rem', fontFamily: 'var(--font-number)', color: currentAcc.color }}>{currentAcc.number}</strong>
                      </div>

                      {/* QR Code Scan Placeholder */}
                      <div style={{ textAlign: 'center', backgroundColor: '#ffffff', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                        <img src={currentAcc.qrUrl} alt="Scan QR Code" style={{ width: '120px', height: '120px', margin: '0 auto', display: 'block' }} />
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px', display: 'block' }}>
                          Scan to Pay via {selectedMethod} App
                        </span>
                      </div>
                    </div>

                    <hr style={{ borderColor: 'var(--color-border)', margin: '16px 0' }} />

                    {/* Transaction ID Input */}
                    <div className="form-group" style={{ marginBottom: '16px' }}>
                      <label className="form-label" style={{ fontWeight: 700 }}>
                        <span>Transaction ID (TRX ID) *</span>
                        <span style={{ color: 'var(--color-error)', fontSize: '0.75rem' }}>Required</span>
                      </label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. TRX-9842103892"
                        value={transactionId}
                        onChange={(e) => { setTransactionId(e.target.value); setPaymentError(''); }}
                      />
                    </div>

                    {/* Screenshot Upload Input */}
                    <div className="form-group" style={{ marginBottom: '16px' }}>
                      <label className="form-label" style={{ fontWeight: 700 }}>
                        <span>Upload Payment Screenshot *</span>
                        <span style={{ color: 'var(--color-error)', fontSize: '0.75rem' }}>Required (JPG, PNG)</span>
                      </label>

                      {screenshotPreview ? (
                        <div style={{ position: 'relative', width: '180px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                          <img src={screenshotPreview} alt="Screenshot preview" style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
                          <button
                            type="button"
                            onClick={() => setScreenshotPreview(null)}
                            style={{
                              position: 'absolute',
                              top: '6px',
                              right: '6px',
                              backgroundColor: 'rgba(220, 38, 38, 0.9)',
                              color: '#ffffff',
                              borderRadius: '50%',
                              width: '26px',
                              height: '26px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer'
                            }}
                          >
                            <FiX size={14} />
                          </button>
                        </div>
                      ) : (
                        <label style={{
                          border: '2px dashed var(--color-primary)',
                          borderRadius: '8px',
                          padding: '20px',
                          textAlign: 'center',
                          backgroundColor: '#ffffff',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '8px'
                        }}>
                          <FiUploadCloud size={28} style={{ color: 'var(--color-primary)' }} />
                          <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Click or Drag Screenshot Here</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Max file size 5MB</span>
                          <input type="file" accept="image/*" onChange={handleScreenshotUpload} style={{ display: 'none' }} />
                        </label>
                      )}
                    </div>

                    {/* Payment Notes Input */}
                    <div className="form-group">
                      <label className="form-label">Payment Notes *</label>
                       <span style={{ color: 'var(--color-error)', fontSize: '0.75rem' }}>Required</span>
                      <input
                        type="text"
                        className="form-input"
                        required
                        placeholder="Sender name"
                        value={paymentNotes}
                        onChange={(e) => setPaymentNotes(e.target.value)}
                      />
                    </div>
                  </div>
                ) : (
                  <div style={{
                    backgroundColor: 'var(--color-surface-soft)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '12px',
                    padding: '20px',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <FiTruck size={32} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                    <div>
                      <strong style={{ display: 'block', fontSize: '1rem' }}>Cash on Delivery (COD) Selected</strong>
                      <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                        Pay total amount in cash to our courier representative upon receiving your parcel at your doorstep.
                      </p>
                    </div>
                  </div>
                )}

                {/* Validation Error Message */}
                {paymentError && (
                  <div style={{
                    backgroundColor: 'var(--color-error-bg)',
                    border: '1px solid var(--color-error)',
                    color: 'var(--color-error)',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    fontSize: '0.875rem',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <FiAlertCircle size={18} />
                    <span>{paymentError}</span>
                  </div>
                )}

                {/* Accept Terms Checkbox */}
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.875rem', cursor: 'pointer', marginTop: '16px' }}>
                  <input type="checkbox" {...register('acceptTerms')} />
                  <span>I agree to Sagarm's Terms & Conditions and 30-Day Return Policy.</span>
                </label>
                {errors.acceptTerms && <p className="form-error">{errors.acceptTerms.message}</p>}
              </div>
            </div>

            {/* Right Column: Cart Summary & Order Button */}
            <div>
              <div className="card" style={{ padding: '28px', backgroundColor: '#ffffff', position: 'sticky', top: '100px' }}>
                <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', borderBottom: '2px solid var(--color-primary)', paddingBottom: '10px', marginBottom: '20px' }}>
                  Order Summary
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: '280px', overflowY: 'auto', marginBottom: '20px' }}>
                  {cartItems.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <img src={item.product.images[0]} alt={item.product.name} style={{ width: '48px', height: '60px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
                      <div style={{ flex: 1, fontSize: '0.85rem' }}>
                        <strong style={{ display: 'block', color: 'var(--color-text-main)' }}>{item.product.name}</strong>
                        <span style={{ color: 'var(--color-text-muted)' }}>Qty: {item.quantity} | {item.size}</span>
                      </div>
                      <span className="price" style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>Subtotal</span>
                    <span className="price">{formatPrice(subtotal)}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-success)' }}>
                      <span>Discount</span>
                      <span className="price">-{formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>Sales Tax (GST)</span>
                    <span className="price">{formatPrice(taxAmount)}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>Nationwide Delivery</span>
                    <span>{shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}</span>
                  </div>

                  <div style={{ borderTop: '2px solid var(--color-primary)', paddingTop: '12px', marginTop: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem', fontWeight: 800 }}>
                    <span>Total Amount</span>
                    <span className="price" style={{ color: 'var(--color-primary)' }}>{formatPrice(grandTotal)}</span>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '24px' }}>
                  <FiLock /> {selectedMethod === 'COD' ? 'Place Order (COD)' : 'Submit Payment Screenshot'}
                </button>
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}