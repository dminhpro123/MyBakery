import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'constants/routes';
const Page404NotFound = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Xin lỗi trang này không tồn tại."
      extra={
        <Button type="primary" onClick={() => navigate(ROUTES.USER.HOME)}>
          Trở về trang chủ
        </Button>
      }
    />
  );
};

export default Page404NotFound;
