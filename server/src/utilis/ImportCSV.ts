import fs from 'fs';
import { from } from 'pg-copy-streams';
import csvtojson from 'csvtojson';

const importCsvToPgsql = async (
  conn: any,
  tableName: string,
  filePath: string,
) =>
  new Promise<void>(async (resolve, reject) => {
    const fileStream = fs.createReadStream(filePath);
    const stream = conn
      .query(
        from(
          `COPY ${tableName} FROM STDIN WITH (FORMAT CSV, HEADER true, NULL '')`,
        ),
      )
      .on('end', () => {
        reject(new Error('Connection closed'));
      })
      .on('finish', () => {
        resolve();
      });

    fileStream.pipe(stream);
  });

const importCsvToMysql = async (conn: any, query: string, filePath: string) => {
  const jsonData = await csvtojson().fromFile(filePath);

  // Changing json data into array format
  const dataArray: any[] = [];
  jsonData.forEach((record: any) => {
    dataArray.push([...Object.values(record)]);
  });

  await conn.query(query, [dataArray]);
};

export { importCsvToPgsql, importCsvToMysql };
