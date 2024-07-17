import { getProfileService } from '@/api/services/userService';
import Layout from '@/components/Layout';
import useAuth from '@/hooks/useAuth';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { Outlet, useNavigate } from 'react-router-dom';

const PrivateRoutes = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    if (!auth.auth.isLoggedIn) {
      navigate('/login');
    }
  }, [auth, navigate]);

  const { isLoading } = useQuery({
    queryKey: 'private',
    queryFn: () => getProfileService(),
  });

  return <Layout>{isLoading ? <div>Loading...</div> : <Outlet />}</Layout>;
};

export default PrivateRoutes;
