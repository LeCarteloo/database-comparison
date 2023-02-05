import { PostgresConnection } from '@/config/databases';
import checkPerformance from '@/utilis/CheckPerformance';
import { importCsvToPgsql } from '@/utilis/ImportCSV';
import csvtojson from 'csvtojson';
import { QueryResponse } from 'interfaces';

class PgsqlService {
  private conn = PostgresConnection;

  constructor() {}

  //* Insert data from CSV file
  public async insertCSV(): Promise<QueryResponse | Error> {
    try {
      await this.createTables();

      const { memory, time } = await checkPerformance(async () => {
        await importCsvToPgsql(this.conn, 'salary', './src/data/db_salary.csv');
        await importCsvToPgsql(
          this.conn,
          'employees',
          './src/data/db_employees.csv',
        );
        await importCsvToPgsql(this.conn, 'titles', './src/data/db_titles.csv');
      });

      return {
        memory,
        time,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected errror');
    }
  }

  //* Inserts data
  public async insert(amount: number): Promise<QueryResponse | Error> {
    try {
      const salary = await csvtojson().fromFile('./src/data/db_salary.csv');

      const { memory, time } = await checkPerformance(() => {
        return this.conn.query(
          `INSERT INTO salary(employee_id, salary, from_date, to_date) VALUES ${salary
            .splice(0, amount)
            .map(
              (val) =>
                `(${val.employee_id}, ${val.salary}, ${val.from_date}, ${val.to_date})`,
            )
            .join(',')};`,
        );
      });

      await this.insertCSV();

      return {
        records: amount,
        memory,
        time,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected errror');
    }
  }

  //* Easy select: Returns salaries higher than 3000
  public async selectEasy(): Promise<QueryResponse | Error> {
    try {
      const { result, memory, time } = await checkPerformance(() => {
        return this.conn.query(
          ` SELECT * FROM salary s WHERE s.salary >= 3000`,
        );
      });

      return {
        records: result.rows.length,
        memory,
        time,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected errror');
    }
  }

  //* Medium select: Returns all salaries
  public async selectMedium(): Promise<QueryResponse | Error> {
    try {
      const { result, memory, time } = await checkPerformance(() => {
        return this.conn.query(
          `SELECT DISTINCT e.* FROM salary AS s, employees AS e, titles AS t WHERE e.id = t.employee_id AND title LIKE '%BackEnd%' AND e.id = s.employee_id`,
        );
      });

      return {
        records: result.rows.length,
        memory,
        time,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected errror');
    }
  }

  //* Hard select
  public async selectHard(): Promise<QueryResponse | Error> {
    try {
      const { result, memory, time } = await checkPerformance(() => {
        return this.conn.query(
          `SELECT id, first_name, last_name, gender, hire_date, s.how_many_withdrawals, s.smallest_payout, s.biggest_payout, s.sum_salary, t.how_many_titles, t.last_promotion
          FROM employees AS e
          LEFT JOIN(SELECT count(salary) as how_many_withdrawals, max(salary) as biggest_payout, min(salary) as smallest_payout, sum(salary) as sum_salary, employee_id FROM salary GROUP BY employee_id) AS s
          ON e.id = s.employee_id
          LEFT JOIN(SELECT count(title) as how_many_titles, employee_id, MAX(from_date) as last_promotion FROM titles GROUP BY employee_id) AS t
          ON e.id = t.employee_id
          WHERE gender = 'F' AND hire_date < '2015-01-01' AND last_promotion < '2020-01-01' AND sum_salary > 100000 ORDER BY sum_salary desc`,
        );
      });

      return {
        records: result.rows.length,
        memory,
        time,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected errror');
    }
  }

  //* Easy update: update salaries to 2500 benith 2000
  public async updateEasy(): Promise<QueryResponse | Error> {
    try {
      const { result, memory, time } = await checkPerformance(() => {
        return this.conn.query(
          `UPDATE salary SET salary = 2500 WHERE salary < 2000`,
        );
      });

      await this.insertCSV();

      return {
        records: result.rowCount,
        memory,
        time,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected errror');
    }
  }

  //* Medium update:
  public async updateMedium(): Promise<QueryResponse | Error> {
    try {
      const { result, memory, time } = await checkPerformance(() => {
        return this.conn.query(
          `UPDATE salary AS s
          SET salary = 4500
        FROM employees AS e
        WHERE s.employee_id = e.id
          AND e.gender = 'M' 
          AND s.salary < 3000 
          AND e.hire_date > '2000-01-01'`,
        );
      });

      await this.insertCSV();

      return {
        records: result.rowCount,
        memory,
        time,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected errror');
    }
  }

  //* Hard update:
  public async updateHard(): Promise<QueryResponse | Error> {
    try {
      const { result, memory, time } = await checkPerformance(async () => {
        const data = new Date().toISOString().slice(0, 10);

        await this.conn.query(
          `UPDATE employees
          SET hire_date = '2023-01-01'
          WHERE id IN (
          SELECT e.id
          FROM salary s
          JOIN employees e ON e.id = s.employee_id
          JOIN titles t ON e.id = t.employee_id
          WHERE s.salary > 2000 AND s.salary < 10000
          )

          `,
        );
      });

      await this.insertCSV();

      return {
        // records: result.rowCount,
        memory,
        time,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected errror');
    }
  }

  //* Easy delete: delete all records where title = "Junior BackEnd"
  public async deleteEasy(): Promise<QueryResponse | Error> {
    try {
      const { result, memory, time } = await checkPerformance(() => {
        return this.conn.query(
          `DELETE FROM titles WHERE title = 'Junior BackEnd'`,
        );
      });

      await this.insertCSV();

      return {
        memory,
        time,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected errror');
    }
  }

  //* Medium delete:
  public async deleteMedium(): Promise<QueryResponse | Error> {
    try {
      const { result, memory, time } = await checkPerformance(() => {
        return this.conn.query(
          `DELETE FROM salary WHERE salary > 1500 AND salary < 7500 AND from_date > '2011-01-01' AND to_date < '2020-01-01'`,
        );
      });

      await this.insertCSV();

      return {
        memory,
        time,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected errror');
    }
  }

  //* Hard delete:
  public async deleteHard(): Promise<QueryResponse | Error> {
    try {
      const { result, memory, time } = await checkPerformance(() => {
        return this.conn.query(
          `DELETE FROM 
          employees 
        WHERE 
          id IN (SELECT DISTINCT e.id FROM salary s, employees e, titles t WHERE e.id = s.employee_id AND e.id = t.employee_id  AND s.salary > 2000)`,
        );
      });

      await this.insertCSV();

      return {
        memory,
        time,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected errror');
    }
  }

  //* Create tables
  private async createTables(): Promise<void | Error> {
    try {
      await this.conn.query('DROP TABLE IF EXISTS employees');
      await this.conn.query('DROP TABLE IF EXISTS salary');
      await this.conn.query('DROP TABLE IF EXISTS titles');

      await this.conn.query(`CREATE TABLE IF NOT EXISTS employees (
        id VARCHAR(255),
        birth_date VARCHAR(255),
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        gender VARCHAR(255),
        hire_date VARCHAR(255)
        );`);
      await this.conn.query(`CREATE TABLE IF NOT EXISTS salary (
        employee_id VARCHAR(255),
        salary INT,
        from_date VARCHAR(255),
        to_date VARCHAR(255)
        );`);
      await this.conn.query(`CREATE TABLE IF NOT EXISTS titles (
        employee_id VARCHAR(255),
        title VARCHAR(255),
        from_date VARCHAR(255),
        to_date VARCHAR(255)
        );`);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
      console.log('Unexpected error');
    }
  }
}

export default PgsqlService;
