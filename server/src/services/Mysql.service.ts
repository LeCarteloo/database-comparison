import { mysqlConn } from '@/config/databases';
import mysql, { Connection, QueryError } from 'mysql2';

class MysqlService {
  private conn = mysqlConn;

  constructor() {
    this.createTables();
  }

  //* Inserting data
  public async insert(amount: number): Promise<any | Error> {
    try {
      const [rows] = await this.conn.execute(`
        INSERT INTO user (title, contest)
        VALUES ('Test1', 'Test1'),
        ('Test2', 'Test2')
      `);

      return rows;
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
      const [rows] = await this.conn.execute(`
        SELECT * FROM user
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
      await this.conn.execute(`CREATE TABLE IF NOT EXISTS user (
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
