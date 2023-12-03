import classNames from "classnames/bind";
import styles from "./Product.module.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import store, { updateCartItems } from "../../store";

const cx = classNames.bind(styles);

function ProductDetail({ product }) {
  console.log(product);
  let sizeDefault;
  let varianceDefault;

  if (product && product.variants) {
    sizeDefault = product.variants[0].size;
    varianceDefault = product.variants[0].variance_id;
  }

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(sizeDefault);
  const [varianceId, setVarianceId] = useState(varianceDefault);

  //handle
  const handleDecreaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  const handleIncreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  // START: ĐÉM SẢN PHẨM TRONG GIỎ HÀNG //
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
  // END: ĐÉM SẢN PHẨM TRONG GIỎ HÀNG //
  //select Size
  const handleSelectSize = (size, variance_id) => {
    setSelectedSize(size);
    setVarianceId(variance_id);
  };
  //handle addtocart
  const handleAddToCart = async () => {
    if (selectedSize && varianceId) {
      try {
        // Gửi yêu cầu POST đến API để thêm sản phẩm vào giỏ hàng
        const response = await axios.post(
          "http://localhost:3001/cart/addtocart",
          {
            productId: product.product_id,
            quantity: quantity,
            size: selectedSize,
            varianceId: varianceId,
          },
          {
            withCredentials: true, // Bật chế độ gửi cookie với yêu cầu
          }
        );
        console.log(response.data.message);
        const mess = response.data.message;
        toast.success(`${mess}`);
        // Sau khi thêm vào giỏ hàng thành công, cập nhật số lượng sản phẩm trong Redux store
        handleCountProductsCart();
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    } else {
      toast.error(`Vui lòng chọn size`);
    }
  };

  return (
    <div className={cx("container", "container-ProductDetail")}>
      {/* Render the list of toasts */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
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
          <div className={cx("col-12", "router-page-container")}>
            <Link
              className={cx("router-page", "active-router")}
              to={"/products"}
            >
              Sản phẩm
            </Link>
            <MdKeyboardArrowRight
              fill="#999999"
              className={cx("icon-router")}
            />
            <Link className={cx("router-page", "active-router")} to={"#"}>
              Chi tiết sản phẩm
              {/* {product.name} */}
            </Link>
          </div>
        </div>
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
                      type="radio"
                      onClick={() =>
                        handleSelectSize(variant.size, variant.variance_id)
                      }
                      key={index}
                      value={variant.variance_id}
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
