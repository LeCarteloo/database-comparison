import ClickhouseService from '@/services/Clickhouse.service';
import MysqlService from '@/services/Mysql.service';
import PgsqlService from '@/services/Pgsql.service';
import { Router, Request, Response, NextFunction } from 'express';

class ComparisonController {
  public path = '';
  public router = Router();
  // private mysqlService = new MysqlService();

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
      const amount = Number(req.params.amount);
      const mysqlService = new MysqlService();
      const mysqlResult = await mysqlService.insert(amount);

      const pgsql = new PgsqlService();
      const pgsqlResult = await pgsql.insert(amount);

      const clickhouse = new ClickhouseService();
      const clickhouseResult = await clickhouse.insert(amount);

      res.status(200).json({
        'mysql-result': mysqlResult,
        'pgsql-result': pgsqlResult,
        'clickhouse-result': clickhouseResult,
      });
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
      const mysqlResult = await mysqlService.select();

      const pgsql = new PgsqlService();
      const pgsqlResult = await pgsql.select();

      const clickhouse = new ClickhouseService();
      const clickhouseResult = await clickhouse.select();

      res.status(200).json({
        'mysql-result': mysqlResult,
        'pgsql-result': pgsqlResult,
        'clickhouse-result': clickhouseResult,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
}

export default ComparisonController;
