import ClickhouseService from '@/services/Clickhouse.service';
import MongodbService from '@/services/Mongodb.service';
import MysqlService from '@/services/Mysql.service';
import PgsqlService from '@/services/Pgsql.service';
import { Router, Request, Response, NextFunction } from 'express';

class ComparisonController {
  public path = '';
  public router = Router();

  constructor() {
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.post(`${this.path}/update/easy`, this.updateEasy);
    this.router.post(`${this.path}/update/medium`, this.updateMedium);
    this.router.post(`${this.path}/update/hard`, this.updateHard);
    this.router.post(`${this.path}/insert/:amount`, this.insert);
    this.router.get(`${this.path}/select/easy`, this.selectEasy);
    this.router.get(`${this.path}/select/medium`, this.selectMedium);
    this.router.get(`${this.path}/select/hard`, this.selectHard);
    this.router.post(`${this.path}/csv`, this.insertCSV);
  }

  //* @desc Insert CSV
  //* @route POST /api/csv
  //* @access Public
  private async insertCSV(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const mysqlService = new MysqlService();
      const mysqlResult = await mysqlService.insertCSV();
      console.log('mysql');

      const clickhouse = new ClickhouseService();
      const clickhouseResult = await clickhouse.insertCSV();

      console.log('clickhouse');

      const pgsql = new PgsqlService();
      const pgsqlResult = await pgsql.insertCSV();
      console.log('pgsql');

      const mongodb = new MongodbService();
      const mongodbResult = await mongodb.insertCSV();
      console.log('mongodb');

      res.status(200).json({
        'mysql-result': mysqlResult,
        'clickhouse-result': clickhouseResult,
        'pgsql-result': pgsqlResult,
        'mongodb-result': mongodbResult,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
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

      const mongodb = new MongodbService();
      const mongodbResult = await mongodb.insert(amount);

      res.status(200).json({
        'mysql-result': mysqlResult,
        'pgsql-result': pgsqlResult,
        'clickhouse-result': clickhouseResult,
        'mongodb-result': mongodbResult,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }

  //* @desc Select records
  //* @route GET /api/select/easy
  //* @access Public
  private async selectEasy(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const mysqlService = new MysqlService();
      const mysqlResult = await mysqlService.selectEasy();

      const pgsql = new PgsqlService();
      const pgsqlResult = await pgsql.selectEasy();

      const clickhouse = new ClickhouseService();
      const clickhouseResult = await clickhouse.selectEasy();

      const mongodb = new MongodbService();
      const mongodbResult = await mongodb.selectEasy();

      res.status(200).json({
        'mysql-result': mysqlResult,
        'pgsql-result': pgsqlResult,
        'clickhouse-result': clickhouseResult,
        'mongodb-result': mongodbResult,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }

  //* @desc Select records
  //* @route GET /api/select/medium
  //* @access Public
  private async selectMedium(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const mysqlService = new MysqlService();
      const mysqlResult = await mysqlService.selectMedium();

      const pgsql = new PgsqlService();
      const pgsqlResult = await pgsql.selectMedium();

      const clickhouse = new ClickhouseService();
      const clickhouseResult = await clickhouse.selectMedium();

      // const mongodb = new MongodbService();
      // const mongodbResult = await mongodb.selectMedium();

      res.status(200).json({
        'mysql-result': mysqlResult,
        'pgsql-result': pgsqlResult,
        'clickhouse-result': clickhouseResult,
        'mongodb-result': 'WIP',
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }

  //* @desc Select records
  //* @route GET /api/select/hard
  //* @access Public
  private async selectHard(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const mysqlService = new MysqlService();
      const mysqlResult = await mysqlService.selectHard();

      const pgsql = new PgsqlService();
      const pgsqlResult = await pgsql.selectHard();

      const clickhouse = new ClickhouseService();
      const clickhouseResult = await clickhouse.selectHard();

      // const mongodb = new MongodbService();
      // const mongodbResult = await mongodb.selectHard();

      res.status(200).json({
        'mysql-result': mysqlResult,
        'pgsql-result': pgsqlResult,
        'clickhouse-result': clickhouseResult,
        'mongodb-result': 'WIP',
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }

  private async updateEasy(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      // const mysqlService = new MysqlService();
      // const mysqlResult = await mysqlService.selectEasy();

      const pgsql = new PgsqlService();
      const pgsqlResult = await pgsql.selectEasy();

      // const clickhouse = new ClickhouseService();
      // const clickhouseResult = await clickhouse.selectEasy();

      // const mongodb = new MongodbService();
      // const mongodbResult = await mongodb.selectEasy();

      res.status(200).json({
        // 'mysql-result': mysqlResult,
        'pgsql-result': pgsqlResult,
        // 'clickhouse-result': clickhouseResult,
        // 'mongodb-result': mongodbResult,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }

  private async updateMedium(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      // const mysqlService = new MysqlService();
      // const mysqlResult = await mysqlService.selectEasy();

      const pgsql = new PgsqlService();
      const pgsqlResult = await pgsql.selectEasy();

      // const clickhouse = new ClickhouseService();
      // const clickhouseResult = await clickhouse.selectEasy();

      // const mongodb = new MongodbService();
      // const mongodbResult = await mongodb.selectEasy();

      res.status(200).json({
        // 'mysql-result': mysqlResult,
        'pgsql-result': pgsqlResult,
        // 'clickhouse-result': clickhouseResult,
        // 'mongodb-result': mongodbResult,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }

  private async updateHard(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      // const mysqlService = new MysqlService();
      // const mysqlResult = await mysqlService.selectEasy();

      const pgsql = new PgsqlService();
      const pgsqlResult = await pgsql.selectEasy();

      // const clickhouse = new ClickhouseService();
      // const clickhouseResult = await clickhouse.selectEasy();

      // const mongodb = new MongodbService();
      // const mongodbResult = await mongodb.selectEasy();

      res.status(200).json({
        // 'mysql-result': mysqlResult,
        'pgsql-result': pgsqlResult,
        // 'clickhouse-result': clickhouseResult,
        // 'mongodb-result': mongodbResult,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
}

export default ComparisonController;
