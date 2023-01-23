import { useState } from 'react';
import { BlockGroup, ComparisonProgress } from '../../components';
import {
  DeleteForever,
  Edit,
  TableRows,
  FiberNew,
  Preview,
} from '@mui/icons-material';
import * as S from './Homepage.styled';
import { ComparisonData, IBlock } from '../../interfaces/interfaces';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useComparisonContext } from '../../context/ComparisonContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useStorageContext } from '../../context/StorageContext';

interface Actions {
  select: {
    level: number | undefined;
    isFinished: boolean;
  };
  insert: {
    level: number | undefined;
    isFinished: boolean;
  };
  // update: number | undefined;
  // delete: number | undefined;
}

interface Sections {
  title: string;
  action: string;
  blocks: IBlock[];
}

const Homepage = () => {
  const [actions, setActions] = useState<Actions>({
    insert: {
      level: undefined,
      isFinished: false,
    },
    select: {
      level: undefined,
      isFinished: false,
    },
    // delete: undefined,
    // update: undefined,
  });
  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();
  const { comparisonData, setComparisonData } = useComparisonContext();
  const { useStorage, setUseStorage } = useStorageContext();
  const sections: Sections[] = [
    {
      title: 'Insert',
      action: 'insert',
      blocks: [
        {
          icon: <FiberNew fontSize="large" />,
          label: '50000 records',
        },
        {
          icon: <FiberNew fontSize="large" />,
          label: '100000 records',
        },
        {
          icon: <FiberNew fontSize="large" />,
          label: '2500000 records',
        },
      ],
    },
    {
      title: 'Select',
      action: 'select',
      blocks: [
        {
          icon: <TableRows fontSize="large" />,
          label: 'Easy select',
        },
        {
          icon: <TableRows fontSize="large" />,
          label: 'Medium select',
        },
        {
          icon: <TableRows fontSize="large" />,
          label: 'Hard select',
        },
      ],
    },
  ];

  const handleClearStorage = async () => {
    localStorage.removeItem('comparison');
  };

  const handleComparison = async () => {
    const removeDuplicates = (
      prev: ComparisonData[],
      response: ComparisonData
    ): ComparisonData[] => {
      const index = comparisonData.findIndex(
        (item) => item.key === response.key
      );

      const data = [...prev];

      if (index !== -1) {
        data.splice(index, 1, response);
      } else {
        data.push(response);
      }

      return data;
    };

    setIsFetching(true);

    // @ts-ignore
    switch (actions.select?.level) {
      case 0: {
        const response = await axios.get(
          'http://localhost:3000/api/select/easy'
        );

        setActions((prev: Actions) => ({
          ...prev,
          select: { ...actions.select, isFinished: true },
        }));

        // @ts-ignore
        setComparisonData((prevState: ComparisonData[]) => {
          return removeDuplicates(prevState, response.data);
        });

        break;
      }
      case 1: {
        const response = await axios.get(
          'http://localhost:3000/api/select/medium'
        );

        setActions((prev: Actions) => ({
          ...prev,
          select: { ...actions.select, isFinished: true },
        }));

        // @ts-ignore
        setComparisonData((prevState: ComparisonData[]) => {
          return removeDuplicates(prevState, response.data);
        });

        break;
      }
      case 2: {
        const response = await axios.get(
          'http://localhost:3000/api/select/hard'
        );

        setActions((prev: Actions) => ({
          ...prev,
          select: { ...actions.select, isFinished: true },
        }));

        // @ts-ignore
        setComparisonData((prevState: ComparisonData[]) => {
          return removeDuplicates(prevState, response.data);
        });
      }
    }

    switch (actions.insert?.level) {
      case 0: {
        const response = await axios.post(
          'http://localhost:3000/api/insert/50000'
        );

        setActions((prev: Actions) => ({
          ...prev,
          insert: { ...actions.insert, isFinished: true },
        }));

        // @ts-ignore
        setComparisonData((prevState: ComparisonData[]) => {
          return removeDuplicates(prevState, {
            ...response.data,
            key: 'insert-easy',
          });
        });

        break;
      }
      case 1: {
        const response = await axios.post(
          'http://localhost:3000/api/insert/100000'
        );

        setActions((prev: Actions) => ({
          ...prev,
          insert: { ...actions.insert, isFinished: true },
        }));

        // @ts-ignore
        setComparisonData((prevState: ComparisonData[]) => {
          return removeDuplicates(prevState, {
            ...response.data,
            key: 'insert-medium',
          });
        });

        break;
      }
      case 2: {
        const response = await axios.post(
          'http://localhost:3000/api/insert/250000'
        );

        setActions((prev: Actions) => ({
          ...prev,
          insert: { ...actions.insert, isFinished: true },
        }));

        // @ts-ignore
        setComparisonData((prevState: ComparisonData[]) => {
          return removeDuplicates(prevState, {
            ...response.data,
            key: 'insert-hard',
          });
        });

        break;
      }
    }

    setIsFetching(false);
    navigate('/overview');
  };

  const loaderItems: any = [];
  Object.keys(actions).forEach((key) => {
    const keyWithType = key as keyof typeof actions;
    if (actions[keyWithType].level !== undefined)
      loaderItems.push({
        name: key,
        isLoading: !actions[keyWithType].isFinished,
      });
  });

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
    >
      <S.Header>
        <h1>Homepage</h1>
        <S.Button
          onClick={handleComparison}
          disabled={
            Object.values(actions).filter(
              (action) => action.level !== undefined
            ).length === 0 || isFetching
          }
        >
          Start comparison
        </S.Button>
      </S.Header>
      <S.MainContainer>
        <div style={{ width: '100%' }}>
          <S.ContentBlock style={{ marginBottom: '1em' }}>
            <h2>Config</h2>
            <p>
              Do you want to save comparison in local storage (it will be saved
              even when page is refreshed)?
            </p>
            <input
              type="checkbox"
              checked={useStorage}
              onChange={(e) => setUseStorage(e.target.checked)}
            />
            <button onClick={handleClearStorage}>Clear storage</button>
            <p>
              If you want to know how this application works and what kind of
              queries it is using - head to{' '}
              <Link to="/docs" style={{ color: 'white' }}>
                documentation
              </Link>
              .
            </p>
          </S.ContentBlock>
          <S.ContentBlock>
            <span style={{ color: '#d4d4d4' }}>
              Pick operations that you want to perform in (atm) MySQL, MongoDB,
              Clickhouse, Pgsql:
            </span>
            <S.SectionList>
              {sections.map((section) => (
                <section key={section.title}>
                  <h2 style={{ margin: '0.5em 0', fontSize: '16px' }}>
                    {section.title}
                  </h2>
                  <hr style={{ marginBottom: '0.8em', width: '40%' }} />
                  <S.BlockList>
                    <BlockGroup
                      active={
                        actions[section.action as keyof typeof actions]?.level
                      }
                      setActive={(action) =>
                        setActions({
                          ...actions,
                          [section.action as keyof typeof actions]: {
                            isFetching: false,
                            level: action,
                          },
                        })
                      }
                      blocks={section.blocks}
                    />
                  </S.BlockList>
                </section>
              ))}
            </S.SectionList>
          </S.ContentBlock>
        </div>
        {isFetching ? <ComparisonProgress items={loaderItems} /> : null}
      </S.MainContainer>
    </motion.div>
  );
};

export default Homepage;
