import styled from 'styled-components';

export const ContactUsWrapper = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const Attention = styled.div`
  background-color: #fffaf3;
  color: #794b02;

  border-radius: 0.3rem;
  border: 1px solid #794b02;

  padding: 10px;

  &span::before {
    content: '•';
    padding: 5px;
  }
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
