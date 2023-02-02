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
  update: {
    level: number | undefined;
    isFinished: boolean;
  };
  delete: {
    level: number | undefined;
    isFinished: boolean;
  };
}

interface LoaderItems {
  name: string;
  isLoading: boolean;
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
    update: {
      level: undefined,
      isFinished: false,
    },
    delete: {
      level: undefined,
      isFinished: false,
    },
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
    {
      title: 'Update',
      action: 'update',
      blocks: [
        {
          icon: <Edit fontSize="large" />,
          label: 'Easy update',
        },
        {
          icon: <Edit fontSize="large" />,
          label: 'Medium update',
        },
        {
          icon: <Edit fontSize="large" />,
          label: 'Hard update',
        },
      ],
    },
    {
      title: 'Delete',
      action: 'delete',
      blocks: [
        {
          icon: <DeleteForever fontSize="large" />,
          label: 'Easy delete',
        },
        {
          icon: <DeleteForever fontSize="large" />,
          label: 'Medium delete',
        },
        {
          icon: <DeleteForever fontSize="large" />,
          label: 'Hard delete',
        },
      ],
    },
  ];

  const handleClearContext = async () => {
    setComparisonData([]);
  };

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
            key: 'Easy insert',
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
            key: 'Medium insert',
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
            key: 'Hard insert',
          });
        });

        break;
      }
    }

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

    switch (actions.update?.level) {
      case 0: {
        const response = await axios.post(
          'http://localhost:3000/api/update/easy'
        );

        setActions((prev: Actions) => ({
          ...prev,
          update: { ...actions.update, isFinished: true },
        }));

        // @ts-ignore
        setComparisonData((prevState: ComparisonData[]) => {
          return removeDuplicates(prevState, response.data);
        });

        break;
      }
      case 1: {
        const response = await axios.post(
          'http://localhost:3000/api/update/medium'
        );

        setActions((prev: Actions) => ({
          ...prev,
          update: { ...actions.update, isFinished: true },
        }));

        // @ts-ignore
        setComparisonData((prevState: ComparisonData[]) => {
          return removeDuplicates(prevState, response.data);
        });

        break;
      }
      case 2: {
        const response = await axios.post(
          'http://localhost:3000/api/update/hard'
        );

        setActions((prev: Actions) => ({
          ...prev,
          update: { ...actions.update, isFinished: true },
        }));

        // @ts-ignore
        setComparisonData((prevState: ComparisonData[]) => {
          return removeDuplicates(prevState, response.data);
        });
      }
    }

    switch (actions.delete?.level) {
      case 0: {
        const response = await axios.delete(
          'http://localhost:3000/api/delete/easy'
        );

        setActions((prev: Actions) => ({
          ...prev,
          delete: { ...actions.delete, isFinished: true },
        }));

        // @ts-ignore
        setComparisonData((prevState: ComparisonData[]) => {
          return removeDuplicates(prevState, response.data);
        });

        break;
      }
      case 1: {
        const response = await axios.delete(
          'http://localhost:3000/api/delete/medium'
        );

        setActions((prev: Actions) => ({
          ...prev,
          delete: { ...actions.delete, isFinished: true },
        }));

        // @ts-ignore
        setComparisonData((prevState: ComparisonData[]) => {
          return removeDuplicates(prevState, response.data);
        });

        break;
      }
      case 2: {
        const response = await axios.delete(
          'http://localhost:3000/api/delete/hard'
        );

        setActions((prev: Actions) => ({
          ...prev,
          delete: { ...actions.delete, isFinished: true },
        }));

        // @ts-ignore
        setComparisonData((prevState: ComparisonData[]) => {
          return removeDuplicates(prevState, response.data);
        });
      }
    }

    setIsFetching(false);
    navigate('/overview');
  };

  const loaderItems: LoaderItems[] = [];
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
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5em',
                marginTop: '0.5em',
              }}
            >
              <span> Use local storage?</span>
              <input
                type="checkbox"
                checked={useStorage}
                onChange={(e) => setUseStorage(e.target.checked)}
                style={{ width: '25px', height: '25px', cursor: 'pointer' }}
              />
            </div>

            <h2>Data</h2>
            <p>
              If you want to clear local storage click{' '}
              <strong>clear storage</strong> button. If you want to clear data
              from app memory click <strong>clear context</strong> button.
              (Buttons are disabled if data is empty)
            </p>
            <div style={{ display: 'flex', gap: '1em', marginTop: '0.5em' }}>
              <S.SmallButton
                onClick={handleClearStorage}
                disabled={
                  localStorage.getItem('comparison') === '[]' ||
                  !localStorage.getItem('comparison')
                }
              >
                Clear storage
              </S.SmallButton>
              <S.SmallButton
                onClick={handleClearContext}
                disabled={comparisonData.length === 0}
              >
                Clear context
              </S.SmallButton>
            </div>
            <hr style={{ margin: '0.8em 0' }} />
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
              Pick operations that you want to perform in relational databases
              such as MySQL, Clickhouse, Pgsql and norelational databases such
              as MongoDB, ArangoDB
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
