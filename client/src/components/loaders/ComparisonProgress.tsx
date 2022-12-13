import CircleLoader from './CircleLoader';
import * as S from './Loaders.styled';

interface ComparisonProgressProps {
  items: string[];
}

const ComparisonProgress = ({ items }: ComparisonProgressProps) => {
  return (
    <S.LoadingList>
      {items.map((db, i) => (
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
  );
};

export default ComparisonProgress;
