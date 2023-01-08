import { PostgresConnection } from '@/config/databases';
import checkPerformance from '@/utilis/CheckPerformance';
import csvtojson from 'csvtojson';
import fs from 'fs';
import pg from 'pg';
import test from 'pg-copy-streams';

class PgsqlService {
  private conn = PostgresConnection;

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

      const { PG_HOST, PG_PORT, PG_DB, PG_USER, PG_PASS } = process.env;

      const csvEmployees = async () => {
        return new Promise<void>((resolve, reject) => {
          let pool = new pg.Pool({
            port: Number(PG_PORT),
            host: PG_HOST,
            user: PG_USER,
            password: PG_PASS,
            database: PG_DB,
          });

          // employee
          pool
            .connect()
            .then((client) => {
              var fileStream = fs.createReadStream(
                './src/data/db_employees.csv',
              );
              var stream = client
                .query(
                  test.from(
                    "COPY employees FROM STDIN WITH (FORMAT CSV, HEADER true, NULL '')",
                  ),
                )
                .on('error', reject)
                .on('end', () => {
                  reject(new Error('Connection closed'));
                })
                .on('finish', () => {
                  client.release();
                  resolve();
                });

              fileStream.pipe(stream);
            })
            .catch((err) => {
              reject(new Error(err));
            });
        });
      };

      const csvSalary = async () => {
        return new Promise<void>((resolve, reject) => {
          let pool = new pg.Pool({
            port: Number(PG_PORT),
            host: PG_HOST,
            user: PG_USER,
            password: PG_PASS,
            database: PG_DB,
          });

          // salary
          pool
            .connect()
            .then((client) => {
              var fileStream = fs.createReadStream('./src/data/db_salary.csv');
              var stream = client
                .query(
                  test.from(
                    "COPY salary FROM STDIN WITH (FORMAT CSV, HEADER true, NULL '')",
                  ),
                )
                .on('error', reject)
                .on('end', () => {
                  reject(new Error('Connection closed'));
                })
                .on('finish', () => {
                  client.release();
                  resolve();
                });

              fileStream.pipe(stream);
            })
            .catch((err) => {
              reject(new Error(err));
            });
        });
      };

      const csvTitles = async () => {
        return new Promise<void>((resolve, reject) => {
          let pool = new pg.Pool({
            port: Number(PG_PORT),
            host: PG_HOST,
            user: PG_USER,
            password: PG_PASS,
            database: PG_DB,
          });
          // titles
          pool
            .connect()
            .then((client) => {
              var fileStream = fs.createReadStream('./src/data/db_titles.csv');
              var stream = client
                .query(
                  test.from(
                    "COPY titles FROM STDIN WITH (FORMAT CSV, HEADER true, NULL '')",
                  ),
                )
                .on('error', reject)
                .on('end', () => {
                  reject(new Error('Connection closed'));
                })
                .on('finish', () => {
                  client.release();
                  resolve();
                });

              fileStream.pipe(stream);
            })
            .catch((err) => {
              reject(new Error(err));
            });
        });
      };

      const start = performance.now();
      await csvEmployees();
      await csvSalary();
      await csvTitles();
      const end = performance.now();

      //////////////////////////////////

      // const { memory, time } = await checkPerformance(() => {
      //   return CSV();
      // });

      return {
        // memory,
        time: end - start,
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

  //* Inserts data
  public async select(): Promise<any | Error> {
    try {
      const { memory, time } = await checkPerformance(() => {
        return this.conn.query(` SELECT * FROM users`);
      });

      return {
        // result: rows,
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
        employee_id VARCHAR(255),
        birth_date VARCHAR(255),
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        gender VARCHAR(255),
        hire_date VARCHAR(255)
        );`);
      await this.conn.query(`CREATE TABLE IF NOT EXISTS salary (
        employee_id VARCHAR(255),
        salary VARCHAR(255),
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
