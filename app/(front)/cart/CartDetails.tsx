'use client'

import useCartService from "@/lib/hooks/useCartStore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CartDetails = () => {
  const router = useRouter();
  const { items, increase, decrease, itemsPrice } = useCartService();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <h1 className="py-4 text-2xl">Shopping Cart</h1>
      {items.length === 0 ? (
        <div>
          Cart Empty <Link href="/">Continue Shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.slug}>
                    <td>
                      <Link href={`/product/${item.slug}`} className="flex items-center">
                        <Image src={item.image} alt={item.name} width={50} height={50} />
                        <span className="px-2">{item.name}</span>
                      </Link>
                    </td>
                    <td>
                      <button className="btn" type="button" onClick={() => decrease(item)}>-</button>
                      <span className="px-2">{item.qty}</span>
                      <button className="btn" type="button" onClick={() => increase(item)}>+</button>
                    </td>
                    <td>R{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <div className="card w-full bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Subtotal ({items.length} items): R{itemsPrice}</h2>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary w-full" onClick={() => router.push("/shipping")}>Proceed to Checkout</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartDetails;
