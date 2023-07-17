import styled from 'styled-components';

export const AboutUsWrapper = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const TitleInfo = styled.h1`
  @import url('https://fonts.googleapis.com/css2?family=Dancing+Script&family=Pacifico&display=swap');
  font-family: 'Pacifico', cursive;
  font-size: calc(4vw + 4vh + 2vmin);
  color: #ee9f1f;
`;

export const ContentInfo = styled.p`
  padding: 10px;
  font-size: calc(15px+2vmin);
`;

export const ContentContainer = styled.div`
  &img {
    width: 100%;
  }
`;

export const Alignment = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 5px;
  gap: 30px;
  padding: 10px;
`;

export const ContentImageBackground = styled.div`
  position: relative;
`;

export const TextImageBackground = styled.div`
  bottom: 0;
  position: absolute;

  background: rgba(88, 16, 8, 0.4);
  color: white;

  height: 100%;

  display: flex;
  align-items: center;

  font-size: calc(5px+1vmin);
`;
