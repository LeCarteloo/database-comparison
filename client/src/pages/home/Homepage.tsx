import { Block } from '../../components';
import * as S from './Homepage.styled';

const Homepage = () => {
  return (
    <>
      <S.Header>
        <h1>Homepage</h1>
      </S.Header>
      <S.SectionList>
        <section>
          SELECT
          <hr style={{ marginBlock: '1em' }} />
          <Block />
        </section>
      </S.SectionList>
    </>
  );
};

export default Homepage;
