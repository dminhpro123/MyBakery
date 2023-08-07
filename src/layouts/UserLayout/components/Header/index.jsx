import { Link } from 'react-router-dom';
import { Dropdown, Space, Badge, Popover, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FacebookFilled, MenuOutlined, YoutubeFilled } from '@ant-design/icons';

import { ROUTES } from 'constants/routes';
import { NAVBAR } from 'constants/userNavbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { logoutUser } from 'redux/slicers/auth.slice';
import logo from 'assets/images/logo.jpg';

import * as S from './styles';

function AdminHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { cartList } = useSelector((state) => state.cart);
  const { bakeryInformationList } = useSelector(
    (state) => state.bakeryInformation
  );

  const items = useMemo(
    () => [
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
        disabled: userInfo.data.id ? false : true,
      },
      {
        key: '2',
        label: (
          <S.Icon onClick={() => dispatch(logoutUser())}>Đăng xuất</S.Icon>
        ),
        disabled: userInfo.data.id ? false : true,
      },
    ],
    [userInfo.data.id]
  );

  const renderUserInfo = useMemo(() => {
    return (
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
    );
  }, [items]);

  const content = NAVBAR.map((item) => {
    return (
      <Link key={item.url} to={item.url} style={{ textDecoration: 'none' }}>
        <S.RouteLink onClick={() => navigate(item.url)}>
          {item.content}
        </S.RouteLink>
      </Link>
    );
  });

  const renderChannel = useMemo(() => {
    return (
      <>
        <Space align="center" size={[16, 16]} style={{ padding: 5 }}>
          <S.Channel href={bakeryInformationList.data.facebookChannel}>
            <FacebookFilled style={{ fontSize: 32 }} />
          </S.Channel>
          <S.Channel href={bakeryInformationList.data.youtubeChannel}>
            <YoutubeFilled style={{ fontSize: 36 }} />
          </S.Channel>
        </Space>
      </>
    );
  }, [bakeryInformationList.data]);

  return (
    <>
      <S.HeaderWrapper>
        <Row gutter={[16, 16]}>
          <Col xl={1} lg={1} xs={1}></Col>
          <Col xl={10} lg={9} xs={8}>
            <S.HeadBottom>{renderChannel}</S.HeadBottom>
          </Col>
          <Col xl={2} lg={4} xs={6}>
            <S.Logo>
              <S.LogoImg
                src={logo}
                alt="logo"
                onClick={() => navigate(ROUTES.USER.HOME)}
              />
            </S.Logo>
          </Col>
          <Col xl={10} lg={9} xs={8}>
            <S.HeadBottom>
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
                    <Space size="large">
                      {cartList.length === 0 ? (
                        <FontAwesomeIcon icon={faCartShopping} />
                      ) : (
                        <Badge count={cartList.length} size="small">
                          <FontAwesomeIcon icon={faCartShopping} />
                        </Badge>
                      )}
                    </Space>
                  </S.Icon>
                  {/* <FontAwesomeIcon icon={faUser} /> */}
                  {renderUserInfo}
                </S.UserIcon>
              </S.UserBar>
            </S.HeadBottom>
          </Col>
          <Col xl={1} lg={1} xs={1}></Col>
        </Row>
        <S.NavLinkContainer>
          <S.HeadTop>
            <S.TopNav>
              {NAVBAR.map((item) => {
                return (
                  <Link
                    key={item.url}
                    to={item.url}
                    style={{ textDecoration: 'none' }}
                  >
                    <S.RouteLink onClick={() => navigate(item.url)}>
                      {item.content}
                    </S.RouteLink>
                  </Link>
                );
              })}
            </S.TopNav>
          </S.HeadTop>

          <S.HeadTopHamburgerNavbar>
            <Popover placement="top" content={content} trigger="click">
              <MenuOutlined style={{ fontSize: 32, cursor: 'pointer' }} />
            </Popover>
          </S.HeadTopHamburgerNavbar>
        </S.NavLinkContainer>
      </S.HeaderWrapper>
    </>
  );
}

export default AdminHeader;
