import * as S from './Block.styled';
import { RuleOutlined } from '@mui/icons-material';
import Select from '../../assets/select.jpg';

interface BlockProps {
  active: boolean;
  onClick: () => void;
}

const Block = ({ active, onClick }: BlockProps) => {
  return (
    <S.Block active={active} onClick={onClick}>
      <S.InnerBlock>
        <RuleOutlined fontSize="large" />
        <span>SELECT SMALL AMOUNT</span>
        <span></span>
      </S.InnerBlock>
      <S.ImgBlock img={Select} />
    </S.Block>
  );
};

export default Block;
