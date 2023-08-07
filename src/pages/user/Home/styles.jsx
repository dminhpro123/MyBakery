import styled from 'styled-components';

export const HomeWrapper = styled.div`
  margin: 5px 0 5px 0;
  min-height: 100vh;
`;

export const AdvertisementSlide = styled.div`
  height: 480px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AdvertisementImage = styled.img`
  height: 100%;
`;

export const SomeProductListWrapper = styled.div`
  margin: 20px 0 10px 0;
`;

export const ItemOfList = styled.div`
  padding: 5px;
  gap: 10px;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`;

export const ItemCategoryList = styled.div`
  margin-top: 50px;
`;

export const CategoryContainer = styled.div`
  position: relative;
  visibility: visible;
  &:hover span {
    opacity: 1;
  }
  &:hover img {
    opacity: 0.4;
    transform: scale(1.05);
  }
`;
export const ImgCategory = styled.img`
  cursor: pointer;
  opacity: 1;
  display: block;
  width: 100%;
  transition: 0.5s ease;
  backface-visibility: hidden;
  &:hover {
    transform: scale(1.05);
    opacity: 0.4;
  }
`;
export const TextCategoryContainer = styled.span`
  transition: 0.5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;

  color: white;
  font-size: 20px;
  cursor: pointer;
`;

export const LoadingWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
