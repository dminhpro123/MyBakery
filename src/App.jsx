import { Routes, Route, useLocation } from 'react-router-dom';
import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfoRequest } from 'redux/slicers/auth.slice';
import jwtDecode from 'jwt-decode';
import { ThemeProvider } from 'styled-components';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { ROUTES } from 'constants/routes';

// import AdminLayout from 'layouts/AdminLayout';
// import Dashboard from 'pages/admin/Dashboard';

// import Page404NotFound from 'pages/Page404NotFound';
// import Register from 'pages/Register';
// import Login from 'pages/Login';

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

const UserLayout = React.lazy(() => import('layouts/UserLayout'));
const HomePage = React.lazy(() => import('pages/user/Home'));
const ProductListPage = React.lazy(() => import('pages/user/ProductList'));
const AboutUs = React.lazy(() => import('pages/user/AboutUs'));
const News = React.lazy(() => import('pages/user/News'));
const Contact = React.lazy(() => import('pages/user/Contact'));
const Cart = React.lazy(() => import('pages/user/Cart'));
const PersonalInformation = React.lazy(() =>
  import('pages/user/PersonalInformation')
);
const ProductDetail = React.lazy(() => import('pages/user/ProductDetail'));
const Checkout = React.lazy(() => import('pages/user/Checkout'));

const AdminLayout = React.lazy(() => import('layouts/AdminLayout'));
const Dashboard = React.lazy(() => import('pages/admin/Dashboard'));

const Page404NotFound = React.lazy(() => import('pages/Page404NotFound'));
const Register = React.lazy(() => import('pages/Register'));
const Login = React.lazy(() => import('pages/Login'));

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
        <Route
          element={
            <Suspense>
              <UserLayout />
            </Suspense>
          }
        >
          <Route
            path={ROUTES.USER.HOME}
            element={
              <Suspense>
                <HomePage />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.USER.PRODUCT_LIST}
            element={
              <Suspense>
                <ProductListPage />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.USER.ABOUT_US}
            element={
              <Suspense>
                <AboutUs />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.USER.NEWS}
            element={
              <Suspense>
                <News />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.USER.CONTACT}
            element={
              <Suspense>
                <Contact />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.USER.CART}
            element={
              <Suspense>
                <Cart />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.USER.PRODUCT_DETAIL}
            element={
              <Suspense>
                <ProductDetail />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.USER.CHECKOUT}
            element={
              <Suspense>
                <Checkout />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.USER.PERSONAL_INFOR}
            element={
              <Suspense>
                <PersonalInformation />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.USER.REGISTER}
            element={
              <Suspense>
                <Register />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.USER.LOGIN}
            element={
              <Suspense>
                <Login />
              </Suspense>
            }
          />
        </Route>

        <Route
          element={
            <Suspense>
              <AdminLayout />
            </Suspense>
          }
        >
          <Route
            path={ROUTES.ADMIN.DASHBOARD}
            element={
              <Suspense>
                <Dashboard />
              </Suspense>
            }
          />
        </Route>

        <Route
          path="*"
          element={
            <Suspense>
              <Page404NotFound />
            </Suspense>
          }
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
