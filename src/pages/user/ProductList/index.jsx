import React, { useEffect, useMemo, useState } from 'react';
import {
  Card,
  Row,
  Col,
  Checkbox,
  Input,
  Select,
  Button,
  Rate,
  notification,
  Space,
  Modal,
  Avatar,
  Breadcrumb,
  Skeleton,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, generatePath, useNavigate } from 'react-router-dom';
import qs from 'qs';

import { PRODUCT_LIMIT } from 'constants/paging';
import { getProductListRequest } from 'redux/slicers/product.slice';
import { getCategoryListRequest } from 'redux/slicers/category.slice';
import TopIcon from '../components/TopIcon';
import { ROUTES } from 'constants/routes';
import { formatMoney } from 'helper';
import { clearFilterParams, setFilterParams } from 'redux/slicers/common.slice';
import loadingSpin from 'assets/gif/loading-spin.gif';
import {
  CommentOutlined,
  HeartFilled,
  HeartOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { addToCartRequest } from 'redux/slicers/cart.slice';
import {
  favoriteProductRequest,
  getFavoriteListRequest,
  unFavoriteProductRequest,
} from 'redux/slicers/favorite.slice';
import {
  getReviewListRequest,
  clearReviewListRequest,
} from 'redux/slicers/review.slice';
import moment from 'moment';

import T from 'components/Typography';
import * as S from './styles';

const { Meta } = Card;

function ProductListPage() {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.product);
  const { categoriesList } = useSelector((state) => state.category);
  const { filterParams } = useSelector((state) => state.common);
  const { userInfo } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();
  const { reviewList } = useSelector((state) => state.review);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
    dispatch(getCategoryListRequest());
    dispatch(
      getProductListRequest({
        ...filterParams,
        page: 1,
        limit: PRODUCT_LIMIT,
      })
    );

    return () => dispatch(clearFilterParams());
  }, []);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
    dispatch(
      getProductListRequest({
        ...filterParams,
        page: 1,
        limit: PRODUCT_LIMIT,
      })
    );
    if (userInfo.data.id)
      dispatch(getFavoriteListRequest({ userId: userInfo.data.id }));
  }, [filterParams, userInfo.data.id]);

  const handleFilter = (key, values) => {
    const newFilterParams = {
      ...filterParams,
      [key]: values,
    };
    dispatch(setFilterParams(newFilterParams));
    dispatch(
      getProductListRequest({
        ...filterParams,
        [key]: values,
        page: 1,
        limit: PRODUCT_LIMIT,
      })
    );
    navigate({
      pathname: ROUTES.USER.PRODUCT_LIST,
      search: qs.stringify(newFilterParams),
    });
  };

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

  const handleLike = (e, item) => {
    e.preventDefault();

    // if (accessToken) {
    //   if (
    //     item.favorites.some(
    //       (item) => parseInt(item.userId) === parseInt(userInfo.data?.id)
    //     )
    //   ) {
    //     const favoriteData = item.favorites.find(
    //       (itemFavorite) => itemFavorite.userId === userInfo.data?.id
    //     );
    //     dispatch(
    //       unFavoriteProductRequest({
    //         id: favoriteData.id,
    //       })
    //     );
    //   } else {
    //     console.log('favorite');
    //     dispatch(
    //       favoriteProductRequest({
    //         productId: item.id,
    //         userId: userInfo.data.id,
    //       })
    //     );
    //   }
    // } else {
    //   notification.error({ message: 'Quý khách cần đăng nhập để like' });
    // }
  };

  const handleComment = (e, item) => {
    e.preventDefault();
    dispatch(getReviewListRequest({ productId: parseInt(item.id) }));
    showModal();
  };

  const renderProductList = useMemo(() => {
    if (loading === true) {
      return (
        <S.LoadingWrapper>
          {/* <img src={loadingSpin} width={300} alt="loading" /> */}
          <Skeleton active loading={loading} paragraph={{ rows: 7 }} />
        </S.LoadingWrapper>
      );
    } else if (productList.data.length === 0) {
      return (
        <S.NoData>
          <h1>Xin lỗi quý khách hiện nay chưa có hàng!!!</h1>
        </S.NoData>
      );
    } else {
      return productList.data.map((item) => {
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
                  <Space onClick={(e) => handleLike(e, item)}>
                    <Button
                      type="link"
                      danger
                      icon={
                        item.favorites.some(
                          (item) =>
                            parseInt(item.userId) ===
                            parseInt(userInfo.data?.id)
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
    }
  }, [productList.data, loading, userInfo.data.id]);

  const handleShowMore = () => {
    dispatch(
      getProductListRequest({
        ...filterParams,
        page: productList.meta.page + 1,
        limit: PRODUCT_LIMIT,
        more: true,
      })
    );
  };

  const renderCategoryList = useMemo(() => {
    return categoriesList.data.map((item) => {
      return (
        <Col key={item.id} span={24}>
          <Checkbox value={item.id}>
            {item.name} {`(${item.products.length})`}
          </Checkbox>
        </Col>
      );
    });
  }, [categoriesList.data]);

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
    <S.ProductListWrapper>
      <Row gutter={16}>
        <Col span={24}>
          <S.TopIcons>
            <Breadcrumb
              items={[
                {
                  title: (
                    <Link to={ROUTES.USER.HOME}>
                      <Space>
                        <HomeOutlined />
                        <span>Trang chủ</span>
                      </Space>
                    </Link>
                  ),
                },
                {
                  title: 'Danh sách sản phẩm',
                },
              ]}
            />
          </S.TopIcons>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col lg={6} xs={24}>
          <Card title="Sản phẩm" size="small">
            <Checkbox.Group
              onChange={(values) => handleFilter('categoryId', values)}
              value={filterParams.categoryId}
            >
              <Row>{renderCategoryList}</Row>
            </Checkbox.Group>

            <Input
              onChange={(e) => handleFilter('keyword', e.target.value)}
              placeholder="Search..."
              style={{ width: '100%', margin: '5px 0 5px 0' }}
              value={filterParams.keyword}
            />

            <Select
              onChange={(value) => handleFilter('sort', value)}
              placeholder="sắp xếp theo giá"
              style={{ width: '100%' }}
              value={filterParams.sort}
            >
              {/* 
                <Select.Option value="name.asc">A-Z</Select.Option>
                <Select.Option value="name.desc">Z-A</Select.Option>
              */}
              <Select.Option value="price.asc">Giá tăng dần</Select.Option>
              <Select.Option value="price.desc">Giá giảm dần</Select.Option>
            </Select>
          </Card>
        </Col>

        <Col lg={18} xs={24}>
          {productList.data.length !== 0 && (
            <Row>
              <S.ShowListLength>
                <h4>{`Hiển thị 1 - ${productList.data.length} của ${productList.meta.total} sản phẩm`}</h4>
              </S.ShowListLength>
            </Row>
          )}

          <Row>{renderProductList}</Row>
          {productList.data.length !== productList.meta.total && (
            <Row justify="center" style={{ marginTop: '10px' }}>
              <Button type="primary" onClick={() => handleShowMore()}>
                Xem thêm
              </Button>
            </Row>
          )}
        </Col>
      </Row>
      {renderReviewModal}
    </S.ProductListWrapper>
  );
}

export default ProductListPage;
