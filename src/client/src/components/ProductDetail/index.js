import classNames from "classnames/bind";
import styles from "./Product.module.scss";
import { useState } from "react";
const cx = classNames.bind(styles);

function ProductDetail({ product }) {
  // console.log(product.image1);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
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
  return (
    <div className={cx("container")}>
      <div className={cx("grid", "product-detail-row")}>
        <div className={cx("row")}>
          <div className={cx("col-6", "product-img")}>
            <img src={product.image1} />
          </div>
          <div className={cx("col-6", "product-des")}>
            <h1 className={cx("product-title")}>{product.name}</h1>
            <h2 className={cx("product-price")}>{product.price}đ</h2>
            <div className={cx("product-size")}>
              <h3 className={cx("size-title")}>Size:</h3>
              {/* {product.size.map((size, index) => {
              return (
                <button
                  onClick={(e) => handleSelectSize(e.target.textContent)}
                  key={index}
                  className={cx("size", size === selectedSize ? "selected" : null)}
                >
                  {size}
                </button>
              );
            })} */}
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
            <button className={cx("add-to-cart-btn")}>THÊM VÀO GIỎ</button>
            <p className={cx("product-infomation")}>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
