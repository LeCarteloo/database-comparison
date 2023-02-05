import Block from './Block';
import { IBlock } from '../../interfaces/interfaces';
import { motion } from 'framer-motion';

interface BlockGroupProps {
  active: number | undefined;
  setActive: (arg: number | undefined) => void;
  blocks: IBlock[];
}

const BlockGroup = ({ active, setActive, blocks }: BlockGroupProps) => {
  return (
    <>
      {blocks.map((block, i) => (
        <motion.div
          key={i}
          animate={{ scale: 1 }}
          initial={{ scale: 0 }}
          transition={{
            duration: 0.4 + 0.1 * i,
            ease: 'easeInOut',
          }}
        >
          <Block
            icon={block.icon}
            label={block.label}
            img={block.img}
            active={active === i}
            onClick={() => setActive(active !== i ? i : undefined)}
          />
        </motion.div>
      ))}
    </>
  );
};

export default BlockGroup;
