import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useToast } from './ToastContext';
import { COUPONS } from '../data/coupons';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { addToast } = useToast();
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('sagarm_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    const saved = localStorage.getItem('sagarm_coupon');
    return saved ? JSON.parse(saved) : null;
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('sagarm_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem('sagarm_coupon', JSON.stringify(appliedCoupon));
    } else {
      localStorage.removeItem('sagarm_coupon');
    }
  }, [appliedCoupon]);

  const addToCart = (product, size, color, quantity = 1) => {
    const selectedSize = size || (product.sizes ? product.sizes[0] : 'Standard');
    const selectedColor = color || (product.colors ? product.colors[0].name : 'Default');

    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.size === selectedSize && item.color === selectedColor
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, size: selectedSize, color: selectedColor, quantity }];
      }
    });

    addToast(`Added "${product.name}" to cart!`, 'success');
    setIsCartOpen(true);
  };

  const removeFromCart = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
    addToast('Item removed from cart.', 'info');
  };

  const updateQuantity = (index, delta) => {
    setCartItems((prev) => {
      const updated = [...prev];
      const newQty = updated[index].quantity + delta;
      if (newQty <= 0) {
        return prev.filter((_, i) => i !== index);
      }
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (codeStr) => {
    const cleanCode = codeStr.trim().toUpperCase();
    const found = COUPONS.find((c) => c.code === cleanCode);

    if (!found) {
      addToast('Invalid coupon code!', 'error');
      return false;
    }

    setAppliedCoupon(found);
    addToast(`Coupon "${found.code}" applied successfully! (${found.discountPercent}% OFF)`, 'success');
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast('Coupon removed.', 'info');
  };

  const totals = useMemo(() => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.discountPercent) / 100 : 0;
    const discountedSubtotal = Math.max(0, subtotal - discountAmount);
    const taxAmount = Math.round(discountedSubtotal * 0.05); // 5% tax
    const shippingCost = subtotal > 200 || cartItems.length === 0 ? 0 : 15;
    const grandTotal = Math.round(discountedSubtotal + taxAmount + shippingCost);

    return {
      subtotal,
      discountAmount,
      taxAmount,
      shippingCost,
      grandTotal,
      itemCount: cartItems.reduce((count, item) => count + item.quantity, 0)
    };
  }, [cartItems, appliedCoupon]);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      appliedCoupon,
      applyCoupon,
      removeCoupon,
      isCartOpen,
      openCart: () => setIsCartOpen(true),
      closeCart: () => setIsCartOpen(false),
      ...totals
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
