import classNames from "classnames/bind";
import styles from "./BannerHome.module.scss";
import images from "../../assets/images";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);

function BannerHome() {
  // console.log(images)
  return (
    <div className={cx("container")}>
      <div className={cx("grid", "banner-grid")}>
        <div className={cx("row")}>
          <div className={cx("col-12","banner")}>
            <img
              className={cx("banner-img")}
              src={images.bannerSale5}
              alt="banner"
            />
            {/* <div className={cx("banner-describe")}>
            <h2 className={cx('banner-tittle')}>New product line Nike classic</h2>
            <Link to={'products'} className={cx('banner-btn')}>Buy now</Link>
        </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BannerHome;
