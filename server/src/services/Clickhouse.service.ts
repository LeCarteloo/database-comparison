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

      await this.insertCSV();

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
          query: `
            SELECT 
              * 
            FROM 
              salary s 
            WHERE 
              s.salary >= 3000
          `,
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
          query: `
            SELECT 
              * 
            FROM 
              salary s, 
              employees e, 
              titles t 
            WHERE 
              e.id = t.employee_id AND 
              e.id = s.employee_id AND 
              title LIKE '%BackEnd%'
          `,
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
          query: `
            SELECT 
              e.id, e.first_name, e.last_name, e.gender, e.hire_date, 
              s.how_many_withdrawals,s.smallest_payout, s.biggest_payout, s.sum_salary, 
              t.how_many_titles, t.last_promotion 
            FROM 
              employees e, 
              (SELECT 
                  count(salary) as how_many_withdrawals, 
                  min(salary) as smallest_payout, 
                  max(salary) as biggest_payout, 
                  sum(salary) as sum_salary, 
                  employee_id 
                FROM 
                  salary 
                GROUP BY 
                  employee_id) AS s, 
              (SELECT 
                  count(title) as how_many_titles, 
                  MAX(from_date) as last_promotion, 
                  employee_id 
                FROM 
                  titles 
                GROUP BY 
                  employee_id) AS t 
            WHERE 
              e.id = s.employee_id AND 
              e.id = t.employee_id AND 
              e.gender = 'F' AND 
              e.hire_date < '2015-01-01' AND 
              s.sum_salary > 100000 
            ORDER BY 
              s.sum_salary DESC
          `,
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

  //* Easy update: update salaries to 2500 benith 2000
  public async updateEasy() {
    try {
      const { result, memory, time } = await checkPerformance(() => {
        return this.conn.query({
          query: `
            ALTER TABLE 
                salary 
              UPDATE 
                salary = 2500 
              WHERE 
                salary < 2000
          `,
        });
      });

      await this.insertCSV();

      return {
        memory: memory,
        time: time,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected errror');
    }
  }

  //* Medium update:
  public async updateMedium(): Promise<any | Error> {
    try {
      const { result, memory, time } = await checkPerformance(() => {
        return this.conn.query({
          query: `
            ALTER TABLE 
              salary 
            UPDATE 
              salary = 4500 
            WHERE 
              employee_id IN ( 
                SELECT 
                  id 
                FROM 
                  employees 
                WHERE 
                  gender = 'M' AND 
                  hire_date > '2000-01-01' 
              ) AND 
              salary < 3000
          `,
        });
      });

      await this.insertCSV();

      return {
        memory: memory,
        time: time,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected errror');
    }
  }

  //* Hard update:
  public async updateHard(): Promise<any | Error> {
    try {
      const { result, memory, time } = await checkPerformance(() => {
        return this.conn.query({
          query: `
          
          `,
        });
      });

      await this.insertCSV();

      return {
        memory: memory,
        time: time,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected errror');
    }
  }

  //* Easy delete: delete all records where title = "Junior BackEnd"
  public async deleteEasy(): Promise<any | Error> {
    try {
      const { result, memory, time } = await checkPerformance(() => {
        return this.conn.query({
          query: `
            ALTER TABLE 
              titles 
            DELETE WHERE 
              title = 'Junior BackEnd'
          `,
        });
      });

      await this.insertCSV();

      return {
        memory: memory,
        time: time,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected errror');
    }
  }

  //* Medium delete:
  public async deleteMedium(): Promise<any | Error> {
    try {
      const { result, memory, time } = await checkPerformance(() => {
        return this.conn.query({
          query: `
            ALTER TABLE 
              salary 
            DELETE WHERE 
              salary > 1500 AND 
              salary < 7500 AND 
              from_date > '2011-01-01' AND 
              to_date < '2020-01-01'
          `,
        });
      });

      await this.insertCSV();

      return {
        memory: memory,
        time: time,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected errror');
    }
  }

  //* Hard delete:
  public async deleteHard(): Promise<any | Error> {
    try {
      const { result, memory, time } = await checkPerformance(() => {
        return this.conn.query({
          query:
            `ALTER TABLE titles DELETE WHERE title = 'Junior BackEnd'`,
        });
      });

      await this.insertCSV();

      return {
        memory: memory,
        time: time,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected errror');
    }
  }




  //* Create tables
  private async createTables() {
    try {
      await this.conn.exec({ query: `DROP TABLE IF EXISTS employees` });
      await this.conn.exec({ query: `DROP TABLE IF EXISTS salary` });
      await this.conn.exec({ query: `DROP TABLE IF EXISTS titles` });

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
