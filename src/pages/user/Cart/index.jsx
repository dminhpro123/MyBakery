import { useMemo } from 'react';
import { Button, Table, InputNumber, Row, Col, Breadcrumb, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

import { updateCartRequest, deleteCartRequest } from 'redux/slicers/cart.slice';
import { formatMoney } from 'helper';
import { ROUTES } from 'constants/routes';

import * as S from './style';
import { HomeOutlined } from '@ant-design/icons';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartList } = useSelector((state) => state.cart);
  const cartListLS = localStorage.getItem('cartList');

  const totalPrice = cartList.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleChangeQuantity = (productId, value) => {
    dispatch(
      updateCartRequest({
        productId: productId,
        value: value,
      })
    );
  };

  const handleDeleteCartItem = (productId) => {
    dispatch(deleteCartRequest({ productId: productId }));
  };

  const tableColumn = [
    {
      title: 'Hình ảnh',
      dataIndex: 'img',
      key: 'img',
      render: (_, item) => {
        return <img src={item.images} width={60} />;
      },
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      key: 'price',
      render: (_, item) => {
        return formatMoney(item.price);
      },
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (_, item) => (
        <InputNumber
          value={item.quantity}
          min={1}
          onChange={(value) => handleChangeQuantity(item.productId, value)}
        />
      ),
    },
    {
      title: 'Thành tiền',
      dataIndex: 'total',
      key: 'total',
      render: (_, item) => formatMoney(item.price * item.quantity),
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
      render: (_, item) => (
        <Button danger onClick={() => handleDeleteCartItem(item.productId)}>
          <FontAwesomeIcon icon={faTrashCan} />
        </Button>
      ),
    },
  ];

  return (
    <>
      <S.CartWrapper>
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
                    title: 'Giỏ hàng',
                  },
                ]}
              />
            </S.TopIcons>
          </Col>
        </Row>

        {cartList.length === 0 ? (
          <>
            <hr />
            <p>Giỏ hàng của bạn đang trống</p>
          </>
        ) : (
          <Table
            columns={tableColumn}
            dataSource={cartList}
            pagination={false}
          />
        )}

        <br />
        <Row>
          <Col span={17}></Col>
          <Col span={7}>
            {cartList.length !== 0 && (
              <h4>Tổng tiền: {formatMoney(totalPrice)}</h4>
            )}
          </Col>
        </Row>
        <S.ButtonWrapper>
          <Button
            type="primary"
            onClick={() => navigate(ROUTES.USER.PRODUCT_LIST)}
          >
            Tiếp tục mua hàng
          </Button>
          <Button
            type="primary"
            disabled={cartList.length === 0}
            onClick={() => navigate(ROUTES.USER.CHECKOUT)}
          >
            Tiếp theo
          </Button>
        </S.ButtonWrapper>
      </S.CartWrapper>
    </>
  );
};

export default Cart;
