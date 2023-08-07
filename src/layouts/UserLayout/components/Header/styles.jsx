import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  padding-top: 5px;
  padding: 0 16px;
  width: 100%;
  min-height: 160px;
  background-color: #e6e6e6;
  z-index: 99;
`;

export const NavLinkContainer = styled.nav`
  display: flex;
  flex-direction: column;

  height: 8vh;
  width: 100vw;
`;

export const HeadTop = styled.div`
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 900px) {
    display: none;
  }
`;
export const HeadTopHamburgerNavbar = styled.div`
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 900px) {
    display: none;
  }
`;

export const Logo = styled.div`
  cursor: pointer;
  height: 100%;
`;

export const LogoImg = styled.img`
  height: 100px;
  height: 100px;
`;

export const TopNav = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const RouteLink = styled.div`
  height: 40px;
  width: 120px;
  cursor: pointer;
  text-transform: uppercase;
  text-decoration: none;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 0.3rem;

  color: red;
  align-items: center;

  &:hover {
    background-color: rgb(215, 211, 211);
  }
`;

export const HeadBottom = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  height: 100%;
`;

export const UserBar = styled.div`
  display: flex;
  align-items: center;
`;

export const LoginLogoutBar = styled.div`
  margin-right: 4vw;
`;

export const Log = styled.span`
  text-decoration: none;
  color: #151515;
  cursor: pointer;
`;

export const UserIcon = styled.div`
  display: flex;
  justify-content: space-around;
  width: 80px;
`;

export const Icon = styled.a`
  cursor: pointer;
  color: black;
`;

export const Channel = styled.a`
  color: black;

  &:hover {
    color: black;
  }
`;
