import { TaskController } from '@/controllers/taskController';
import { checkAuthMiddleware } from '@/middleware/authMiddleware';
import { Router } from 'express';

class TaskRoutes {
  private router: Router;

  constructor() {
    this.router = Router();
  }
  public routes() {
    this.router.post(
      '/',
      checkAuthMiddleware,
      TaskController.prototype.createTask
    );

    this.router.get(
      '/',
      checkAuthMiddleware,
      TaskController.prototype.getAllTask
    );

    this.router.delete(
      '/:id',
      checkAuthMiddleware,
      TaskController.prototype.deleteTask
    );

    this.router.put(
      '/:id',
      checkAuthMiddleware,
      TaskController.prototype.updateTask
    );
    this.router.get(
      '/:id',
      checkAuthMiddleware,
      TaskController.prototype.getTaskDetail
    );

    this.router.get(
      '/search/:q',
      checkAuthMiddleware,
      TaskController.prototype.searchTask
    );
    return this.router;
  }
}

export const taskRoutes = new TaskRoutes();
