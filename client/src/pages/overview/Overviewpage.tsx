import { CircleLoader } from '../../components';
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
  LabelList,
  Label,
} from 'recharts';

const Overviewpage = () => {
  const databases = [
    { key: 'mysql', name: 'Mysql', color: 'rgb(0, 117, 151)' },
    { key: 'postgresql', name: 'PostgreSQL', color: 'rgb(0, 100, 151)' },
    { key: 'clickhouse', name: 'Clickhouse', color: 'rgb(230, 255, 151)' },
    { key: 'mongodb', name: 'MongoDB', color: 'rgb(111, 207, 151)' },
    { key: 'placeholder', name: 'Placeholder', color: 'rgb(197, 36, 151)' },
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

  const data2 = [
    {
      name: 'placeholder',
      mongodb: 100,
      clickhouse: 110,
      postgresql: 13,
      mysql: 33,
      placeholder: 20,
    },
    {
      name: 'placeholder',
      mongodb: 100,
      clickhouse: 150,
      postgresql: 63,
      mysql: 43,
      placeholder: 30,
    },
    {
      name: 'placeholder',
      mongodb: 140,
      clickhouse: 150,
      postgresql: 53,
      mysql: 150,
      placeholder: 35,
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
      <S.MainContainer>
        <S.Results>
          <S.Legend>
            {databases.map((db) => (
              <S.LegendItem color={db.color}>
                <span></span>
                <h5>{db.name}</h5>
              </S.LegendItem>
            ))}
          </S.Legend>
          <S.Charts>
            {topCharts.map((chart, i) => (
              <div key={`chart-${i}`}>
                <ResponsiveContainer width="99%" minHeight={250}>
                  <BarChart data={chart.data} margin={{ left: -22 }}>
                    <XAxis dataKey="name" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    {databases.map((db) => (
                      <Bar dataKey={db.key} barSize={25} fill={db.color} />
                    ))}
                    <Tooltip />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ))}
            <S.FullGridItem>
              <ResponsiveContainer width="99%" minHeight={300}>
                <LineChart margin={{ left: -22 }} data={data2}>
                  {databases.map((db) => (
                    <Line
                      type="monotone"
                      dataKey={db.key}
                      stroke={db.color}
                      strokeWidth={2}
                    />
                  ))}
                  <CartesianGrid stroke="#ffffffab" />
                  <XAxis dataKey="name" stroke="#fff" />
                  <YAxis stroke="#fff" />
                </LineChart>
              </ResponsiveContainer>
            </S.FullGridItem>
          </S.Charts>
        </S.Results>
        <S.LoadingList>
          {databases.map((db, i) => (
            <S.LoadingItem
              key={i}
              animate={{ x: 0 }}
              initial={{ x: 200 }}
              transition={{ duration: 0.4 + i * 0.1, ease: 'easeInOut' }}
            >
              <div>
                <CircleLoader isLoading={true} />
              </div>
              <span>{db.name}</span>
            </S.LoadingItem>
          ))}
        </S.LoadingList>
      </S.MainContainer>
    </motion.div>
  );
};

export default Overviewpage;
