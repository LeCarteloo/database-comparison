import { CassandraConnection } from '@/config/databases';
import checkPerformance from '@/utilis/CheckPerformance';
import csvtojson from 'csvtojson';

class CassandraService {
  private conn = CassandraConnection;

  constructor() {}

  //* Select easy
  public async selectEasy() {
    try {
      const { result, memory, time } = await checkPerformance(() => {
        return this.conn.execute(
          `SELECT * FROM cassandra.salary WHERE salary >= 3000 ALLOW FILTERING`,
        );
      });
      // console.log(result);

      // const [rows] = await result;
      return {
        // records: await result.result.length,
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

  //* Insert data from CSV file
  public async insertCSV() {
    try {
      await this.createTables();

      const employees = await csvtojson().fromFile(
        './src/data/db_employees.csv',
      );
      const salary = await csvtojson().fromFile('./src/data/db_salary.csv');
      const titles = await csvtojson().fromFile('./src/data/db_titles.csv');

      const employeeArray = employees.map((employee) => [
        employee.id,
        employee.birth_date,
        employee.first_name,
        employee.last_name,
        employee.gender,
        employee.hire_date,
      ]);

      const salaryArray = salary.map((salar, i) => [
        i.toString(),
        salar.employee_id,
        parseInt(salar.salary),
        salar.from_date,
        salar.to_date,
      ]);

      console.log(salaryArray.splice(0, 10));

      const titlesArray = titles.map((title, i) => [
        i.toString(),
        title.employee_id,
        title.title,
        title.from_date,
        title.to_date,
      ]);

      let splitCount = 3;
      let splitTest = Math.ceil(titlesArray.length / splitCount);
      let arrayTest: any[] = [];
      for (let i = 0; i < splitCount; i++) {
        arrayTest.push(titlesArray.splice(0, splitTest));
      }

      let splitSize = 300;
      let kek: any[] = [];
      for (let i = 0; i < salaryArray.length; i += splitSize) {
        kek.push(salaryArray.slice(i, i + splitSize));
      }

      const myAsyncLoopFunction = async () => {
        const allAsyncResults = [];

        for (const k of kek) {
          const asyncResult = await this.conn.batch(
            k.map((salaryRecord: any) => ({
              query: `INSERT INTO cassandra.salary (id, employee_id, salary, from_date, to_date) VALUES (?,?,?,?,?)`,
              params: salaryRecord,
            })),
          );

          allAsyncResults.push(asyncResult);
        }

        return allAsyncResults;
      };

      const { result, memory, time } = await checkPerformance(async () => {
        await myAsyncLoopFunction();
        this.conn.batch(
          employeeArray.map((employeeRecord) => ({
            query: `INSERT INTO cassandra.employees(id, birth_date, first_name, last_name, gender, hire_date) VALUES (?,?,?,?,?,?)`,
            params: employeeRecord,
          })),
        );
        this.conn.batch(
          arrayTest[0].map((titlesRecord: any) => ({
            query: `INSERT INTO cassandra.titles (id, employee_id, title, from_date, to_date) VALUES (?, ?, ?, ?, ?)`,
            params: titlesRecord,
          })),
        );
        this.conn.batch(
          arrayTest[1].map((titlesRecord: any) => ({
            query: `INSERT INTO cassandra.titles (id, employee_id, title, from_date, to_date) VALUES (?, ?, ?, ?, ?)`,
            params: titlesRecord,
          })),
        );
        this.conn.batch(
          arrayTest[2].map((titlesRecord: any) => ({
            query: `INSERT INTO cassandra.titles (id, employee_id, title, from_date, to_date) VALUES (?, ?, ?, ?, ?)`,
            params: titlesRecord,
          })),
        );
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

  //* Create databaseA
  private async createTables() {
    try {
      await this.conn.execute(
        `CREATE KEYSPACE IF NOT EXISTS cassandra WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1}`,
      );

      await this.conn.execute('DROP TABLE IF EXISTS cassandra.employees');
      await this.conn.execute('DROP TABLE IF EXISTS cassandra.salary');
      await this.conn.execute('DROP TABLE IF EXISTS cassandra.titles');

      await this.conn.execute(
        'CREATE TABLE IF NOT EXISTS cassandra.employees (id text, birth_date text, first_name text, last_name text, gender text, hire_date text, PRIMARY KEY (id))',
      );
      await this.conn.execute(
        'CREATE TABLE IF NOT EXISTS cassandra.salary (id text, employee_id text, salary double, from_date text, to_date text, PRIMARY KEY (id))',
      );
      await this.conn.execute(
        'CREATE TABLE IF NOT EXISTS cassandra.titles (id text, employee_id text, title text, from_date text, to_date text, PRIMARY KEY (id))',
      );
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }
}

export default CassandraService;
