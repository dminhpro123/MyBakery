import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfoRequest } from 'redux/slicers/auth.slice';
import jwtDecode from 'jwt-decode';
import { ThemeProvider } from 'styled-components';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { ROUTES } from 'constants/routes';

import UserLayout from 'layouts/UserLayout';
import HomePage from 'pages/user/Home';
import ProductListPage from 'pages/user/ProductList';
import AboutUs from 'pages/user/AboutUs';
import News from 'pages/user/News';
import Contact from 'pages/user/Contact';
import Cart from 'pages/user/Cart';
import PersonalInformation from 'pages/user/PersonalInformation';
import ProductDetail from 'pages/user/ProductDetail';
import Checkout from 'pages/user/Checkout';

import AdminLayout from 'layouts/AdminLayout';
import Dashboard from 'pages/admin/Dashboard';

import Page404NotFound from 'pages/Page404NotFound';
import Register from 'pages/Register';
import Login from 'pages/Login';

import {
  breakpoint,
  colors,
  fontSizes,
  fontWeights,
  fontFamily,
  borderRadius,
  boxShadow,
  container,
  truncateMultipleLine,
} from 'themes/common';

function App() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  // const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const userData = jwtDecode(accessToken);
      dispatch(getUserInfoRequest({ id: parseInt(userData.sub) }));
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <ThemeProvider
      theme={{
        breakpoint,
        colors: {
          ...colors,
        },
        fontSizes,
        fontWeights,
        fontFamily,
        borderRadius,
        boxShadow,
        container,
        truncateMultipleLine,
      }}
    >
      <Routes>
        <Route element={<UserLayout />}>
          <Route path={ROUTES.USER.HOME} element={<HomePage />} />
          <Route
            path={ROUTES.USER.PRODUCT_LIST}
            element={<ProductListPage />}
          />
          <Route path={ROUTES.USER.ABOUT_US} element={<AboutUs />} />
          <Route path={ROUTES.USER.NEWS} element={<News />} />
          <Route path={ROUTES.USER.CONTACT} element={<Contact />} />
          <Route path={ROUTES.USER.CART} element={<Cart />} />
          <Route
            path={ROUTES.USER.PRODUCT_DETAIL}
            element={<ProductDetail />}
          />
          <Route path={ROUTES.USER.CHECKOUT} element={<Checkout />} />
          <Route
            path={ROUTES.USER.PERSONAL_INFOR}
            element={<PersonalInformation />}
          />
          <Route path={ROUTES.USER.REGISTER} element={<Register />} />
          <Route path={ROUTES.USER.LOGIN} element={<Login />} />
        </Route>

        <Route element={<AdminLayout />}>
          <Route path={ROUTES.ADMIN.DASHBOARD} element={<Dashboard />} />
        </Route>

        <Route path="*" element={<Page404NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
