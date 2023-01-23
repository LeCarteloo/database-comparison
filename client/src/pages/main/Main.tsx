import { Sidebar } from '../../components';
import * as S from './Main.styled';
import { Routes, Route } from 'react-router-dom';
import { Homepage, Insightspage, Overviewpage } from '../../pages';
import { useState } from 'react';
import { ComparisonData } from '../../interfaces/interfaces';
import { ComparisonProvider } from '../../context/ComparisonContext';
import { StorageProvider } from '../../context/StorageContext';

const Main = () => {
  const [comparisonData, setComparisonData] = useState<ComparisonData[]>([]);
  const [useStorage, setUseStorage] = useState(false);

  return (
    <ComparisonProvider
      comparisonData={comparisonData}
      setComparisonData={(data) => setComparisonData(data)}
    >
      <S.HomeGrid>
        <Sidebar />
        <StorageProvider
          useStorage={useStorage}
          setUseStorage={(state) => setUseStorage(state)}
        >
          <S.Main>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/overview" element={<Overviewpage />} />
              <Route path="/insights" element={<Insightspage />} />
            </Routes>
          </S.Main>
        </StorageProvider>
      </S.HomeGrid>
    </ComparisonProvider>
  );
};

export default Main;
