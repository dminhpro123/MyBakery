import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdvertisementListRequest } from 'redux/slicers/advertisement.slice';

import * as S from './style';
import Slider from 'react-slick';

const advertisementSettings = {
  infinite: true,
  speed: 3000,
  autoplay: true,
  autoplaySpeed: 2000,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
};

const AdvertisementList = () => {
  const dispatch = useDispatch();

  const { advertisementList } = useSelector((state) => state.advertisement);

  useEffect(() => {
    dispatch(getAdvertisementListRequest());
  }, []);

  const renderAdvertisementSlide = useMemo(() => {
    if (!advertisementList) return null;
    return advertisementList.data.map((item) => {
      return (
        <div key={item.id} style={{ height: '400px' }}>
          <S.AdvertisementSlide>
            <S.AdvertisementImage src={item.image} alt="" />
          </S.AdvertisementSlide>
        </div>
      );
    });
  }, [advertisementList]);

  return (
    <>
      <Slider {...advertisementSettings}>{renderAdvertisementSlide}</Slider>
    </>
  );
};

export default AdvertisementList;
