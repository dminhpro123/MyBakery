import styled from 'styled-components';

export const ProductListWrapper = styled.div`
  margin: 5px 0 5px 0;
`;

export const AsideWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
`;

export const ItemOfList = styled.div`
  padding: 5px;
  gap: 10px;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`;

export const NoData = styled.div`
  color: blueviolet;
`;

export const LoadingWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const ShowListLength = styled.div`
  padding: 5px;
`;
