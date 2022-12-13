import { useState } from 'react';
import { BlockGroup, CircleLoader, ComparisonProgress } from '../../components';
import {
  DeleteForever,
  JoinInnerOutlined,
  Edit,
  TableRows,
  FiberNew,
} from '@mui/icons-material';
import * as S from './Homepage.styled';
import { IBlock } from '../../interfaces/interfaces';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useComparisonContext } from '../../context/ComparisonContext';

interface Actions {
  insert: number | undefined;
  select: number | undefined;
  update: number | undefined;
  delete: number | undefined;
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
    insert: undefined,
    select: undefined,
    delete: undefined,
    update: undefined,
  });
  const [data, setData] = useState<FetchingData>({
    isFetching: false,
    data: [],
  });
  const navigate = useNavigate();
  const { comparisonData, setComparisonData } = useComparisonContext();

  const sections: Sections[] = [
    {
      title: 'Insert',
      action: 'insert',
      blocks: [
        {
          icon: <FiberNew fontSize="large" />,
          label: '1000 records',
        },
        {
          icon: <FiberNew fontSize="large" />,
          label: '5000 records',
        },
        {
          icon: <FiberNew fontSize="large" />,
          label: '10000 records',
        },
        {
          icon: <FiberNew fontSize="large" />,
          label: '50000 records',
        },
      ],
    },
    {
      title: 'Select',
      action: 'select',
      blocks: [
        {
          icon: <TableRows fontSize="large" />,
          label: '1000 records',
        },
        {
          icon: <TableRows fontSize="large" />,
          label: '5000 records',
        },
        {
          icon: <TableRows fontSize="large" />,
          label: '10000 records',
        },
        {
          icon: <TableRows fontSize="large" />,
          label: '50000 records',
        },
      ],
    },
    {
      title: 'Update',
      action: 'update',
      blocks: [
        {
          icon: <Edit fontSize="large" />,
          label: '1000 records',
        },
        {
          icon: <Edit fontSize="large" />,
          label: '5000 records',
        },
        {
          icon: <Edit fontSize="large" />,
          label: '10000 records',
        },
        {
          icon: <Edit fontSize="large" />,
          label: '50000 records',
        },
      ],
    },
    {
      title: 'Delete',
      action: 'delete',
      blocks: [
        {
          icon: <DeleteForever fontSize="large" />,
          label: '1000 records',
        },
        {
          icon: <DeleteForever fontSize="large" />,
          label: '5000 records',
        },
        {
          icon: <DeleteForever fontSize="large" />,
          label: '10000 records',
        },
        {
          icon: <DeleteForever fontSize="large" />,
          label: '50000 records',
        },
      ],
    },
  ];

  const handleComparison = () => {
    setData((prev) => ({ ...prev, isFetching: true }));

    // Timeouts simulating API wait time
    setTimeout(() => {
      const testResponse = {
        key: 'insert-1000',
        type: 'mysql',
        time: '100',
        memory: '1000',
        query: 'SELECT * FROM test',
      };
      setData((prev) => ({ ...prev, isFetching: false }));
      setComparisonData(testResponse);
      navigate('/overview');
    }, 3000);
  };

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
    >
      <S.Header>
        <h1>Homepage</h1>
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
                      active={actions[section.action as keyof typeof actions]}
                      setActive={(action) =>
                        setActions({
                          ...actions,
                          [section.action as keyof typeof actions]: action,
                        })
                      }
                      blocks={section.blocks}
                    />
                  </S.BlockList>
                </section>
              ))}
            </S.SectionList>
            <S.Button
              onClick={handleComparison}
              disabled={
                Object.values(actions).filter((action) => action !== undefined)
                  .length === 0 || data.isFetching
              }
            >
              Start comparison
            </S.Button>
          </S.ContentBlock>
        </div>
        {data.isFetching ? <ComparisonProgress items={['test']} /> : null}
      </S.MainContainer>
    </motion.div>
  );
};

export default Homepage;
