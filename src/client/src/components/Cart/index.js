import classNames from "classnames/bind";
import styles from "./Cart.module.scss";
import { useRef, useState } from "react";
import axios from "axios";

const cx = classNames.bind(styles);

function Cart({ products }) {
  // console.log(products);

  // console.log(quantity_oder);
  // console.log(quantity_oderRef)
  //handle
  const handleDecreaseQuantity = async (e) => {
    const size =
      e.target.parentElement.parentElement.parentElement.children[3].innerText;
    const id = Number(
      e.target.parentElement.parentElement.parentElement.getAttribute(
        "product_id"
      )
    );
    var quantity = Number(e.target.parentElement.children[1].innerText);
    try {
      const response = await axios.post(
        "http://localhost:3001/cart/addtocart",
        {
          productId: id,
          quantity: quantity,
          size: size,
        },
        {
          withCredentials: true, // Bật chế độ gửi cookie với yêu cầu
        }
      );
      console.log(response.data.message);
      quantity++;
      e.target.parentElement.children[1].innerText = quantity;
      // Xử lý thông báo hoặc chuyển hướng tùy thuộc vào response từ server
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };
  const handleIncreaseQuantity = () => {};

  return (
    <div className={cx("container")}>
      <div className={cx("grid", "cart-grid")}>
        <div className={cx("row")}>
          <div className={cx("col-12")}>
            <h3>Giỏ hàng của bạn</h3>
          </div>
        </div>
        <div className={cx("row")}>
          {/* cart */}
          <div className={cx("col-9", "products-cart")}>
            <div className={cx("row", "products-cart-title")}>
              <div className={cx("col-1")}>Ảnh</div>
              <div className={cx("col-4")}>Tên sản phẩm</div>
              <div className={cx("col-2")}>Giá</div>
              <div className={cx("col-1")}>Size</div>
              <div className={cx("col-2")}>Số lượng</div>
              <div className={cx("col-2")}>Thành Tiền</div>
            </div>
            {/* product */}

            {products.map((product, index) => {
              return (
                <div
                  product_id={product.product_id}
                  className={cx("row", "products")}
                  key={index}
                >
                  <div className={cx("col-1", "ali-center", "img-product")}>
                    <img src={product.image1}></img>
                  </div>
                  <div className={cx("col-4", "product-title", "ali-center")}>
                    {product.name}
                  </div>
                  <div className={cx("col-2", "ali-center")}>
                    {product.price}
                  </div>
                  <div className={cx("col-1", "ali-center")}>
                    {product.size}
                  </div>
                  <div className={cx("col-2", "ali-center")}>
                    <div className={cx("quantity")}>
                      <button
                        onClick={handleIncreaseQuantity}
                        className={cx("quantity-Div")}
                      >
                        -
                      </button>
                      <div className={cx("quantity-display")}>
                        {product.quantity_oder}
                      </div>
                      <button
                        onClick={handleDecreaseQuantity}
                        className={cx("quantity-Sum")}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className={cx("col-2", "ali-center")}>4000</div>
                </div>
              );
            })}

            {/* end product */}
          </div>

          {/* pay */}
          <div className={cx("col-3", "pay")}>
            <div className={cx("row")}>
              <div className={cx("col-12")}>
                <h1 className={cx("pay-title")}>Cộng giỏ hàng</h1>
              </div>
            </div>
            <div className={cx("row")}>
              <div className={cx("col-6")}>
                <h2 className={cx("total-amount-title")}>Tổng tiền</h2>
              </div>
              <div className={cx("col-6")}>
                <h2 className={cx("total-amount")}>2000.000</h2>
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
