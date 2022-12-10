import * as S from './Block.styled';
import { RuleOutlined } from '@mui/icons-material';
import Select from '../../assets/select.jpg';

interface BlockProps {
  icon: JSX.Element;
  label: string;
  img?: string;
  active: boolean;
  onClick: () => void;
}

const Block = ({ icon, label, img, active, onClick }: BlockProps) => {
  return (
    <S.Block active={active} onClick={onClick}>
      <S.InnerBlock>
        {icon}
        <span>{label}</span>
        <span></span>
      </S.InnerBlock>
      {img ? <S.ImgBlock img={Select} /> : null}
    </S.Block>
  );
};

export default Block;
