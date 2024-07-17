import { UserController } from '@/controllers/userController';
import { checkIfuserIsAdmin } from '@/middleware/adminMiddleware';
import { checkAuthMiddleware } from '@/middleware/authMiddleware';
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
    this.router.post(
      '/logout',

      checkAuthMiddleware,
      UserController.prototype.logout
    );
    this.router.get('/me', checkAuthMiddleware, UserController.prototype.me);
    this.router.get(
      '/admin',
      [checkAuthMiddleware, checkIfuserIsAdmin],
      UserController.prototype.admin
    );
    return this.router;
  }
}

export const userRoutes = new UserRoutes();
