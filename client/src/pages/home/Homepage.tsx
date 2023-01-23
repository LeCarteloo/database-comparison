import { useState } from 'react';
import { BlockGroup, CircleLoader, ComparisonProgress } from '../../components';
import { DeleteForever, Edit, TableRows, FiberNew } from '@mui/icons-material';
import * as S from './Homepage.styled';
import { ComparisonData, IBlock } from '../../interfaces/interfaces';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useComparisonContext } from '../../context/ComparisonContext';
import axios from 'axios';

interface Actions {
  select: {
    level: number | undefined;
    isFetching: boolean;
    data?: ComparisonData;
  };
  // insert: number | undefined;
  // update: number | undefined;
  // delete: number | undefined;
}

interface Sections {
  title: string;
  action: string;
  blocks: IBlock[];
}

// Test interface
interface FetchingData {
  isFetching: boolean;
  data: any;
}

const Homepage = () => {
  const [actions, setActions] = useState<Actions>({
    // insert: undefined,
    select: {
      level: undefined,
      isFetching: false,
    },
    // delete: undefined,
    // update: undefined,
  });
  const [data, setData] = useState<FetchingData>({
    isFetching: false,
    data: [],
  });
  const navigate = useNavigate();
  const { comparisonData, setComparisonData } = useComparisonContext();

  const sections: Sections[] = [
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

  const handleComparison = async () => {
    const removeDuplicates = (response: ComparisonData) => {
      const index = comparisonData.findIndex(
        (item) => item.key === response.key
      );

      const data = [...comparisonData];

      if (index !== -1) {
        data.splice(index, 1, response);
      } else {
        data.push(response);
      }

      return data;
    };

    setData({ ...data, isFetching: true });

    switch (actions.select?.level) {
      case 0: {
        setActions({
          ...actions,
          select: { ...actions.select, isFetching: true },
        });

        const response = await axios.get(
          'http://localhost:3000/api/select/easy'
        );

        setActions({
          ...actions,
          select: { ...actions.select, isFetching: false, data: response.data },
        });

        const result = removeDuplicates(response.data);
        setComparisonData(result);

        break;
      }
      case 1: {
        setActions({
          ...actions,
          select: { ...actions.select, isFetching: true },
        });

        const response = await axios.get(
          'http://localhost:3000/api/select/medium'
        );

        setActions({
          ...actions,
          select: { ...actions.select, isFetching: false, data: response.data },
        });

        const result = removeDuplicates(response.data);
        setComparisonData(result);

        break;
      }
      case 2: {
        setActions({
          ...actions,
          select: { ...actions.select, isFetching: true },
        });

        const response = await axios.get(
          'http://localhost:3000/api/select/hard'
        );

        setActions({
          ...actions,
          select: { ...actions.select, isFetching: false, data: response.data },
        });

        const result = removeDuplicates(response.data);
        setComparisonData(result);
      }
    }

    setData({ ...data, isFetching: false });

    navigate('/overview');
  };

  const loaderItems: any = [];
  Object.keys(actions).forEach((key) => {
    if (actions[key as keyof typeof actions].level !== undefined)
      loaderItems.push({
        name: key,
        isLoading: 'siema',
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
            Object.values(actions).filter((action) => action !== undefined)
              .length === 0 || data.isFetching
          }
        >
          Start comparison
        </S.Button>
      </S.Header>
      <S.MainContainer>
        <div style={{ width: '100%' }}>
          <S.ContentBlock style={{ marginBottom: '1em' }}>
            <span>Config</span>
            <p>Do you want to save comparison in app memory?</p>
            <input type="checkbox" />
            <p>
              Do you want to save comparison in local storage (it will be saved
              even when page is refreshed)?
            </p>
            <input type="checkbox" />
            <p>Want to know, how this app works? Go to the documentation.</p>
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
        {data.isFetching ? <ComparisonProgress items={loaderItems} /> : null}
      </S.MainContainer>
    </motion.div>
  );
};

export default Homepage;
