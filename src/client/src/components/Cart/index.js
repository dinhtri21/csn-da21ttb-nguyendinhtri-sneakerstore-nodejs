import classNames from "classnames/bind";
import styles from "./Cart.module.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cx = classNames.bind(styles);

function Cart({ products, updateCart }) {
  console.log(products);
  console.log("render-com");

  const notify = (mess) =>
    toast.success(`${mess}`, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

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
      notify(response.data.message)
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
      notify(mess);
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
        position="top-right"
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
        <div className={cx("row")}>
          <div className={cx("col-12")}>
            <h3>Giỏ hàng của bạn</h3>
          </div>
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
                        Xoá
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
              <div className={cx("col-6")}>
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
                <button className={cx("col-12", "pay-btn")}>Thanh toán</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
