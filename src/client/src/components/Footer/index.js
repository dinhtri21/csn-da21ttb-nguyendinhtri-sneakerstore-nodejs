import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";

import { PiFacebookLogoLight } from "react-icons/pi";
import { PiInstagramLogoLight } from "react-icons/pi";
import { PiYoutubeLogoLight } from "react-icons/pi";
import { RiPinterestLine } from "react-icons/ri";

const cx = classNames.bind(styles);

function Footer() {
  return (
    <div className={cx("container", "footer-container")}>
      <div className={cx("grid", "footer-grid")}>
        <div className={cx("row", "footer-row")}>
          <div className={cx("about", "col-4", "footer-item")}>
            <h4 className={cx("title")}>Về Sneaker</h4>
            <p>
              Chào mừng bạn đến với Sneaker - nơi thăng hoa phong cách và sáng
              tạo! Tại đây, chúng tôi tập trung vào việc cung cấp những đôi giày
              thời trang, độc đáo và hiện đại nhất cho bạn. Tạo nên phong cách
              cá nhân và tự tin với Sneaker!
            </p>
          </div>
          <div className={cx("contact", "col-3", "footer-item")}>
            <h4 className={cx("title")}>Liên hệ</h4>
            <p>Hno: 126 Nguyen Van Thuong, P25, Binh Thanh Ditrict, HCM</p>
            <ul>
              <li>
                <Link to={"/"} className={cx("footer-link")}>
                  +84 0357929230
                </Link>
              </li>
              <li>
                <Link to={"/"} className={cx("footer-link")}>
                  abc@gmail.com
                </Link>
              </li>
            </ul>
          </div>
          <div className={cx("help", "col-3", "footer-item")}>
            <h4 className={cx("title")}>Hỗ trợ</h4>
            <ul>
              <li>
                <Link to={"/about"} className={cx("footer-link")}>
                  Hướng dẫn mua hàng
                </Link>
              </li>
              <li>
                <Link to={"/about"} className={cx("footer-link")}>
                  Bảo hành đổi và trả
                </Link>
              </li>
              <li>
                <Link to={"/about"} className={cx("footer-link")}>
                  Hướng dẫn chọn size
                </Link>
              </li>
              <li>
                <Link to={"/about"} className={cx("footer-link")}>
                  Thông tin liên hệ
                </Link>
              </li>
            </ul>
          </div>
          <div className={cx("social", "col-2", "footer-item")}>
            <h4 className={cx("title")}>Theo dõi</h4>
            <ul>
              <li>
                <Link to={"/"} className={cx("social-link")}>
                  <PiFacebookLogoLight className={cx("social-icon")} />
                  <span className={cx("footer-link")}>Facebook</span>
                </Link>
              </li>
              <li>
                <Link to={"/"} className={cx("social-link")}>
                  <PiInstagramLogoLight className={cx("social-icon")} />
                  <span className={cx("footer-link")}>Intagram</span>
                </Link>
              </li>
              <li>
                <Link to={"/"} className={cx("social-link")}>
                  <PiYoutubeLogoLight className={cx("social-icon")} />
                  <span className={cx("footer-link")}>Youtube</span>
                </Link>
              </li>
              <li>
                <Link to={"/"} className={cx("social-link")}>
                  <RiPinterestLine className={cx("social-icon")} />
                  <span className={cx("footer-link")}>Pinterest</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={cx("row")}>
          <div className={cx("col-12", "footer-all-rights")}>
            @2023 SNEAKERSTORE. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
