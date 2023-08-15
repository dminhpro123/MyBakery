import styled from "styled-components";

export const ProductListWrapper = styled.div`
  margin: 10px 0 10px 0;
`;

export const AsideWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
`;

export const ItemOfList = styled.div`
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    transform: scale(1.03);
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
  display: flex;
  align-items: center;
  background-color: #fff;

  gap: 5px;
  width: 100%;
  height: 40px;

  margin-bottom: 15px;
  padding: 14px;
  border-radius: 0.3rem;
`;

export const ReviewListWrapper = styled.div`
  margin: 5 0 5 0;
`;

export const TopIcons = styled.div`
  display: flex;
  align-items: center;

  background-color: #fff;

  gap: 5px;
  width: 100%;
  height: 40px;

  margin-bottom: 15px;
  padding: 14px;
  border-radius: 0.3rem;
`;
