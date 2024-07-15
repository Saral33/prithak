import { nonAuthRoutes } from '@/routes/routesSettings';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

const MainRoutes = () => {
  return (
    <main>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {nonAuthRoutes.map((route) => (
            <Route
              key={route.id}
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Routes>
      </React.Suspense>
    </main>
  );
};

export default MainRoutes;
