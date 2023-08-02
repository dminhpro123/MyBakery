import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import qs from 'qs';

import { getCategoryListRequest } from 'redux/slicers/category.slice';
import { ROUTES } from 'constants/routes';
import { setFilterParams } from 'redux/slicers/common.slice';

import * as S from './styles';

function UserFooter() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categoriesList } = useSelector((state) => state.category);
  const { filterParams } = useSelector((state) => state.common);

  useEffect(() => {
    dispatch(getCategoryListRequest());
  }, []);

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
          <Col span={8}></Col>
          <Col span={8}>
            <h2>Danh mục sản phẩm</h2>
            <S.CategoryListWrapper>{renderCategoryList}</S.CategoryListWrapper>
          </Col>
          <Col span={8}></Col>
        </Row>
      </S.FooterTop>
      <S.FooterBottom>
        <span>&copy; Copy all right Nguyen Van Duc Minh 2023</span>
      </S.FooterBottom>
    </S.FooterWrapper>
  );
}

export default UserFooter;
