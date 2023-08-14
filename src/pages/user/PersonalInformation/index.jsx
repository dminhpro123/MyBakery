import { Breadcrumb, Card, Col, Row, Skeleton, Space, Tabs } from 'antd';
import { Link, Navigate } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import React, { Suspense, useEffect } from 'react';

import { ROUTES } from 'constants/routes';

import * as S from './style';

const UpdateInfo = React.lazy(() => import('./component/UpdateInfo'));
const ShowInfo = React.lazy(() => import('./component/ShowInfo'));
const UpdatePassword = React.lazy(() => import('./component/UpdatePassword'));
const OderHistory = React.lazy(() => import('./component/OderHistory'));
const FavoriteProducts = React.lazy(() =>
  import('./component/FavoriteProducts')
);

const PersonalInformation = () => {
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {}, []);

  const onChange = (key) => {
    return (key = 1);
  };

  if (!accessToken) return <Navigate to={ROUTES.USER.HOME} />;

  return (
    <>
      <S.PersonalInformationWrapper>
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
                    title: 'Thông tin cá nhân',
                  },
                ]}
              />
            </S.TopIcons>
          </Col>
        </Row>
        <Card bordered={false} size="small">
          <Tabs
            tabPosition="left"
            defaultActiveKey={1}
            onChange={onChange}
            destroyInactiveTabPane
            size="small"
            items={[
              {
                label: 'Thông tin cá nhân',
                key: 1,
                children: (
                  <Suspense
                    fallback={<Skeleton active paragraph={{ rows: 7 }} />}
                  >
                    <ShowInfo />
                  </Suspense>
                ),
              },
              {
                label: ' Chỉnh sửa thông tin',
                key: 2,
                children: (
                  <Suspense
                    fallback={<Skeleton active paragraph={{ rows: 7 }} />}
                  >
                    <UpdateInfo />
                  </Suspense>
                ),
              },
              {
                label: 'Thay đổi mật khẩu',
                key: 3,
                children: (
                  <Suspense
                    fallback={<Skeleton active paragraph={{ rows: 7 }} />}
                  >
                    <UpdatePassword />
                  </Suspense>
                ),
              },
              {
                label: 'Lịch sử mua hàng',
                key: 4,
                children: (
                  <Suspense
                    fallback={<Skeleton active paragraph={{ rows: 7 }} />}
                  >
                    <OderHistory />
                  </Suspense>
                ),
              },
              {
                label: 'Sản phẩm yêu thích',
                key: 5,
                children: (
                  <Suspense
                    fallback={<Skeleton active paragraph={{ rows: 7 }} />}
                  >
                    <FavoriteProducts />
                  </Suspense>
                ),
              },
            ]}
          />
        </Card>
      </S.PersonalInformationWrapper>
    </>
  );
};

export default PersonalInformation;
