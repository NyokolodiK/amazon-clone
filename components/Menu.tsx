"use client";

import useCartService from "@/lib/hooks/useCartStore";
import { signOut, useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Menu = () => {
  const { items } = useCartService();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const signOutHandler = () => {
    signOut({ callbackUrl: '/signin' });
  };

  const handleClick = () => {
    ; (document.activeElement as HTMLElement).blur()
  }

  const { data: session } = useSession()

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
      {session && session.user ? (
        <>
          <li>
            <div className="dropdown dropdown-bottom dropdown-end">
              <label tabIndex={0} className="btn btn-ghost rounded-btn">
                {session.user.name}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu dropdown-content z-[1] p-2 shadow bg-base-300 rounded-box w-52 "
              >
                <li onClick={handleClick}>
                  <button type="button" onClick={signOutHandler}>
                    Sign out
                  </button>
                </li>
              </ul>
            </div>
          </li>
        </>
      ) : (
        <li>
          <button
            className="btn btn-ghost rounded-btn"
            type="button"
            onClick={() => signIn()}
          >
            Sign in
          </button>
        </li>
      )}
    </ul>
  );
};

export default Menu;
