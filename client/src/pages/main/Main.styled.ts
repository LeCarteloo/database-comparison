import styled from 'styled-components';

const HomeGrid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: 'sidebar main';
  height: 100vh;
`;

export { HomeGrid };
