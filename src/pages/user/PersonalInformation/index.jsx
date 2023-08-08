import { Card, Tabs } from 'antd';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';

import UpdateInfo from './component/UpdateInfo';
import ShowInfo from './component/ShowInfo';
import UpdatePassword from './component/UpdatePassword';
import OderHistory from './component/OderHistory';
import FavoriteProducts from './component/FavoriteProducts';
import { ROUTES } from 'constants/routes';

import * as S from './style';

const PersonalInformation = () => {
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {}, []);

  const onChange = (key) => {
    return (key = '1');
  };

  if (!accessToken) return <Navigate to={ROUTES.USER.HOME} />;

  return (
    <>
      <S.PersonalInformationWrapper>
        <Card bordered={false} size="small">
          <Tabs
            // renderTabBar={<ShowInfo />}
            // onTabScroll={'bottom'}
            tabPosition="left"
            defaultActiveKey={1}
            onChange={onChange}
            destroyInactiveTabPane
            size="small"
            items={[
              {
                label: 'Thông tin cá nhân',
                key: 1,
                children: <ShowInfo />,
              },
              {
                label: ' Chỉnh sửa thông tin',
                key: 2,
                children: <UpdateInfo />,
              },
              {
                label: 'Thay đổi mật khẩu',
                key: 3,
                children: <UpdatePassword />,
              },
              {
                label: 'Lịch sử mua hàng',
                key: 4,
                children: <OderHistory />,
              },
              {
                label: 'Sản phẩm yêu thích',
                key: 5,
                children: <FavoriteProducts />,
              },
            ]}
          />
        </Card>
      </S.PersonalInformationWrapper>
    </>
  );
};

export default PersonalInformation;
