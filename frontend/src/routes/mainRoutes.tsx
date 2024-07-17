import useAuth from '@/hooks/useAuth';

import { authRoutes, nonAuthRoutes } from '@/routes/routesSettings';
import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const AccessDeniedPage = lazy(() => import('@/pages/ErrorPage/403AcessPage'));
const NotFoundPage = lazy(() => import('@/pages/ErrorPage/404NotFound'));
const NonPrivateRoutes = lazy(() => import('@/features/auth/NonPrivateRoutes'));
const PrivateRoutes = lazy(() => import('@/features/auth/PrivateRoutes'));

const MainRoutes = () => {
  const { auth } = useAuth();
  return (
    <main>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<NonPrivateRoutes />}>
            {nonAuthRoutes.map((route) => (
              <Route
                key={route.id}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Route>
          <Route element={<PrivateRoutes />}>
            {authRoutes.map((route) =>
              route.role.includes(auth?.role) ? (
                <Route
                  key={route.id}
                  path={route.path}
                  element={<route.component />}
                />
              ) : (
                <Route
                  key={route.id}
                  path={route.path}
                  element={<AccessDeniedPage />}
                />
              )
            )}
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </React.Suspense>
    </main>
  );
};

export default MainRoutes;
