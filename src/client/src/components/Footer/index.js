import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";
import icons from "../../assets/icons";

const cx = classNames.bind(styles);

function Footer() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("About", "footer-item")}>
          <h4 className={cx("title")}>Về Sneaker</h4>
          <p>
            Chào mừng bạn đến với Sneaker - nơi thăng hoa phong cách và sáng
            tạo! Tại đây, chúng tôi tập trung vào việc cung cấp những đôi giày
            thời trang, độc đáo và hiện đại nhất cho bạn. Tạo nên phong cách cá
            nhân và tự tin với Sneaker!
          </p>
        </div>
        <div className={cx("Contact", "footer-item")}>
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
        <div className={cx("Help", "footer-item")}>
          <h4 className={cx("title")}>Hỗ trợ</h4>
          <ul>
            <li>
              <Link to={"/"} className={cx("footer-link")}>
                Hướng dẫn đặt hàng
              </Link>
            </li>
            <li>
              <Link to={"/"} className={cx("footer-link")}>
                Giao hàng
              </Link>
            </li>
            <li>
              <Link to={"/"} className={cx("footer-link")}>
                Hướng dẫn chọn size
              </Link>
            </li>
            <li>
              <Link to={"/"} className={cx("footer-link")}>
                Chính sách đổi trả
              </Link>
            </li>
          </ul>
        </div>
        <div className={cx("About", "footer-item")}>
          <h4 className={cx("title")}>Theo dõi chúng tôi</h4>
          <ul>
            <li>
              <Link to={"/"} className={cx("footer-link")}>
                <img className={cx("footer-icon")} src={icons.facebook}></img>
                Facebook
              </Link>
            </li>
            <li>
              <Link to={"/"} className={cx("footer-link")}>
                <img className={cx("footer-icon")} src={icons.intagram}></img>
                Intagram
              </Link>
            </li>
            <li>
              <Link to={"/"} className={cx("footer-link")}>
                <img className={cx("footer-icon")} src={icons.youtube}></img>
                Youtube
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
