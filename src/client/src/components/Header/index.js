import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import { PiShoppingCartThin } from "react-icons/pi";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { TbMenu2 } from "react-icons/tb";

import { useState } from "react";
const cx = classNames.bind(styles);

const navigations = [
  {
    name: "Trang chủ",
    path: "/",
  },
  {
    name: "Sản phẩm",
    path: "/products",
  },
  {
    name: "Giới thiệu",
    path: "/about",
  },
  //   {
  //     name: "Liên hệ",
  //     path: "/contact",
  //   },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuItem = () => {
    if (window.innerWidth <= 740) {
      setMenuOpen(!menuOpen);
    }
    console.log(menuOpen);
  };
  return (
    <div className={cx("wrapper")}>
      <div
        onClick={handleMenuItem}
        className={cx({ "menu-overlay": menuOpen })}
      ></div>
      <div className={cx("container")}>
        <div className={cx("logo")}>
          <button onClick={handleMenuItem} className={cx("nav-button-mobile")}>
            <div className={cx("nav-mobile-icon")}>
              <TbMenu2 />
            </div>
          </button>
          <Link to={"/"} className={cx("logo-item")}>
            Sneaker Store
          </Link>
        </div>
        <div className={cx("navigations", { "nav-open": menuOpen })}>
          {navigations.map((nav, index) => {
            return (
              <Link
                onClick={handleMenuItem}
                className={cx("nav-item")}
                to={nav.path}
                key={index}
              >
                {nav.name}
                <div className={cx("nav-item-icon")}>
                  <MdOutlineKeyboardArrowRight />
                </div>
              </Link>
            );
          })}
        </div>
        <div className={cx("cart")}>
          <PiShoppingCartThin />
        </div>
      </div>
    </div>
  );
}

export default Header;
