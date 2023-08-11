import React from 'react';
import { useSelector } from 'react-redux';
import { Descriptions, Form } from 'antd';

import Map from 'pages/user/components/Map';
import TopIcon from '../components/TopIcon';

import * as S from './style';

const ContactUs = () => {
  const { bakeryInformationList } = useSelector(
    (state) => state.bakeryInformation
  );

  return (
    <>
      <S.ContactUsWrapper>
        <TopIcon key={5} titleString="CONTACT" />

        <div className="info-contact">
          <Descriptions title="My Bakery">
            <Descriptions.Item label="Địa chỉ">
              {bakeryInformationList.data.address}
            </Descriptions.Item>
            <Descriptions.Item label="Điện thoại">
              {bakeryInformationList.data.telephone}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {bakeryInformationList.data.email}
            </Descriptions.Item>
          </Descriptions>
        </div>
        <Map />
      </S.ContactUsWrapper>
    </>
  );
};

export default ContactUs;
