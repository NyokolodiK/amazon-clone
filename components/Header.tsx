import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header>
      <nav className="navbar justify-between bg-base-300">
        <Link href="/" className="btn btn-ghost text-lg ">
          Amazone Clone
        </Link>
        <ul className="flex">
          <li>
            <Link className="btn btn-ghost rounded-btn" href="/cart">
              Cart
            </Link>
          </li>
          <li>
            <Link className="btn btn-ghost rounded-btn" href="/sign-in">
              Sign in
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
