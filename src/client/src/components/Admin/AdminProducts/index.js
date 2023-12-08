import classNames from "classnames/bind";
import styles from "./AdminProducts.module.scss";
const cx = classNames.bind(styles);

function AdminProducts() {
  return (
    <div className={cx("container","container-page-admin")}>
        <h1>Sản phẩm</h1>
    </div>
  );
}

export default AdminProducts;

