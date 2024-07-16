import useAuth from '@/hooks/useAuth';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const NonPrivateRoutes = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (auth?.auth?.isLoggedIn) {
      if (auth?.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }
  }, [auth?.auth?.isLoggedIn, auth?.role, navigate]);

  return !auth?.auth?.isLoggedIn ? <Outlet /> : null;
};

export default NonPrivateRoutes;
