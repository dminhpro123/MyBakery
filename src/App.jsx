import { Routes, Route } from 'react-router-dom';
import { ROUTES } from 'constants/routes';

// import '../node_modules/slick-carousel/slick/slick.css';
// import '../node_modulesslick-carousel/slick/slick-theme.css';

import UserLayout from 'layouts/UserLayout';
import HomePage from 'pages/user/Home';
import ProductListPage from 'pages/user/ProductList';
import AboutUs from 'pages/user/AboutUs';
import News from 'pages/user/News';
import Contact from 'pages/user/Contact';
import EventPage from 'pages/user/EventsPage';
import Register from 'pages/Register';
import Login from 'pages/Login';
import Cart from 'pages/user/Cart';
import PersonalInformation from 'pages/user/PersonalInformation';
import ProductDetail from 'pages/user/ProductDetail';
import Page404NotFound from 'pages/Page404NotFound';

function App() {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path={ROUTES.USER.HOME} element={<HomePage />} />
        <Route path={ROUTES.USER.PRODUCT_LIST} element={<ProductListPage />} />
        <Route path={ROUTES.USER.ABOUT_US} element={<AboutUs />} />
        <Route path={ROUTES.USER.NEWS} element={<News />} />
        <Route path={ROUTES.USER.CONTACT} element={<Contact />} />
        <Route path={ROUTES.USER.EVENTS} element={<EventPage />} />
        <Route path={ROUTES.USER.REGISTER} element={<Register />} />
        <Route path={ROUTES.USER.LOGIN} element={<Login />} />
        <Route path={ROUTES.USER.CART} element={<Cart />} />
        <Route path={ROUTES.USER.PRODUCT_DETAIL} element={<ProductDetail />} />

        <Route
          path={ROUTES.USER.PERSONAL_INFOR}
          element={<PersonalInformation />}
        />
      </Route>
      <Route path="*" element={<Page404NotFound />} />
    </Routes>
  );
}

export default App;
