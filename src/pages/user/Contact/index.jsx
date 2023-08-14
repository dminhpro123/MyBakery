import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Breadcrumb, Col, Descriptions, Row, Space } from 'antd';

import * as S from './style';
import { ROUTES } from 'constants/routes';
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';

const Map = React.lazy(() => import('./component/Map'));

const ContactUs = () => {
  const { bakeryInformationList } = useSelector(
    (state) => state.bakeryInformation
  );

  return (
    <>
      <S.ContactUsWrapper>
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
                    title: 'Liên Hệ',
                  },
                ]}
              />
            </S.TopIcons>
          </Col>
        </Row>
        <div className="info-contact">
          <Descriptions title="My Bakery">
            <Descriptions.Item label="Địa chỉ">
              {bakeryInformationList.data.address}
            </Descriptions.Item>
            <Descriptions.Item label="Điện thoại">
              {bakeryInformationList.data.telephone}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {bakeryInformationList.data.email}
            </Descriptions.Item>
          </Descriptions>
        </div>
        <Suspense>
          <Map />
        </Suspense>
      </S.ContactUsWrapper>
    </>
  );
};

export default ContactUs;
