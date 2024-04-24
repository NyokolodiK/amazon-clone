"use client";

import useCartService from "@/lib/hooks/useCartStore";
import { OrderItem } from "@/lib/models/OrderModel";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AddToCart = ({ item }: { item: OrderItem }) => {
  const router = useRouter();
  const { items, increase, decrease } = useCartService();
  const [existItem, setExistItem] = useState<OrderItem | undefined>();

  useEffect(() => {
    const exist = items.find((x: { slug: string }) => x.slug === item.slug);
    setExistItem(exist);
  }, [items, item]);

  const addToCartHandler = () => {
    increase(item);
  };

  return existItem ? (
    <div>
      <button className="btn" type="button" onClick={() => decrease(existItem)}>
        -
      </button>
      <span className="px-2">{existItem.qty} </span>
      <button className="btn" type="button" onClick={() => increase(existItem)}>
        +
      </button>
    </div>
  ) : (
    <button type="button" className="btn btn-primary w-full" onClick={addToCartHandler}>
      Add to cart
    </button>
  );
};

export default AddToCart;
