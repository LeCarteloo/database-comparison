import { PostgresConnection } from '@/config/databases';
import checkPerformance from '@/utilis/CheckPerformance';
import { importCsvToPgsql } from '@/utilis/ImportCSV';

class PgsqlService {
  private conn = PostgresConnection;

  constructor() {
    this.createTables();
  }

  //* Insert data from CSV file
  public async insertCSV() {
    try {
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
        console.log(error.message);
      }
    }
  }

  //* Inserts data
  public async insert(amount: number): Promise<any | Error> {
    try {
      const { memory, time } = await checkPerformance(() => {
        return this.conn.query(
          `INSERT INTO users(title, contest) VALUES ('Test1', 'Test1');`,
        );
      });

      return {
        // result: result,
        memory: memory,
        time: time,
      };
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
      console.log('Unexpected error');
    }
  }

  //* Easy select: Returns users with salary higher than 3000
  public async selectEasy(): Promise<any | Error> {
    try {
      const { result, memory, time } = await checkPerformance(() => {
        return this.conn.query(
          ` SELECT * FROM salary s WHERE s.salary >= 3000`,
        );
      });

      return {
        records: result.rows.length,
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
