import { Avatar, Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { UserOutlined } from '@ant-design/icons';
import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';

import UpdateInfo from './component/UpdateInfo';
import ShowInfo from './component/ShowInfo';
import UpdatePassword from './component/UpdatePassword';
import { ROUTES } from 'constants/routes';
import { logoutUser } from 'redux/slicers/auth.slice';

import * as S from './style';

const PersonalInformation = () => {
  const dispatch = useDispatch();
  const [actionUserInfo, setActionUserInfo] = useState('');
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    setActionUserInfo('showInfo');
  }, []);

  const renderActionUserInfo = useMemo(() => {
    if (actionUserInfo === 'showInfo') return <ShowInfo />;
    else if (actionUserInfo === 'updateInfo') return <UpdateInfo />;
    else if (actionUserInfo === 'updatePassword') return <UpdatePassword />;
  }, [actionUserInfo]);

  if (!accessToken) return <Navigate to={ROUTES.USER.HOME} />;
  return (
    <>
      <S.PersonalInformationWrapper>
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <S.MenuWrapper>
              <S.MenuItem onClick={() => setActionUserInfo('showInfo')}>
                Thông tin cá nhân
              </S.MenuItem>
              <S.MenuItem onClick={() => setActionUserInfo('updateInfo')}>
                Chỉnh sửa thông tin
              </S.MenuItem>
              <S.MenuItem onClick={() => setActionUserInfo('updatePassword')}>
                Thay đổi mật khẩu
              </S.MenuItem>
              <S.MenuItem onClick={() => dispatch(logoutUser())}>
                Đăng xuất
              </S.MenuItem>
            </S.MenuWrapper>
          </Col>
          <Col span={18}>{renderActionUserInfo}</Col>
        </Row>
      </S.PersonalInformationWrapper>
    </>
  );
};

export default PersonalInformation;
