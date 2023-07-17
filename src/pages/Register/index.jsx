import React, { useMemo, useState } from 'react';
import { Form, Input, Button, notification, Spin } from 'antd';

import { registerRequest } from 'redux/slicers/auth.slice';
import { useDispatch, useSelector } from 'react-redux';

import * as S from './style';
import { ROUTES } from 'constants/routes';
import { useNavigate } from 'react-router-dom';

const Context = React.createContext({ name: 'Default' });

const Register = () => {
  const dispatch = useDispatch();
  const { registerData } = useSelector((state) => state.auth);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [messenger, setMessenger] = useState('');
  const phoneNumberPrefix = '+84';
  const navigate = useNavigate();

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
    switch (registerData.error?.response.data) {
      case 'Email already exists':
        setMessenger('Email đã tồn tại');
        break;
      default:
        setMessenger('Đăng ký thành công');
        break;
    }

    return {
      mess: messenger,
    };
  }, [registerData.error?.response.data, messenger]);

  const handleSubmitForm = (values) => {
    setLoading(true);
    dispatch(
      registerRequest({
        data: {
          fullName: values.fullName,
          email: values.email,
          password: values.password,
          phone: phoneNumberPrefix + values.phone,
          address: values.address,
        },

        callback: () => navigate(ROUTES.LOGIN),
      })
    );
    setTimeout(() => {
      setLoading(false);
      openNotification('topRight');
    }, 1000);

    // form.resetFields();
  };
  return (
    <>
      <S.RegisterWrapper>
        <S.RegisterForm>
          <Context.Provider value={contextValue}>
            {contextHolder}
            <Spin tip="Loading..." spinning={loading}>
              <Form
                name="registerForm"
                form={form}
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

                <Form.Item
                  label="Địa chỉ"
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: 'Địa chỉ là bắt buộc',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Button type="primary" htmlType="submit" block>
                  Đăng ký
                </Button>
              </Form>
            </Spin>
          </Context.Provider>
        </S.RegisterForm>
      </S.RegisterWrapper>
    </>
  );
};

export default Register;
