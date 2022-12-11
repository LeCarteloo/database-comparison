import { CircleLoader } from '../../components';
import * as S from './Overview.styled';
import { motion } from 'framer-motion';
import {
  XAxis,
  YAxis,
  Bar,
  BarChart,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const Overviewpage = () => {
  const databases = ['MySQL', 'PostgreSQL', 'MongoDB', 'Clickhouse', 'CosDB'];
  const dbColors = {
    mongo: 'rgb(111, 207, 151)',
    clickhouse: 'rgb(230, 255, 151)',
    postgresql: 'rgb(0, 100, 151)',
    mysql: 'rgb(0, 117, 151)',
    cosdb: 'rgb(197, 36, 151)',
  };

  // Sample data
  const data = [
    {
      name: 'Memory usage',
      mongo: 34,
      clickhouse: 200,
      postgresql: 5,
      mysql: 5,
      cosdb: 20,
    },
    {
      name: 'Performance',
      mongo: 100,
      clickhouse: 110,
      postgresql: 33,
      mysql: 33,
      cosdb: 20,
    },
    {
      name: 'Smth',
      mongo: 33,
      clickhouse: 55,
      postgresql: 23,
      mysql: 23,
      cosdb: 40,
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
          <ResponsiveContainer minHeight={350}>
            <BarChart data={data}>
              <Legend verticalAlign="top" height={60} />
              <XAxis dataKey="name" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Bar dataKey="mongo" barSize={20} fill={dbColors.mongo} />
              <Bar
                dataKey="clickhouse"
                barSize={20}
                fill={dbColors.clickhouse}
              />
              <Bar
                dataKey="postgresql"
                barSize={20}
                fill={dbColors.postgresql}
              />
              <Bar dataKey="mysql" barSize={20} fill={dbColors.mysql} />
              <Bar dataKey="cosdb" barSize={20} fill={dbColors.cosdb} />
            </BarChart>
          </ResponsiveContainer>
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
              <span>{db}</span>
            </S.LoadingItem>
          ))}
        </S.LoadingList>
      </S.MainContainer>
    </motion.div>
  );
};

export default Overviewpage;
