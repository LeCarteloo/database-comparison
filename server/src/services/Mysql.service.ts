import { MysqlConnection } from '@/config/databases';
import checkPerformance from '@/utilis/CheckPerformance';
import csvtojson from 'csvtojson';

class MysqlService {
  private conn = MysqlConnection;

  constructor() {
    this.createTables();
  }

  //* Insert data from CSV file
  public async insertCSV() {
    try {
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
          employee.employee_id,
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
          `INSERT INTO employees (employee_id, birth_date, first_name, last_name, gender, hire_date) VALUES ?`,
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

  //* Selecting data
  public async select(): Promise<any | Error> {
    try {
      const { memory, time } = await checkPerformance(() => {
        return this.conn.execute(`SELECT * FROM salary`);
      });

      // const start = performance.now();
      // const test = await this.conn.execute(`SELECT * FROM users`);
      // const end = performance.now();

      return {
        // result: result,
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
  private async createTables(): Promise<any | Error> {
    try {
      await this.conn.execute(`CREATE TABLE IF NOT EXISTS employees (
        employee_id VARCHAR(255),
        birth_date VARCHAR(255),
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        gender VARCHAR(255),
        hire_date VARCHAR(255)
        )`);
      await this.conn.execute(`CREATE TABLE IF NOT EXISTS salary (
        employee_id VARCHAR(255),
        salary VARCHAR(255),
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
