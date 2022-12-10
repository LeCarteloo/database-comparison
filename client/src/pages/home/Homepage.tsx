import { useState } from 'react';
import { Block, BlockGroup } from '../../components';
import { DeleteForever, Window, JoinInnerOutlined } from '@mui/icons-material';
import * as S from './Homepage.styled';
import { IBlock } from '../../interfaces/interfaces';

interface Actions {
  select: number | undefined;
  delete: number | undefined;
  joins: number | undefined;
}

interface Sections {
  title: string;
  action: string;
  blocks: IBlock[];
}

const Homepage = () => {
  const [actions, setActions] = useState<Actions>({
    select: undefined,
    delete: undefined,
    joins: undefined,
  });

  const sections: Sections[] = [
    {
      title: 'Select',
      action: 'select',
      blocks: [
        {
          icon: <Window fontSize="large" />,
          label: '1000 records',
        },
        {
          icon: <Window fontSize="large" />,
          label: '5000 records',
        },
        {
          icon: <Window fontSize="large" />,
          label: '10000 records',
        },
        {
          icon: <Window fontSize="large" />,
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
      ],
    },
    {
      title: 'Joins',
      action: 'joins',
      blocks: [
        {
          icon: <JoinInnerOutlined fontSize="large" />,
          label: '1000 records',
        },
        {
          icon: <JoinInnerOutlined fontSize="large" />,
          label: '5000 records',
        },
        {
          icon: <JoinInnerOutlined fontSize="large" />,
          label: '10000 records',
        },
        {
          icon: <JoinInnerOutlined fontSize="large" />,
          label: '50000 records',
        },
      ],
    },
  ];

  return (
    <>
      <S.Header>
        <h1>Homepage</h1>
      </S.Header>
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
      <ActionProgress />
    </>
  );
};

export default Homepage;
