import CircleLoader from './CircleLoader';
import * as S from './Loaders.styled';

interface ComparisonProgressProps {
  items: {
    name: string;
    isLoading: boolean;
  }[];
}

const ComparisonProgress = ({ items }: ComparisonProgressProps) => {
  return (
    <S.LoadingList>
      {items.map((item, i) => (
        <S.LoadingItem
          key={i}
          animate={{ x: 0 }}
          initial={{ x: 200 }}
          transition={{ duration: 0.4 + i * 0.1, ease: 'easeInOut' }}
        >
          <div>
            <CircleLoader isLoading={item.isLoading} />
          </div>
          <span>{item.name}</span>
        </S.LoadingItem>
      ))}
    </S.LoadingList>
  );
};

export default ComparisonProgress;
