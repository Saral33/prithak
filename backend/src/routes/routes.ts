import express from 'express';
import { userRoutes } from './userRoutes';

const basePath = '/api/v1';

export const mainRoutes = (app: express.Application) => {
  app.use(basePath, userRoutes.routes());
};
