import { Sidebar } from '../../components';
import * as S from './Main.styled';
import { Routes, Route } from 'react-router-dom';
import { Homepage, Insightspage, Overviewpage } from '../../pages';
import { ComparisonProvider } from '../../context/ComparisonContext';
import { useState } from 'react';
import { ComparisonData } from '../../interfaces/interfaces';

const Main = () => {
  const [comparisonData, setComparisonData] = useState<ComparisonData[]>([]);
  return (
    <ComparisonProvider comparisonData={[]} setComparisonData={() => ()}>
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
    </ComparisonProvider>
  );
};

export default Main;
