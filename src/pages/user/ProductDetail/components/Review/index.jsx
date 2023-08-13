import { Avatar, Button, Card, Form, Input, Rate, Space } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import moment from 'moment';

import {
  createReviewRequest,
  getReviewListRequest,
} from 'redux/slicers/review.slice';
import { ROUTES } from 'constants/routes';

import * as S from './style';

const Review = () => {
  const dispatch = useDispatch();
  const { reviewList } = useSelector((state) => state.review);
  const { userInfo } = useSelector((state) => state.auth);
  const [reviewForm] = Form.useForm();
  const [existUserReviewIndex, setExistUserReviewIndex] = useState(0);
  const { productSlug } = useParams();
  const [id, name] = productSlug.split('-');

  useEffect(() => {
    dispatch(getReviewListRequest({ productId: parseInt(id) }));
  }, []);

  useEffect(() => {
    reviewList.data.map((item, index) => {
      if (item.userId === userInfo.data.id) {
        setExistUserReviewIndex(index);
      }
    });
  }, [reviewList.data, userInfo.data]);

  const hasReview = useMemo(() => {
    return reviewList.data.some((item) => item.userId === userInfo.data.id);
  }, [reviewList.data, userInfo.data]);

  const renderReviewUserExist = () => {
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

  const renderReview = useMemo(() => {
    return (
      <Card size="small" bordered={false} style={{ marginTop: 16 }}>
        {userInfo.data.id ? (
          hasReview ? (
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
              onClick={() => Navigate(ROUTES.LOGIN)}
            >
              Đăng nhập
            </Button>
          </S.ReviewAttention>
        )}
        {renderReviewList}
      </Card>
    );
  }, [hasReview, renderReviewUserExist, renderReviewList, userInfo.data.id]);

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

  return <>{renderReview}</>;
};

export default Review;
