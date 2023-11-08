import classNames from "classnames/bind";
import styles from "./BodyHome.module.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function BodyHome({ products }) {
  return (
    <div className={cx("container")}>
      <div className={cx("grid")}>
        <div className={cx("row")}>
          <div className={cx("col-12")}>
            <h3 className={cx("title-body")}>NỔI BẬT</h3>
          </div>
        </div>
        <div className={cx("row", "products-container")}>
          {products.map((product, index) => {
            return (
              <Link
                to={`/products/${product.product_id}`}
                className={cx("product-item", "col-3", "col-half")}
                key={index}
              >
                <div className={cx("product-item-inner")}>
                  <img className={cx("product-img")} src={product.image1} />
                  <h4 className={cx("product-title")}>{product.name}</h4>
                  <h5 className={cx("product-price")}>{product.price}</h5>
                </div>
              </Link>
            );
          })}
        </div>

        <div className={cx("row")}>
          <div className={cx("col-12")}>
            <h3 className={cx("title-body")}>BÁN CHẠY TRONG TUẦN QUA</h3>
          </div>
        </div>
        <div className={cx("row", "products-container")}>
          {products.map((product, index) => {
            return (
              <Link
                to={`/products/${product.product_id}`}
                className={cx("product-item", "col-3", "col-half")}
                key={index}
              >
                <div className={cx("product-item-inner")}>
                  <img className={cx("product-img")} src={product.image1} />
                  <h4 className={cx("product-title")}>{product.name}</h4>
                  <h5 className={cx("product-price")}>{product.price}</h5>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default BodyHome;
