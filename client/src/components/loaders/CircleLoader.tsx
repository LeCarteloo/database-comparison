import { CheckOutlined } from '@mui/icons-material';
import * as S from './Loaders.styled';

interface CircleLoader {
  isLoading: boolean;
}

const CircleLoader = ({ isLoading }: CircleLoader) => {
  return (
    <>
      {isLoading ? (
        <S.CircleLoader></S.CircleLoader>
      ) : (
        <CheckOutlined fontSize="large" htmlColor="#6fcf97" />
      )}
    </>
  );
};

export default CircleLoader;
