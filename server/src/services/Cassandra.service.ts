import { CassandraConnection } from '@/config/databases';
import checkPerformance from '@/utilis/CheckPerformance';
import csvtojson from 'csvtojson';

class CassandraService {
  private conn = CassandraConnection;

  constructor() {}

  //* Insert data from CSV file
  public async insertCSV() {
    try {
      await this.createTables();

      const { memory, time } = await checkPerformance(() => {
        return this.conn.execute(
          `COPY cassandra.employees(id, birth_date, first_name, last_name, gender, hire_date) FROM './src/data/db_employees.csv' WITH JSON 'auto'`,
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

  //* Create database
  private async createTables() {
    try {
      await this.conn.execute(
        `CREATE KEYSPACE IF NOT EXISTS cassandra WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1}`,
      );

      await this.conn.execute(
        'CREATE TABLE IF NOT EXISTS cassandra.employees (id text, birth_date text, first_name text, last_name text, gender text, hire_date text, PRIMARY KEY (id))',
      );
      await this.conn.execute(
        'CREATE TABLE IF NOT EXISTS cassandra.salary (id text, employee_id text, salary int, from_data text, to_data text, PRIMARY KEY (id))',
      );
      await this.conn.execute(
        'CREATE TABLE IF NOT EXISTS cassandra.titles (id text, employee_id text, title text, from_data text, to_data text, PRIMARY KEY (id))',
      );
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }
}

export default CassandraService;
