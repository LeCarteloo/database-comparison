import { useState } from 'react';
import Block from './Block';
import { IBlock } from '../../interfaces/interfaces';

interface BlockGroupProps {
  active: number | undefined;
  setActive: (arg: number | undefined) => void;
  blocks: IBlock[];
}

const BlockGroup = ({ active, setActive, blocks }: BlockGroupProps) => {
  const [activeBtn, setActiveBtn] = useState<number | undefined>();
  return (
    <>
      {blocks.map((block, i) => (
        <Block
          key={i}
          icon={block.icon}
          label={block.label}
          active={active === i}
          onClick={() => setActive(active !== i ? i : undefined)}
        />
      ))}
    </>
  );
};

export default BlockGroup;
