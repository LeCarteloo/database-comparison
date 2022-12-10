import styled, { css } from 'styled-components';

type ImgType = {
  img: string;
};

type BlockType = {
  active: boolean;
};

const ImgBlock = styled.div<ImgType>`
  transition: 0.45s ease-in-out;
  width: 100%;
  height: 100%;
  ${({ img }) =>
    img &&
    css`
      background-image: url(${img});
      background-position: center;
      background-size: cover;
    `}
`;

const Block = styled.button<BlockType>`
  position: relative;
  width: 100%;
  min-width: 100px;
  max-width: 130px;
  aspect-ratio: 1/1;
  color: white;
  background-color: transparent;
  border-radius: 5px;
  border: 2px solid gray;
  cursor: pointer;
  overflow: hidden;
  transition: 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
  &:active {
    opacity: 0.6;
  }
  &:hover,
  &:focus {
    ${ImgBlock} {
      transform: scale(1.2);
    }
  }

  ${({ active }) =>
    active &&
    css`
      border-color: #6fcf97;
      color: #6fcf97;
    `}
`;

const InnerBlock = styled.div`
  position: absolute;
  top: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8);
`;

export { Block, InnerBlock, ImgBlock };
