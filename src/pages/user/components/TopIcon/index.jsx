import { Link, useNavigate } from 'react-router-dom';
import * as S from './style';
import { faAngleRight, faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row } from 'antd';
import { ROUTES } from 'constants/routes';
import { NAVBAR } from 'constants/userNavbar';

const TopIcon = ({ titleString }) => {
  const navigate = useNavigate();

  return (
    <>
      <Row gutter={16}>
        <Col span={24}>
          <S.TopIcons>
            <S.IconHome key={2} onClick={() => navigate(ROUTES.USER.HOME)}>
              <FontAwesomeIcon icon={faHouse} />
            </S.IconHome>
            <FontAwesomeIcon icon={faAngleRight} />
            <span>
              {NAVBAR.filter((item) => item.title === titleString)[0].content}
            </span>
          </S.TopIcons>
        </Col>
      </Row>
    </>
  );
};

export default TopIcon;
