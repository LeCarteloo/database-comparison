import styled from 'styled-components';

const Header = styled.header`
  padding: 2em 0;
`;

const SectionList = styled.div`
  margin-top: 1em;
  background-color: #141432;
  border-radius: 10px;
  padding: 2em;
`;

const BlockList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 12%));
  justify-content: start;
  gap: 1em;
  @media (max-width: 375px) {
    grid-template-columns: 100px 100px;
  }
`;

const Section = styled.section``;

export { SectionList, BlockList, Section, Header };
