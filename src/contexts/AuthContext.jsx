import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';
import AuthRequiredModal from '../components/AuthRequiredModal';
import {
  addOrder as addOrderToFirestore,
  getOrders,
  getOrdersByUser,
  updateOrderStatus as updateOrderStatusInFirestore
} from "../services/orderService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { addToast } = useToast();

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('sagarm_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [addresses, setAddresses] = useState(() => {
    const saved = localStorage.getItem('sagarm_addresses');
    return saved ? JSON.parse(saved) : [];
  });

  // Global Auth Required Modal State
  const [authModalState, setAuthModalState] = useState({
    isOpen: false,
    message: '',
    onSuccessCallback: null
  });

  // Admin Login OTP Flow State
  const [adminPendingLogin, setAdminPendingLogin] = useState(null);
  const [adminOtpState, setAdminOtpState] = useState({
    code: '',
    email: '',
    expiresAt: 0
  });

  // Orders Persistence (Firestore is the single source of truth)
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('sagarm_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('sagarm_user');
    }
  }, [user]);

  // Fetch the current orders from Firestore, scoped by role.
  const refreshOrders = async (currentUser) => {
    if (!currentUser) {
      setOrders([]);
      return [];
    }

    setOrdersLoading(true);
    try {
      const data =
        currentUser.role === "admin"
          ? await getOrders()             // All orders
          : await getOrdersByUser(currentUser.id); // Only this user's orders

      setOrders(data);
      return data;
    } catch (error) {
      console.error("Failed to load orders from Firestore:", error);
      addToast("Failed to load orders.", "error");
      return [];
    } finally {
      setOrdersLoading(false);
    }
  };

  useEffect(() => {
    refreshOrders(user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const requireAuth = (actionCallback, customMessage) => {
    if (user) {
      if (typeof actionCallback === 'function') {
        actionCallback();
      }
      return true;
    } else {
      setAuthModalState({
        isOpen: true,
        message: customMessage || 'Please login or create an account to continue shopping.',
        onSuccessCallback: actionCallback || null
      });
      return false;
    }
  };

  const closeAuthModal = () => {
    setAuthModalState({
      isOpen: false,
      message: '',
      onSuccessCallback: null
    });
  };

  // Standard Customer Login
  const login = (email, password) => {
    // Check if trying admin credentials via regular customer form -> inform them to use Admin Login
    if (email.toLowerCase().includes('admin') || email === 'sagarshop.pk@gmail.com') {
      return { success: false, isRedirectToAdmin: true, error: 'Please use the secure Admin Login Portal.' };
    }

    const customerUser = {
      id: `usr-${Date.now()}`,
      fullName: email.split('@')[0].toUpperCase().replace('.', ' ') || 'Valued Customer',
      email,
      role: 'customer',
      dob: '1995-05-15',
      phone: '+92 300 7654321',
      avatar: null
    };

    setUser(customerUser);
    addToast(`Welcome back, ${customerUser.fullName}!`, 'success');

    if (authModalState.onSuccessCallback) {
      authModalState.onSuccessCallback();
    }
    closeAuthModal();

    return { success: true, isAdmin: false };
  };

  // Admin Step 1: Initiate Admin Login & Send OTP
  const initiateAdminLogin = (email, password) => {
    if (!email || !password) {
      addToast('Email and password are required.', 'error');
      return { success: false, error: 'Email and password are required.' };
    }

    // Verify admin email
    if (!email.toLowerCase().includes('admin')) {
      addToast('Invalid Admin Credentials.', 'error');
      return { success: false, error: 'Invalid admin credentials.' };
    }

    // Generate 6-digit OTP
    const generatedOtp = '123456'; // Default OTP code
    const expiresAt = Date.now() + 120 * 1000; // 2 minutes expiry

    setAdminPendingLogin({ email, password });
    setAdminOtpState({
      code: generatedOtp,
      email,
      expiresAt
    });

    addToast(`6-Digit OTP Sent to ${email}! (Code: ${generatedOtp})`, 'info');
    return { success: true, otpSent: true, demoOtp: generatedOtp };
  };

  // Admin Step 2: Verify OTP
  const verifyAdminOtp = (enteredOtp) => {
    if (!adminPendingLogin || !adminOtpState.code) {
      return { success: false, error: 'No pending admin session found.' };
    }

    if (Date.now() > adminOtpState.expiresAt) {
      addToast('OTP Expired! Please request a new code.', 'error');
      return { success: false, isExpired: true, error: 'OTP Expired' };
    }

    if (enteredOtp.trim() !== adminOtpState.code) {
      addToast('Invalid OTP! Please check the code.', 'error');
      return { success: false, error: 'Invalid OTP' };
    }

    // OTP Verified Successfully -> Set Admin Session
    const adminUser = {
      id: 'usr-admin-master',
      fullName: 'Sagarm Admin Master',
      email: adminPendingLogin.email,
      role: 'admin',
      phone: '+92 300 9999999',
      avatar: null
    };

    setUser(adminUser);
    setAdminPendingLogin(null);
    setAdminOtpState({ code: '', email: '', expiresAt: 0 });

    addToast('Admin Authentication Complete! Welcome Master Admin.', 'success');
    return { success: true, isAdmin: true };
  };

  // Resend Admin OTP
  const resendAdminOtp = () => {
    if (!adminPendingLogin) {
      return { success: false, error: 'No session found.' };
    }
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 120 * 1000;

    setAdminOtpState({
      code: newOtp,
      email: adminPendingLogin.email,
      expiresAt
    });

    addToast(`New OTP generated! Code: ${newOtp}`, 'success');
    return { success: true, demoOtp: newOtp };
  };

  const signup = (userData) => {
    const newUser = {
      id: `usr-${Date.now()}`,
      fullName: userData.fullName,
      email: userData.email,
      dob: userData.dob || '1998-01-01',
      phone: userData.phone || '',
      role: 'customer',
      avatar: null
    };

    setUser(newUser);
    addToast(`Account created successfully! Welcome ${newUser.fullName} to Sagarm.`, 'success');

    if (authModalState.onSuccessCallback) {
      authModalState.onSuccessCallback();
    }
    closeAuthModal();

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    addToast('You have been logged out.', 'info');
  };

  const updateProfile = (updatedFields) => {
    setUser((prev) => ({ ...prev, ...updatedFields }));
    addToast('Profile updated successfully!', 'success');
  };

  const addAddress = (address) => {
    const newAddr = { ...address, id: `addr-${Date.now()}` };
    setAddresses((prev) => [...prev, newAddr]);
    addToast('New address saved to address book.', 'success');
  };

  const deleteAddress = (id) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    addToast('Address removed.', 'info');
  };

  // Order Management — Firestore is the single source of truth.
  // Writes go to Firestore first, then local state is refreshed from Firestore
  // so the Admin Dashboard/Orders pages always reflect what's actually persisted.
  //
  // NOTE on IDs: `id` here is the custom, human-readable order number
  // (e.g. "SGM-ORD-763002") used for DISPLAY only. The real Firestore
  // document ID (`firestoreId`) is generated by addDoc() and is the only
  // ID that may be used for update/delete operations against Firestore.
  const addOrder = async (orderData) => {
    const newOrder = {
      ...orderData,
      id: orderData.id || `SGM-ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      userId: user?.id || orderData.userId || null,
      date: orderData.date || new Date().toISOString(),
      customerName: user?.fullName || orderData.customerName || 'Valued Customer',
      email: user?.email || orderData.email || 'customer@sagarm.shop',
      phone: user?.phone || orderData.phone || ''
    };

    try {
      const firestoreId = await addOrderToFirestore(newOrder);
      const savedOrder = { ...newOrder, firestoreId };

      await refreshOrders(user);

      return savedOrder;
    } catch (error) {
      console.error("Failed to save order to Firestore:", error);
      addToast("Failed to place order. Please try again.", "error");
      throw error;
    }
  };

  // `firestoreId` must be the real Firestore document ID (order.firestoreId),
  // never the custom SGM-ORD-xxxxxx order number.
  const updateOrderStatus = async (firestoreId, newStatus) => {
    if (!firestoreId) {
      console.error("updateOrderStatus called without a valid firestoreId.");
      addToast("Failed to update order status: missing document reference.", "error");
      return;
    }
    try {
      await updateOrderStatusInFirestore(firestoreId, newStatus);
      await refreshOrders(user);
      addToast(`Order updated to ${newStatus}.`, 'info');
    } catch (error) {
      console.error("Failed to update order status in Firestore:", error);
      addToast("Failed to update order status.", "error");
    }
  };

  const approvePayment = async (firestoreId) => {
    if (!firestoreId) {
      console.error("approvePayment called without a valid firestoreId.");
      addToast("Failed to approve payment: missing document reference.", "error");
      return;
    }
    try {
      await updateOrderStatusInFirestore(firestoreId, "Confirmed");
      await refreshOrders(user);
      addToast("Payment Approved!", "success");
    } catch (error) {
      console.error("Failed to approve payment:", error);
      addToast("Failed to approve payment.", "error");
    }
  };

  const rejectPayment = async (firestoreId) => {
    if (!firestoreId) {
      console.error("rejectPayment called without a valid firestoreId.");
      addToast("Failed to reject payment: missing document reference.", "error");
      return;
    }
    try {
      await updateOrderStatusInFirestore(firestoreId, "Rejected");
      await refreshOrders(user);
      addToast("Payment Rejected!", "error");
    } catch (error) {
      console.error("Failed to reject payment:", error);
      addToast("Failed to reject payment.", "error");
    }
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        requireAuth,
        login,
        initiateAdminLogin,
        adminPendingLogin,
        adminOtpState,
        verifyAdminOtp,
        resendAdminOtp,
        signup,
        logout,
        updateProfile,
        addresses,
        addAddress,
        deleteAddress,
        orders,
        ordersLoading,
        addOrder,
        updateOrderStatus,
        approvePayment,
        rejectPayment
      }}
    >
      {children}
      <AuthRequiredModal
        isOpen={authModalState.isOpen}
        onClose={closeAuthModal}
        message={authModalState.message}
      />
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
