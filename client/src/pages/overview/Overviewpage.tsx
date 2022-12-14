import * as S from './Overview.styled';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { useComparisonContext } from '../../context/ComparisonContext';

const Overviewpage = () => {
  const { comparisonData } = useComparisonContext();

  const testResponse = [
    {
      key: 'insert-1000',
      data: [
        {
          mysql: {
            time: 83,
            memory: 1000,
            query: 'SELECT * FROM test',
          },
          pgsql: {
            time: 103,
            memory: 300,
            query: 'SELECT * FROM test',
          },
          mongodb: {
            time: 23,
            memory: 300,
            query: 'SELECT * FROM test',
          },
          clickhouse: {
            time: 53,
            memory: 300,
            query: 'SELECT * FROM test',
          },
        },
      ],
    },
    {
      key: 'insert-5000',
      data: [
        {
          mysql: {
            time: 83,
            memory: 1000,
            query: 'SELECT * FROM test',
          },
          pgsql: {
            time: 103,
            memory: 300,
            query: 'SELECT * FROM test',
          },
          mongodb: {
            time: 23,
            memory: 300,
            query: 'SELECT * FROM test',
          },
          clickhouse: {
            time: 53,
            memory: 300,
            query: 'SELECT * FROM test',
          },
        },
      ],
    },
  ];

  console.log(testResponse);

  const databases = [
    { key: 'mysql', name: 'Mysql', color: 'rgb(0, 117, 151)' },
    { key: 'pgsql', name: 'PostgreSQL', color: 'rgb(0, 100, 151)' },
    { key: 'clickhouse', name: 'Clickhouse', color: 'rgb(230, 255, 151)' },
    { key: 'mongodb', name: 'MongoDB', color: 'rgb(111, 207, 151)' },
  ];

  // Sample data and charts
  const data = [
    {
      name: 'Memory usage',
      mongodb: 34,
      clickhouse: 200,
      postgresql: 5,
      mysql: 5,
      cosdb: 20,
    },
  ];

  const data1 = [
    {
      name: 'mySQL',
      mongodb: 100,
      mongodbLabel: 24023000.0,
      clickhouse: 110,
      postgresql: 33,
      mysql: 33,
      placeholder: 20,
    },
    {
      name: 'mongoDB',
      mongodb: 100,
      clickhouse: 110,
      postgresql: 33,
      mysql: 33,
      placeholder: 20,
    },
  ];

  const topCharts = [
    {
      data: data1,
    },
    {
      data: data,
    },
  ];

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
    >
      <S.Header>
        <h1>Overview</h1>
      </S.Header>
      <S.Results>
        <S.Legend>
          {databases.map((db, i) => (
            <S.LegendItem key={i} color={db.color}>
              <span></span>
              <h5>{db.name}</h5>
            </S.LegendItem>
          ))}
        </S.Legend>
        <S.Charts>
          <ResponsiveContainer width="99%" minHeight={250}>
            <BarChart data={testResponse} margin={{ left: -22 }}>
              <XAxis dataKey="key" stroke="#fff" />
              <YAxis stroke="#fff" />
              {databases.map((db) => (
                <Bar
                  dataKey={`data[0].${db.key}.time`}
                  barSize={25}
                  fill={db.color}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </S.Charts>
      </S.Results>
    </motion.div>
  );
};

export default Overviewpage;
