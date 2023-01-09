import { MysqlConnection } from '@/config/databases';
import checkPerformance from '@/utilis/CheckPerformance';
import csvtojson from 'csvtojson';

class MysqlService {
  private conn = MysqlConnection;

  constructor() {}

  //* Insert data from CSV file
  public async insertCSV() {
    try {
      await this.createTables();

      const employees = await csvtojson().fromFile(
        './src/data/db_employees.csv',
      );
      const salary = await csvtojson().fromFile('./src/data/db_salary.csv');
      const titles = await csvtojson().fromFile('./src/data/db_titles.csv');

      let employeesArray: any[] = [];
      let salaryArray: any[] = [];
      let titlesArray: any[] = [];

      employees.forEach((employee: any) => {
        employeesArray.push([
          employee.id,
          employee.birth_date,
          employee.first_name,
          employee.last_name,
          employee.gender,
          employee.hire_date,
        ]);
      });

      salary.forEach((salary: any) => {
        salaryArray.push([
          salary.employee_id,
          salary.salary,
          salary.from_date,
          salary.to_date,
        ]);
      });

      titles.forEach((titles: any) => {
        titlesArray.push([
          titles.employee_id,
          titles.title,
          titles.from_date,
          titles.to_date,
        ]);
      });

      const { memory, time } = await checkPerformance(() => {
        this.conn.query(
          `INSERT INTO employees (id, birth_date, first_name, last_name, gender, hire_date) VALUES ?`,
          [employeesArray],
        );
        this.conn.query(
          `INSERT INTO salary (employee_id, salary, from_date, to_date) VALUES ?`,
          [salaryArray],
        );
        this.conn.query(
          `INSERT INTO titles (employee_id, title, from_date, to_date) VALUES ?`,
          [titlesArray],
        );
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

  //* Inserting data
  public async insert(amount: number): Promise<any | Error> {
    try {
      const { memory, time } = await checkPerformance(() => {
        return this.conn.execute(`
          INSERT INTO users (title, contest)
          VALUES ('Test1', 'Test1'),
          ('Test2', 'Test2')
      `);
      });

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

  //* Easy select: Returns salaries higher than 3000
  public async selectEasy(): Promise<any | Error> {
    try {
      const { result, memory, time } = await checkPerformance(() => {
        return this.conn.query(`SELECT * FROM salary s WHERE s.salary >= 3000`);
      });

      const [rows] = result;

      return {
        records: rows.length,
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
  public async selectMedium(): Promise<any | Error> {
    try {
      const { result, memory, time } = await checkPerformance(() => {
        return this.conn.query(
          `SELECT * FROM salary AS s, employees AS e, titles AS t WHERE e.id = t.employee_id AND title LIKE '%BackEnd%' AND e.id = s.employee_id`,
        );
      });

      const [rows] = result;

      return {
        records: rows.length,
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
  public async selectHard(): Promise<any | Error> {
    try {
      const { result, memory, time } = await checkPerformance(() => {
        return this.conn.query(
          `SELECT id, first_name, last_name, gender, hire_date, s.how_many_withdrawals, s.smallest_payout, s.biggest_payout, t.how_many_titles, t.last_promotion
            FROM employees AS e
            LEFT JOIN(SELECT count(salary) as how_many_withdrawals, max(salary) as biggest_payout, min(salary) as smallest_payout, employee_id FROM salary
            GROUP BY employee_id) AS s
            ON e.id = s.employee_id
            LEFT JOIN(SELECT count(title) as how_many_titles, employee_id, MAX(from_date) as last_promotion FROM titles GROUP BY employee_id) AS t
            ON e.id = t.employee_id`,
        );
      });

      const [rows] = result;

      return {
        records: rows.length,
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
  private async createTables(): Promise<any | Error> {
    try {
      await this.conn.execute(`CREATE TABLE IF NOT EXISTS employees (
        id VARCHAR(255),
        birth_date VARCHAR(255),
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        gender VARCHAR(255),
        hire_date VARCHAR(255)
        )`);
      await this.conn.execute(`CREATE TABLE IF NOT EXISTS salary (
        employee_id VARCHAR(255),
        salary INT,
        from_date VARCHAR(255),
        to_date VARCHAR(255)
        )`);
      await this.conn.execute(`CREATE TABLE IF NOT EXISTS titles (
        employee_id VARCHAR(255),
        title VARCHAR(255),
        from_date VARCHAR(255),
        to_date VARCHAR(255)
        )`);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
      console.log('Unexpected error');
    }
  }
}

export default MysqlService;
