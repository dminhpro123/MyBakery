import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Col,
  Descriptions,
  Form,
  Input,
  Row,
  Space,
  Spin,
  notification,
} from 'antd';

import { getBakeryInformationRequest } from 'redux/slicers/bakeryInformation.slice';
import Map from 'pages/user/components/Map';
import TopIcon from '../components/TopIcon';

import * as S from './style';
import { postContactRequest } from 'redux/slicers/contact.slice';

const Context = React.createContext({ name: 'Default' });

const ContactUs = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { bakeryInformationList } = useSelector(
    (state) => state.bakeryInformation
  );
  const [loading, setLoading] = useState(false);
  const phoneNumberPrefix = '+84';
  const mess = 'Bài đăng của bạn đã thành công';

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement) => {
    api.info({
      message: `Thông báo`,
      description: (
        <Context.Consumer>{({ mess }) => `${mess}!`}</Context.Consumer>
      ),
      placement,
    });
  };

  const contextValue = useMemo(() => {
    return { mess };
  }, [mess]);

  useEffect(() => {
    dispatch(getBakeryInformationRequest());
  }, []);

  const handleSubmitForm = (values) => {
    setLoading(true);
    dispatch(
      postContactRequest({
        fullName: values.fullName,
        email: values.email,
        phone: phoneNumberPrefix + values.phone,
        title: values.title,
        content: values.content,
      })
    );
    setTimeout(() => {
      setLoading(false);
      openNotification('topRight');
    }, 1000);

    form.resetFields();
  };
  const renderContactForm = useMemo(() => {
    return (
      <Form
        form={form}
        name="contactForm"
        layout="vertical"
        autoComplete="off"
        onFinish={(values) => handleSubmitForm(values)}
      >
        <Spin tip="Loading..." spinning={loading}>
          <Form.Item
            name="fullName"
            label="Full name / Họ tên"
            rules={[
              {
                required: true,
                message: 'Họ và tên là bắt buộc',
              },
              {
                type: 'string',
                min: 3,
                max: 20,
                message: 'Họ và tên phải từ 3-20 kí tự',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: 'Email là bắt buộc',
              },
              {
                pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message: 'Email không đúng định dạng',
              },
            ]}
          >
            <Input placeholder="tenban@vidu.com" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Telephone / Điện thoại"
            rules={[
              {
                required: true,
                message: 'Số điện thoại là bắt buộc',
              },
              {
                pattern: /^[0-9\-\+]{9}$/g,
                message: 'Số điện thoại bắt buộc có 9 chữ số',
              },
            ]}
          >
            <Input placeholder="09xxxxxx" addonBefore={phoneNumberPrefix} />
          </Form.Item>
          <Form.Item name="title" label="Tiêu đề">
            <Input />
          </Form.Item>
          <Form.Item name="content" label="Content / Nội dung">
            <Input.TextArea placeholder="Nhập nội dung tin nhắn" rows={6} />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" block>
                Xác nhận
              </Button>
            </Space>
          </Form.Item>
        </Spin>
      </Form>
    );
  }, [loading]);

  return (
    <>
      <S.ContactUsWrapper>
        <Context.Provider value={contextValue}>
          {contextHolder}
          <TopIcon key={5} titleString="CONTACT" />
          <Row gutter={[16, 16]}>
            <Col lg={12} xs={24}>
              <div className="info-contact">
                <Descriptions title="My Bakery">
                  <Descriptions.Item label="Địa chỉ">
                    {bakeryInformationList.data.address}
                  </Descriptions.Item>
                  <Descriptions.Item label="Điện thoại">
                    {bakeryInformationList.data.telephone}
                  </Descriptions.Item>
                  <Descriptions.Item label="Email">
                    {bakeryInformationList.data.email}
                  </Descriptions.Item>
                </Descriptions>
              </div>
              <Map></Map>
            </Col>
            <Col lg={12} xs={24}>
              <S.Attention>
                <div>
                  <strong>Lưu ý</strong>
                </div>
                <div>
                  <span>Những trường có dấu sao là bắt buộc</span>
                </div>
              </S.Attention>
              {renderContactForm}
            </Col>
          </Row>
        </Context.Provider>
      </S.ContactUsWrapper>
    </>
  );
};

export default ContactUs;
