import React from "react";
import Link from "next/link";

const Nav = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>Strapi with NextJS</a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;