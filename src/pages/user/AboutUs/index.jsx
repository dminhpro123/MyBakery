import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Breadcrumb, Col, Image, Row, Space } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';

import { ROUTES } from 'constants/routes';

import * as S from './style';

const AboutUs = () => {
  const { bakeryInformationList } = useSelector(
    (state) => state.bakeryInformation
  );

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
              {bakeryInformationList.data.aboutUs?.aboutUsTitle3}
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
  }, [bakeryInformationList.data.aboutUs?.aboutUsTitle3, informationData]);

  return (
    <>
      <S.AboutUsWrapper>
        <Row gutter={16}>
          <Col span={24}>
            <S.TopIcons>
              <Breadcrumb
                items={[
                  {
                    title: (
                      <Link to={ROUTES.USER.HOME}>
                        <Space>
                          <HomeOutlined />
                          <span>Trang chủ</span>
                        </Space>
                      </Link>
                    ),
                  },
                  {
                    title: 'Giới Thiệu',
                  },
                ]}
              />
            </S.TopIcons>
          </Col>
        </Row>
        {renderIntroductionBakery}
      </S.AboutUsWrapper>
    </>
  );
};

export default AboutUs;
