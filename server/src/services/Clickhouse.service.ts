import { ClickhouseConnection } from '@/config/databases';
import checkPerformance from '@/utilis/CheckPerformance';
import fs from 'fs';
import pg from 'pg';

class ClickhouseService {
  private conn = ClickhouseConnection;

  constructor() {
    this.createTables();
  }

  //* Insert data
  public async select() {
    try {
      const { memory, time } = await checkPerformance(() => {
        return this.conn.exec({
          query: 'SELECT * FROM employees',
        });
      });

      return {
        memory: memory,
        time: time,
      };
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  //* Insert data from CSV file
  public async insertCSV() {
    try {
      await this.createTables();

      const { memory, time } = await checkPerformance(() => {
        this.conn.insert({
          table: 'employees',
          values: fs.createReadStream('./src/data/db_employees.csv'),
          format: 'CSV',
        });
        this.conn.insert({
          table: 'titles',
          values: fs.createReadStream('./src/data/db_titles.csv'),
          format: 'CSV',
        });
        this.conn.insert({
          table: 'salary',
          values: fs.createReadStream('./src/data/db_salary.csv'),
          format: 'CSV',
        });
      });

      return {
        memory,
        time,
      };
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  //* Select data
  public async insert(amount: number) {
    try {
      const { memory, time } = await checkPerformance(() => {
        return this.conn.insert({
          table: 'users',
          values: [
            { id: 1, title: 'Test1', contest: 'Test1' },
            { id: 2, title: 'Test2', contest: 'Test2' },
          ],
          format: 'JSONEachRow',
        });
      });

      return {
        memory: memory,
        time: time,
      };
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  //* Create database
  private async createTables() {
    try {
      await this.conn.exec({
        query: `
              CREATE TABLE IF NOT EXISTS employees(
                  id String,
                  birth_date String,
                  first_name String,
                  last_name String,
                  gender String,
                  hire_date String
              ) ENGINE = MergeTree ORDER BY id;
              `,
      });
      await this.conn.exec({
        query: `
              CREATE TABLE IF NOT EXISTS salary(
                  id String,
                  salary String,
                  from_date String,
                  to_date String
              ) ENGINE = MergeTree ORDER BY id;
              `,
      });
      await this.conn.exec({
        query: `
              CREATE TABLE IF NOT EXISTS titles(
                  id String, 
                  title String,
                  from_date String,
                  to_date String
              ) ENGINE = MergeTree ORDER BY id;
              `,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }
}

export default ClickhouseService;
