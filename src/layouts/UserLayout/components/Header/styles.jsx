import styled from 'styled-components';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Card } from 'antd';

// const searchBackgroundImg =
//   "data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E";

export const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  justify-content: space-between;

  padding: 0 16px;
  width: 100%;
  height: 15vh;
  min-height: 56px;
  background-color: #e6e6e6;
  z-index: 99;
`;

export const NavLinkContainer = styled.nav`
  display: flex;
  flex-direction: column;

  height: 8vh;
  width: 100vw;
  font-size: calc(0.3rem + 2vmin);
`;

export const HeadTop = styled.div`
  height: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled.div`
  cursor: pointer;
  height: 100%;
`;

export const LogoImg = styled.img`
  height: 100%;
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

  margin-top: 0.5px;
  margin-bottom: 10px;
`;

export const SearchInput = styled.input`
  min-width: 270px;
  max-width: 400px;
  width: 100%;
  padding: 12px 24px;

  background-color: transparent;
  transition: transform 250ms ease-in-out;
  font-size: 14px;
  line-height: 18px;

  color: #575756;
  background-color: transparent;
  background-image: url(${faMagnifyingGlass});
  background-repeat: no-repeat;
  background-size: 18px 18px;
  background-position: 95% center;

  border-radius: 50px;
  border: 1px solid #575756;
  transition: all 250ms ease-in-out;
  backface-visibility: hidden;
  transform-style: preserve-3d;

  &::placeholder {
    color: color(#575756 a(0.8));
    text-transform: uppercase;
    letter-spacing: 1.5px;
  }

  &:hover,
  &:focus {
    padding: 12px 0;
    outline: 0;
    border: 1px solid transparent;
    border-bottom: 1px solid #575756;
    border-radius: 0;
    background-position: 100% center;
  }
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
`;
