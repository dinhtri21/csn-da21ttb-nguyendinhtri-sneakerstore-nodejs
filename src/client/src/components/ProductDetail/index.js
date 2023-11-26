import classNames from "classnames/bind";
import styles from "./Product.module.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cx = classNames.bind(styles);

function ProductDetail({ product }) {
  console.log(product)
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("39");

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

  //handle
  const handleDecreaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  const handleIncreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  //select Size
  const handleSelectSize = (value) => {
    setSelectedSize(value);
  };
  //handle addtocart
  const handleAddToCart = async () => {
    try {
      // Gửi yêu cầu POST đến API để thêm sản phẩm vào giỏ hàng
      const response = await axios.post(
        "http://localhost:3001/cart/addtocart",
        {
          productId: product.product_id,
          quantity: quantity,
          size: selectedSize,
        },
        {
          withCredentials: true, // Bật chế độ gửi cookie với yêu cầu
        }
      );
      console.log(response.data.message);
      const mess = response.data.message;
      notify(mess);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className={cx("container", "container-ProductDetail")}>
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
      <div className={cx("grid", "product-detail-row")}>
        <div className={cx("row")}>
          <div className={cx("col-6", "product-img")}>
            <img src={product.image1} />
          </div>
          <div className={cx("col-6", "product-des")}>
            <h1 className={cx("product-title")}>{product.name}</h1>
            <h2 className={cx("product-price")}>
              {Math.round(product.price)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              ₫
            </h2>
            <div className={cx("product-size")}>
              {/* Thêm kiểm tra để đảm bảo product và product.variants tồn tại trước khi map */}
              {product && product.variants && (
                <div className={cx("product-size")}>
                  <h3 className={cx("size-title")}>Size:</h3>
                  {product.variants.map((variant, index) => (
                    <button
                      onClick={() => handleSelectSize(variant.size)}
                      key={index}
                      className={cx(
                        "size",
                        variant.size === selectedSize ? "selected" : null
                      )}
                    >
                      {variant.size}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className={cx("product-quantity")}>
              <h4 className={cx("quantity-title")}>Số lượng:</h4>
              <div className={cx("quantity")}>
                <button
                  onClick={handleIncreaseQuantity}
                  className={cx("quantity-Div")}
                >
                  -
                </button>
                <div className={cx("quantity-display")}>{quantity}</div>
                <button
                  onClick={handleDecreaseQuantity}
                  className={cx("quantity-Sum")}
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={() => {
                handleAddToCart();
              }}
              className={cx("add-to-cart-btn")}
            >
              THÊM VÀO GIỎ
            </button>
            <p className={cx("product-infomation")}>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
