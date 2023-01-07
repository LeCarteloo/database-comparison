import { ClickhouseConnection } from '@/config/databases';
import checkPerformance from '@/utilis/CheckPerformance';

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
          query: 'SELECT * FROM users',
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
                id UInt64, 
                employee_id String,
                birth_date String,
                first_name String,
                last_name String,
                gender String,
                hire_date String
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
