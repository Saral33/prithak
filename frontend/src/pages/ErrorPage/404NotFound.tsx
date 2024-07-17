import Button from '@/components/Button';
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-3xl">404</h1>
        <h1 className="text-3xl">Not found</h1>
        <p>It seems that this page does not exist</p>
        <p>Please contact your administrator if you think it's mistaken</p>
        <Button>
          <Link to={'/login'}>Go Back</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
