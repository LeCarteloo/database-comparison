import CassandraService from '@/services/Cassandra.service';
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
    this.router.delete(`${this.path}/delete/easy`, this.deleteEasy);
    this.router.delete(`${this.path}/delete/medium`, this.deleteMedium);
    this.router.delete(`${this.path}/delete/hard`, this.deleteHard);
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

      const clickhouse = new ClickhouseService();
      const clickhouseResult = await clickhouse.insertCSV();

      const pgsql = new PgsqlService();
      const pgsqlResult = await pgsql.insertCSV();

      const mongodb = new MongodbService();
      const mongodbResult = await mongodb.insertCSV();

      const cassandra = new CassandraService();
      const cassandraResult = await cassandra.insertCSV();

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

      // const mongodb = new MongodbService();
      // const mongodbResult = await mongodb.insert(amount);

      res.status(200).json({
        key: 'Insert',
        result: {
          mysql: mysqlResult,
          pgsql: pgsqlResult,
          clickhouse: clickhouseResult,
          // mongodb: 'WIP',
        },
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
        key: 'Easy select',
        result: {
          mysql: mysqlResult,
          pgsql: pgsqlResult,
          clickhouse: clickhouseResult,
          mongodb: mongodbResult,
        },
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

      const mongodb = new MongodbService();
      const mongodbResult = await mongodb.selectMedium();

      res.status(200).json({
        key: 'Medium select',
        result: {
          mysql: mysqlResult,
          pgsql: pgsqlResult,
          clickhouse: clickhouseResult,
          mongodb: mongodbResult,
        },
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
        key: 'Hard select',
        result: {
          mysql: mysqlResult,
          pgsql: pgsqlResult,
          clickhouse: clickhouseResult,
          // mongodb: 'WIP',
        },
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
      const mysqlService = new MysqlService();
      const mysqlResult = await mysqlService.updateEasy();

      const pgsql = new PgsqlService();
      const pgsqlResult = await pgsql.updateEasy();

      const clickhouse = new ClickhouseService();
      const clickhouseResult = await clickhouse.updateEasy();

      const mongodb = new MongodbService();
      const mongodbResult = await mongodb.updateEasy();

      res.status(200).json({
        key: 'Easy update',
        result: {
          mysql: mysqlResult,
          pgsql: pgsqlResult,
          clickhouse: clickhouseResult,
          mongodb: mongodbResult,
        },
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
      const mysqlService = new MysqlService();
      const mysqlResult = await mysqlService.updateMedium();

      const pgsql = new PgsqlService();
      const pgsqlResult = await pgsql.updateMedium();

      const clickhouse = new ClickhouseService();
      const clickhouseResult = await clickhouse.updateMedium();

      // const mongodb = new MongodbService();
      // const mongodbResult = await mongodb.updateMedium();

      res.status(200).json({
        key: 'Medium update',
        result: {
          mysql: mysqlResult,
          pgsql: pgsqlResult,
          clickhouse: clickhouseResult,
          // mongodb: mongodbResult,
        },
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
      const mysqlService = new MysqlService();
      const mysqlResult = await mysqlService.updateHard();

      // const pgsql = new PgsqlService();
      // const pgsqlResult = await pgsql.updateHard();

      // const clickhouse = new ClickhouseService();
      // const clickhouseResult = await clickhouse.updateHard();

      // const mongodb = new MongodbService();
      // const mongodbResult = await mongodb.updateHard();

      res.status(200).json({
        key: 'Hard update',
        result: {
          mysql: mysqlResult,
          // pgsql: pgsqlResult,
          // clickhouse: clickhouseResult,
          // mongodb: 'WIP',
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }

  private async deleteEasy(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const mysqlService = new MysqlService();
      const mysqlResult = await mysqlService.deleteEasy();

      const pgsql = new PgsqlService();
      const pgsqlResult = await pgsql.deleteEasy();

      const clickhouse = new ClickhouseService();
      const clickhouseResult = await clickhouse.deleteEasy();

      // const mongodb = new MongodbService();
      // const mongodbResult = await mongodb.deleteEasy();

      res.status(200).json({
        key: 'Easy delete',
        result: {
          mysql: mysqlResult,
          pgsql: pgsqlResult,
          clickhouse: clickhouseResult,
          // mongodb: 'WIP',
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }

  private async deleteMedium(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const mysqlService = new MysqlService();
      const mysqlResult = await mysqlService.deleteMedium();

      const pgsql = new PgsqlService();
      const pgsqlResult = await pgsql.deleteMedium();

      const clickhouse = new ClickhouseService();
      const clickhouseResult = await clickhouse.deleteMedium();

      // const mongodb = new MongodbService();
      // const mongodbResult = await mongodb.deleteMedium();

      res.status(200).json({
        key: 'Medium delete',
        result: {
          mysql: mysqlResult,
          pgsql: pgsqlResult,
          clickhouse: clickhouseResult,
          // mongodb: 'WIP',
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }

  private async deleteHard(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const mysqlService = new MysqlService();
      const mysqlResult = await mysqlService.deleteHard();

      const pgsql = new PgsqlService();
      const pgsqlResult = await pgsql.deleteHard();

      const clickhouse = new ClickhouseService();
      const clickhouseResult = await clickhouse.deleteHard();

      // const mongodb = new MongodbService();
      // const mongodbResult = await mongodb.deleteHard();

      res.status(200).json({
        key: 'Hard delete',
        result: {
          mysql: mysqlResult,
          pgsql: pgsqlResult,
          clickhouse: clickhouseResult,
          // mongodb: 'WIP',
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
}

export default ComparisonController;
