import { Link } from 'react-router-dom';
import { Dropdown, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import logo from 'assets/images/logo.jpg';
import { ROUTES } from 'constants/routes';

import * as S from './styles';
import { NAVBAR } from 'constants/userNavbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';

function AdminHeader() {
  // navigate(ROUTES.USER.PERSONAL_INFOR)
  const navigate = useNavigate();

  const items = [
    {
      key: '1',
      label: (
        <S.Icon
          style={{ textDecoration: 'none' }}
          onClick={() => navigate(ROUTES.USER.PERSONAL_INFOR)}
        >
          Thông tin cá nhân
        </S.Icon>
      ),
    },
    {
      key: '2',
      label: <S.Icon>Đăng xuất</S.Icon>,
      disabled: true,
    },
  ];

  return (
    <>
      <S.HeaderWrapper>
        <S.NavLinkContainer>
          <S.HeadTop>
            <S.Logo>
              <S.LogoImg
                src={logo}
                alt="logo"
                onClick={() => navigate(ROUTES.USER.HOME)}
              />
            </S.Logo>
            <S.TopNav>
              {NAVBAR.map((item) => {
                return (
                  <S.RouteLink
                    key={item.url}
                    onClick={() => navigate(item.url)}
                  >
                    <span>{item.content}</span>
                  </S.RouteLink>
                );
              })}
            </S.TopNav>
          </S.HeadTop>

          <S.HeadBottom>
            <div className="search-container">
              <S.SearchInput type="text" placeholder="Search..." />
              <div className="search"></div>
            </div>
            <S.UserBar>
              <S.LoginLogoutBar>
                <S.Log onClick={() => navigate(ROUTES.USER.LOGIN)}>
                  Đăng nhập
                </S.Log>{' '}
                /{' '}
                <S.Log onClick={() => navigate(ROUTES.USER.REGISTER)}>
                  Đăng ký
                </S.Log>
              </S.LoginLogoutBar>
              <S.UserIcon>
                <S.Icon onClick={() => navigate(ROUTES.USER.CART)}>
                  <FontAwesomeIcon icon={faCartShopping} />
                </S.Icon>
                {/* <FontAwesomeIcon icon={faUser} /> */}
                <Dropdown
                  menu={{
                    items,
                  }}
                  placement="bottomRight"
                  arrow
                >
                  <S.Icon onClick={(e) => e.preventDefault()}>
                    <Space>
                      <FontAwesomeIcon icon={faUser} />
                    </Space>
                  </S.Icon>
                </Dropdown>
              </S.UserIcon>
            </S.UserBar>
          </S.HeadBottom>
        </S.NavLinkContainer>
      </S.HeaderWrapper>
    </>
  );
}

export default AdminHeader;
