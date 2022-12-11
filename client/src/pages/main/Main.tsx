import { Sidebar } from '../../components';
import * as S from './Main.styled';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Homepage, Overviewpage } from '../../pages';
import { AnimatePresence } from 'framer-motion';

const Main = () => {
  return (
    <S.HomeGrid>
      <Sidebar />
      <S.Main>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/overview" element={<Overviewpage />} />
        </Routes>
      </S.Main>
    </S.HomeGrid>
  );
};

export default Main;
