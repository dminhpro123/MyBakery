import {
  Button,
  Col,
  InputNumber,
  Rate,
  Row,
  Space,
  Tabs,
  notification,
} from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getProductDetailRequest } from 'redux/slicers/product.slice';

import T from 'components/Typography';
import * as S from './style';
import {
  HeartFilled,
  HeartOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import {
  favoriteProductRequest,
  unFavoriteProductRequest,
} from 'redux/slicers/favorite.slice';
import Review from '../Review';
import { addToCartRequest } from 'redux/slicers/cart.slice';
import { formatMoney } from 'helper';

const Detail = () => {
  const dispatch = useDispatch();
  const { productDetail } = useSelector((state) => state.product);
  const { reviewList } = useSelector((state) => state.review);
  const { userInfo } = useSelector((state) => state.auth);
  const [quantity, setQuantity] = useState(1);
  const { productSlug } = useParams();
  const [id, name] = productSlug.split('-');

  const productRate = useMemo(
    () =>
      reviewList.data.reduce((total, item) => total + item.rate, 0) /
        reviewList.data.length || 0,
    [reviewList.data]
  );

  useEffect(() => {
    dispatch(getProductDetailRequest({ id: parseInt(id) }));
  }, []);

  const isFavorite = useMemo(
    () =>
      productDetail.data.favorites?.some(
        (item) => item.userId === userInfo.data.id
      ),
    [productDetail.data.favorites, userInfo.data.id]
  );

  const renderProductDetail = useMemo(() => {
    return productDetail.data === undefined ? null : (
      <>
        <Row
          gutter={[16, 16]}
          style={{ display: 'flex' }}
          justify={'space-around'}
        >
          <Col xs={24} md={11} xl={9}>
            <img
              src={productDetail.data.images}
              alt={productDetail.data.name}
            />
          </Col>
          <Col xs={24} md={13} xl={15}>
            <Row gutter={[12, 12]}>
              <Col span={24}>
                <S.ProductDetailName>
                  {productDetail.data.name}
                </S.ProductDetailName>
              </Col>
              <br />
              <Col span={24}>
                <Row>
                  <Col span={12}>
                    <Space align="baseline">
                      <Rate value={productRate} allowHalf disabled />
                      <span>{`(${
                        productRate === 0
                          ? 'Chưa có đánh giá'
                          : productRate.toFixed(2)
                      })`}</span>
                    </Space>
                  </Col>
                  <Col span={12}>
                    <Space align="baseline">
                      <Button
                        size="large"
                        type="text"
                        danger={isFavorite}
                        icon={
                          isFavorite ? (
                            <HeartFilled style={{ fontSize: 24 }} />
                          ) : (
                            <HeartOutlined
                              style={{ fontSize: 24, color: '#414141' }}
                            />
                          )
                        }
                        onClick={() => handleToggleFavorite()}
                      ></Button>
                      {productDetail.data?.favorites?.length || 0} Lượt thích
                    </Space>
                  </Col>
                </Row>
              </Col>
              <br />
              <Col span={24}>
                <Row gutter={[16, 16]}>
                  <Col span={5}>
                    <T.Label size="md" fontWeights="bold">
                      <strong>Đơn giá:</strong>
                    </T.Label>
                  </Col>
                  <Col span={19}>
                    <T.Text>
                      <span style={{ color: 'red' }}>
                        {formatMoney(productDetail.data.price)}
                      </span>
                    </T.Text>
                  </Col>
                </Row>
                <br />

                <S.AddToCardWrapper>
                  <InputNumber
                    style={{ width: '100%' }}
                    min={1}
                    onChange={(value) => setQuantity(value)}
                  />
                  <Button
                    size="large"
                    type="primary"
                    icon={<ShoppingCartOutlined />}
                    onClick={() => handleAddToCart()}
                  >
                    Thêm vào giỏ
                  </Button>
                </S.AddToCardWrapper>
              </Col>
            </Row>
          </Col>
        </Row>
        <Tabs
          defaultActiveKey={1}
          items={[
            {
              key: 1,
              label: 'Mô tả:',
              children: (
                <>
                  <T.Text>
                    <span style={{ opacity: 0.7 }}>
                      {productDetail.data.description}
                    </span>
                  </T.Text>
                </>
              ),
            },
            {
              key: 2,
              label: `Đánh giá (${reviewList.data.length}) `,
              children: <Review />,
            },
          ]}
        />
      </>
    );
  }, [productDetail.data, productRate, isFavorite]);

  const handleToggleFavorite = () => {
    if (userInfo.data.id) {
      if (isFavorite) {
        const favoriteData = productDetail.data.favorites?.find(
          (item) => item.userId === userInfo.data.id
        );
        dispatch(
          unFavoriteProductRequest({
            id: favoriteData.id,
          })
        );
      } else {
        dispatch(
          favoriteProductRequest({
            productId: productDetail.data.id,
            userId: userInfo.data.id,
          })
        );
      }
    } else {
      notification.error({
        message: 'Vui lòng đăng nhập để thực hiện chức năng này!',
      });
    }
  };

  const handleAddToCart = () => {
    dispatch(
      addToCartRequest({
        data: {
          productId: productDetail.data.id,
          images: productDetail.data.images,
          name: productDetail.data.name,
          price: productDetail.data.price,
          quantity: quantity,
        },
      })
    );
    notification.success({ message: 'Bỏ vào giỏ thành công' });
  };

  return <>{renderProductDetail}</>;
};

export default Detail;
