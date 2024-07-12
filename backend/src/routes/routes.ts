import express from 'express';
import { userRoutes } from './userRoutes';
import { taskRoutes } from './taskRoutes';

const basePath = '/api/v1';

export const mainRoutes = (app: express.Application) => {
  app.use(`${basePath}/auth`, userRoutes.routes());
  app.use(`${basePath}/tasks`, taskRoutes.routes());
};
