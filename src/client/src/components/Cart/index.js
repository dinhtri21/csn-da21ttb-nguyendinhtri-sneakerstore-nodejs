import classNames from "classnames/bind";
import styles from "./Cart.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import { CiSquareRemove } from "react-icons/ci";
import store, { updateCartItems } from "../../store";

const cx = classNames.bind(styles);

function Cart({ products, updateCart }) {
  console.log(products);


  // START: ĐẾM SẢN PHẨM TRONG GIỎ HÀNG //
  const handleCountProductsCart = async () => {
    try {
      // Gửi yêu cầu GET đến API để lấy số lượng sản phẩm trong giỏ hàng
      const response = await axios.get(
        "http://localhost:3001/cart/getcartcount",
        {
          withCredentials: true, // Bật chế độ gửi cookie với yêu cầu
        }
      );
      // Sau khi lấy số lượng từ server, gửi action để cập nhật số lượng trong Redux store
      const cartCount = response.data.cartCount;
      store.dispatch(updateCartItems(cartCount));
    } catch (error) {
      console.error("Error getting cart count:", error);
    }
  };
  // END: ĐẾM SẢN PHẨM TRONG GIỎ HÀNG //
  const handleQuantityChange = async (productId, size, quantity) => {
    console.log(productId, size, quantity);
    try {
      const response = await axios.post(
        "http://localhost:3001/cart/updateProductCart",
        {
          productId,
          quantity,
          size,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data.message);
      toast.success(response.data.message);
      handleCountProductsCart();
      if (updateCart) {
        updateCart();
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };
  const handleRemoveProduct = async (productId, size) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/cart/removeProductCart",
        {
          productId,
          size,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data.message);
      const mess = response.data.message;
      handleCountProductsCart();
      toast.success(mess);
      if (updateCart) {
        updateCart();
      }
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };
  const handleDecreaseQuantity = (productId, size, currentQuantity) => {
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;
      handleQuantityChange(productId, size, newQuantity);
    }
  };

  const handleIncreaseQuantity = (productId, size, currentQuantity) => {
    const newQuantity = currentQuantity + 1;
    handleQuantityChange(productId, size, newQuantity);
  };

  return (
    <div className={cx("container")}>
      {/* Render the list of toasts */}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <div className={cx("grid", "cart-grid")}>
        <div className={cx("row", "router-page-container")}>
          <Link className={cx("router-page", "active")} to={"/cart"}>
            Giỏ hàng
          </Link>
          <MdKeyboardArrowRight fill="#999999" />
          <Link className={cx("router-page")} to={"/checkout"}>
            Thanh toán
          </Link>
        </div>
        <div className={cx("row")}>
          {/* cart */}
          <div className={cx("col-9", "products-cart")}>
            {/* product */}

            {products.length == 0 ? (
              <h3 className={cx("col-12", "no-product-cart")}>
                Chưa có sản phẩm nào trong giỏ hàng.
              </h3>
            ) : (
              <>
                <div className={cx("row", "products-cart-title")}>
                  {/* <div className={cx("row")}> */}
                  <div className={cx("col-12", "title-my-cart")}>
                    <h3>GIỎ HÀNG CỦA BẠN</h3>
                  </div>
                  {/* </div> */}
                  <div className={cx("col-1")}>Ảnh</div>
                  <div className={cx("col-4")}>Tên sản phẩm</div>
                  <div className={cx("col-1")}>Size</div>
                  <div className={cx("col-2")}>Giá</div>
                  <div className={cx("col-2")}>Số lượng</div>
                  <div className={cx("col-2")}>Thành Tiền</div>
                </div>
                {products.map((product, index) => {
                  return (
                    <div
                      to={`/products/${product.product_id}`}
                      className={cx("row", "products")}
                      key={index}
                    >
                      <div className={cx("col-1", "ali-center", "img-product")}>
                        <img src={product.image1}></img>
                      </div>
                      <Link
                        to={`/products/${product.product_id}`}
                        className={cx("col-4", "product-title", "ali-center")}
                      >
                        {product.name}
                      </Link>
                      <div className={cx("col-1", "ali-center")}>
                        {product.size}
                      </div>
                      <div className={cx("col-2", "ali-center")}>
                        {Math.round(product.price)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                        ₫
                      </div>
                      <div className={cx("col-2", "ali-center")}>
                        <div className={cx("quantity")}>
                          <button
                            onClick={() =>
                              handleDecreaseQuantity(
                                product.product_id,
                                product.size,
                                product.quantity_oder
                              )
                            }
                            className={cx("quantity-Div")}
                          >
                            -
                          </button>
                          <div className={cx("quantity-display")}>
                            {product.quantity_oder}
                          </div>
                          <button
                            onClick={() =>
                              handleIncreaseQuantity(
                                product.product_id,
                                product.size,
                                product.quantity_oder
                              )
                            }
                            className={cx("quantity-Div")}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className={cx("col-2", "ali-center")}>
                        {product.total_amount_product
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                        ₫
                      </div>
                      <button
                        onClick={() =>
                          handleRemoveProduct(product.product_id, product.size)
                        }
                        className={cx("remove-product-btn")}
                      >
                        <CiSquareRemove />
                      </button>
                    </div>
                  );
                })}
              </>
            )}

            {/* end product */}
          </div>

          {/* pay */}
          <div className={cx("col-3", "pay")}>
            <div className={cx("row")}>
              <div className={cx("col-12", "pay-title")}>
                <h1 className={cx("pay-title-h1")}>CỘNG GIỎ HÀNG</h1>
              </div>
            </div>
            <div className={cx("row")}>
              <div className={cx("col-12")}>
                <p>
                  Phí vận chuyển sẽ được tính ở trang thanh toán.
                  <br></br>
                  Bạn cũng có thể nhập mã giảm giá ở trang thanh toán.
                </p>
              </div>
            </div>
            <div className={cx("row")}>
              <div className={cx("col-6", "total-amount-title-container")}>
                <h2 className={cx("total-amount-title")}>Tổng tiền</h2>
              </div>
              <div className={cx("col-6")}>
                <h2 className={cx("total-amount")}>
                  {products[0]
                    ? products[0].total_amount_cart
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                    : 0}
                  ₫
                </h2>
              </div>
            </div>

            <div className={cx("row")}>
              <div className={cx("col-12")}>
                <Link to={"/checkout"} className={cx("col-12", "checkout-btn")}>
                  Thanh toán
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
