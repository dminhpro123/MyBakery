import { useEffect, useMemo, useState } from 'react';
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
  Select,
  Row,
  Col,
  notification,
} from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { LoadingOutlined, UserOutlined } from '@ant-design/icons';

import { updateUserInfoRequest } from 'redux/slicers/auth.slice';
import { ROUTES } from 'constants/routes';
import {
  getCityListRequest,
  getDistrictExistRequest,
  getDistrictListRequest,
  getWardExistRequest,
  getWardListRequest,
} from 'redux/slicers/location.slice';

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
  const { cityList, districtList, wardList } = useSelector(
    (state) => state.location
  );
  const [updateUserInfoForm] = Form.useForm();
  const [valueGender, setValueGender] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const navigate = useNavigate();
  const dateFormat = 'DD/MM/YYYY';
  const phoneNumberPrefix = '+84';

  useEffect(() => {
    if (userInfo.data.avatar) {
      setImageUrl(userInfo.data.avatar);
    }
    dispatch(getCityListRequest());
  }, []);

  useEffect(() => {
    if (userInfo.data.districtCode)
      dispatch(
        getDistrictExistRequest({
          code: userInfo.data.cityCode,
        })
      );

    if (userInfo.data.wardCode)
      dispatch(getWardExistRequest({ code: userInfo.data.districtCode }));
  }, [
    userInfo.data.districtCode,
    userInfo.data.cityCode,
    userInfo.data.wardCode,
  ]);

  useEffect(() => {
    if (wardList.data.length !== 0 && userInfo.data.wardCode) {
      let wardExist = wardList.data.filter(
        (item) => item.code === userInfo.data.wardCode
      )[0]?.code;
      updateUserInfoForm.setFieldValue('wardCode', wardExist);
    }
    if (districtList.data.length !== 0 && userInfo.data.districtCode) {
      let districtExist = districtList.data.filter(
        (item) => item.code === userInfo.data.districtCode
      )[0]?.code;
      updateUserInfoForm.setFieldValue('districtCode', districtExist);
    }
  }, [
    districtList.data,
    updateUserInfoForm,
    userInfo.data.districtCode,
    userInfo.data.wardCode,
    wardList.data,
  ]);

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

  const handleSubmitForm = (values) => {
    const { cityCode, districtCode, wardCode } = values;
    const cityData = cityList.data.find((item) => item.code === cityCode);
    const districtData = districtList.data.find(
      (item) => item.code === districtCode
    );
    const wardData = wardList.data.find((item) => item.code === wardCode);
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
          cityCode,
          cityName: cityData?.name,
          districtCode,
          districtName: districtData?.name,
          wardCode,
          wardName: wardData?.name,
          dateOfBirth: dayjs(values.dateOfBirth).valueOf(),
        },
        callback: () => {
          notification.success({ message: 'Thay đổi thông tin thành công' });
        },
      })
    );
  };

  const renderCityOptions = useMemo(() => {
    return cityList.data.map((item) => {
      return (
        <Select.Option key={item.id} value={item.code}>
          {item.name}
        </Select.Option>
      );
    });
  }, [cityList.data]);

  const renderDistrictOptions = useMemo(() => {
    return districtList.data.map((item) => {
      return (
        <Select.Option key={item.id} value={item.code}>
          {item.name}
        </Select.Option>
      );
    });
  }, [districtList.data]);

  const renderWardListOptions = useMemo(() => {
    return wardList.data.map((item) => {
      return (
        <Select.Option key={item.id} value={item.code}>
          {item.name}
        </Select.Option>
      );
    });
  }, [wardList.data]);

  return (
    <>
      <S.UpdateUserInfoWrapper>
        <Form
          name="updateUserInfoForm"
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
            dateOfBirth: dayjs(userInfo.data?.dateOfBirth),
            cityCode: userInfo.data?.cityCode,
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

          <Row gutter={[16, 16]}>
            <Col md={12} xs={24}>
              <Form.Item label="Ngày sinh" name="dateOfBirth">
                <DatePicker format={dateFormat} placement="bottomLeft" />
              </Form.Item>
            </Col>
            <Col md={12} xs={24}>
              <Form.Item label="Giới tính" name="gender">
                <Radio.Group onChange={handleChangeGender} value={valueGender}>
                  <Radio value="Nam">Nam</Radio>
                  <Radio value="Nữ">Nữ</Radio>
                  <Radio value="Khác">Khác</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col md={8} xs={24}>
              <Form.Item label="Tỉnh/Thành" name="cityCode">
                <Select
                  onChange={(value) => {
                    dispatch(getDistrictListRequest({ cityCode: value }));
                    updateUserInfoForm.setFieldsValue({
                      districtCode: undefined,
                      wardCode: undefined,
                    });
                  }}
                >
                  {renderCityOptions}
                </Select>
              </Form.Item>
            </Col>
            <Col md={8} xs={24}>
              <Form.Item label="Quận/Huyện" name="districtCode">
                <Select
                  onChange={(value) => {
                    dispatch(getWardListRequest({ districtCode: value }));
                    updateUserInfoForm.setFieldsValue({
                      wardCode: undefined,
                    });
                  }}
                  // defaultValue={districtExist}
                  disabled={!updateUserInfoForm.getFieldValue('cityCode')}
                >
                  {renderDistrictOptions}
                </Select>
              </Form.Item>
            </Col>
            <Col md={8} xs={24}>
              <Form.Item label="Phường/Xã" name="wardCode">
                <Select
                  disabled={!updateUserInfoForm.getFieldValue('districtCode')}
                >
                  {renderWardListOptions}
                </Select>
              </Form.Item>
            </Col>
          </Row>
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
