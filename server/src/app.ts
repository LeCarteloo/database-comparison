import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { CassandraConnection, connectDatabases } from './config/databases';
import { blue } from 'colors';

class App {
  public express: Application;
  public port: number;

  constructor(controllers: any[], port: number) {
    this.express = express();
    this.port = port;
    connectDatabases();
    this.initMiddleware();
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

  private initControllers(controllers: any[]): void {
    controllers.forEach((controller: any) => {
      this.express.use('/api', controller.router);
    });
  }

  public listen(): void {
    this.express.listen(this.port, () => {
      console.log(blue(`Server is running on port ${this.port}`));
      console.log('\nDatabase connections:\n');
    });
  }
}

export default App;
