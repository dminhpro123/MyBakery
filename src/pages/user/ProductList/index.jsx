import React, { useEffect, useMemo, useState } from 'react';
import {
  Card,
  Row,
  Col,
  Checkbox,
  Input,
  Select,
  Button,
  Empty,
  Rate,
  notification,
  Space,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, generatePath, useNavigate } from 'react-router-dom';
import qs from 'qs';

import { PRODUCT_LIMIT } from 'constants/paging';
import { getProductListRequest } from 'redux/slicers/product.slice';
import { getCategoryListRequest } from 'redux/slicers/category.slice';
import TopIcon from '../components/TopIcon';
import { ROUTES } from 'constants/routes';
import { formatMoney } from 'helper';
import { clearFilterParams, setFilterParams } from 'redux/slicers/common.slice';
import loadingSpin from 'assets/gif/loading-spin.gif';

import T from 'components/Typography';
import * as S from './styles';
import {
  CommentOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { addToCartRequest } from 'redux/slicers/cart.slice';

const { Meta } = Card;

function ProductListPage() {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.product);
  const { categoriesList } = useSelector((state) => state.category);
  const { filterParams } = useSelector((state) => state.common);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
    dispatch(getCategoryListRequest());
    dispatch(
      getProductListRequest({
        ...filterParams,
        page: 1,
        limit: PRODUCT_LIMIT,
      })
    );

    return () => dispatch(clearFilterParams());
  }, []);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
    dispatch(
      getProductListRequest({
        ...filterParams,
        page: 1,
        limit: PRODUCT_LIMIT,
      })
    );
  }, [filterParams]);

  const handleFilter = (key, values) => {
    const newFilterParams = {
      ...filterParams,
      [key]: values,
    };
    dispatch(setFilterParams(newFilterParams));
    dispatch(
      getProductListRequest({
        ...filterParams,
        [key]: values,
        page: 1,
        limit: PRODUCT_LIMIT,
      })
    );
    navigate({
      pathname: ROUTES.USER.PRODUCT_LIST,
      search: qs.stringify(newFilterParams),
    });
  };

  const handleAddToCart = (e, item) => {
    e.preventDefault();
    dispatch(
      addToCartRequest({
        data: {
          productId: item.id,
          images: item.images,
          name: item.name,
          price: item.price,
          quantity: 1,
        },
      })
    );
    // console.log(item);
    notification.success({ message: 'Bỏ vào giỏ thành công' });
  };

  const renderProductList = useMemo(() => {
    if (loading === true) {
      return (
        <S.LoadingWrapper>
          <img src={loadingSpin} width={300} alt="loading" />
        </S.LoadingWrapper>
      );
    } else if (productList.data.length === 0) {
      return (
        <S.NoData>
          <h1>Xin lỗi quý khách hiện nay chưa có hàng!!!</h1>
        </S.NoData>
      );
    } else {
      return productList.data.map((item) => {
        const averageRate = item.reviews.length
          ? (
              item.reviews.reduce((total, item) => total + item.rate, 0) /
              item.reviews.length
            ).toFixed(1)
          : 0;
        return (
          <S.ItemOfList key={item.id}>
            <Link
              to={generatePath(ROUTES.USER.PRODUCT_DETAIL, {
                productSlug: `${item.id}-${item.name.toLowerCase()}`,
              })}
            >
              <Card
                style={{
                  width: 250,
                  overflow: 'hidden',
                }}
                cover={<img alt={item.name} src={item.images} />}
                actions={[
                  <Space>
                    <HeartOutlined key="favorite" />
                    <span>{item.favorites.length}</span>
                  </Space>,
                  <Space>
                    <CommentOutlined key="review" />
                    <span>{item.reviews.length}</span>
                  </Space>,
                ]}
              >
                <Row>
                  <Col span={18}>
                    <Meta
                      title={item.name}
                      description={formatMoney(item.price)}
                    />
                  </Col>
                  <Col span={6}>
                    <Meta
                      title={
                        <Button
                          type="primary"
                          ghost
                          id={`cart_${item.id}`}
                          onClick={(e) => handleAddToCart(e, item)}
                        >
                          <ShoppingCartOutlined />
                        </Button>
                      }
                    />
                  </Col>
                </Row>
                <Meta
                  title={
                    <Rate
                      value={averageRate}
                      allowHalf
                      disabled
                      style={{ fontSize: 12 }}
                    />
                  }
                  description={`${
                    averageRate !== 0 ? `(${averageRate})` : 'chưa đánh giá'
                  } `}
                  style={{ marginTop: 10 }}
                />
              </Card>
            </Link>
          </S.ItemOfList>
        );
      });
    }
  }, [productList.data, loading]);

  const handleShowMore = () => {
    dispatch(
      getProductListRequest({
        ...filterParams,
        page: productList.meta.page + 1,
        limit: PRODUCT_LIMIT,
        more: true,
      })
    );
  };

  const renderCategoryList = useMemo(() => {
    return categoriesList.data.map((item) => {
      return (
        <Col key={item.id} span={24}>
          <Checkbox value={item.id}>
            {item.name} {`(${item.products.length})`}
          </Checkbox>
        </Col>
      );
    });
  }, [categoriesList.data]);

  return (
    <S.ProductListWrapper>
      <TopIcon key={2} titleString="PRODUCTS" />
      <Row gutter={[16, 16]}>
        <Col lg={6} xs={24}>
          <Card title="Sản phẩm" size="small">
            <Checkbox.Group
              onChange={(values) => handleFilter('categoryId', values)}
              value={filterParams.categoryId}
            >
              <Row>{renderCategoryList}</Row>
            </Checkbox.Group>

            <Input
              onChange={(e) => handleFilter('keyword', e.target.value)}
              placeholder="Search..."
              style={{ width: '100%', margin: '5px 0 5px 0' }}
              value={filterParams.keyword}
            />

            <Select
              onChange={(value) => handleFilter('sort', value)}
              placeholder="sắp xếp theo giá"
              style={{ width: '100%' }}
              value={filterParams.sort}
            >
              {/* 
                <Select.Option value="name.asc">A-Z</Select.Option>
                <Select.Option value="name.desc">Z-A</Select.Option>
              */}
              <Select.Option value="price.asc">Giá tăng dần</Select.Option>
              <Select.Option value="price.desc">Giá giảm dần</Select.Option>
            </Select>
          </Card>
        </Col>

        <Col lg={18} xs={24}>
          <Row>{renderProductList}</Row>
          {productList.data.length !== productList.meta.total && (
            <Row justify="center" style={{ marginTop: '10px' }}>
              <Button type="primary" onClick={() => handleShowMore()}>
                Xem thêm
              </Button>
            </Row>
          )}
        </Col>
      </Row>
    </S.ProductListWrapper>
  );
}

export default ProductListPage;
