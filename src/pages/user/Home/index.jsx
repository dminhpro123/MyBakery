import { Row, Col, Skeleton } from "antd";
import React from "react";
import { Suspense } from "react";

import T from "components/Typography";
import * as S from "./styles";

function HomePage() {
  const AdvertisementList = React.lazy(() =>
    import("./components/AdvertisementList")
  );
  const CategoryList = React.lazy(() => import("./components/CategoryList"));
  const NewProductList = React.lazy(() =>
    import("./components/NewProductList")
  );
  const OutstandingProductList = React.lazy(() =>
    import("./components/OutstandingProductList")
  );

  return (
    <S.HomeWrapper>
      <>
        <Row>
          <Col span={24}>
            <Suspense fallback={<Skeleton active paragraph={{ rows: 7 }} />}>
              <AdvertisementList />
            </Suspense>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={1} />
          <Col span={22}>
            <S.ItemCategoryList>
              <Suspense fallback={<Skeleton active paragraph={{ rows: 7 }} />}>
                <CategoryList />
              </Suspense>
            </S.ItemCategoryList>
            <S.SomeProductListWrapper>
              <T.Title fontSizes="xxl">
                <strong>Sản phẩm nổi bật</strong>
              </T.Title>
              <div style={{ margin: "0 -8px" }}>
                <Suspense
                  fallback={<Skeleton active paragraph={{ rows: 7 }} />}
                >
                  <OutstandingProductList />
                </Suspense>
              </div>
            </S.SomeProductListWrapper>
            <S.SomeProductListWrapper>
              <T.Title fontSizes="xxl">
                <strong>Sản phẩm mới</strong>
              </T.Title>
              {/* <Slider {...someProductListSettings}>
                {renderNewProductListSlide}
              </Slider> */}
              <div style={{ margin: "0 -8px" }}>
                <Suspense
                  fallback={<Skeleton active paragraph={{ rows: 7 }} />}
                >
                  <NewProductList />
                </Suspense>
              </div>
            </S.SomeProductListWrapper>
          </Col>
          <Col span={1} />
        </Row>
      </>
    </S.HomeWrapper>
  );
}

export default HomePage;
