import { ClickhouseConnection } from '@/config/databases';
import checkPerformance from '@/utilis/CheckPerformance';
import fs from 'fs';

class ClickhouseService {
  private conn = ClickhouseConnection;

  constructor() {}

  //* Easy select: Returns salaries higher than 3000
  public async selectEasy() {
    try {
      const { result, memory, time } = await checkPerformance(() => {
        return this.conn.query({
          query: 'SELECT * FROM salary s WHERE s.salary >= 3000',
        });
      });

      return {
        records: (await result.json()).data.length,
        memory,
        time,
      };
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  //* Medium select: Returns all salaries
  public async selectMedium() {
    try {
      const { result, memory, time } = await checkPerformance(() => {
        return this.conn.query({
          query:
            "SELECT * FROM salary AS s, employees AS e, titles AS t WHERE e.id = t.employee_id AND title LIKE '%BackEnd%' AND e.id = s.employee_id",
        });
      });

      return {
        records: (await result.json()).data.length,
        memory,
        time,
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

      const { memory, time } = await checkPerformance(async () => {
        await this.conn.insert({
          table: 'employees',
          values: fs.createReadStream('./src/data/db_employees.csv'),
          format: 'CSVWithNames',
        });
        await this.conn.insert({
          table: 'titles',
          values: fs.createReadStream('./src/data/db_titles.csv'),
          format: 'CSVWithNames',
        });
        await this.conn.insert({
          table: 'salary',
          values: fs.createReadStream('./src/data/db_salary.csv'),
          format: 'CSVWithNames',
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
          table: 'salary',
          values: [
            {
              employee_id: 1,
              salary: 333,
              from_date: 'Test1',
              to_date: 'TEST',
            },
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

  //* Create tables
  private async createTables() {
    try {
      await this.conn.exec({
        query: `
              CREATE TABLE IF NOT EXISTS employees(
                  id UInt32,
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
                  employee_id UInt32,
                  salary UInt32,
                  from_date String,
                  to_date String
              ) ENGINE = MergeTree ORDER BY employee_id;
              `,
      });
      await this.conn.exec({
        query: `
              CREATE TABLE IF NOT EXISTS titles(
                  employee_id UInt32,
                  title String,
                  from_date String,
                  to_date String
              ) ENGINE = MergeTree ORDER BY employee_id;
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
