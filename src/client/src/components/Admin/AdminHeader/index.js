import classNames from "classnames/bind";
import styles from "./AdminHeader.module.scss";
import images from "../../../assets/images";
import { useLocation } from "react-router-dom";

const cx = classNames.bind(styles);

function AdminHeader() {
  const location = useLocation();
  const currentPath = location.pathname;
  const currentPath1 = currentPath.split("/");
  const lastElement = currentPath1[currentPath1.length - 1];
  console.log(currentPath);

  return (
    <div className={cx("admin-header-container")}>
      <div className={cx("grid-admin-header")}>
        <div className={cx("row")}>
          <div className={cx("col-10","title-page-container")}>
            {/* <h2 className={cx("title-page")}>{lastElement}</h2> */}
          </div>
          <div className={cx("col-2", "admin-nav")}>
            <div className={cx("img-admin-container")}>
              <img className={cx("img-admin")} src={images.login} />
            </div>
            <div className={cx("name-admin")}>Admin</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHeader;
