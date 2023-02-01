import { createClient } from '@clickhouse/client';
import mongoose, { Connection } from 'mongoose';
import mysql from 'mysql2';
import pg from 'pg';
import cassandra, { Client } from 'cassandra-driver';
import { red, green } from 'colors';

let PostgresConnection: any;
let MysqlConnection: any;
let MongoConnection: Connection;
let ClickhouseConnection: any;
let CassandraConnection: any;

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

  //* Cassandra
  const connectCassandra = async () => {
    try {
      const client = new Client({
        contactPoints: ['localhost:9042'],
        localDataCenter: 'datacenter1',
        socketOptions: {
          readTimeout: 120000,
          connectTimeout: 120000,
        },
        queryOptions: {
          consistency: cassandra.types.consistencies.quorum,
        },
      });

      await client.connect();

      console.log(green('- Connected with Cassandra'));
      return client;
    } catch (error) {
      console.log(red('- Unable to connect with Cassandra'));
      console.log(error);
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
  CassandraConnection = await connectCassandra();
  MongoConnection = await connectMongodb();
};

export {
  connectDatabases,
  PostgresConnection,
  MysqlConnection,
  MongoConnection,
  CassandraConnection,
  ClickhouseConnection,
};
