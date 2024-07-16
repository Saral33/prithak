import NonPrivateRoutes from '@/features/auth/NonPrivateRoutes';
import PrivateRoutes from '@/features/auth/PrivateRoutes';
import { authRoutes, nonAuthRoutes } from '@/routes/routesSettings';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

const MainRoutes = () => {
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
            {authRoutes.map((route) => (
              <Route
                key={route.id}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Route>
        </Routes>
      </React.Suspense>
    </main>
  );
};

export default MainRoutes;
