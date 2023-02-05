import { CircleLoader, Sidebar } from '../../components';
import * as S from './Main.styled';
import { Routes, Route } from 'react-router-dom';
import { Homepage, Insightspage, Overviewpage } from '../../pages';
import { useEffect, useState } from 'react';
import { ComparisonData } from '../../interfaces/interfaces';
import { ComparisonProvider } from '../../context/ComparisonContext';
import { StorageProvider } from '../../context/StorageContext';
import DocsPage from '../docs/DocsPage';
import axios from 'axios';

const Main = () => {
  const [comparisonData, setComparisonData] = useState<ComparisonData[]>([]);
  const [useStorage, setUseStorage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const prepareDatabase = async () => {
      try {
        const response = await axios.post('http://localhost:3000/api/csv', {
          signal: controller.signal,
        });
        setIsLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);
        }
      }
    };

    prepareDatabase();

    const comparison = localStorage.getItem('comparison');

    if (comparison) {
      setComparisonData(JSON.parse(comparison));
      setUseStorage(true);
    }

    return () => {
      controller.abort();
    };
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
        {isLoading ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100vh',
            }}
          >
            <CircleLoader isLoading={true} />
            Preparing database for testing
          </div>
        ) : (
          <>
            <S.HomeGrid>
              <Sidebar />
              <S.Main>
                <Routes>
                  <Route path="/" element={<Homepage />} />
                  <Route path="/overview" element={<Overviewpage />} />
                  {/* <Route path="/insights" element={<Insightspage />} /> */}
                  <Route path="/docs" element={<DocsPage />} />
                </Routes>
              </S.Main>
            </S.HomeGrid>
          </>
        )}
      </StorageProvider>
    </ComparisonProvider>
  );
};

export default Main;
