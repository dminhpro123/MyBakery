import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Form,
  Button,
  Input,
  Select,
  Radio,
  Row,
  Col,
  Card,
  Space,
  Table,
  Breadcrumb,
} from 'antd';
import { HomeOutlined } from '@ant-design/icons';

import { ROUTES } from 'constants/routes';
import {
  getCityListRequest,
  getDistrictListRequest,
  getWardListRequest,
} from 'redux/slicers/location.slice';
import { orderProductRequest } from 'redux/slicers/order.slice';
import { clearCartRequest } from 'redux/slicers/cart.slice';
import { createUniqueId, formatMoney } from 'helper';

import * as S from './style';

function Checkout() {
  const [checkoutForm] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartListLS = localStorage.getItem('cartList');

  const { cityList, districtList, wardList } = useSelector(
    (state) => state.location
  );
  const { cartList } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const tableColumn = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'total',
      key: 'total',
      render: (_, item) => formatMoney(item.price * item.quantity),
    },
  ];

  useEffect(() => {
    dispatch(getCityListRequest());
  }, []);

  useEffect(() => {
    if (userInfo.data.id) {
      checkoutForm.resetFields();
    }
  }, [userInfo.data, checkoutForm]);

  const initialValues = {
    fullName: userInfo.data.fullName,
    email: userInfo.data.email,
    phoneNumber: userInfo.data.phone,
  };

  const handleSubmitCheckoutForm = (values) => {
    const totalPrice = cartList.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const { cityCode, districtCode, wardCode } = values;
    const cityData = cityList.data.find((item) => item.code === cityCode);
    const districtData = districtList.data.find(
      (item) => item.code === districtCode
    );
    const wardData = wardList.data.find((item) => item.code === wardCode);
    dispatch(
      orderProductRequest({
        data: {
          ...values,
          codeOrder: createUniqueId(),
          cityName: cityData?.name,
          districtName: districtData?.name,
          wardName: wardData?.name,
          userId: userInfo.data.id,
          totalPrice: totalPrice,
          status: 'pending',
        },
        products: cartList,
        callback: () => {
          navigate(ROUTES.USER.HOME);
          localStorage.removeItem('cartList');
          dispatch(clearCartRequest());
        },
      })
    );
  };

  const renderCityOptions = useMemo(() => {
    return cityList.data.map((item) => {
      return (
        <Select.Option key={item.id} value={item.code}>
          {item.name}
        </Select.Option>
      );
    });
  }, [cityList.data]);

  const renderDistrictOptions = useMemo(() => {
    return districtList.data.map((item) => {
      return (
        <Select.Option key={item.id} value={item.code}>
          {item.name}
        </Select.Option>
      );
    });
  }, [districtList.data]);

  const renderWardListOptions = useMemo(() => {
    return wardList.data.map((item) => {
      return (
        <Select.Option key={item.id} value={item.code}>
          {item.name}
        </Select.Option>
      );
    });
  }, [wardList.data]);

  return (
    <S.CheckoutWrapper>
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
                  title: 'Thanh toán',
                },
              ]}
            />
          </S.TopIcons>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col md={14} sm={24}>
          <Form
            name="checkoutForm"
            form={checkoutForm}
            layout="vertical"
            initialValues={initialValues}
            onFinish={(values) => handleSubmitCheckoutForm(values)}
          >
            <Card
              size="small"
              title="Thông tin giao hàng"
              style={{ marginBottom: 24 }}
            >
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Form.Item
                    label="Họ và tên"
                    name="fullName"
                    rules={[{ required: true, message: 'Required!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Required!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Số điện thoại"
                    name="phoneNumber"
                    rules={[{ required: true, message: 'Required!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Tỉnh/Thành"
                    name="cityCode"
                    rules={[{ required: true, message: 'Required!' }]}
                  >
                    <Select
                      onChange={(value) => {
                        dispatch(getDistrictListRequest({ cityCode: value }));
                        checkoutForm.setFieldsValue({
                          districtCode: undefined,
                          wardCode: undefined,
                        });
                      }}
                    >
                      {renderCityOptions}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Quận/Huyện"
                    name="districtCode"
                    rules={[{ required: true, message: 'Required!' }]}
                  >
                    <Select
                      onChange={(value) => {
                        dispatch(getWardListRequest({ districtCode: value }));
                        checkoutForm.setFieldsValue({
                          wardCode: undefined,
                        });
                      }}
                      disabled={!checkoutForm.getFieldValue('cityCode')}
                    >
                      {renderDistrictOptions}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Phường/Xã"
                    name="wardCode"
                    rules={[{ required: true, message: 'Required!' }]}
                  >
                    <Select
                      disabled={!checkoutForm.getFieldValue('districtCode')}
                    >
                      {renderWardListOptions}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="Địa chỉ"
                    name="address"
                    rules={[{ required: true, message: 'Required!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
            <Card
              size="small"
              title="Thông tin thanh toán"
              style={{ marginBottom: 24 }}
            >
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Form.Item
                    label="Phương thức thanh toán"
                    name="paymentMethod"
                    rules={[{ required: true, message: 'Required!' }]}
                  >
                    <Radio.Group>
                      <Space direction="vertical">
                        <Radio value="cod">COD</Radio>
                        <Radio value="atm">ATM</Radio>
                      </Space>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            <Row justify="space-between">
              <Button onClick={() => navigate(ROUTES.USER.CART)}>
                Trở lại
              </Button>
              <Button type="primary" htmlType="submit" disabled={!cartListLS}>
                Thanh toán
              </Button>
            </Row>
          </Form>
        </Col>
        <Col md={10} sm={24}>
          <Card size="small" title="Giỏ hàng" style={{ marginBottom: 24 }}>
            <Table
              size="small"
              columns={tableColumn}
              dataSource={cartList}
              rowKey="id"
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
    </S.CheckoutWrapper>
  );
}

export default Checkout;
