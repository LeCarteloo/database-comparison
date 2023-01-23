import { ClickhouseConnection } from '@/config/databases';
import checkPerformance from '@/utilis/CheckPerformance';
import fs from 'fs';
import csvtojson from 'csvtojson';

class ClickhouseService {
  private conn = ClickhouseConnection;

  constructor() { }

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

  //* Inserts certain amount of rows into table
  public async insert(amount: number): Promise<any | Error> {
    try {
      const salary = await csvtojson().fromFile('./src/data/db_salary.csv');
      let values: any[] = [];

      for (let i = 0; i < amount; i++) {
        if (!salary[i]) break;
        values.push([
          salary[i].employee_id,
          salary[i].salary,
          salary[i].from_date,
          salary[i].to_date,
        ]);
      }

      let valuesToAdd = values.map(
        (val) =>
          `{"employee_id": "${val[0]}", "salary": "${val[1]}", "from_date": "${val[2]}", "to_date": "${val[3]}"}`
      ).join(',');

      const { result, memory, time } = await checkPerformance(() => {
        return this.conn.insert({
          table: 'salary',
          values: JSON.parse(`[${valuesToAdd}]`),
          format: 'JSONEachRow'
        });
      });

      return {
        result: amount,
        memory: memory,
        time: time,
      };
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

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

  //* Hard select
  public async selectHard() {
    try {
      const { result, memory, time } = await checkPerformance(() => {
        return this.conn.query({
          query: `SELECT e.id, e.first_name, e.last_name, e.gender, e.hire_date, s.how_many_withdrawals, s.smallest_payout, s.biggest_payout, t.how_many_titles, t.last_promotion
            FROM employees AS e,
            (SELECT count(salary) as how_many_withdrawals, max(salary) as biggest_payout, min(salary) as smallest_payout, employee_id FROM salary GROUP BY employee_id) AS s,
            (SELECT count(title) as how_many_titles, employee_id, MAX(from_date) as last_promotion FROM titles GROUP BY employee_id) AS t
            WHERE e.id = s.employee_id AND e.id = t.employee_id`,
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
