"use client";

import useCartService from "@/lib/hooks/useCartStore";
import Link from "next/link";
import { useEffect, useState } from "react";

const Menu = () => {
  const { items } = useCartService();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ul className="flex items-stretch">
      <li>
        <Link className="btn btn-ghost rounded-btn" href="/cart">
          Cart
          {mounted && items.length > 0 && (
            <span className="badge badge-secondary">
              {items.reduce((acc, item) => acc + item.qty, 0)}
            </span>
          )}
        </Link>
      </li>
      <li>
        <button className="btn btn-ghost rounded-btn" type="button">
          Sign in
        </button>
      </li>
    </ul>
  );
};

export default Menu;
