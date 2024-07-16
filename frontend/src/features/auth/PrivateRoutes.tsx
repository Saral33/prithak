import { getProfileService } from '@/api/services/userService';
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

  const { data, isLoading } = useQuery({
    queryKey: 'private',
    queryFn: () => getProfileService(),
  });

  return <div>{isLoading ? <div>Loading...</div> : <Outlet />}</div>;
};

export default PrivateRoutes;
