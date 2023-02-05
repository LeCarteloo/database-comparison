import styled from 'styled-components';
import { motion } from 'framer-motion';

const CircleLoader = styled.span`
  width: 25px;
  height: 25px;
  border: 3px solid #fff;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
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

export { CircleLoader, LoadingItem, LoadingList };
