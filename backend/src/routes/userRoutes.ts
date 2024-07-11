import { UserController } from '@/controllers/userController';
import { Router } from 'express';

class UserRoutes {
  private router: Router;

  constructor() {
    this.router = Router();
  }

  public routes(): Router {
    this.router.post('/register', UserController.prototype.registerUser);
    this.router.post('/login', UserController.prototype.loginUser);
    this.router.post('/refresh', UserController.prototype.refresh);
    return this.router;
  }
}

export const userRoutes = new UserRoutes();
