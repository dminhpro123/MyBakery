import {
  Avatar,
  Button,
  Card,
  Col,
  List,
  Modal,
  Rate,
  Row,
  Skeleton,
  Space,
  notification,
} from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Slider from 'react-slick';
import { useDispatch, useSelector } from 'react-redux';
import { Link, generatePath, useNavigate } from 'react-router-dom';
import {
  CommentOutlined,
  HeartFilled,
  HeartOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import qs from 'qs';

import { getAdvertisementListRequest } from 'redux/slicers/advertisement.slice';
import {
  getNewProductListRequest,
  getOutstandingProductListRequest,
} from 'redux/slicers/product.slice';
import { addToCartRequest } from 'redux/slicers/cart.slice';
import { setFilterParams } from 'redux/slicers/common.slice';
import { ROUTES } from 'constants/routes';
import { formatMoney } from 'helper';
import {
  clearReviewListRequest,
  getReviewListRequest,
} from 'redux/slicers/review.slice';

import * as S from './styles';
import T from 'components/Typography';

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
  responsive: [
    {
      breakpoint: 1424,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

function HomePage() {
  const dispatch = useDispatch();
  const { advertisementList } = useSelector((state) => state.advertisement);
  const { outstandingProductList, newProductList } = useSelector(
    (state) => state.product
  );
  const { filterParams } = useSelector((state) => state.common);
  const { categoriesList } = useSelector((state) => state.category);
  const [loading, setLoading] = useState(false);
  const { reviewList } = useSelector((state) => state.review);
  const { userInfo } = useSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
    dispatch(getAdvertisementListRequest());
    dispatch(getOutstandingProductListRequest());
    dispatch(getNewProductListRequest());
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    dispatch(clearReviewListRequest());
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    dispatch(clearReviewListRequest());
  };

  const handleAddToCart = useCallback((e, item) => {
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
  }, []);

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
              cover={<img alt={item.name} src={item.images} height={249.4} />}
              actions={[
                <Space onClick={(e) => handleLike(e, item)}>
                  <Button
                    type="link"
                    danger
                    icon={
                      item.favorites.some(
                        (item) =>
                          parseInt(item.userId) === parseInt(userInfo.data?.id)
                      ) ? (
                        <HeartFilled />
                      ) : (
                        <HeartOutlined />
                      )
                    }
                    key="favorite"
                  ></Button>
                  <span>{item.favorites.length}</span>
                </Space>,
                <Space onClick={(e) => handleComment(e, item)}>
                  <CommentOutlined key="review" />
                  <span>{item.reviews.length}</span>
                </Space>,
              ]}
            >
              <Row gutter={5}>
                <Col span={18}>
                  <T.Title
                    size="lg"
                    truncateMultiLine={1}
                    style={{ height: 27 }}
                  >
                    {item.name}
                  </T.Title>
                </Col>
                <Col span={6}>
                  <Button
                    type="primary"
                    ghost
                    onClick={(e) => handleAddToCart(e, item)}
                  >
                    <ShoppingCartOutlined />
                  </Button>
                </Col>
              </Row>
              <Space align="baseline">
                <Rate
                  value={averageRate}
                  allowHalf
                  disabled
                  style={{ fontSize: 12 }}
                />
                <T.Text size="md">
                  {`${
                    averageRate !== 0 ? `(${averageRate})` : 'chưa đánh giá'
                  } `}
                </T.Text>
              </Space>
              <T.Text size="lg" style={{ marginTop: 5 }}>
                {formatMoney(item.price)}
              </T.Text>
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
              cover={<img alt={item.name} src={item.images} height={249.4} />}
              actions={[
                <Space onClick={(e) => handleLike(e, item)}>
                  <Button
                    type="link"
                    danger
                    icon={
                      item.favorites.some(
                        (item) =>
                          parseInt(item.userId) === parseInt(userInfo.data?.id)
                      ) ? (
                        <HeartFilled />
                      ) : (
                        <HeartOutlined />
                      )
                    }
                    key="favorite"
                  ></Button>
                  <span>{item.favorites.length}</span>
                </Space>,
                <Space onClick={(e) => handleComment(e, item)}>
                  <CommentOutlined key="review" />
                  <span>{item.reviews.length}</span>
                </Space>,
              ]}
            >
              <Row gutter={5}>
                <Col span={18}>
                  <T.Title
                    size="lg"
                    truncateMultiLine={1}
                    style={{ height: 27 }}
                  >
                    {item.name}
                  </T.Title>
                </Col>
                <Col span={6}>
                  <Button
                    type="primary"
                    ghost
                    onClick={(e) => handleAddToCart(e, item)}
                  >
                    <ShoppingCartOutlined />
                  </Button>
                </Col>
              </Row>
              <Space align="baseline">
                <Rate
                  value={averageRate}
                  allowHalf
                  disabled
                  style={{ fontSize: 12 }}
                />
                <T.Text size="md">
                  {`${
                    averageRate !== 0 ? `(${averageRate})` : 'chưa đánh giá'
                  } `}
                </T.Text>
              </Space>
              <T.Text size="lg" style={{ marginTop: 5 }}>
                {formatMoney(item.price)}
              </T.Text>
            </Card>
          </Link>
        </S.ItemOfList>
      );
    });
  }, [newProductList.data, handleAddToCart]);

  const renderAdvertisementSlide = useMemo(() => {
    if (!advertisementList) return null;
    return advertisementList.data.map((item) => {
      return (
        <div key={item.id} style={{ height: '400px' }}>
          <S.AdvertisementSlide>
            <S.AdvertisementImage src={item.image} alt="" />
          </S.AdvertisementSlide>
        </div>
      );
    });
  }, [advertisementList]);

  const handleLike = (e, item) => {
    e.preventDefault();
  };

  const handleComment = (e, item) => {
    e.preventDefault();
    dispatch(getReviewListRequest({ productId: parseInt(item.id) }));
    showModal();
  };

  const renderReviewModal = useMemo(() => {
    return (
      <Modal
        title="Bình luận"
        open={isModalOpen}
        onOk={handleOk}
        okText="Đã xem"
        onCancel={handleCancel}
      >
        {reviewList.data.length === 0 ? (
          <S.ReviewListWrapper>Không có bình luận</S.ReviewListWrapper>
        ) : (
          reviewList.data.map((item) => {
            return (
              <S.ReviewListWrapper key={item.id}>
                <br />
                <Space align="baseline">
                  <Avatar
                    size={24}
                    icon={
                      item.user.avatar ? (
                        <img src={item.user.avatar} alt="Ảnh đại diện" />
                      ) : (
                        <UserOutlined />
                      )
                    }
                  />
                  <h3>{item.user.fullName}</h3>
                  {/* <span>{moment(item.createAt).format('DD/MM/YYYY HH:mm')}</span> */}
                  <span>{moment(item.createdAt).fromNow()}</span>
                </Space>

                <div>
                  <Rate value={item.rate} disabled style={{ fontSize: 12 }} />
                </div>
                <strong>Bình luận:</strong>
                <p>{item.comment}</p>
              </S.ReviewListWrapper>
            );
          })
        )}
      </Modal>
    );
  }, [isModalOpen, reviewList.data]);

  return (
    <S.HomeWrapper>
      {loading ? (
        <Skeleton active loading={loading} paragraph={{ rows: 20 }} />
      ) : (
        <>
          <Row>
            <Col span={24}>
              <Slider {...advertisementSettings}>
                {renderAdvertisementSlide}
              </Slider>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={1} />
            <Col span={22}>
              <S.ItemCategoryList>
                {
                  <List
                    grid={{
                      gutter: 16,
                      sm: 1,
                      md: 2,
                      lg: 3,
                      xl: 3,
                      xxl: 3,
                    }}
                    title="Sản phẩm"
                    dataSource={categoriesList.data}
                    renderItem={(item) => (
                      <List.Item
                        key={item.id}
                        onClick={() => {
                          dispatch(
                            setFilterParams({
                              ...filterParams,
                              categoryId: [item.id],
                            })
                          );
                        }}
                      >
                        <Link
                          to={{
                            pathname: ROUTES.USER.PRODUCT_LIST,
                            search: qs.stringify({
                              ...filterParams,
                              categoryId: [item.id],
                            }),
                          }}
                        >
                          <S.CategoryContainer>
                            <S.ImgCategory alt={item.name} src={item.images} />
                            <S.TextCategoryContainer>
                              <strong> {item.name.toUpperCase()}</strong>
                            </S.TextCategoryContainer>
                          </S.CategoryContainer>
                        </Link>
                      </List.Item>
                    )}
                  />
                }
              </S.ItemCategoryList>
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
        </>
      )}
      {renderReviewModal}
    </S.HomeWrapper>
  );
}

export default HomePage;
