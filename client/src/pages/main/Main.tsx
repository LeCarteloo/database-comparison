import { Sidebar } from '../../components';
import * as S from './Main.styled';
import { Routes, Route } from 'react-router-dom';
import { Homepage, Insightspage, Overviewpage } from '../../pages';

const Main = () => {
  return (
    <S.HomeGrid>
      <Sidebar />
      <S.Main>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/overview" element={<Overviewpage />} />
          <Route path="/insights" element={<Insightspage />} />
        </Routes>
      </S.Main>
    </S.HomeGrid>
  );
};

export default Main;
