import { CircleLoader } from '../../components';
import * as S from './Overview.styled';
import { motion } from 'framer-motion';
import { XAxis, YAxis, Bar, BarChart, ResponsiveContainer } from 'recharts';

const Overviewpage = () => {
  const databases = [
    { key: 'mysql', name: 'Mysql', color: 'rgb(0, 117, 151)' },
    { key: 'postgresql', name: 'PostgreSQL', color: 'rgb(0, 100, 151)' },
    { key: 'clickhouse', name: 'Clickhouse', color: 'rgb(230, 255, 151)' },
    { key: 'mongodb', name: 'MongoDB', color: 'rgb(111, 207, 151)' },
    { key: 'cosdb', name: 'CosDB', color: 'rgb(197, 36, 151)' },
  ];

  // {
  //   name: 'Performance',
  //   mongo: 100,
  //   clickhouse: 110,
  //   postgresql: 33,
  //   mysql: 33,
  //   cosdb: 20,
  // },

  // Sample data
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
            <div>
              <ResponsiveContainer width="99%" minHeight={250}>
                <BarChart data={data} margin={{ left: -22 }}>
                  <XAxis dataKey="name" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  {databases.map((db) => (
                    <Bar dataKey={db.key} barSize={25} fill={db.color} />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div>
              <ResponsiveContainer width="99%" minHeight={250}>
                <BarChart data={data} margin={{ left: -22 }}>
                  <XAxis dataKey="name" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  {databases.map((db) => (
                    <Bar dataKey={db.key} barSize={25} fill={db.color} />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
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
