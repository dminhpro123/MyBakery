import { v4 as uuidv4 } from 'uuid';

export const createUniqueId = () => uuidv4();

export const formatMoney = (money) => {
  money = Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(money);
  return money;
};
