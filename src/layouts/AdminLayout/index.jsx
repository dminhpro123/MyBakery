import { Outlet } from 'react-router-dom';

import * as S from './styles';
import { Col, Row } from 'antd';

const AdminLayout = () => {
  return (
    <>
      <S.MainLayoutWrapper>
        header
        <S.MainWrapper>
          <Row gutter={16}>
            <Col span={1}></Col>
            <Col span={22}>
              <Outlet />
            </Col>
            <Col span={1}></Col>
          </Row>
        </S.MainWrapper>
        footer
      </S.MainLayoutWrapper>
    </>
  );
};

export default AdminLayout;
