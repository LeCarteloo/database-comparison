import { Sidebar } from '../../components';
import * as S from './Main.styled';
import { Routes, Route } from 'react-router-dom';
import { Homepage, Insightspage, Overviewpage } from '../../pages';
import { useEffect, useState } from 'react';
import { ComparisonData } from '../../interfaces/interfaces';
import { ComparisonProvider } from '../../context/ComparisonContext';
import { StorageProvider } from '../../context/StorageContext';
import DocsPage from '../docs/DocsPage';

const Main = () => {
  const [comparisonData, setComparisonData] = useState<ComparisonData[]>([]);
  const [useStorage, setUseStorage] = useState(false);

  useEffect(() => {
    const comparison = localStorage.getItem('comparison');

    if (comparison) {
      setComparisonData(JSON.parse(comparison));
      setUseStorage(true);
    }
  }, []);

  if (useStorage) {
    localStorage.setItem('comparison', JSON.stringify(comparisonData));
  }

  return (
    <ComparisonProvider
      comparisonData={comparisonData}
      setComparisonData={(data) => setComparisonData(data)}
    >
      <StorageProvider
        useStorage={useStorage}
        setUseStorage={(state) => setUseStorage(state)}
      >
        <S.HomeGrid>
          <Sidebar />
          <S.Main>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/overview" element={<Overviewpage />} />
              <Route path="/insights" element={<Insightspage />} />
              <Route path="/docs" element={<DocsPage />} />
            </Routes>
          </S.Main>
        </S.HomeGrid>
      </StorageProvider>
    </ComparisonProvider>
  );
};

export default Main;
