import { OrderItem } from "./models/OrderModel";

export const round2 = (num: number) =>
  Math.round(num * 100 + Number.EPSILON) / 100;

export const convertDocToObj = (doc: any) => {
  doc._id = doc._id.toString();
  return doc;
};

export const calcPrices = (orderItems: OrderItem[]) => {
  // Calculate the items price
  const itemsPrice = round2(
    orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  // Calculate the shipping price
  const shippingPrice = round2(itemsPrice > 100 ? 0 : 10);
  // Calculate the tax price
  const taxPrice = round2(Number((0.15 * itemsPrice).toFixed(2)));
  // Calculate the total price
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);
  return { itemsPrice, shippingPrice, taxPrice, totalPrice };
};
