import { Outlet } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import * as S from './styles';
import { Col, Row } from 'antd';

function UserLayout() {
  return (
    <S.UserLayoutWrapper>
      <Header />
      <S.MainWrapper>
        <Row gutter={16}>
          <Col span={1}></Col>
          <Col span={22}>
            <Outlet />
          </Col>
          <Col span={1}></Col>
        </Row>
      </S.MainWrapper>
      <Footer />
    </S.UserLayoutWrapper>
  );
}

export default UserLayout;
