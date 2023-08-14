import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Col, Row } from 'antd';

import * as S from './styles';

const Header = React.lazy(() => import('./components/Header'));
const Footer = React.lazy(() => import('./components/Footer'));

function UserLayout() {
  return (
    <S.UserLayoutWrapper>
      <Suspense>
        <Header />
      </Suspense>
      <S.MainWrapper>
        <Row gutter={16}>
          <Col span={1}></Col>
          <Col span={22}>
            <Outlet />
          </Col>
          <Col span={1}></Col>
        </Row>
      </S.MainWrapper>
      <Suspense>
        <Footer />
      </Suspense>
    </S.UserLayoutWrapper>
  );
}

export default UserLayout;
