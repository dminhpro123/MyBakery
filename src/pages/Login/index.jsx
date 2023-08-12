import { Breadcrumb, Button, Col, Form, Input, Row, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { loginRequest } from 'redux/slicers/auth.slice';
import { ROUTES } from 'constants/routes';

import * as S from './style';
import { HomeOutlined } from '@ant-design/icons';

const Login = () => {
  const [loginForm] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginData, userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (loginData.error) {
      loginForm.setFields([
        {
          name: 'email',
          errors: [' '],
        },
        {
          name: 'password',
          errors: [loginData.error],
        },
      ]);
    }
  }, [loginData.error]);

  const handleSubmit = (values) => {
    dispatch(
      loginRequest({
        data: values,
        callback: () => navigate(ROUTES.USER.HOME),
      })
    );
  };

  if (userInfo.data.id) return <Navigate to={ROUTES.USER.HOME} />;

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
                  title: 'Đăng nhập',
                },
              ]}
            />
          </S.TopIcons>
        </Col>
      </Row>
      <S.LoginWrapper>
        <S.LoginForm>
          <Form
            form={loginForm}
            name="loginForm"
            layout="vertical"
            onFinish={(values) => handleSubmit(values)}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
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
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <div style={{ marginBottom: 16 }}>
              Bạn chưa có tài khoản? <Link to={ROUTES.REGISTER}>Đăng ký</Link>
            </div>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </S.LoginForm>
      </S.LoginWrapper>
    </>
  );
};

export default Login;
