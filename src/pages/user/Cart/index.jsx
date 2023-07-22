import { useMemo } from 'react';
import { Button, Table, InputNumber, Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { updateCartRequest, deleteCartRequest } from 'redux/slicers/cart.slice';

import * as S from './style';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'constants/routes';
import { formatMoney } from 'helper';

const Cart = () => {
  const dispatch = useDispatch();
  const { cartList } = useSelector((state) => state.cart);

  const navigate = useNavigate();

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
          Xóa
        </Button>
      ),
    },
  ];
  return (
    <>
      <S.CartWrapper>
        <h2>Giỏ hàng</h2>
        <br />
        <Table columns={tableColumn} dataSource={cartList} pagination={false} />
        <br />
        <Row>
          <Col span={17}></Col>
          <Col span={7}>
            <h4>Tổng tiền: {formatMoney(totalPrice)}</h4>
          </Col>
        </Row>
        <S.ButtonWrapper>
          <Button
            type="primary"
            ghost
            onClick={() => navigate(ROUTES.USER.PRODUCT_LIST)}
          >
            Tiếp tục mua hàng
          </Button>
          <Button type="primary" ghost>
            Thanh toán
          </Button>
        </S.ButtonWrapper>
      </S.CartWrapper>
    </>
  );
};

export default Cart;
