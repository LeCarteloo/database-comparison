import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

interface OpenProp {
  open: boolean;
}

const Hamburger = styled.button<OpenProp>`
  position: absolute;
  z-index: 999;
  top: 2.2em;
  right: 1em;
  border: none;
  padding: 0.6em;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    span {
      background-color: #6fcf97;
    }
  }
  span {
    transition: 0.3s ease-in-out;
    width: 28px;
    height: 2px;
    background-color: #fff;
    opacity: 1;
  }

  display: none;
  @media (max-width: 800px) {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    ${({ open }) =>
      open &&
      css`
        span:nth-child(1) {
          transform: translate(0px, 8px) rotate(-45deg);
        }
        span:nth-child(2) {
          transform: translateX(-30px);
          opacity: 0;
        }
        span:nth-child(3) {
          transform: translate(0px, -10px) rotate(45deg);
        }
      `}
  }
`;

const Aside = styled(motion.aside)<OpenProp>`
  grid-area: sidebar;
  width: 250px;
  transition: 0.2s ease-in-out;
  background-color: #1d1d42;
  height: 100%;
  @media (max-width: 800px) {
    position: absolute;
    z-index: 999;
    /* display: none; */
    transform: translateX(-250px);
    ${({ open }) =>
      open &&
      css`
        display: block;
        transform: translateX(0px);
        border-right: 2px solid #141432;
      `}
  }
`;

const Nav = styled.aside`
  padding: 2em 2em 0 2em;
`;

const List = styled.ul`
  list-style: none;
`;

const Item = styled.li`
  margin-top: 1em;
  a {
    border-radius: 2vh;
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

export { Aside, Nav, List, Item, Hamburger };
