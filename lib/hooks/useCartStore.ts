import { create } from "zustand";
import { OrderItem, ShippingAddress } from "../models/OrderModel";
import { round2 } from "../utils";
import { persist } from "zustand/middleware";

type Cart = {
  items: OrderItem[];
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  paymentMethod: string;
  shippingAddress: ShippingAddress;
};

const initialState: Cart = {
  items: [],
  itemsPrice: 0,
  taxPrice: 0,
  shippingPrice: 0,
  totalPrice: 0,
  paymentMethod: "PayPal",
  shippingAddress: {
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  },
};

export const cartStore = create<Cart>()(
  persist(() => initialState, { name: "cartStore" })
);

export default function useCartService() {
  const { items, itemsPrice, taxPrice, shippingPrice, totalPrice } =
    cartStore();

  return {
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    increase: (item: OrderItem) => {
      const exist = items.find((x: { slug: string }) => x.slug === item.slug);
      const updateCartItems: OrderItem[] = exist
        ? (items.map((x: { slug: string }) =>
            x.slug === item.slug ? { ...exist, qty: exist.qty + 1 } : x
          ) as OrderItem[])
        : [...items, { ...item, qty: 1 }];
      const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
        calculatePrice(updateCartItems as OrderItem[]);
      cartStore.setState({
        items: updateCartItems,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });
    },
    decrease: (item: OrderItem) => {
      const exist = items.find((x: { slug: string }) => x.slug === item.slug);
      if (!exist) return;

      const updateCartItems: OrderItem[] =
        exist.qty === 1
          ? items.filter((x: { slug: string }) => x.slug !== item.slug)
          : (items.map((x: { slug: string }) =>
              x.slug === item.slug ? { ...exist, qty: exist.qty - 1 } : x
            ) as OrderItem[]);
      const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
        calculatePrice(updateCartItems as OrderItem[]);
      cartStore.setState({
        items: updateCartItems,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });
    },
    saveShippingAddress: (shippingAddress: ShippingAddress) => {
      cartStore.setState({ shippingAddress });
    },
    setPaymentMethod: (paymentMethod: string) => {
      cartStore.setState({ paymentMethod });
    },
  };
}

const calculatePrice = (items: OrderItem[]) => {
  const itemsPrice = round2(
    items.reduce(
      (a: number, c: { price: number; qty: number }) => a + c.price * c.qty,
      0
    )
  );
  const taxPrice = round2(itemsPrice * 0.15);
  const shippingPrice = itemsPrice > 100 ? 0 : 100;
  const totalPrice = round2(itemsPrice + taxPrice + shippingPrice);
  return { itemsPrice, taxPrice, shippingPrice, totalPrice };
};
