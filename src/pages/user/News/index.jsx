import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumb, Col, Modal, Row, Space } from 'antd';

import {
  getNewsListRequest,
  getNewsDetailRequest,
  clearNewsDetailRequest,
} from 'redux/slicers/news.slice';
import T from 'components/Typography';

import * as S from './style';
import { ROUTES } from 'constants/routes';
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';

const News = () => {
  const dispatch = useDispatch();
  const { newsList } = useSelector((state) => state.news);
  const { newsDetail } = useSelector((state) => state.news);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getNewsListRequest());
  }, []);

  const showModal = (id) => {
    setIsModalOpen(true);
    dispatch(getNewsDetailRequest({ id: id }));
  };

  const handleOk = () => {
    setIsModalOpen(false);
    dispatch(clearNewsDetailRequest());
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    dispatch(clearNewsDetailRequest());
  };

  const renderNewsList = useMemo(() => {
    if (!newsList.data[0]) return <h2>Hiện tại chưa có tin tức</h2>;
    return newsList.data.map((item) => {
      return (
        <Col sm={24} md={12} key={item.id}>
          <S.NewsCard>
            <S.NewsImage src={item.icon} onClick={() => showModal(item.id)} />
            <S.NewsInformation>
              <S.NewsTitle onClick={() => showModal(item.id)}>
                {item.title}
              </S.NewsTitle>
              <S.NewsContent>{item.firstParagraph}</S.NewsContent>
            </S.NewsInformation>
          </S.NewsCard>
        </Col>
      );
    });
  }, [newsList.data]);

  const renderNewsModal = () => {
    if (!newsDetail.data[0]) return null;
    return (
      <Modal
        title={newsDetail.data[0].title}
        open={isModalOpen}
        onOk={handleOk}
        okText="Đã xem"
        onCancel={handleCancel}
      >
        <S.NewsModalParagraph>
          <T.Text
            dangerouslySetInnerHTML={{ __html: newsDetail.data[0].content }}
          ></T.Text>
        </S.NewsModalParagraph>
      </Modal>
    );
  };

  return (
    <>
      <S.NewsListWrapper>
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
                    title: 'Tin tức',
                  },
                ]}
              />
            </S.TopIcons>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>{renderNewsList}</Row>
      </S.NewsListWrapper>
      {renderNewsModal()}
    </>
  );
};

export default News;
