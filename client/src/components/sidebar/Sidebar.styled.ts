import styled from 'styled-components';

const Aside = styled.aside`
  grid-area: sidebar;
  width: 260px;
`;
// #6FCF97 - green #26264E - yes

const Nav = styled.aside`
  padding: 2em;
`;

const List = styled.ul`
  list-style: none;
`;

const Item = styled.li`
  margin-top: 1em;
  a {
    border-radius: 25vh;
    &:hover {
      background-color: #26264e;
    }
    &.active {
      color: #6fcf97;
      background-color: #26264e;
    }
    &:active {
      opacity: 0.8;
    }
    display: flex;
    align-items: center;
    gap: 1em;
    padding: 1em 1.3em;
    text-decoration: none;
    color: #fff;
  }
`;

export { Aside, Nav, List, Item };
