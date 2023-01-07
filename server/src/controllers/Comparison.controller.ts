import MysqlService from '@/services/Mysql.service';
import { Router, Request, Response, NextFunction } from 'express';

class ComparisonController {
  public path = '';
  public router = Router();

  constructor() {
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.post(`${this.path}/insert/:amount`, this.insert);
    this.router.get(`${this.path}/select`, this.select);
  }

  //* @desc Insert records
  //* @route POST /api/insert/:amount
  //* @access Public
  private async insert(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const amount = req.params.amount;
      const mysqlService = new MysqlService();
      const result = await mysqlService.insert(Number(amount));

      res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }

  //* @desc Select records
  //* @route GET /api/select
  //* @access Public
  private async select(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const mysqlService = new MysqlService();
      const result = await mysqlService.select();

      res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
}

export default ComparisonController;
