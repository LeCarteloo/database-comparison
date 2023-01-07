import { PostgresConnection } from '@/config/databases';
import checkPerformance from '@/utilis/CheckPerformance';

class PgsqlService {
  private conn = PostgresConnection;

  constructor() {
    this.createTables();
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

  //* Select data
  public async select(): Promise<any | Error> {
    try {
      const { memory, time } = await checkPerformance(() => {
        return this.conn.query(` SELECT * FROM users`);
      });

      return {
        // result: rows,
        time: time,
        memory: memory,
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
      await this.conn.query(`
        CREATE TABLE IF NOT EXISTS users(
        title VARCHAR(255),
        contest VARCHAR(255)
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
