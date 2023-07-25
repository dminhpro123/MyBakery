import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  Descriptions,
  Card,
  Form,
  Input,
  Button,
  Rate,
  Space,
  InputNumber,
  Avatar,
  notification,
} from 'antd';
import moment from 'moment';
import { UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';

import TopIcon from '../components/TopIcon';
import {
  addViewProductRequest,
  getProductDetailRequest,
} from 'redux/slicers/product.slice';
import { formatMoney } from 'helper';
import {
  createReviewRequest,
  getReviewListRequest,
} from 'redux/slicers/review.slice';
import { ROUTES } from 'constants/routes';
import { addToCartRequest } from 'redux/slicers/cart.slice';

import * as S from './style';

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { productDetail } = useSelector((state) => state.product);
  const { reviewList } = useSelector((state) => state.review);
  const { userInfo } = useSelector((state) => state.auth);
  const [quantity, setQuantity] = useState(1);
  const { productSlug } = useParams();
  const [id] = productSlug.split('-');
  const [reviewForm] = Form.useForm();
  const [existUserReview, setExistUserReview] = useState(false);
  const [existUserReviewIndex, setExistUserReviewIndex] = useState(false);
  const navigate = useNavigate();

  const productRate =
    reviewList.data.reduce((total, item) => total + item.rate, 0) /
      reviewList.data.length || 0;

  useEffect(() => {
    dispatch(getProductDetailRequest({ id: parseInt(id) }));
    dispatch(getReviewListRequest({ productId: parseInt(id) }));
    if (productDetail.data?.id) {
      dispatch(
        addViewProductRequest({
          id: parseInt(id),
          data: {
            view: parseInt(productDetail.data.view) + 1,
          },
        })
      );
    }
  }, []);

  useEffect(() => {
    reviewList.data.map((item, index) => {
      if (item.userId === userInfo.data.id) {
        setExistUserReview(true);
        setExistUserReviewIndex(index);
        return <></>;
      }
    });
  }, [reviewList.data, existUserReview, userInfo.data]);

  const renderProductDetail = useMemo(() => {
    return productDetail.data === undefined ? null : (
      <>
        <Col xs={24} md={12} xl={8}>
          <Image src={productDetail.data.images} />
        </Col>
        <Col xs={24} md={6} xl={8}>
          <Row gutter={[12, 12]}>
            <Col span={24}>
              <S.ProductDetailName>
                {productDetail.data.name}
              </S.ProductDetailName>
            </Col>
            <br />
            <Col span={24}>
              <div>
                <Space align="baseline">
                  <Rate value={productRate} allowHalf disabled />
                  <span>{`(${
                    productRate === 0
                      ? 'Chưa có đánh giá'
                      : productRate.toFixed(2)
                  })`}</span>
                </Space>
              </div>
            </Col>
            <br />
            <Col span={24}>
              <Descriptions layout="horizontal">
                <Descriptions.Item
                  label="Đơn giá"
                  contentStyle={{ fontSize: 'xx-larger', fontWeight: 'bold' }}
                  labelStyle={{ fontSize: 'larger' }}
                >
                  {formatMoney(productDetail.data.price)}
                </Descriptions.Item>
                <Descriptions.Item
                  label="Mô tả"
                  contentStyle={{ fontSize: 'xx-larger', fontWeight: 'bold' }}
                  labelStyle={{ fontSize: 'larger' }}
                >
                  {productDetail.data.description}
                </Descriptions.Item>
              </Descriptions>
            </Col>
          </Row>
        </Col>
      </>
    );
  }, [productDetail.data, productRate]);

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

  const handleReview = (values) => {
    dispatch(
      createReviewRequest({
        data: {
          ...values,
          userId: userInfo.data.id,
          productId: parseInt(id),
        },
        callback: () => reviewForm.resetFields(),
      })
    );
  };

  const renderReviewList = useMemo(() => {
    return reviewList.data.map((item) => {
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
    });
  }, [reviewList.data]);

  const renderReviewUserExist = () => {
    // existUserReviewIndex
    return (
      <>
        <S.ReviewWrapper>
          <h4>Bình luận của bạn:</h4>
          <Space align="baseline">
            <Avatar
              size={24}
              icon={
                reviewList.data[existUserReviewIndex]?.user.avatar ? (
                  <img
                    alt="Ảnh đại diện"
                    src={reviewList.data[existUserReviewIndex]?.user.avatar}
                  />
                ) : (
                  <UserOutlined />
                )
              }
            />
            <h3>{reviewList.data[existUserReviewIndex]?.user.fullName}</h3>
            <span>
              {moment(
                reviewList.data[existUserReviewIndex]?.createdAt
              ).fromNow()}
            </span>
          </Space>
          <div>
            <Rate
              value={reviewList.data[existUserReviewIndex]?.rate}
              disabled
              style={{ fontSize: 12 }}
            />
          </div>
          <strong>Bình luận:</strong>
          <p>{reviewList.data[existUserReviewIndex]?.comment}</p>
        </S.ReviewWrapper>
      </>
    );
  };

  return (
    <>
      <S.ProductDetailWrapper>
        <TopIcon key={2} titleString="PRODUCTS" />
        <Row
          gutter={[16, 16]}
          style={{ display: 'flex' }}
          justify={'space-around'}
        >
          {renderProductDetail}
          <Col xs={24} md={6} xl={8}>
            <S.AddToCardWrapper>
              <h2>
                <strong>Số lượng:</strong>
              </h2>
              <InputNumber
                style={{ width: '100%' }}
                value={quantity}
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
        <Card
          size="small"
          title={`Đánh giá (${reviewList.data.length})`}
          bordered={false}
          style={{ marginTop: 16 }}
        >
          {userInfo.data.id ? (
            existUserReview ? (
              renderReviewUserExist()
            ) : (
              <S.ReviewWrapper>
                <Form
                  form={reviewForm}
                  name="reviewForm"
                  layout="vertical"
                  initialValues={{ rate: 5, comment: '' }}
                  onFinish={(values) => handleReview(values)}
                >
                  <Form.Item
                    label="Đánh giá sao"
                    name="rate"
                    rules={[
                      {
                        required: true,
                        message: 'Đánh giá sao là bắt buộc',
                      },
                    ]}
                  >
                    <Rate allowHalf />
                  </Form.Item>

                  <Form.Item
                    label="nhận xét"
                    name="comment"
                    rules={[
                      {
                        required: true,
                        message: 'nhận xét là bắt buộc',
                      },
                    ]}
                  >
                    <Input.TextArea />
                  </Form.Item>

                  <Form.Item
                    wrapperCol={{
                      offset: 8,
                      span: 16,
                    }}
                  >
                    <Button type="primary" htmlType="submit">
                      Gửi
                    </Button>
                  </Form.Item>
                </Form>
              </S.ReviewWrapper>
            )
          ) : (
            <S.ReviewAttention>
              <h2>Quý khách cần đăng nhập để đánh giá</h2>
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => navigate(ROUTES.LOGIN)}
              >
                Đăng nhập
              </Button>
            </S.ReviewAttention>
          )}
          {renderReviewList}
        </Card>
      </S.ProductDetailWrapper>
    </>
  );
};

export default ProductDetail;
