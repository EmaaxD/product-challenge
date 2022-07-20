export const getFormatMoney = (budget) => {
  return budget.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};
