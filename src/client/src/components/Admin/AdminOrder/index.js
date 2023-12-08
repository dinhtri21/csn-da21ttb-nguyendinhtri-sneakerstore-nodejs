import classNames from "classnames/bind";
import styles from "./AdminOrder.module.scss";
const cx = classNames.bind(styles);

function AdminOrder() {
  return (
    <div className={cx("container","container-page-admin")}>
        <h1>Đơn hàng</h1>
    </div>
  );
}

export default AdminOrder;
