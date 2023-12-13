import classNames from "classnames/bind";
import styles from "./AdminProducts.module.scss";
import images from "../../../assets/images";
import { FcSupport } from "react-icons/fc";
import { FcDeleteDatabase } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import AdminPopup from "../AdminFixProduct";
import axios from "axios";
import ReactPaginate from "react-paginate";

const cx = classNames.bind(styles);

function AdminProducts({ axiosProducts, page, products }) {
  const navigate = useNavigate();
  //Map size
  const mapSize = (variants) => {
    const stringVariants = variants.map((variant) => {
      return `${variant.size}:${variant.quantity}`;
    });

    const resultString = stringVariants.join(", ");
    return resultString;
  };

  //Phân trang
  const [amountPage, setAmountPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(page);

  useEffect(() => {
    if (products[0]) {
      setAmountPage(Math.ceil(products[0].total_number_products / 6));
    }
    setCurrentPage(page);
  }, [products, page]);

  useEffect(() => {
    // Nếu bạn muốn gọi navigate và axiosProduct ở đây, thì hãy thêm điều kiện để tránh lặp vô tận
    if (currentPage !== page) {
      navigate(`/admin/dashboard/products/${currentPage}`);
      axiosProducts(currentPage);
    }
  }, [currentPage]);

  const handlePageChange = ({ selected }) => {
    const newPage = selected + 1;
    setCurrentPage(newPage);
  };

  //POPUP sửa sản phẩm //
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectProduct, setSelectProduct] = useState({});

  const togglePopup = (product) => {
    setPopupVisible((prevState) => !prevState);
    setSelectProduct(product);
  };
  //POPUP sửa sản phẩm //
  //BEGIN: XOÁ SẢN PHẨM//
  const handleDeleteProduct = async (productId) => {
    try {
      // Thực hiện logic xoá sản phẩm ở đây, có thể sử dụng Axios hoặc phương thức xoá của API
      await axios.delete(`/api/products/${productId}`);

      // Sau khi xoá thành công, cập nhật danh sách sản phẩm bằng cách gọi hàm axiosProducts
      axiosProducts(currentPage);
    } catch (error) {
      console.error("Error deleting product:", error);
      // Xử lý lỗi nếu cần
    }
  };
  //END: XOÁ SẢN PHẨM//
  return (
    <>
      <div className={cx("container", "container-admin", "admin-order")}>
        <div className={cx("grid", "grid-admin")}>
          <div className={cx("row", "row-admin", "admin-header")}>
            <div className={cx("col-10")}>
              <h2 className={cx("title-page")}>SẢN PHẨM</h2>
            </div>
            <div className={cx("col-2", "admin-header-img")}>
              <div className={cx("admin-img-container")}>
                <img className={cx("img-admin")} src={images.login} />
              </div>
              <div className={cx("name-admin")}>Admin</div>
            </div>
          </div>

          <div className={cx("row", "row-admin", "title-product-container")}>
            <div className={cx("col-1", "flex-center", "flex-center")}>ID</div>
            <div className={cx("col-1", "flex-center")}>Hình ảnh</div>
            <div className={cx("col-3", "flex-center")}>Tên Sản phẩm</div>
            <div className={cx("col-1", "flex-center")}>Brand</div>
            <div className={cx("col-1", "flex-center")}>Màu</div>
            <div className={cx("col-2", "flex-center")}>Size : Số lượng</div>
            <div className={cx("col-2", "flex-center")}>Giá</div>
            <div className={cx("col-1", "flex-center")}>Xử lý</div>
          </div>

          {products.map((product, index) => {
            return (
              <div
                key={index}
                className={cx("row", "row-admin", "product-item")}
              >
                <div
                  className={cx(
                    "col-1",
                    "product-item-text",
                    "product-id",
                    "flex-center"
                  )}
                >
                  {product.product_id}
                </div>
                <div
                  className={cx(
                    "col-1",
                    "flex-center",
                    "product-item-text",
                    "flex-center"
                  )}
                >
                  <img className={cx("product-img")} src={product.image1} />
                </div>
                <div
                  className={cx("col-3", "flex-center", "product-item-text")}
                >
                  {product.name}
                </div>
                <div
                  className={cx("col-1", "flex-center", "product-item-text")}
                >
                  {product.brand}
                </div>
                <div className={cx("col-1", "flex-center", "order-item-text")}>
                  {product.variants[0].color}
                </div>
                <div
                  className={cx("col-2", "flex-center", "product-item-text")}
                >
                  {mapSize(product.variants)}
                </div>
                <div
                  className={cx("col-2", "flex-center", "product-item-text")}
                >
                  {product.price}₫
                </div>

                <div className={cx("col-1", "flex-center", "order-item-text")}>
                  <button
                    onClick={() => {
                      togglePopup(product);
                    }}
                    className={cx("icon-product-handle-div")}
                    title="Sửa"
                  >
                    <FcSupport className={cx("icon-product-handle")} />
                  </button>
                  <button
                    to={"#"}
                    className={cx("icon-product-handle-div")}
                    title="Xoá"
                    onClick={() => handleDeleteProduct(product.product_id)}
                  >
                    <FcDeleteDatabase className={cx("icon-product-handle")} />
                  </button>
                </div>
              </div>
            );
          })}
          {/* Thanh phân trang */}
          <div className={cx("row", "row-admin")}>
            <div className={cx("col-12", "flex-center", "page-container")}>
              <ReactPaginate
                previousLabel={<BsChevronLeft />}
                nextLabel={<BsChevronRight />}
                breakLabel={"..."}
                pageCount={amountPage}
                marginPagesDisplayed={1} //có bao nhiêu trang sẽ xuất hiện ở phía trước và sau nút "trước" và "sau".
                pageRangeDisplayed={3} //có bao nhiêu trang sẽ xuất hiện giữa các nút "previous" và "next".
                onPageChange={handlePageChange} //hàm xử lý được gọi khi người dùng chuyển trang.  Prop này nhận một đối số là đối tượng { selected }, trong đó selected là số trang đã chọn (đếm từ 0).
                containerClassName={cx("pagination")} // thẻ ul
                pageClassName={cx("pagination-item")} // thẻ li
                pageLinkClassName={cx("pagination-item-a")} //thẻ a
                activeClassName={cx("pagination-item-a", "active")} //a active
                previousClassName={cx("pagination-item-a")} //lui
                nextClassName={cx("pagination-item-a", "next")} //tới
                breakClassName={cx("pagination-item-a", "previous")} //dấu ...
              />
            </div>
          </div>
          {/*  */}
        </div>
      </div>
      {/* popup */}
      <AdminPopup
        product={selectProduct}
        isVisible={isPopupVisible}
        onClose={togglePopup}
      />
    </>
  );
}

export default AdminProducts;
