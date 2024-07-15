import React from 'react';

const nonAuthRoutes = [
  {
    id: '1',
    path: '/login',
    component: React.lazy(() => import('@/pages/LoginPage/index')),
    name: 'LoginPage',
  },
  {
    id: '2',
    path: '/register',
    component: React.lazy(() => import('@/pages/RegisterPage/index')),
    name: 'RegisterPage',
  },
];

export { nonAuthRoutes };
