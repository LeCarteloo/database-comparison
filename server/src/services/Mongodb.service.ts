import { MongoConnection } from '@/config/databases';
import checkPerformance from '@/utilis/CheckPerformance';
import mongoose, { mongo, Schema } from 'mongoose';
import csvtojson from 'csvtojson';
import { log } from 'util';

class MongodbService {
  private conn = MongoConnection;

  constructor() { }

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

  //* Insert data
  public async insert(amount: number) {
    try {
      const salary = await csvtojson().fromFile('./src/data/db_salary.csv');
      let values: any[] = [];

      for (let i = 0; i < amount; i++) {
        if (!salary[i]) break;
        values.push([
          salary[i].employee_id,
          salary[i].salary,
          salary[i].from_date,
          salary[i].to_date,
        ]);
      }

      let valuesToAdd = values
        .map(
          (val) =>
            '{"employee_id": ' + val[0] + ', "salary": ' + val[1] + ', "from_date": "' + val[2] + '", "to_date": "' + val[3] + '"}',
        )
        .join(',');

      const { result, memory, time } = await checkPerformance(async () => {
        return await this.conn.db.collection('salary').insertMany(
          JSON.parse("[" + valuesToAdd + "]")
        );
      });

      return {
        result: result['insertedCount'],
        memory: memory,
        time: time,
      };
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  //* Easy select: Returns salaries higher than 3000
  public async selectEasy() {
    try {
      const { result, memory, time } = await checkPerformance(async () => {
        return await this.conn.db.collection('salary').find({ 'salary': { $gte: 5000, $lt: 8000 } }).toArray();
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
      const { result, memory, time } = await checkPerformance(async () => {
        return await this.conn.db.collection('salary').find({ 'salary': { $gte: 5000 } }).toArray();
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


  public async selectHard() {
    try {
      const { result, memory, time } = await checkPerformance(async () => {
        return await this.conn.db.collection('salary').find().toArray();
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

  public async updateEasy() {
    try {
      const { result, memory, time } = await checkPerformance(async () => {
        return await this.conn.db.collection('salary').updateMany({ 'salary': { $gte: 5000, $lt: 8000 } }, { $set: { salary: 2500 } });
      });

      this.insertCSV();

      return {
        records: result,
        memory,
        time,
      };
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  public async updateMedium() {
    try {
      const { result, memory, time } = await checkPerformance(async () => {
        return await this.conn.db.collection('salary').updateMany({ 'salary': { $gte: 5000 } }, { $set: { salary: 2500 } });
      });

      this.insertCSV();

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


  public async updateHard() {
    try {
      const { result, memory, time } = await checkPerformance(async () => {
        return await this.conn.db.collection('salary').updateMany({}, { $set: { salary: 2500 } });
      });

      this.insertCSV();

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

  public async deleteEasy() {
    try {
      const { result, memory, time } = await checkPerformance(async () => {
        return await this.conn.db.collection('salary').deleteMany({ 'salary': { $gte: 5000, $lt: 8000 } });
      });

      this.insertCSV();

      return {
        records: result['deletedCount'],
        memory,
        time,
      };
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  public async deleteMedium() {
    try {
      const { result, memory, time } = await checkPerformance(async () => {
        return await this.conn.db.collection('salary').deleteMany({ 'salary': { $gte: 5000 } });
      });

      this.insertCSV();

      return {
        records: result['deletedCount'],
        memory,
        time,
      };
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }


  public async deleteHard() {
    try {
      const { result, memory, time } = await checkPerformance(async () => {
        return await this.conn.db.collection('salary').deleteMany({});
      });

      this.insertCSV();

      return {
        records: result['deletedCount'],
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
      await this.conn.dropDatabase()

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
