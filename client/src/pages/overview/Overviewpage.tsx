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
import { useEffect, useState } from 'react';

const Overviewpage = () => {
  const { comparisonData } = useComparisonContext();
  const navigate = useNavigate();
  const [displayType, setDisplayType] = useState('time');

  useEffect(() => {
    if (comparisonData.length === 0) {
      navigate('/');
    }
  }, []);

  const databases = {
    sql: [
      { key: 'mysql', name: 'Mysql', color: 'rgb(0, 117, 151)' },
      { key: 'pgsql', name: 'PostgreSQL', color: 'rgb(0, 100, 151)' },
      { key: 'clickhouse', name: 'Clickhouse', color: 'rgb(230, 255, 151)' },
    ],
    nosql: [
      { key: 'mongodb', name: 'MongoDB', color: 'rgb(111, 207, 151)' },
      { key: 'arango', name: 'ArangoDB', color: 'rgb(64, 102, 33)' },
    ],
  };

  const inserts = comparisonData.filter((obj) => obj.key.includes('insert'));
  const deletes = comparisonData.filter((obj) => obj.key.includes('delete'));
  const updates = comparisonData.filter((obj) => obj.key.includes('update'));
  const selects = comparisonData.filter((obj) => obj.key.includes('select'));

  const comparison = {
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
        <S.TypeButton
          isActive={displayType === 'time'}
          onClick={() => setDisplayType('time')}
        >
          Time
        </S.TypeButton>
        <S.TypeButton
          isActive={displayType === 'memory'}
          onClick={() => setDisplayType('memory')}
        >
          Memory
        </S.TypeButton>
        {Object.keys(databases).map((dbType, x) => (
          <>
            <S.Legend key={x}>
              {databases[dbType as keyof typeof databases].map((db, i) => (
                <S.LegendItem key={i} color={db.color}>
                  <span></span>
                  <h5>{db.name}</h5>
                </S.LegendItem>
              ))}
            </S.Legend>
            <S.Charts>
              {Object.values(comparison).map((t, j) =>
                t.length !== 0 ? (
                  <ResponsiveContainer key={j} width="99%" minHeight={300}>
                    <BarChart
                      data={t}
                      margin={{ top: 20 }}
                      barCategoryGap={'10%'}
                    >
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
                        cursor={{ fill: '#1d1d42' }}
                        formatter={(value, name) => [
                          Number(value).toFixed(4) +
                            ` ${displayType === 'time' ? 'ms' : 'mb'}`,
                          name.toString().split('.')[2],
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
                      {databases[dbType as keyof typeof databases].map(
                        (db, k) => (
                          <Bar
                            key={k}
                            dataKey={`result.${dbType}.${db.key}.${displayType}`}
                            barSize={100}
                            fill={db.color}
                          >
                            <LabelList
                              style={{
                                fill: 'white',
                              }}
                              dataKey={`result.${dbType}.${db.key}.${displayType}`}
                              formatter={(value: number) =>
                                `${value.toFixed(2)}`
                              }
                              position="top"
                            />
                          </Bar>
                        )
                      )}
                    </BarChart>
                  </ResponsiveContainer>
                ) : null
              )}
            </S.Charts>
          </>
        ))}
      </S.Results>
    </motion.div>
  );
};

export default Overviewpage;
