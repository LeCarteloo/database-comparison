import { Close } from '@mui/icons-material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CircleLoader, Sidebar } from '../../components';
import { ComparisonProvider } from '../../context/ComparisonContext';
import { StorageProvider } from '../../context/StorageContext';
import { ComparisonData } from '../../interfaces/interfaces';
import { Homepage, Insightspage, Overviewpage } from '../../pages';
import DocsPage from '../docs/DocsPage';
import * as S from './Main.styled';

const Main = () => {
  const [comparisonData, setComparisonData] = useState<ComparisonData[]>([]);
  const [useStorage, setUseStorage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const prepareDatabase = async () => {
      try {
        const response = await axios.post('http://localhost:3000/api/csv', {
          signal: controller.signal,
        });

        console.log(response.status);

        localStorage.setItem('firstRun', 'true');
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        console.error(error);
      }
    };

    if (!localStorage.getItem('firstRun')) {
      prepareDatabase();
    } else {
      setIsLoading(false);
    }

    const comparison = localStorage.getItem('comparison');

    if (comparison) {
      setComparisonData(JSON.parse(comparison));
      setUseStorage(true);
    }

    return () => {
      controller.abort();
    };
  }, []);

  if (isError) {
    return (
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
        <Close color="error" style={{ fontSize: '50px' }} />
        <p style={{ marginTop: '16px' }}>No connection with the server...</p>
      </div>
    );
  }

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
            <p style={{ marginTop: '16px' }}>
              Creating database structure and populating it...
            </p>
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
