import express, { NextFunction } from 'express';
import config from '@/config';
import cors from 'cors';
import { mainRoutes } from '@/routes/routes';
import { connectDB } from '@/settings/dbSettings';
import 'express-async-errors';
import { StatusCodes } from 'http-status-codes';
import { CustomError, IErrorResponse } from './middleware/errorMiddleware';
import { rateLimit } from 'express-rate-limit';

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   standardHeaders: true,
//   legacyHeaders: false,
// });

class Server {
  public app: express.Application;
  constructor() {
    this.app = express();
    this.app.use(express.json({ limit: '1mb' }));
    // this.app.use(limiter);
    this.app.use(
      cors({
        origin: '*',
      })
    );
  }

  public start() {
    this.connectDb();
    mainRoutes(this.app);
    this.app.all('*', (req, res) => {
      res.status(StatusCodes.NOT_FOUND).json({
        status: 'error',
        message: req.originalUrl + ' Route doesnot exist',
      });
    });
    this.app.use(
      (
        error: IErrorResponse,
        _req: express.Request,
        res: express.Response,
        next: NextFunction
      ) => {
        console.log('Error Detected in middleware', error);
        if (error) {
          if (error instanceof CustomError) {
            return res.status(error.statusCode).json(error.showErrors());
          }
        }
        next();
      }
    );
    this.app.listen(config.PORT, () => {
      console.log(`Server running on port ${config.PORT}`);
    });
  }

  public connectDb() {
    connectDB();
  }
}

const server = new Server();
server.start();
