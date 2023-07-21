import { useEffect, useMemo } from 'react';
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
} from 'antd';
import moment from 'moment';

import TopIcon from '../components/TopIcon';
import { getProductDetailRequest } from 'redux/slicers/product.slice';
import { formatMoney } from 'helper';
import {
  createReviewRequest,
  getReviewListRequest,
} from 'redux/slicers/review.slice';

import * as S from './style';
import { ROUTES } from 'constants/routes';
import { ShoppingCartOutlined } from '@ant-design/icons';

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { productDetail } = useSelector((state) => state.product);
  const { reviewList } = useSelector((state) => state.review);
  const { userInfo } = useSelector((state) => state.auth);
  const { productSlug } = useParams();
  const [id] = productSlug.split('-');
  const [reviewForm] = Form.useForm();
  const navigate = useNavigate();

  const productRate =
    reviewList.data.reduce((total, item) => total + item.rate, 0) /
    reviewList.data.length;

  useEffect(() => {
    dispatch(getProductDetailRequest({ id: parseInt(id) }));
    dispatch(getReviewListRequest({ productId: parseInt(id) }));
  }, []);

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
                  <span>{`(${productRate})`}</span>
                </Space>
              </div>
            </Col>
            <br />
            <Col span={24}>
              <Descriptions layout="vertical">
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
          <Space>
            <h3>{item.user.fullName}</h3>
            {/* <span>{moment(item.createAt).format('DD/MM/YYYY HH:mm')}</span> */}
            <span>{moment(item.createdAt).fromNow()}</span>
          </Space>

          <div>
            <Rate value={item.rate} disabled style={{ fontSize: 12 }} />
          </div>
          <p>{item.comment}</p>
        </S.ReviewListWrapper>
      );
    });
  }, [reviewList.data]);

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
              <InputNumber style={{ width: '100%' }} />
              <Button
                size="large"
                type="primary"
                icon={<ShoppingCartOutlined />}
              >
                Add to cart
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
