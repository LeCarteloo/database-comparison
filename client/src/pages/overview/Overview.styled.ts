import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

interface LegendItemProp {
  color: string;
}

const Header = styled.header`
  padding: 2em 0;
`;

const Results = styled.div`
  background-color: #141432;
  border-radius: 10px;
  padding: 2em;
  width: 100%;
  height: 100%;
`;

const Charts = styled.section`
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: auto auto;
  gap: 1em;
  @media (max-width: 1120px) {
    grid-template-rows: auto;
    grid-template-columns: auto;
  }
`;

const Legend = styled.header`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1em;
  margin-bottom: 2em;
  width: 100%;
`;

const LegendItem = styled.div<LegendItemProp>`
  display: flex;
  align-items: center;
  gap: 0.2em;
  span {
    width: 12px;
    height: 12px;
    border-radius: 50vh;
    ${({ color }) =>
      color &&
      css`
        background-color: ${color};
      `}
  }
  h5 {
    ${({ color }) =>
      color &&
      css`
        color: ${color};
      `}
  }
`;

const MainContainer = styled.div`
  display: flex;
  gap: 5%;
  @media (max-width: 800px) {
    flex-direction: column-reverse;
  }
`;

const LoadingList = styled.ul`
  list-style: none;
  @media (max-width: 800px) {
    display: flex;
    gap: 1em;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const LoadingItem = styled(motion.li)`
  display: flex;
  align-items: center;
  margin-bottom: 0.4em;
  gap: 1em;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #141432;
    border-radius: 10px;
    width: 40px;
    height: 40px;
  }
`;

export {
  Legend,
  LegendItem,
  Header,
  LoadingItem,
  LoadingList,
  Results,
  MainContainer,
  Charts,
};
