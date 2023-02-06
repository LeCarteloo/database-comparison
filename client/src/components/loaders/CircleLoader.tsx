import { CheckOutlined, Close } from '@mui/icons-material';
import * as S from './Loaders.styled';

interface CircleLoader {
  isLoading: boolean;
  isError?: boolean;
}

const CircleLoader = ({ isLoading, isError = false }: CircleLoader) => {
  console.log(isLoading, isError);

  return (
    <>
      {isLoading ? (
        <S.CircleLoader></S.CircleLoader>
      ) : isError ? (
        <Close color="error" fontSize="large" />
      ) : (
        <CheckOutlined fontSize="large" htmlColor="#6fcf97" />
      )}
    </>
  );
};

export default CircleLoader;
