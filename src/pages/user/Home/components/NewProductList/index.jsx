import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Avatar,
  Button,
  Card,
  Col,
  Modal,
  Rate,
  Row,
  Space,
  notification,
} from 'antd';
import { Link, generatePath } from 'react-router-dom';
import {
  CommentOutlined,
  HeartFilled,
  HeartOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import Slider from 'react-slick';
import moment from 'moment';

import { getNewProductListRequest } from 'redux/slicers/product.slice';
import {
  clearReviewListRequest,
  getReviewListRequest,
} from 'redux/slicers/review.slice';
import { addToCartRequest } from 'redux/slicers/cart.slice';
import { ROUTES } from 'constants/routes';
import { formatMoney } from 'helper';

import T from 'components/Typography';
import * as S from './style';

const productListSettings = {
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

const NewProductList = () => {
  const dispatch = useDispatch();
  const { newProductList } = useSelector((state) => state.product);
  const { reviewList } = useSelector((state) => state.review);
  const { userInfo } = useSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
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
                <Col span={6} style={{ textAlign: 'right' }}>
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
                <T.Text size="md" truncateMultiLine={1}>
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
    <>
      <Slider {...productListSettings}>{renderNewProductListSlide}</Slider>
      {renderReviewModal}
    </>
  );
};

export default NewProductList;
