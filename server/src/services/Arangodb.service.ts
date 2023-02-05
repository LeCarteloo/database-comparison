import { ArangoConnection } from '@/config/databases';
import checkPerformance from '@/utilis/CheckPerformance';
import { Database, aql } from 'arangojs';
import csvtojson from 'csvtojson';

class ArangodbService {
  private conn = ArangoConnection;

  constructor() {}

  //* Insert data
  public async insert(amount: number) {
    try {
      const salary = await csvtojson().fromFile('./src/data/db_salary.csv');

      const { result, memory, time } = await checkPerformance(async () => {
        return await this.conn
          ?.collection('salary')
          .import(salary.splice(0, amount));
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

  public async selectEasy() {
    try {
      const { result, memory, time } = await checkPerformance(async () => {
        const cursor = await this.conn?.query(
          aql`FOR doc IN salary
             FILTER doc.salary >= 5000 AND doc.salary < 8000
             RETURN doc`,
        );
        return await cursor.all();
      });

      return {
        records: result.length,
        memory,
        time,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected errror');
    }
  }

  public async selectMedium() {
    try {
      const { result, memory, time } = await checkPerformance(async () => {
        const cursor = await this.conn?.query(
          aql`FOR doc IN salary
             FILTER doc.salary >= 5000
             RETURN doc`,
        );
        return await cursor.all();
      });

      return {
        records: result.length,
        memory,
        time,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected errror');
    }
  }

  public async selectHard() {
    try {
      const { result, memory, time } = await checkPerformance(async () => {
        const cursor = await this.conn?.query(
          aql`FOR doc IN salary
             RETURN doc`,
        );
        return await cursor.all();
      });

      return {
        records: result.length,
        memory,
        time,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected errror');
    }
  }

  public async updateEasy() {
    try {
      const { result, memory, time } = await checkPerformance(async () => {
        const cursor = await this.conn?.query(
          aql`FOR doc IN salary
            FILTER doc.salary >= 5000 AND doc.salary < 8000
            UPDATE doc WITH { salary: 2500 } IN salary
            RETURN doc
          `,
        );

        return await cursor.all();
      });

      return {
        records: result.length,
        memory,
        time,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected errror');
    }
  }

  public async updateMedium() {
    try {
      const { result, memory, time } = await checkPerformance(async () => {
        const cursor = await this.conn?.query(
          aql`FOR doc IN salary
            FILTER doc.salary >= 5000
            UPDATE doc WITH { salary: 2500 } IN salary
            RETURN doc
          `,
        );

        return await cursor.all();
      });

      return {
        records: result.length,
        memory,
        time,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected errror');
    }
  }

  public async updateHard() {
    try {
      const { result, memory, time } = await checkPerformance(async () => {
        const cursor = await this.conn?.query(
          aql`FOR doc IN salary
            UPDATE doc WITH { salary: 2500 } IN salary
            RETURN doc
          `,
        );

        return await cursor.all();
      });

      return {
        records: result.length,
        memory,
        time,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unexpected errror');
    }
  }

  public async deleteEasy() {
    try {
      const { result, memory, time } = await checkPerformance(async () => {
        const cursor = await this.conn?.query(
          aql`FOR doc IN salary
                FILTER doc.salary >= 5000 AND doc.salary < 8000
                REMOVE doc IN salary
                RETURN doc
              `,
        );

        return await cursor.all();
      });

      await this.insertCSV();

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

  public async deleteMedium() {
    try {
      const { result, memory, time } = await checkPerformance(async () => {
        const cursor = await this.conn?.query(
          aql`FOR doc IN salary
                FILTER doc.salary >= 5000
                REMOVE doc IN salary
                RETURN doc
              `,
        );

        return await cursor.all();
      });

      await this.insertCSV();

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

  public async deleteHard() {
    try {
      const { result, memory, time } = await checkPerformance(async () => {
        const cursor = await this.conn?.query(
          aql`FOR doc IN salary
                REMOVE doc IN salary
                RETURN doc
              `,
        );

        return await cursor.all();
      });

      await this.insertCSV();

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

  public async insertCSV() {
    try {
      //   await this.createCollections();

      const employees = await csvtojson().fromFile(
        './src/data/db_employees.csv',
      );
      let salary = await csvtojson().fromFile('./src/data/db_salary.csv');
      const titles = await csvtojson().fromFile('./src/data/db_titles.csv');

      const collections = await this.conn?.collections();

      salary = salary.map((salar) => ({
        ...salar,
        salary: parseInt(salar.salary),
      }));

      if (collections.length === 3) {
        await this.conn?.collection('employees').drop();
        await this.conn?.collection('salary').drop();
        await this.conn?.collection('titles').drop();
      }

      await this.conn?.createCollection('employees');
      await this.conn?.createCollection('salary');
      await this.conn?.createCollection('titles');

      const { memory, time } = await checkPerformance(async () => {
        await this.conn?.collection('employees').import(employees);
        await this.conn?.collection('salary').import(salary);
        await this.conn?.collection('titles').import(titles);
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
}

export default ArangodbService;
