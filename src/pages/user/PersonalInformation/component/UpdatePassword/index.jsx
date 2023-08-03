import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { changePasswordRequest } from 'redux/slicers/auth.slice';

import * as S from './style';
import { useEffect } from 'react';

const UpdatePassword = () => {
  const { userInfo, changePasswordData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [updateUserPasswordForm] = Form.useForm();

  useEffect(() => {
    if (changePasswordData.error) {
      updateUserPasswordForm.setFields([
        {
          name: 'oldPassword',
          errors: ['Mật khẩu không khớp!'],
        },
      ]);
    }
  }, [changePasswordData.error]);

  const handleSubmitForm = (values) => {
    dispatch(
      changePasswordRequest({
        id: userInfo.data.id,
        data: {
          email: userInfo.data.email,
          password: values.oldPassword,
          newPassword: values.password,
        },
        callback: () => updateUserPasswordForm.resetFields(),
      })
    );
  };

  return (
    <>
      <S.UpdatePasswordWrapper>
        <Form
          name="updateUserPasswordForm"
          form={updateUserPasswordForm}
          layout="vertical"
          onFinish={(values) => handleSubmitForm(values)}
          autoComplete="off"
        >
          <Form.Item
            label="Mật khẩu cũ"
            name="oldPassword"
            rules={[
              {
                required: true,
                message: 'Mật khẩu cũ là bắt buộc',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Mật khẩu mới"
            name="password"
            rules={[
              {
                required: true,
                message: 'Mật khẩu mới là bắt buộc',
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
