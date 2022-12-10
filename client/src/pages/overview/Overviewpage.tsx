import { CircleLoader } from '../../components';
import * as S from './Overview.styled';
import { motion } from 'framer-motion';

const Overviewpage = () => {
  const databases = ['MySQL', 'PostgreSQL', 'MongoDB', 'Clickhouse', 'CosDB'];

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
        <S.Results></S.Results>
        <S.LoadingList>
          {databases.map((db) => (
            <S.LoadingItem key={db}>
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
