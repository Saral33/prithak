import { Router } from 'express';

class UserRoutes {
  private router: Router;

  constructor() {
    this.router = Router();
  }

  public routes(): Router {
    return this.router;
  }
}

export const userRoutes = new UserRoutes();
