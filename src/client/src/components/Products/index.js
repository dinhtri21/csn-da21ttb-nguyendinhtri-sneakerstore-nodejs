import classNames from "classnames/bind";
import styles from "./Products.module.scss";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const cx = classNames.bind(styles);

function Products({ products }) {
  console.log(products);
  const [sortBy, setSortBy] = useState("default");
  const [filterSize, setFilterSize] = useState("default");

  const handleSortChange = (valueSort) => {
    setSortBy(valueSort);
  };
  const handleFilterSizeChange = (value) => {
    setFilterSize(value);
  };

  //sắp xếp biến sortedProducts để in ra
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "default") {
      return 0; // Giữ nguyên thứ tự mặc định
    } else if (sortBy === "increase") {
      return a.price - b.price; // Sắp xếp giá tăng dần
    } else if (sortBy === "reduce") {
      return b.price - a.price; // Sắp xếp giá giảm dần
    }
  });

  const filterSizeProduct = [...sortedProducts].filter((product) => {
    if (filterSize === "default") {
      return true;
    } else {
      return product.size === filterSize;
    }
  });

  return (
    <div className={cx("container",'container-products')}>
      <div className={cx("grid")}>
        <div className={cx("products-title", "row")}>
          <h2 className={cx("products-title-text", "col-full-width")}>
            Tất cả sản phẩm
          </h2>
        </div>
        <div className={cx("filter", "row")}>
          <h4 className={cx("filter-title", "col-1")}>BỘ LỌC</h4>
          <div className={cx("sort-price", "col-2", "col-half")}>
            <h4>Sắp xếp:</h4>
            <select
              className={cx("sort-price-select")}
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="default" className={cx("sort-item")}>
                Mặc định
              </option>
              <option value="increase" className={cx("sort-item")}>
                Giá tăng dần
              </option>
              <option value="reduce" className={cx("sort-item")}>
                Giá giảm dần
              </option>
            </select>
          </div>
          <div className={cx("sort-size", "col-2", "col-half")}>
            <h4>Kích thước:</h4>
            <select
              value={filterSize}
              className={cx("sort-size-select")}
              onChange={(e) => handleFilterSizeChange(e.target.value)}
            >
              <option value="default">Mặc định</option>
              <option value="L">L</option>
              <option value="M">M</option>
              <option value="S">S</option>
            </select>
          </div>
        </div>
        <div className={cx("product-container", "row")}>
          {filterSizeProduct.map((product, index) => {
            return (
              <Link
                to={`/products/${product.product_id}`}
                className={cx("product-item", "col-3", "col-half")}
                key={index}
              >
                <div className={cx("product-item-inner")}>
                  <img className={cx("product-img")} src={product.image1} />
                  {/* <img className={cx("product-img")} src="https://saigonsneaker.com/wp-content/uploads/2021/07/vans-style-36-Marshmallow-Dress-Blue-3-430x430.jpg.webp" /> */}
                  <h4 className={cx("product-title")}>{product.name}</h4>
                  <h6 className={cx("product-brand")}>{product.brand}</h6>
                  <h5 className={cx("product-price")}>
                    {Math.round(product.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}₫
                  </h5>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Products;
