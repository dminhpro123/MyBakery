import styled from 'styled-components';

export const CategoryContainer = styled.a`
  display: block;
  position: relative;
  visibility: visible;
  &:hover span {
    opacity: 1;
  }
  &:hover img {
    opacity: 0.4;
    transform: scale(1.05);
  }
`;
export const ImgCategory = styled.img`
  cursor: pointer;
  opacity: 1;
  display: block;
  width: 100%;
  transition: 0.5s ease;
  backface-visibility: hidden;
  &:hover {
    transform: scale(1.05);
    opacity: 0.4;
  }
`;
export const TextCategoryContainer = styled.span`
  transition: 0.5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;

  color: white;
  font-size: 20px;
  cursor: pointer;
`;
