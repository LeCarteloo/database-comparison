import styled from 'styled-components';

const Header = styled.header`
  padding: 2em 0;
`;

const Results = styled.div`
  background-color: #141432;
  border-radius: 10px;
  padding: 2em;
  flex: 1;
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

const LoadingItem = styled.li`
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

export { Header, LoadingItem, LoadingList, Results, MainContainer };
