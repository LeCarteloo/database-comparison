import morgan from 'morgan';
import mysql from 'mysql2';
import pg from 'pg';

let pgConn: any;
let mysqlConn: any;

const connectDatabases = () => {
  //* Pgsql
  const connectPgsql = () => {
    try {
      const { PG_HOST, PG_PORT, PG_DB, PG_USER, PG_PASS } = process.env;
      const pgConn = new pg.Client({
        port: Number(PG_PORT),
        host: PG_HOST,
        user: PG_USER,
        password: PG_PASS,
        database: PG_DB,
      });

      pgConn.connect();

      console.log('Connected with Postgresql');
      return pgConn;
    } catch (error) {
      console.log('Unable to connect with Postgresql');
    }
  };

  //* Mysql
  const connectMysql = () => {
    try {
      const { MYSQL_HOST, MYSQL_PORT, MYSQL_DB, MYSQL_USER, MYSQL_PASS } =
        process.env;
      const mysqlConn = mysql
        .createPool({
          port: Number(MYSQL_PORT),
          host: MYSQL_HOST,
          user: MYSQL_USER,
          password: MYSQL_PASS,
          database: MYSQL_DB,
        })
        .promise();

      console.log('Connected with Mysql');
      return mysqlConn;
    } catch (error) {
      console.log('Unable to connect with Mysql');
    }
  };

  pgConn = connectPgsql();
  mysqlConn = connectMysql();
};

export { connectDatabases, pgConn, mysqlConn };
