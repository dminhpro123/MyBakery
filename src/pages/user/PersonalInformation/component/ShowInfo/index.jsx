import { useSelector } from 'react-redux';
import { Avatar, Descriptions } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import moment from 'moment';

import * as S from './style';

const ShowInfo = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      <S.UserInfoWrapper>
        <Avatar
          size={116}
          icon={
            userInfo.data.avatar ? (
              <img src={userInfo.data.avatar} />
            ) : (
              <UserOutlined />
            )
          }
        />
        <br />
        <Descriptions title="Thông tin cá nhân" column={2}>
          <Descriptions.Item label="Họ và tên">
            {userInfo.data.fullName}
          </Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">
            {userInfo.data.phone}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {userInfo.data.email}
          </Descriptions.Item>
          <Descriptions.Item label="Giới tính">
            {userInfo.data.gender}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày sinh">
            {moment(userInfo.data.dateOfBirth).format('DD/MM/YYYY')}
          </Descriptions.Item>
          <Descriptions.Item label="Địa chỉ">
            {userInfo.data.address}
          </Descriptions.Item>
        </Descriptions>
        <br />
        <Descriptions title="Thông tin khác" column={2}>
          <Descriptions.Item label="Ngày đăng ký">
            {moment(userInfo.data.createdAt).format('DD/MM/YYYY')}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày cập nhập">
            {moment(userInfo.data.updatedAt).format('DD/MM/YYYY')}
          </Descriptions.Item>
        </Descriptions>
      </S.UserInfoWrapper>
    </>
  );
};

export default ShowInfo;
