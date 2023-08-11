import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Modal, Row } from 'antd';

import {
  getNewsListRequest,
  getNewsDetailRequest,
} from 'redux/slicers/news.slice';
import T from 'components/Typography';
// import { fontSizes } from 'themes/common';

import * as S from './style';

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
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const renderNewsList = useMemo(() => {
    if (!newsList) return <h2>Hiện tại chưa có tin tức</h2>;
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
    const listNewsImg = [];
    for (let i = 1; i < newsDetail.data[0].images.length; i++) {
      listNewsImg.push(newsDetail.data[0].images[i]);
    }
    return (
      <Modal
        title={newsDetail.data[0].title}
        open={isModalOpen}
        onOk={handleOk}
        okText="Đã xem"
        onCancel={handleCancel}
      >
        <S.NewsModalParagraph>
          {newsDetail.data[0].firstParagraph}
        </S.NewsModalParagraph>
        <img src={newsDetail.data[0].images[0]} alt="" />
        {newsDetail.data[0].content.map((item, index) => {
          return (
            <S.NewsModalParagraph key={index}>{item}</S.NewsModalParagraph>
          );
        })}
        {listNewsImg !== [] &&
          listNewsImg.map((item, index) => {
            return <S.NewsModalImage key={index} src={item} />;
          })}
      </Modal>
    );
  };

  return (
    <>
      <S.NewsListWrapper>
        <Row gutter={[16, 16]}>{renderNewsList}</Row>
      </S.NewsListWrapper>
      {renderNewsModal()}
    </>
  );
};

export default News;
