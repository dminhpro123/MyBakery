export const formatMoney = (money) => {
  money = Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(money);
  return money;
};
