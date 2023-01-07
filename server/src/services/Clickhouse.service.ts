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
            CREATE TABLE IF NOT EXISTS users(
                id UInt64, 
                title String, 
                contest String
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
