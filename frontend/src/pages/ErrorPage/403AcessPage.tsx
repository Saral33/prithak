import Button from '@/components/Button';

import { Link } from 'react-router-dom';

const AccessDeniedPage = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-3xl">Access Denied</h1>
        <h1 className="text-3xl">403</h1>
        <h1 className="text-3xl">Forbidden</h1>
        <p>You don't have permission to access this page</p>
        <p>Please contact your administrator if you think it's mistaken</p>
        <Button>
          <Link to={'/login'}>Go Back</Link>
        </Button>
      </div>
    </div>
  );
};

export default AccessDeniedPage;
