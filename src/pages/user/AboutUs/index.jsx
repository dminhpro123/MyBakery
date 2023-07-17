import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBakeryInformationRequest } from 'redux/slicers/bakeryInformation.slice';
import * as S from './style';
import { Col, Image, Row } from 'antd';
import TopIcon from '../components/TopIcon';

const AboutUs = () => {
  const dispatch = useDispatch();
  const { bakeryInformationList } = useSelector(
    (state) => state.bakeryInformation
  );

  useEffect(() => {
    dispatch(getBakeryInformationRequest());
  }, []);

  const informationData = bakeryInformationList.data.aboutUs;

  const renderIntroductionBakery = useMemo(() => {
    if (!informationData) return null;
    return (
      <S.ContentContainer>
        <Row gutter={16}>
          <Col span={10}>
            <Image src={informationData.image1} />
          </Col>
          <Col span={14}>
            <S.Alignment>
              <S.TitleInfo>{informationData.aboutUsTitle1}</S.TitleInfo>
              <S.ContentInfo>{informationData.aboutUsContent1}</S.ContentInfo>
            </S.Alignment>
          </Col>
        </Row>
        <br />
        <Row gutter={16}>
          <Col span={14}>
            <S.Alignment>
              <S.TitleInfo>{informationData.aboutUsTitle2}</S.TitleInfo>
              <S.ContentInfo>{informationData.aboutUsContent2}</S.ContentInfo>
            </S.Alignment>
          </Col>
          <Col span={10}>
            <Image src={informationData.image2} />
          </Col>
        </Row>
        <br />
        <Row gutter={16}>
          <Col span={9}>
            <S.TitleInfo>
              {bakeryInformationList.data.aboutUs.aboutUsTitle3}
            </S.TitleInfo>
          </Col>
          {informationData.aboutUsContent3.map((item, index) => {
            return (
              <Col key={index} span={5}>
                <S.ContentImageBackground>
                  <Image src={item.image} />
                  <S.TextImageBackground>
                    <S.ContentInfo>{item.content}</S.ContentInfo>
                  </S.TextImageBackground>
                </S.ContentImageBackground>
              </Col>
            );
          })}
        </Row>
      </S.ContentContainer>
    );
  }, [informationData]);

  return (
    <>
      <S.AboutUsWrapper>
        <TopIcon key={1} titleString="ABOUT_US" />
        {renderIntroductionBakery}
      </S.AboutUsWrapper>
    </>
  );
};

export default AboutUs;
