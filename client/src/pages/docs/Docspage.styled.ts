import styled from 'styled-components';

const Header = styled.header`
  padding: 2em 0;
`;

const ContentBlock = styled.div`
  background-color: #141432;
  border-radius: 10px;
  padding: 2em;
`;

const ContentList = styled.ul`
  margin-left: 1em;
  list-style: none;
`;

const ContentLink = styled.a`
  color: white;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Table = styled.table`
  width: 100%;
  margin-top: 1em;
  text-align: center;
  border-collapse: collapse;
  border: 1px solid #fff;
  table-layout: fixed;
  tr {
    width: 100%;
  }
  th {
    padding: 0.2em;
    border: 1px solid #fff;
    background-color: #1d1d42;
  }
  td {
    padding: 0.2em;
    border: 1px solid #fff;
  }
`;

export { Header, ContentBlock, ContentList, ContentLink, Table };
