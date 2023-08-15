import styled from "styled-components";

export const ReviewListWrapper = styled.div`
  margin: 5 0 5 0;
`;

export const ItemOfList = styled.div`
  padding: 8px;
  gap: 10px;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    transform: scale(1.05);
  }
`;
