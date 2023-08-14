import { List } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import qs from 'qs';

import { setFilterParams } from 'redux/slicers/common.slice';
import { ROUTES } from 'constants/routes';

import * as S from './style';

const CategoryList = () => {
  const dispatch = useDispatch();

  const { filterParams } = useSelector((state) => state.common);
  const { categoriesList } = useSelector((state) => state.category);

  return (
    <List
      grid={{
        gutter: 16,
        sm: 1,
        md: 2,
        lg: 3,
        xl: 3,
        xxl: 3,
      }}
      title="Sản phẩm"
      dataSource={categoriesList.data}
      renderItem={(item) => (
        <List.Item
          key={item.id}
          onClick={() => {
            dispatch(
              setFilterParams({
                ...filterParams,
                categoryId: [item.id],
              })
            );
          }}
        >
          <Link
            to={{
              pathname: ROUTES.USER.PRODUCT_LIST,
              search: qs.stringify({
                ...filterParams,
                categoryId: [item.id],
              }),
            }}
          >
            <S.CategoryContainer>
              <S.ImgCategory alt={item.name} src={item.images} />
              <S.TextCategoryContainer>
                <strong> {item.name.toUpperCase()}</strong>
              </S.TextCategoryContainer>
            </S.CategoryContainer>
          </Link>
        </List.Item>
      )}
    />
  );
};

export default CategoryList;
