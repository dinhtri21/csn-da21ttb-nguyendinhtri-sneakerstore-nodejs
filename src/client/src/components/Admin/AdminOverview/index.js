import classNames from "classnames/bind";
import styles from "./AdminOverview.module.scss";
import { FcApproval } from "react-icons/fc";
import { FcMoneyTransfer } from "react-icons/fc";
import { FcConferenceCall } from "react-icons/fc";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const cx = classNames.bind(styles);

function AdminOverview() {
  const data = [
    { month: "January", revenue: 110 },
    { month: "February", revenue: 59 },
    { month: "March", revenue: 80 },
    { month: "April", revenue: 81 },
    { month: "May", revenue: 56 },
    { month: "June", revenue: 55 },
    { month: "July", revenue: 40 },
  ];

  return (
    <div className={cx("container", "container-admin")}>
      <div className={cx("grid", "grid-admin")}>
        <div className={cx("row", "row-admin")}>
          <div className={cx("col-12")}>
            <h2 className={cx("title-page")}>TỔNG QUAN WEBSITE</h2>
          </div>
        </div>
        <div className={cx("row", "row-admin")}>
          <div className={cx("col-4")}>
            <div className={cx("overview-container")}>
              <FcApproval className={cx("overview-icon")} />
              <div className={cx("overview-inner")}>
                <h3 className={cx("overview-inner-title")}>Số đơn hàng</h3>
                <p className={cx("overview-inner-number")}>100</p>
              </div>
            </div>
          </div>
          <div className={cx("col-4")}>
            <div className={cx("overview-container")}>
              <FcMoneyTransfer className={cx("overview-icon")} />
              <div className={cx("overview-inner")}>
                <h3 className={cx("overview-inner-title")}>
                  Tổng danh thu 7 ngày
                </h3>
                <p className={cx("overview-inner-number")}>500.000đ</p>
              </div>
            </div>
          </div>
          <div className={cx("col-4")}>
            <div className={cx("overview-container")}>
              <FcConferenceCall className={cx("overview-icon")} />
              <div className={cx("overview-inner")}>
                <h3 className={cx("overview-inner-title")}>Lượng khách hàng</h3>
                <p className={cx("overview-inner-number")}>200</p>
              </div>
            </div>
          </div>
          {/* <div className={cx("col-3")}>
            <div className={cx("overview-container")}>
              <FcDeleteColumn  className={cx("overview-icon")} />
              <div className={cx("overview-inner")}>
                <h3 className={cx("overview-inner-title")}>Đơn thất bại</h3>
                <p className={cx("overview-inner-number")}>100</p>
              </div>
            </div>
          </div> */}
        </div>
        <div className={cx("row", "row-admin")}>
          <div className={cx("col-12")}>
            <LineChart width={1000} height={500} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
            </LineChart>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminOverview;
