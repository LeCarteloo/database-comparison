import { pgConn } from '@/config/databases';

class PgsqlService {
  private conn = pgConn;

  constructor() {
    this.createTables();
  }

  //* Inserts data
  public async insert(amount: number): Promise<any | Error> {
    try {
      const result = await this.conn.query(
        `INSERT INTO users(title, contest) VALUES ('Test1', 'Test1');`,
      );
      return result;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
      console.log('Unexpected error');
    }
  }

  public async select(): Promise<any | Error> {
    try {
      const { rows } = await this.conn.query(`
        SELECT * FROM users
      `);

      return rows;
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
