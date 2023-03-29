import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import useUserType from '../hooks/useUserType';
import NotFound from '../pages/NotFound/NotFound';

const BuyerRoute = ({ children }) => {
  const { user } = useAuth();
  const { userType } = useUserType(user?.email);

  return userType === 'buyer' ? children : <NotFound />;
};

export default BuyerRoute;
