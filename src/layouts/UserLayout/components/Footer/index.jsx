import { Col, Row, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import qs from 'qs';

import { ROUTES } from 'constants/routes';
import { getCategoryListRequest } from 'redux/slicers/category.slice';
import { setFilterParams } from 'redux/slicers/common.slice';
import { getBakeryInformationRequest } from 'redux/slicers/bakeryInformation.slice';

import * as S from './styles';
import { FacebookOutlined, YoutubeOutlined } from '@ant-design/icons';

function UserFooter() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categoriesList } = useSelector((state) => state.category);
  const { filterParams } = useSelector((state) => state.common);
  const { bakeryInformationList } = useSelector(
    (state) => state.bakeryInformation
  );

  useEffect(() => {
    dispatch(getCategoryListRequest());
    dispatch(getBakeryInformationRequest());
  }, []);

  const renderBakeryInfo = useMemo(() => {
    return (
      <>
        <div>Địa chỉ: {bakeryInformationList.data.address}</div>
        <div>Số điện thoại: {bakeryInformationList.data.telephone}</div>
        <div>Email: {bakeryInformationList.data.email}</div>
      </>
    );
  }, [bakeryInformationList.data]);

  const renderChannel = useMemo(() => {
    return (
      <Space align="center" size={[16, 16]} style={{ padding: 5 }}>
        <S.Channel href={bakeryInformationList.data.facebookChannel}>
          <FacebookOutlined style={{ fontSize: 32 }} />
        </S.Channel>
        <S.Channel href={bakeryInformationList.data.youtubeChannel}>
          <YoutubeOutlined style={{ fontSize: 36 }} />
        </S.Channel>
      </Space>
    );
  }, [bakeryInformationList.data]);

  const renderCategoryList = useMemo(() => {
    return categoriesList.data.map((item) => {
      const newFilterParams = {
        ...filterParams,
        categoryId: [item.id],
      };
      return (
        <S.CategoryItem
          key={item.id}
          onClick={() => {
            dispatch(setFilterParams(newFilterParams));
            navigate({
              pathname: ROUTES.USER.PRODUCT_LIST,
              search: qs.stringify(newFilterParams),
            });
          }}
        >
          <span>{item.name}</span>
        </S.CategoryItem>
      );
    });
  }, [categoriesList.data, filterParams]);

  return (
    <S.FooterWrapper>
      <S.FooterTop>
        <Row gutter={[16, 16]}>
          <Col span={3}></Col>
          <Col span={6}>
            <h2>Thông tin liên hệ</h2>
            <S.DataInfo>{renderBakeryInfo}</S.DataInfo>
          </Col>
          <Col span={6}>
            <h2>Danh mục sản phẩm</h2>
            <S.CategoryListWrapper>{renderCategoryList}</S.CategoryListWrapper>
          </Col>
          <Col span={6}>
            <h2>Theo dõi tại:</h2>
            {renderChannel}
          </Col>
          <Col span={3}></Col>
        </Row>
      </S.FooterTop>
      <S.FooterBottom>
        <span>&copy; Copy all right Nguyen Van Duc Minh 2023</span>
      </S.FooterBottom>
    </S.FooterWrapper>
  );
}

export default UserFooter;
