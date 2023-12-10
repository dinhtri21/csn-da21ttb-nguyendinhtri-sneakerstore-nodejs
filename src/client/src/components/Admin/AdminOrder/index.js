import classNames from "classnames/bind";
import styles from "./AdminOrder.module.scss";
import images from "../../../assets/images";
import { Link } from "react-router-dom";
import { FcProcess } from "react-icons/fc";
import { FcInTransit } from "react-icons/fc";
import { FcCancel } from "react-icons/fc";
import { FcOk } from "react-icons/fc";
import { RxChevronRight } from "react-icons/rx";
import { RxChevronLeft } from "react-icons/rx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function AdminOrder({ axiosProduct, page, orders }) {
  console.log(orders);
  const navigate = useNavigate();
  const [amountPage, setAmountPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    if (orders[0]) {
      setAmountPage(Math.ceil(orders[0].total_orders / 7));
    }
    setCurrentPage(page);
  }, [orders]);

  const maxVisibleButtons = 5; // Số lượng nút tối đa hiển thị

  const renderButtons = () => {
    const buttons = [];
    const halfVisibleButtons = Math.floor(maxVisibleButtons / 2);
    const startPage = Math.max(1, currentPage - halfVisibleButtons);
    const endPage = Math.min(amountPage, startPage + maxVisibleButtons - 1);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          className={cx("page-item", currentPage == i ? "page-active" : null)}
          onClick={() => handlePageChange(i)}
          // disabled={currentPage === i}
        >
          {i}
        </button>
      );
    }

    if (amountPage > 6) {
      buttons.push(
        <div
        // onClick={() => handlePageChange(i)}
        // disabled={currentPage === i}
        >
          ...
        </div>
      );

      buttons.push(
        <button
          key={amountPage}
          className={cx(
            "page-item",
            currentPage == amountPage ? "page-active" : null
          )}
          // key={i}
          onClick={() => handlePageChange(amountPage)}
          // disabled={currentPage === i}
        >
          {amountPage}
        </button>
      );
    }
    return buttons;
  };

  const handlePageChange = (i) => {
    setCurrentPage(i);
    navigate(`/admin/dashboard/order/${i}`);
    axiosProduct(i);
  };

  return (
    <div className={cx("container", "container-admin", "admin-order")}>
      <div className={cx("grid", "grid-admin")}>
        <div className={cx("row", "row-admin", "admin-header")}>
          <div className={cx("col-10")}>
            <h2 className={cx("title-page")}>ĐƠN ĐẶT HÀNG</h2>
          </div>
          <div className={cx("col-2", "admin-header-img")}>
            <div className={cx("admin-img-container")}>
              <img className={cx("img-admin")} src={images.login} />
            </div>
            <div className={cx("name-admin")}>Admin</div>
          </div>
        </div>
        {/*  */}
        <div className={cx("row", "row-admin","title-order-container")}>
          <div className={cx("col-1")}>ID</div>
          <div className={cx("col-3")}>Tên khách hàng</div>
          <div className={cx("col-2")}>Ngày đặt</div>
          <div className={cx("col-2")}>Tổng giá tiền</div>
          <div className={cx("col-2")}>Tình trạng</div>
          <div className={cx("col-2")}>Xử lý</div>
        </div>
        {orders.map((order, index) => {
          return (
            <div key={index} className={cx("row", "row-admin", "order-item")}>
              <div className={cx("col-1", "order-item-text", "order-id")}>
                {order.order_id}
              </div>
              <div className={cx("col-3", "order-item-text")}>
                {order.customer_name}
              </div>
              <div className={cx("col-2", "order-item-text")}>
                {order.order_date}
              </div>
              <div className={cx("col-2", "order-item-text")}>
                {Math.round(order.total_amount)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                ₫
              </div>
              <div className={cx("col-2", "order-item-text")}>
                {order && order.order_status == "Đang xử lý" ? (
                  <FcProcess className={cx("icon-order-status")} />
                ) : null}
                {order && order.order_status == "Đang vận chuyển" ? (
                  <FcInTransit className={cx("icon-order-status")} />
                ) : null}
                {order && order.order_status == "Đã huỷ" ? (
                  <FcCancel className={cx("icon-order-status")} />
                ) : null}
                {order && order.order_status == "Thành công" ? (
                  <FcOk className={cx("icon-order-status")} />
                ) : null}
                {/* {order && order.order_status == "Đang xử lý" ? (
                  <FcSupport />
                ) : null} */}
                {order.order_status}
              </div>
              <div className={cx("col-2", "order-item-text")}>
                <Link>Hoá đơn</Link>
              </div>
            </div>
          );
        })}

        <div className={cx("row", "row-admin")}>
          <div className={cx("col-5", "page-container")}></div>
          <div className={cx("col-2", "page-container")}>
            <RxChevronLeft />
            {renderButtons()}
            <RxChevronRight />
          </div>
        </div>
        <div className={cx("col-5", "page-container")}></div>

        {/*  */}
      </div>
    </div>
  );
}

export default AdminOrder;
