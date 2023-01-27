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

export { Header, ContentBlock, ContentList, ContentLink };
