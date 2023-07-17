import { Col, Row } from 'antd';
import React, { useEffect, useMemo } from 'react';
import Slider from 'react-slick';
import { useDispatch, useSelector } from 'react-redux';

import { getAdvertismentListRequest } from 'redux/slicers/advertisment.slice';

import * as S from './styles';

const advertisementSettings = {
  infinite: true,
  speed: 3000,
  autoplay: true,
  autoplaySpeed: 2000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

function HomePage() {
  const dispatch = useDispatch();
  const { advertismentList } = useSelector((state) => state.advertisment);

  useEffect(() => {
    dispatch(getAdvertismentListRequest());
  }, []);

  const renderAdvertisementSlide = useMemo(() => {
    if (!advertismentList) return null;

    return advertismentList.data.map((item) => {
      return (
        <div key={item.id} style={{ height: '400px' }}>
          <S.advertisementSlide>
            <S.advertisementImage src={item.image} alt="" />
          </S.advertisementSlide>
        </div>
      );
    });
  }, [advertismentList]);

  return (
    <S.HomeWrapper>
      <Slider {...advertisementSettings}>{renderAdvertisementSlide}</Slider>
      <Row gutter={[16, 16]}>
        <Col span={1} />
        <Col span={22}>haha</Col>
        <Col span={1} />
      </Row>
      {}
    </S.HomeWrapper>
  );
}

export default HomePage;
