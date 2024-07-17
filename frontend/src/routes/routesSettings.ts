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
    role: ['user'],
  },
  {
    id: '4',
    path: '/admin',
    component: React.lazy(() => import('@/pages/DashboardPage/Admin')),
    name: 'AdminPage',
    role: ['admin'],
  },
  {
    id: '5',
    path: '/create-task',
    component: React.lazy(() => import('@/pages/TaskPage/CreateTask')),
    name: 'CreateTask',
    role: ['user'],
  },
  {
    id: '6',
    path: '/edit-task/:id',
    component: React.lazy(() => import('@/pages/TaskPage/CreateTask')),
    name: 'EditTask',
    role: ['user'],
  },
];

export { nonAuthRoutes, authRoutes };
