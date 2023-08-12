import styled, { css } from 'styled-components';
// background-image: url(http://www.daidongtam.com.vn/images/bg_sp.jpg);

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

export const AddToCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ReviewWrapper = styled.div`
  margin: 0 auto;
  padding: 16px;
  background-color: #e6e6e6;
`;

export const ReviewListWrapper = styled.div`
  margin: 5 0 5 0;
`;

export const ReviewAttention = styled.div`
  margin: 5 0 5 0;
`;

export const SimilarProductWrapper = styled.div`
  margin: 5 0 5 0;
`;

export const SimilarProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

export const ItemOfList = styled.div`
  padding: 5px;
  gap: 10px;
  width: 200px;
  cursor: pointer;
`;

export const TopIcons = styled.div`
  display: flex;
  align-items: center;

  background-color: #fff;
  box-shadow: 3px 3px gray;

  gap: 5px;
  width: 100%;
  height: 8vh;

  margin-bottom: 15px;
  padding: 14px;
  border-radius: 0.3rem;
`;
