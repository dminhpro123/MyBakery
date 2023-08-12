import React, { useEffect, useMemo, useState } from 'react';
import {
  Form,
  Input,
  Button,
  notification,
  Spin,
  Row,
  Col,
  Breadcrumb,
  Space,
} from 'antd';

import { registerRequest } from 'redux/slicers/auth.slice';
import { useDispatch, useSelector } from 'react-redux';

import * as S from './style';
import { ROUTES } from 'constants/routes';
import { Link, useNavigate } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';

const Register = () => {
  const dispatch = useDispatch();
  const { registerData } = useSelector((state) => state.auth);
  const [registerForm] = Form.useForm();
  const navigate = useNavigate();
  const phoneNumberPrefix = '+84';

  useEffect(() => {
    if (registerData.error) {
      registerForm.setFields([
        {
          name: 'email',
          errors: [registerData.error],
        },
      ]);
    }
    console.log(registerData.error);
  }, [registerData.error]);

  const handleSubmitForm = (values) => {
    dispatch(
      registerRequest({
        data: {
          fullName: values.fullName,
          email: values.email,
          password: values.password,
          phone: phoneNumberPrefix + values.phone,
        },

        callback: () => navigate(ROUTES.LOGIN),
      })
    );
  };

  return (
    <>
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
                  title: 'Đăng ký',
                },
              ]}
            />
          </S.TopIcons>
        </Col>
      </Row>

      <S.RegisterWrapper>
        <S.RegisterForm>
          <Form
            name="registerForm"
            form={registerForm}
            layout="vertical"
            onFinish={(values) => handleSubmitForm(values)}
            autoComplete="off"
          >
            <Form.Item
              label="Họ và tên"
              name="fullName"
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
              label="Email"
              name="email"
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
              <Input />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Mật khẩu là bắt buộc',
                },
                {
                  pattern:
                    /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/g,
                  message: 'Mật khẩu yếu',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Xác nhận mật khẩu"
              name="confirmPassword"
              dependencies={['password']}
              rules={[
                {
                  required: true,
                  message: 'Xác nhận mật khẩu là bắt buộc',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('Xác nhận mật khẩu không khớp')
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Số điện thoại"
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
              <Input addonBefore={phoneNumberPrefix} />
            </Form.Item>

            <Button type="primary" htmlType="submit" block>
              Đăng ký
            </Button>
          </Form>
        </S.RegisterForm>
      </S.RegisterWrapper>
    </>
  );
};

export default Register;
