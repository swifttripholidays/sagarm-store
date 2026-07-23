import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedCustomerRoute({ children }) {
  const { user, requireAuth } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      requireAuth(null, 'Please login or create an account to view your profile or continue shopping.');
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
