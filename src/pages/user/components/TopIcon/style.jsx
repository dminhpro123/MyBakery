import styled from 'styled-components';

export const TopIcons = styled.div`
  display: flex;
  align-items: center;

  background-color: #fff;
  box-shadow: 3px 3px gray;

  gap: 5px;
  width: 100%;
  height: 8vh;

  margin: 15px 0 15px 0;
  padding: 14px;
  border-radius: 0.3rem;
`;

export const IconHome = styled.span`
  cursor: pointer;

  &:hover {
    color: blue;
  }
`;
