import styled from 'styled-components';

const HomeGrid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: 'sidebar main';
  height: 100vh;
  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const Main = styled.main`
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0 2em 2em 2em;
  @media (max-width: 800px) {
    padding: 0 0.8em 0.8em 0.8em;
  }
`;

export { HomeGrid, Main };
