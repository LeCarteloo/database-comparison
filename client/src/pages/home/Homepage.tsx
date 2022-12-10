import { useState } from 'react';
import { Block } from '../../components';
import * as S from './Homepage.styled';

const Homepage = () => {
  const [testState, setTestState] = useState(false);

  return (
    <>
      <S.Header>
        <h1>Homepage</h1>
      </S.Header>
      <S.SectionList>
        <section>
          SELECT
          <hr style={{ marginBlock: '1em' }} />
          <Block active={testState} onClick={() => setTestState(!testState)} />
        </section>
      </S.SectionList>
    </>
  );
};

export default Homepage;
