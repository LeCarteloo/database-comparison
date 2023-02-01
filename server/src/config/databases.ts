import { createClient } from '@clickhouse/client';
import mongoose, { Connection } from 'mongoose';
import mysql from 'mysql2';
import pg from 'pg';
import { red, green } from 'colors';
import { Database } from 'arangojs';

let PostgresConnection: any;
let MysqlConnection: any;
let MongoConnection: Connection;
let ClickhouseConnection: any;
let ArangoConnection: any;

const connectDatabases = async () => {
  //* ClickHouse
  const connectClickHouse = async () => {
    try {
      const { CH_PORT, CH_HOST } = process.env;
      const conn = createClient({
        host: `http://${CH_HOST}:${CH_PORT}`,
      });

      const isAlive = await conn.ping();

      if (!isAlive) {
        throw new Error('');
      }

      console.log(green('- Connected with ClickHouse'));
      return conn;
    } catch (error) {
      console.log(red('- Unable to connect with ClickHouse'));
    }
  };

  //* Mongodb
  const connectMongodb = async () => {
    try {
      const { MONGO_URI } = process.env;
      mongoose.set('strictQuery', true);
      const conn = await mongoose.connect(`${MONGO_URI}`);
      console.log(green('- Connected with MongoDB'));
      return conn.connection;
    } catch (error) {
      console.log(red('- Unable to connect with MongoDB'));
      process.exit(1);
    }
  };

  const connectArangodb = async () => {
    try {
      const conn = new Database({
        url: 'http://127.0.0.1:8529',
        auth: { username: 'root', password: 'root' },
      });

      console.log(green('- Connected with ArangoDB'));
      return conn;
    } catch (error) {
      console.log(red('- Unable to connect with ArangoDB'));
    }
  };

  //* Pgsql
  const connectPgsql = async () => {
    try {
      const { PG_HOST, PG_PORT, PG_DB, PG_USER, PG_PASS } = process.env;
      const PostgresConnection = new pg.Client({
        port: Number(PG_PORT),
        host: PG_HOST,
        user: PG_USER,
        password: PG_PASS,
        database: PG_DB,
      });

      await PostgresConnection.connect();

      console.log(green('- Connected with Postgresql'));
      return PostgresConnection;
    } catch (error) {
      console.log(red('- Unable to connect with Postgresql'));
    }
  };

  //* Mysql
  const connectMysql = async () => {
    try {
      const { MYSQL_HOST, MYSQL_PORT, MYSQL_DB, MYSQL_USER, MYSQL_PASS } =
        process.env;
      const MysqlConnection = mysql
        .createConnection({
          port: Number(MYSQL_PORT),
          host: MYSQL_HOST,
          user: MYSQL_USER,
          password: MYSQL_PASS,
          database: MYSQL_DB,
        })
        .promise();

      await MysqlConnection.connect();

      console.log(green('- Connected with Mysql'));
      return MysqlConnection;
    } catch (error) {
      console.log(red('- Unable to connect with Mysql'));
    }
  };

  PostgresConnection = await connectPgsql();
  MysqlConnection = await connectMysql();
  ClickhouseConnection = await connectClickHouse();
  MongoConnection = await connectMongodb();
  ArangoConnection = await connectArangodb();
};

export {
  connectDatabases,
  PostgresConnection,
  MysqlConnection,
  MongoConnection,
  ArangoConnection,
  ClickhouseConnection,
};
