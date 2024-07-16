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

const authRoutes = [
  {
    id: '3',
    path: '/dashboard',
    component: React.lazy(() => import('@/pages/DashboardPage/index')),
    name: 'DashboardPage',
  },
];

export { nonAuthRoutes, authRoutes };
