import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, generatePath, useParams } from 'react-router-dom';
import { Row, Col, Card, Space, Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import qs from 'qs';

import { formatMoney } from 'helper';
import {
  addViewProductRequest,
  getProductDetailRequest,
  clearProductDetailRequest,
  getSimilarProductListRequest,
} from 'redux/slicers/product.slice';
import { getReviewListRequest } from 'redux/slicers/review.slice';
import { ROUTES } from 'constants/routes';
import { setFilterParams } from 'redux/slicers/common.slice';
import Detail from './components/Detail';

import * as S from './style';

const { Meta } = Card;

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { productDetail, similarProduct } = useSelector(
    (state) => state.product
  );
  const { productSlug } = useParams();
  const [id, name] = productSlug.split('-');
  const { filterParams } = useSelector((state) => state.common);

  useEffect(() => {
    return () => dispatch(clearProductDetailRequest());
  }, []);

  useEffect(() => {
    if (productDetail.data.id) {
      dispatch(
        addViewProductRequest({
          id: parseInt(id),
          data: {
            view: productDetail.data?.view + 1,
          },
        })
      );
      dispatch(
        getSimilarProductListRequest({
          categoryId: productDetail.data.categoryId,
        })
      );
    }
    dispatch(getProductDetailRequest({ id: parseInt(id) }));
    dispatch(getReviewListRequest({ productId: parseInt(id) }));
  }, [productDetail.data.id, id]);

  const renderSimilarProductList = useMemo(() => {
    return similarProduct.data
      .filter((item) => item.id !== parseInt(id))
      .map((item) => {
        return (
          <S.ItemOfList key={item.id}>
            <Link
              to={generatePath(ROUTES.USER.PRODUCT_DETAIL, {
                productSlug: `${item.id}-${item.name.toLowerCase()}`,
              })}
            >
              <Card
                style={{
                  width: 200,
                  overflow: 'hidden',
                }}
                cover={
                  <img alt={item.name} src={item.images} height={137.11} />
                }
              >
                <Meta title={item.name} description={formatMoney(item.price)} />
              </Card>
            </Link>
          </S.ItemOfList>
        );
      });
  }, [similarProduct.data]);

  return (
    <>
      <S.ProductDetailWrapper>
        <Row gutter={16}>
          <Col span={24}>
            <S.TopIcons>
              <Breadcrumb
                items={[
                  {
                    title: (
                      <Link to={ROUTES.USER.HOME}>
                        <Space>
                          <HomeOutlined />
                          <span>Trang chủ</span>
                        </Space>
                      </Link>
                    ),
                  },
                  {
                    title: (
                      <Link to={ROUTES.USER.PRODUCT_LIST}>
                        Danh sách sản phẩm
                      </Link>
                    ),
                  },
                  {
                    title: (
                      <Link
                        to={{
                          pathname: ROUTES.USER.PRODUCT_LIST,
                          search: qs.stringify({
                            ...filterParams,
                            categoryId: [productDetail.data.categoryId],
                          }),
                        }}
                      >
                        {productDetail.data.category?.name}
                      </Link>
                    ),
                    onClick: () =>
                      dispatch(
                        setFilterParams({
                          ...filterParams,
                          categoryId: [productDetail.data.categoryId],
                        })
                      ),
                  },
                  {
                    title: productDetail.data.name,
                  },
                ]}
                style={{ marginBottom: 8 }}
              />
            </S.TopIcons>
          </Col>
        </Row>

        {/* <Card>{renderProductDetail}</Card> */}
        <Card>
          <Detail />
        </Card>

        {similarProduct.data.length > 1 && (
          <S.SimilarProductWrapper>
            <h2>Sản phẩm tương tự</h2>
            <S.SimilarProductList>
              {renderSimilarProductList}
            </S.SimilarProductList>
          </S.SimilarProductWrapper>
        )}
      </S.ProductDetailWrapper>
    </>
  );
};

export default ProductDetail;
