import { Button, Card, Col, Rate, Row, Space, notification } from 'antd';
import React, { useEffect, useMemo } from 'react';
import Slider from 'react-slick';
import { useDispatch, useSelector } from 'react-redux';
import { Link, generatePath } from 'react-router-dom';

import { getAdvertismentListRequest } from 'redux/slicers/advertisment.slice';
import {
  getNewProductListRequest,
  getOutstandingProductListRequest,
} from 'redux/slicers/product.slice';
import { ROUTES } from 'constants/routes';
import { formatMoney } from 'helper';

import * as S from './styles';
import {
  CommentOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { addToCartRequest } from 'redux/slicers/cart.slice';

const { Meta } = Card;

const advertisementSettings = {
  infinite: true,
  speed: 3000,
  autoplay: true,
  autoplaySpeed: 2000,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
};

const someProductListSettings = {
  infinite: true,
  speed: 3000,
  autoplay: true,
  autoplaySpeed: 2000,
  slidesToShow: 5,
  slidesToScroll: 1,
  arrows: false,
};

function HomePage() {
  const dispatch = useDispatch();
  const { advertismentList } = useSelector((state) => state.advertisment);
  const { outstandingProductList, newProductList } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getAdvertismentListRequest());
    dispatch(getOutstandingProductListRequest());
    dispatch(getNewProductListRequest());
  }, []);

  const handleAddToCart = (e, item) => {
    e.preventDefault();
    dispatch(
      addToCartRequest({
        data: {
          productId: item.id,
          images: item.images,
          name: item.name,
          price: item.price,
          quantity: 1,
        },
      })
    );
    // console.log(item);
    notification.success({ message: 'Bỏ vào giỏ thành công' });
  };

  const renderOutstandingProductListSlide = useMemo(() => {
    if (!outstandingProductList.data) return null;
    return outstandingProductList.data.map((item) => {
      const averageRate = item.reviews.length
        ? (
            item.reviews.reduce((total, item) => total + item.rate, 0) /
            item.reviews.length
          ).toFixed(1)
        : 0;
      return (
        <S.ItemOfList key={item.id}>
          <Link
            to={generatePath(ROUTES.USER.PRODUCT_DETAIL, {
              productSlug: `${item.id}-${item.name.toLowerCase()}`,
            })}
          >
            <Card
              style={{
                width: 250,
                overflow: 'hidden',
              }}
              cover={<img alt={item.name} src={item.images} />}
              actions={[
                <Space>
                  <HeartOutlined key="favorite" />
                  <span>{item.favorites.length}</span>
                </Space>,
                <Space>
                  <CommentOutlined key="review" />
                  <span>{item.reviews.length}</span>
                </Space>,
              ]}
            >
              <Row>
                <Col span={18}>
                  <Meta
                    title={item.name}
                    description={formatMoney(item.price)}
                  />
                </Col>
                <Col span={6}>
                  <Meta
                    title={
                      <Button
                        type="primary"
                        ghost
                        id={`cart_${item.id}`}
                        onClick={(e) => handleAddToCart(e, item)}
                      >
                        <ShoppingCartOutlined />
                      </Button>
                    }
                  />
                </Col>
              </Row>
              <Meta
                title={
                  <Rate
                    value={averageRate}
                    allowHalf
                    disabled
                    style={{ fontSize: 12 }}
                  />
                }
                description={`${
                  averageRate !== 0 ? `(${averageRate})` : 'chưa đánh giá'
                } `}
                style={{ marginTop: 10 }}
              />
            </Card>
          </Link>
        </S.ItemOfList>
      );
    });
  }, [outstandingProductList.data]);

  const renderNewProductListSlide = useMemo(() => {
    if (!newProductList.data) return null;
    return newProductList.data.map((item) => {
      const averageRate = item.reviews.length
        ? (
            item.reviews.reduce((total, item) => total + item.rate, 0) /
            item.reviews.length
          ).toFixed(1)
        : 0;
      return (
        <S.ItemOfList key={item.id}>
          <Link
            to={generatePath(ROUTES.USER.PRODUCT_DETAIL, {
              productSlug: `${item.id}-${item.name.toLowerCase()}`,
            })}
          >
            <Card
              style={{
                width: 250,
                overflow: 'hidden',
              }}
              cover={<img alt={item.name} src={item.images} />}
              actions={[
                <Space>
                  <HeartOutlined key="favorite" />
                  <span>{item.favorites.length}</span>
                </Space>,
                <Space>
                  <CommentOutlined key="review" />
                  <span>{item.reviews.length}</span>
                </Space>,
              ]}
            >
              <Row>
                <Col span={18}>
                  <Meta
                    title={item.name}
                    description={formatMoney(item.price)}
                  />
                </Col>
                <Col span={6}>
                  <Meta
                    title={
                      <Button
                        type="primary"
                        ghost
                        id={`cart_${item.id}`}
                        onClick={(e) => handleAddToCart(e, item)}
                      >
                        <ShoppingCartOutlined />
                      </Button>
                    }
                  />
                </Col>
              </Row>
              <Meta
                title={
                  <Rate
                    value={averageRate}
                    allowHalf
                    disabled
                    style={{ fontSize: 12 }}
                  />
                }
                description={`${
                  averageRate !== 0 ? `(${averageRate})` : 'chưa đánh giá'
                } `}
                style={{ marginTop: 10 }}
              />
            </Card>
          </Link>
        </S.ItemOfList>
      );
    });
  }, [newProductList.data, handleAddToCart]);

  const renderAdvertisementSlide = useMemo(() => {
    if (!advertismentList) return null;
    return advertismentList.data.map((item) => {
      return (
        <div key={item.id} style={{ height: '400px' }}>
          <S.AdvertisementSlide>
            <S.AdvertisementImage src={item.image} alt="" />
          </S.AdvertisementSlide>
        </div>
      );
    });
  }, [advertismentList]);

  return (
    <S.HomeWrapper>
      <Slider {...advertisementSettings}>{renderAdvertisementSlide}</Slider>
      <Row gutter={[16, 16]}>
        <Col span={1} />
        <Col span={22}>
          <S.SomeProductListWrapper>
            <h2>Sản phẩm nổi bật</h2>
            <Slider {...someProductListSettings}>
              {renderOutstandingProductListSlide}
            </Slider>
          </S.SomeProductListWrapper>
          <S.SomeProductListWrapper>
            <h2>Sản phẩm mới</h2>
            <Slider {...someProductListSettings}>
              {renderNewProductListSlide}
            </Slider>
          </S.SomeProductListWrapper>
        </Col>
        <Col span={1} />
      </Row>
      {}
    </S.HomeWrapper>
  );
}

export default HomePage;
