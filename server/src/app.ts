import express, { Application, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import mysql from 'mysql2';
import cors from 'cors';
import morgan from 'morgan';

class App {
  public express: Application;
  public port: number;

  constructor(controllers: any[], port: number) {
    this.express = express();
    this.port = port;
    this.initMiddleware();
    this.initMongoConn();
    // this.initMysqlCon();
    this.initControllers(controllers);
    this.initHealthCheck();
  }

  private initHealthCheck(): void {
    this.express.use(
      '/api/healthcheck',
      (req: Request, res: Response, next: NextFunction) => {
        res.status(200).json({ message: "I'm alive" });
      },
    );
  }

  private initMiddleware(): void {
    // Enabling CORS
    this.express.use(cors());
    // Adding logging tool
    this.express.use(morgan('dev'));
    // Parsing
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
  }

  private async initMongoConn(): Promise<void> {
    const { MONGO_URI } = process.env;

    try {
      await mongoose.connect(`${MONGO_URI}`);
      console.info('MongoDB connected');
    } catch (error) {
      console.warn('Unable to connect with MongoDB');
      process.exit(1);
    }
  }

  private async initMysqlCon(): Promise<void> {
    const { MYSQL_HOST, MYSQL_PORT, MYSQL_DB, MYSQL_USER, MYSQL_PASS } =
      process.env;

    try {
      await mysql
        .createPool({
          port: Number(MYSQL_PORT),
          host: MYSQL_HOST,
          user: MYSQL_USER,
          password: MYSQL_PASS,
          database: MYSQL_DB,
        })
        .promise();
      console.info('MYSQL connected');
    } catch (error) {
      console.warn('Unable to connect with MYSQL');
      process.exit(1);
    }
  }

  private initControllers(controllers: any[]): void {
    controllers.forEach((controller: any) => {
      this.express.use('/api', controller.router);
    });
  }

  public listen(): void {
    this.express.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

export default App;
