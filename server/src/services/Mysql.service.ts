import mysql, { Connection, QueryError } from 'mysql2';

class MysqlService {
  private conn: any;

  constructor() {
    this.conn = this.initMysqlCon();
    // this.createTables();
  }

  //* Inserting data
  public async insert(amount: number): Promise<any | Error> {
    try {
      const [rows] = await this.conn.query(`
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
      const [rows] = await this.conn.query(`
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

  //* Init mysql connection
  private initMysqlCon(): any {
    const { MYSQL_HOST, MYSQL_PORT, MYSQL_DB, MYSQL_USER, MYSQL_PASS } =
      process.env;
    const conn = mysql
      .createPool({
        port: Number(MYSQL_PORT),
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASS,
        database: MYSQL_DB,
      })
      .promise();

    return conn;
  }

  //* Create tables
  private async createTables(): Promise<any | Error> {
    try {
      await this.conn.execute(`CREATE TABLE user (
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
