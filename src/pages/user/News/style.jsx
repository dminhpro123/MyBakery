import styled from "styled-components";

export const NewsListWrapper = styled.div`
  margin: 10px 0 10px 0;
`;

export const NewsCard = styled.div`
  padding: 5px;
  margin: 5px;

  display: flex;
`;

export const NewsInformation = styled.div`
  margin-left: 10px;
`;

export const NewsImage = styled.img`
  cursor: pointer;
`;

export const NewsTitle = styled.span`
  cursor: pointer;
  color: #4b9ee6;

  &:hover {
    color: blue;
  }
`;

export const NewsContent = styled.p`
  font-size: x-small;
  text-indent: 10px;

  /* white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; */
  display: block;
  display: -webkit-box;
  -webkit-line-clamp: ${2};
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const NewsModalParagraph = styled.p`
  margin: 5px 0 5px 0;
  text-indent: 10px;
`;
export const NewsModalImage = styled.img`
  margin: 5px 0 5px 0;
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
