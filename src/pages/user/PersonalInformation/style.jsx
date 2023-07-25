import styled from 'styled-components';

export const PersonalInformationWrapper = styled.div`
  margin: 5px 0 5px 0;
`;

export const MenuWrapper = styled.div`
  padding-top: 10px;

  display: flex;
  flex-direction: column;
  gap: 10px;

  background-color: white;
  border-radius: 0.3rem;
`;

export const MenuItem = styled.div`
  cursor: pointer;
  padding: 10px 0 10px 5px;
  border-bottom: 0.1px solid #726f6f;

  &:hover {
    background-color: #d2cece;
  }
`;
