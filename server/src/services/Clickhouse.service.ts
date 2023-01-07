import { createClient, ClickHouseClient } from '@clickhouse/client';

class ClickhouseService {
  private conn: ClickHouseClient;

  constructor() {
    this.conn = this.initClickhouseCon();
    this.createTables();
  }

  //* Insert data
  public async select() {
    try {
      const start = performance.now();
      console.time('test');
      await this.conn.exec({
        query: 'SELECT * FROM users',
      });
      console.timeEnd('test');

      const end = performance.now();

      return {
        time: end - start,
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
      const start = performance.now();
      const result = await this.conn.insert({
        table: 'users',
        values: [
          { id: 1, title: 'Test1', contest: 'Test1' },
          { id: 2, title: 'Test2', contest: 'Test2' },
        ],
        format: 'JSONEachRow',
      });
      const end = performance.now();

      return {
        result: result,
        time: end - start,
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
        // clickhouse_settings: {
        //   wait_end_of_query: 1,
        // },
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  private initClickhouseCon() {
    const { CH_PORT, CH_HOST } = process.env;

    const conn = createClient({
      host: `http://${CH_HOST}:${CH_PORT}`,
    });

    return conn;
  }
}

export default ClickhouseService;
