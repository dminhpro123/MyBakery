import styled, { css } from 'styled-components';

export const ProductDetailWrapper = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const ProductDetailName = styled.h1`
  color: red;
  text-transform: uppercase;
  text-shadow: 1px 2px black;
  font-size: 40px;
`;

export const ProductDetailPrice = styled.span`
  font-size: 20px;
  ${(props) => {
    props.active &&
      css`
        opacity: 0.1;
        font-size: 14px;
      `;
  }}
`;

export const ProductDetailDescription = styled.span`
  font-size: 20px;
  &span {
    opacity: 0.8;
    font-size: 14px;
  }
`;
