import express from 'express';
import config from '@/config';
import cors from 'cors';
import { mainRoutes } from '@/routes/routes';

class Server {
  public app: express.Application;
  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(
      cors({
        origin: '*',
      })
    );
  }

  public start() {
    mainRoutes(this.app);
    this.app.listen(config.PORT, () => {
      console.log(`Server running on port ${config.PORT}`);
    });
  }
}

const server = new Server();
server.start();
