import { Link } from "react-router-dom";
import { Dropdown, Space, Badge, Popover, Row, Col, Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FacebookFilled, MenuOutlined, YoutubeFilled } from "@ant-design/icons";

import { ROUTES } from "constants/routes";
import { NAVBAR } from "constants/userNavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { logoutUser } from "redux/slicers/auth.slice";
import logo from "assets/images/logo.jpg";

import * as S from "./styles";

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
        key: "1",
        label: userInfo.data.id ? (
          <S.Icon
            style={{ textDecoration: "none" }}
            to={ROUTES.USER.PERSONAL_INFOR}
          >
            Thông tin cá nhân
          </S.Icon>
        ) : (
          <S.Icon style={{ textDecoration: "none" }} to={ROUTES.REGISTER}>
            Đăng ký
          </S.Icon>
        ),
      },
      {
        key: "2",
        label: userInfo.data.id ? (
          <S.Icon onClick={() => dispatch(logoutUser())}>Đăng xuất</S.Icon>
        ) : (
          <S.Icon style={{ textDecoration: "none" }} to={ROUTES.LOGIN}>
            Đăng nhập
          </S.Icon>
        ),
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
      <Link key={item.url} to={item.url} style={{ textDecoration: "none" }}>
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
            <FacebookFilled style={{ fontSize: 30 }} />
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
        <Row gutter={[16, 16]} style={{ padding: "8px 0" }}>
          <Col xl={6} lg={6} md={4} sm={4} xs={1}></Col>
          <Col xl={4} lg={4} md={6} sm={6} xs={8}>
            <S.HeadTop>{renderChannel}</S.HeadTop>
          </Col>
          <Col
            xl={4}
            lg={4}
            md={4}
            sm={4}
            xs={6}
            style={{ textAlign: "center" }}
          >
            <S.Logo href={ROUTES.USER.HOME}>
              <S.LogoImg src={logo} alt="logo" />
            </S.Logo>
          </Col>
          <Col xl={6} lg={9} md={3} sm={4} xs={8}>
            <S.HeadTop>
              <S.UserBar>
                <S.UserIcon>
                  <S.Icon to={ROUTES.USER.CART}>
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
              {userInfo.data.fullName && `${userInfo.data.fullName}`}
            </S.HeadTop>
          </Col>
          <Col xl={4} lg={1} md={7} sm={6} xs={1}></Col>
        </Row>
        <S.NavLinkContainer>
          <S.HeadBottom>
            <S.TopNav>
              {NAVBAR.map((item) => {
                return (
                  <Link
                    key={item.url}
                    to={item.url}
                    style={{ textDecoration: "none" }}
                  >
                    <S.RouteLink onClick={() => navigate(item.url)}>
                      {item.content}
                    </S.RouteLink>
                  </Link>
                );
              })}
            </S.TopNav>
          </S.HeadBottom>

          <S.HeadTopHamburgerNavbar>
            <Popover placement="top" content={content} trigger="click">
              <MenuOutlined style={{ fontSize: 32, cursor: "pointer" }} />
            </Popover>
          </S.HeadTopHamburgerNavbar>
        </S.NavLinkContainer>
      </S.HeaderWrapper>
    </>
  );
}

export default AdminHeader;
