/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from 'react';
import { Link, generatePath } from 'react-router-dom';
import { Spin, Table, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { HeartFilled } from '@ant-design/icons';

import { ROUTES } from 'constants/routes';
import {
  deleteFavoriteProductRequest,
  getFavoriteListRequest,
  unFavoriteProductRequest,
} from 'redux/slicers/favorite.slice';

import * as S from './style';

function FavoriteProducts() {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const { favoriteList } = useSelector((state) => state.favorite);

  useEffect(() => {
    dispatch(
      getFavoriteListRequest({
        userId: userInfo.data.id,
      })
    );
  }, []);

  const handleFavorite = (item) => {
    console.log('🚀 ~ file: index.jsx:47 ~ handleFavorite ~ item:', item);
    dispatch(deleteFavoriteProductRequest({ id: item.id }));
  };

  const dataColumns = [
    {
      title: 'Ảnh',
      dataIndex: 'images',
      key: 'images',
      render: (_, item) => (
        <img src={item.product.images} alt={item.product.name} width={60} />
      ),
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      render: (_, item) => (
        <Link
          to={generatePath(ROUTES.USER.PRODUCT_DETAIL, {
            productSlug: `${
              item.product.id
            }-${item.product.name.toLowerCase()}`,
          })}
        >
          {item.product.name}
        </Link>
      ),
    },
    {
      title: ' ',
      dataIndex: 'action',
      key: 'action',
      render: (_, item) => (
        <Button
          icon={<HeartFilled style={{ fontSize: 24 }} />}
          onClick={() => handleFavorite(item)}
          danger
          type="link"
        ></Button>
      ),
    },
  ];
  const renderProductList = useMemo(() => {
    return (
      <Table
        dataSource={favoriteList.data}
        columns={dataColumns}
        pagination={false}
      />
    );
  }, [favoriteList.data, dataColumns]);

  return (
    <Spin spinning={favoriteList.loading}>
      {favoriteList.data.length === 0 ? (
        <S.Nodata>
          <h3>Không có sản phẩm yêu thích!</h3>
        </S.Nodata>
      ) : (
        renderProductList
      )}
    </Spin>
  );
}

export default FavoriteProducts;
