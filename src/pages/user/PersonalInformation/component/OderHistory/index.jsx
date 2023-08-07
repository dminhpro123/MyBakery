import { useEffect, useMemo } from 'react';
import { Button, Table, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import {
  cancelOrderListRequest,
  getOrderListRequest,
} from 'redux/slicers/order.slice';

import * as S from './style';
import { formatMoney } from 'helper';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';

const OderHistory = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const { orderList } = useSelector((state) => state.order);

  useEffect(() => {
    if (userInfo.data.id) {
      dispatch(getOrderListRequest({ userId: userInfo.data.id }));
    }
  }, [userInfo.data.id]);

  const tableColumns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Số lượng sản phẩm',
      dataIndex: 'orderDetails',
      key: 'orderDetails',
      render: (orderDetails) => `${orderDetails.length} sản phẩm`,
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (totalPrice) => formatMoney(totalPrice),
    },
    {
      title: 'Ngày đặt hàng',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt) => moment(createdAt).format('DD/MM/YYYY HH:mm'),
    },
    {
      title: 'Địa chỉ giao hàng',
      dataIndex: 'address',
      key: 'address',
      render: (_, item) =>
        `${item.address}, ${item.wardName}, ${item.districtName}, ${item.cityName}`,
    },
    {
      title: 'Phương thức thanh toán',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      render: (_, item) => {
        switch (item.paymentMethod) {
          case 'cod':
            return <Tag color="lime">{item.paymentMethod.toUpperCase()}</Tag>;
          case 'atm':
            return <Tag color="cyan">{item.paymentMethod.toUpperCase()}</Tag>;
          default:
            break;
        }
      },
    },
    {
      title: 'tình trạng',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        switch (status) {
          case 'pending':
            return (
              <Tag icon={<SyncOutlined spin />} color="processing">
                Đang giao hàng
              </Tag>
            );
          case 'success':
            return (
              <Tag icon={<CheckCircleOutlined />} color="success">
                Đã giao hàng
              </Tag>
            );
          case 'cancel':
            return (
              <Tag icon={<CloseCircleOutlined />} color="error">
                Huỷ giao dịch
              </Tag>
            );
          default:
            break;
        }
      },
    },
    {
      title: '',
      dataIndex: 'status',
      key: 'status',
      render: (_, item) => {
        switch (item.status) {
          case 'pending':
            return (
              <Button
                danger
                onClick={() =>
                  dispatch(
                    cancelOrderListRequest({
                      data: {
                        id: parseInt(item.id),
                        status: 'cancel',
                      },
                      callback: () =>
                        dispatch(
                          getOrderListRequest({ userId: userInfo.data.id })
                        ),
                    })
                  )
                }
              >
                Huỷ giao dịch
              </Button>
            );
          default:
            break;
        }
      },
    },
  ];

  const tableColumnDetails = [
    {
      title: 'Ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (_, item) => <S.ImgProduct src={item.image} />,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (_, item) => formatMoney(item.price),
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'total',
      key: 'total',
      render: (_, item) => formatMoney(item.price * item.quantity),
    },
  ];

  // const renderOrderHistories = useMemo(() => {
  //   return (
  //     <Table
  //       columns={tableColumns}
  //       dataSource={orderList.data}
  //       rowKey="id"
  //       pagination={false}
  //       expandable={{
  //         expandedRowRender: (record) => (
  //           <Table
  //             columns={tableColumnDetails}
  //             rowKey="id"
  //             pagination={false}
  //             dataSource={record.orderDetails}
  //           />
  //         ),
  //       }}
  //     />
  //   );
  // }, [orderList.data, tableColumns, tableColumnDetails]);

  return (
    <Table
      columns={tableColumns}
      dataSource={orderList.data}
      rowKey="id"
      pagination={false}
      expandable={{
        expandedRowRender: (record) => (
          <Table
            columns={tableColumnDetails}
            rowKey="id"
            pagination={false}
            dataSource={record.orderDetails}
          />
        ),
      }}
    />
  );
};

export default OderHistory;
