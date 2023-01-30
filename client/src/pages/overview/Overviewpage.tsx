import * as S from './Overview.styled';
import { motion } from 'framer-motion';
import {
  XAxis,
  YAxis,
  Bar,
  BarChart,
  ResponsiveContainer,
  LabelList,
  Tooltip,
} from 'recharts';
import { useComparisonContext } from '../../context/ComparisonContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Overviewpage = () => {
  const { comparisonData } = useComparisonContext();
  const navigate = useNavigate();

  console.log(comparisonData);

  useEffect(() => {
    if (comparisonData.length === 0) {
      navigate('/');
    }
  }, []);

  const databases = [
    { key: 'mysql', name: 'Mysql', color: 'rgb(0, 117, 151)' },
    { key: 'pgsql', name: 'PostgreSQL', color: 'rgb(0, 100, 151)' },
    { key: 'clickhouse', name: 'Clickhouse', color: 'rgb(230, 255, 151)' },
    { key: 'mongodb', name: 'MongoDB', color: 'rgb(111, 207, 151)' },
  ];

  // Testing
  const inserts = comparisonData.filter((obj) => obj.key.includes('insert'));
  const deletes = comparisonData.filter((obj) => obj.key.includes('delete'));
  const updates = comparisonData.filter((obj) => obj.key.includes('update'));
  const selects = comparisonData.filter((obj) => obj.key.includes('select'));

  const test = {
    inserts: inserts,
    deletes: deletes,
    updates: updates,
    selects: selects,
  };

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
          {Object.values(test).map((t, i) =>
            t.length !== 0 ? (
              <ResponsiveContainer key={i} width="99%" minHeight={300}>
                <BarChart data={t} margin={{ top: 20 }}>
                  <XAxis
                    dataKey="key"
                    stroke="#fff"
                    label={{
                      value: 'operation',
                      position: 'insideBottomRight',
                    }}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#141432' }}
                    // labelStyle={{ backgroundColor: 'red' }}
                    cursor={{ fill: '#1d1d42' }}
                    // labelFormatter="ms"
                    formatter={(value, name, props) => [
                      Number(value).toFixed(4) + ' ms',
                      name.toString().split('.')[1],
                    ]}
                  />
                  <YAxis
                    stroke="#fff"
                    label={{
                      value: 'ms',
                      angle: -90,
                      position: 'insideBottom',
                    }}
                  />
                  {databases.map((db) => (
                    <Bar
                      key={db.key}
                      dataKey={`result.${db.key}.time`}
                      barSize={100}
                      fill={db.color}
                    >
                      <LabelList
                        style={{
                          fill: 'white',
                        }}
                        dataKey={`result.${db.key}.time`}
                        formatter={(value: number) => `${value.toFixed(2)}`}
                        position="top"
                      />
                    </Bar>
                  ))}
                </BarChart>
              </ResponsiveContainer>
            ) : null
          )}
        </S.Charts>
      </S.Results>
    </motion.div>
  );
};

export default Overviewpage;
