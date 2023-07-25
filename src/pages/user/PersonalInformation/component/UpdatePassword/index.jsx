import { Button, Form, Input } from 'antd';
import { ROUTES } from 'constants/routes';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { updateUserInfoRequest } from 'redux/slicers/auth.slice';

import * as S from './style';

const UpdatePassword = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [updateUserPasswordForm] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmitForm = (values) => {
    dispatch(
      updateUserInfoRequest({
        data: {
          id: userInfo.data.id,
          password: values.password,
        },
        callback: () => navigate(ROUTES.USER.PERSONAL_INFOR),
      })
    );
  };

  return (
    <>
      <S.UpdatePasswordWrapper>
        <Form
          name="registerForm"
          form={updateUserPasswordForm}
          layout="vertical"
          onFinish={(values) => handleSubmitForm(values)}
          autoComplete="off"
        >
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
          <Button type="primary" htmlType="submit" block>
            Cập nhập
          </Button>
        </Form>
      </S.UpdatePasswordWrapper>
    </>
  );
};

export default UpdatePassword;
