import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Input,
  Form,
  Radio,
  DatePicker,
  message,
  Upload,
  Avatar,
} from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { LoadingOutlined, UserOutlined } from '@ant-design/icons';
import moment from 'moment';

import { updateUserInfoRequest } from 'redux/slicers/auth.slice';
import { ROUTES } from 'constants/routes';

import * as S from './style';
dayjs.extend(customParseFormat);

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('Bạn chỉ có thể chọn ảnh định dạng JPG/PNG!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Ảnh phải nhỏ hơn 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const UpdateInfo = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [updateUserInfoForm] = Form.useForm();
  const [valueGender, setValueGender] = useState('');
  const [valueDateOfBirth, setValueDateOfBirth] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const navigate = useNavigate();
  const dateFormat = 'DD/MM/YYYY';
  const phoneNumberPrefix = '+84';

  useEffect(() => {
    if (userInfo.data.dateOfBirth) {
      // setValueDateOfBirth(userInfo.data.dateOfBirth);
    }
    if (userInfo.data.avatar) {
      setImageUrl(userInfo.data.avatar);
    }
  }, []);

  const handleUpload = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
      console.log(imageUrl);
    }
  };

  const uploadButton = (
    <div>
      {loading ? (
        <LoadingOutlined />
      ) : (
        <Avatar size={100} icon={<UserOutlined />} />
      )}
    </div>
  );

  const handleChangeGender = (e) => {
    setValueGender(e.target.value);
  };

  const handleChangeDateOfBirth = (date, dateString) => {
    let valueDOB = moment().valueOf(dateString);
    setValueDateOfBirth(valueDOB);
    console.log(valueDOB);
    console.log(moment(valueDOB).format('DD/MM/YYYY'));
  };

  const handleSubmitForm = (values) => {
    dispatch(
      updateUserInfoRequest({
        data: {
          id: userInfo.data.id,
          avatar: imageUrl,
          fullName: values.fullName,
          email: values.email,
          password: values.password,
          phone: phoneNumberPrefix + values.phone,
          address: values.address,
          gender: values.gender,
          dateOfBirth: valueDateOfBirth,
        },
        callback: () => navigate(ROUTES.USER.PERSONAL_INFOR),
      })
    );
  };

  return (
    <>
      <S.UpdateUserInfoWrapper>
        <Form
          name="registerForm"
          form={updateUserInfoForm}
          layout="vertical"
          onFinish={(values) => handleSubmitForm(values)}
          autoComplete="off"
          initialValues={{
            avatar: userInfo.data?.avatar,
            fullName: userInfo.data.fullName,
            email: userInfo.data.email,
            phone: userInfo.data.phone.substring(3),
            address: userInfo.data?.address,
            gender: userInfo.data?.gender,
            dateOfBirth: dayjs(
              moment(userInfo.data.dateOfBirth).format('DD/MM/YYYY'),
              dateFormat
            ),
          }}
        >
          <Form.Item label="Ảnh đại diện" name="avatar">
            <Upload
              name="avatar"
              listType="picture-circle"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={handleUpload}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="avatar"
                  style={{
                    width: '100%',
                  }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>

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
                max: 40,
                message: 'Họ và tên phải từ 3-40 kí tự',
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

          <Form.Item label="Ngày sinh" name="dateOfBirth">
            <DatePicker
              format={dateFormat}
              onChange={handleChangeDateOfBirth}
              // value={valueDateOfBirth}
              placement="bottomLeft"
            />
          </Form.Item>

          <Form.Item label="Giới tính" name="gender">
            <Radio.Group onChange={handleChangeGender} value={valueGender}>
              <Radio value="Nam">Nam</Radio>
              <Radio value="Nữ">Nữ</Radio>
              <Radio value="Khác">Khác</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Địa chỉ" name="address">
            <Input />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Cập nhập
          </Button>
        </Form>
      </S.UpdateUserInfoWrapper>
    </>
  );
};

export default UpdateInfo;
