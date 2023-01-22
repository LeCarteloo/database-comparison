import { MongoConnection } from '@/config/databases';
import checkPerformance from '@/utilis/CheckPerformance';
import mongoose, { mongo, Schema } from 'mongoose';
import csvtojson from 'csvtojson';

class MongodbService {
  private conn = MongoConnection;

  constructor() {}

  //* Easy select: Returns salaries higher than 3000
  public async selectEasy() {
    try {
      const { result, memory, time } = await checkPerformance(async () => {
        return await mongoose.connection.db
          .collection('salary')
          .find({ salary: { $gte: 3000 } })
          .toArray();
      });

      return {
        records: result.length,
        memory,
        time,
      };
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  //* SELECT * FROM salary AS s, employees AS e, titles AS t
  //* WHERE e.id = t.employee_id AND title LIKE '%BackEnd%' AND e.id = s.employee_id
  public async selectMedium() {
    try {
      const { result, memory, time } = await checkPerformance(async () => {});

      return {
        records: result.length,
        memory,
        time,
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
      await this.createCollections();
      const employees = await csvtojson().fromFile(
        './src/data/db_employees.csv',
      );
      const salary = await csvtojson().fromFile('./src/data/db_salary.csv');
      const titles = await csvtojson().fromFile('./src/data/db_titles.csv');

      // TODO: Do it later without forEaches (WIP)
      const salaryWithTypes: any[] = [];
      const employeesWithTypes: any[] = [];
      const titlesWithTypes: any[] = [];

      salary.forEach((sal) => {
        salaryWithTypes.push({
          ...sal,
          employee_id: parseInt(sal.employee_id),
          salary: parseInt(sal.salary),
          from_date: new Date(sal.from_date),
          to_date: new Date(sal.to_date),
        });
      });

      employees.forEach((emp) => {
        employeesWithTypes.push({
          ...emp,
          id: parseInt(emp.id),
          birth_date: new Date(emp.birth_date),
          hire_date: new Date(emp.hire_date),
        });
      });

      titles.forEach((tit) => {
        titlesWithTypes.push({
          ...tit,
          employee_id: parseInt(tit.employee_id),
          from_date: new Date(tit.from_date),
          to_date: new Date(tit.to_date),
        });
      });

      const { memory, time } = await checkPerformance(() => {
        mongoose.connection.db
          .collection('employees')
          .insertMany(employeesWithTypes);
        mongoose.connection.db.collection('salary').insertMany(salaryWithTypes);
        mongoose.connection.db.collection('titles').insertMany(titlesWithTypes);
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
