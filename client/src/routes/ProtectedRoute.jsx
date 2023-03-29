import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  return user?.uid ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
