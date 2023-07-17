import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Row, Col, Image, Descriptions } from 'antd';

import { getProductDetailRequest } from 'redux/slicers/product.slice';
import TopIcon from '../components/TopIcon';

import * as S from './style';
import { formatMoney } from 'helper';

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { productDetail } = useSelector((state) => state.product);
  const { productSlug } = useParams();
  const [id, name] = productSlug.split('-');

  useEffect(() => {
    dispatch(getProductDetailRequest({ id: parseInt(id) }));
  }, []);

  useEffect(() => {}, []);

  const renderProductDetail = useMemo(() => {
    return productDetail.data === undefined ? null : (
      <>
        <Col xs={24} md={12} xl={8}>
          <Image src={productDetail.data.images} />
        </Col>
        <Col xs={24} md={6} xl={8}>
          <Row gutter={[12, 12]}>
            <Col span={24}>
              <S.ProductDetailName>
                {productDetail.data.name}
              </S.ProductDetailName>
            </Col>
            <br />
            <Col span={24}>
              <Descriptions layout="vertical">
                <Descriptions.Item
                  label="Đơn giá"
                  contentStyle={{ fontSize: 'xx-larger', fontWeight: 'bold' }}
                  labelStyle={{ fontSize: 'larger' }}
                >
                  {formatMoney(productDetail.data.price)}
                </Descriptions.Item>
                <Descriptions.Item
                  label="Mô tả"
                  contentStyle={{ fontSize: 'xx-larger', fontWeight: 'bold' }}
                  labelStyle={{ fontSize: 'larger' }}
                >
                  {productDetail.data.description}
                </Descriptions.Item>
              </Descriptions>
            </Col>
          </Row>
        </Col>
      </>
    );
  }, [productDetail.data]);

  return (
    <>
      <S.ProductDetailWrapper>
        <TopIcon key={2} titleString="PRODUCTS" />
        <Row
          gutter={[16, 16]}
          style={{ display: 'flex' }}
          justify={'space-around'}
        >
          {renderProductDetail}
          <Col xs={24} md={6} xl={8}>
            a
          </Col>
        </Row>
      </S.ProductDetailWrapper>
    </>
  );
};

export default ProductDetail;
