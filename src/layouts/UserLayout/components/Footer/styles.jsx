import styled from 'styled-components';

export const FooterWrapper = styled.div``;

export const FooterTop = styled.div`
  background: #e75a39;
  color: white;
`;

export const FooterBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  color: white;
  height: 9vh;
`;

export const CategoryListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;
export const CategoryItem = styled.div`
  padding: 5px;
  cursor: pointer;
  border-radius: 0.3rem;

  &:hover {
    background-color: #e56c50;
  }
`;

export const DataInfo = styled.div`
  padding: 5px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Channel = styled.a`
  color: white;
  &:hover {
    color: #d7b1b1;
  }
`;
