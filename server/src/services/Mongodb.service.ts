import { MongoConnection } from '@/config/databases';
import checkPerformance from '@/utilis/CheckPerformance';
import mongoose from 'mongoose';
import csvtojson from 'csvtojson';

class MongodbService {
  private conn = MongoConnection;

  constructor() {
    this.createCollections();
    this.insertCSV();
  }

  //* Select data
  public async select() {
    try {
      const { memory, time } = await checkPerformance(() => {
        return mongoose.connection.db.collection('users').find();
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

  //* Insert data
  public async insert(amount: number) {
    try {
      const { memory, time } = await checkPerformance(() => {
        return mongoose.connection.db.collection('employees').insertMany([
          {
            title: 'Test1',
            contest: 'Test2',
          },
          {
            title: 'Test1',
            contest: 'Test2',
          },
        ]);
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

  //* Insert data from CSV file
  public async insertCSV() {
    try {
      const employees = await csvtojson().fromFile(
        './src/data/db_employees.csv',
      );
      const salary = await csvtojson().fromFile('./src/data/db_salary.csv');
      const titles = await csvtojson().fromFile('./src/data/db_titles.csv');

      const { memory, time } = await checkPerformance(() => {
        mongoose.connection.db.collection('employees').insertMany(employees);
        mongoose.connection.db.collection('salary').insertMany(salary);
        mongoose.connection.db.collection('titles').insertMany(titles);
      });

      return {
        memory,
        time,
      };
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  //* Create database
  private async createCollections() {
    try {
      const employeesExist = this.conn.db.collection('employees');
      const salaryExist = this.conn.db.collection('salary');
      const titlesExist = this.conn.db.collection('titles');

      if (employeesExist && salaryExist && titlesExist) {
        return;
      }

      await this.conn.createCollection('employees');
      await this.conn.createCollection('salary');
      await this.conn.createCollection('titles');
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }
}

export default MongodbService;
