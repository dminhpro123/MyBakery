import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { loginRequest } from 'redux/slicers/auth.slice';
import { ROUTES } from 'constants/routes';

import * as S from './style';

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
              label="Password"
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
