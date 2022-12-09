import { Sidebar } from '../../components';
import * as S from './Main.styled';
import { Routes, Route } from 'react-router-dom';
import { Homepage } from '../../pages';

const Main = () => {
  return (
    <S.HomeGrid>
      <Sidebar />
      <main>
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </main>
    </S.HomeGrid>
  );
};

export default Main;
