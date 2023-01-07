import { MysqlConnection } from '@/config/databases';
import checkPerformance from '@/utilis/CheckPerformance';

class MysqlService {
  private conn = MysqlConnection;

  constructor() {
    this.createTables();
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
        return this.conn.execute(`SELECT * FROM users`);
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
      await this.conn.execute(`CREATE TABLE IF NOT EXISTS users (
          id integer PRIMARY KEY AUTO_INCREMENT,
          title VARCHAR(255) NOT NULL,
          contest TEXT NOT NULL
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
