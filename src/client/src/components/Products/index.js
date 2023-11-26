import classNames from "classnames/bind";
import styles from "./Products.module.scss";
import { Link, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { IoMdArrowDropright } from "react-icons/io";
import axios from "axios";

const cx = classNames.bind(styles);

function Products({ products }) {
  console.log(products);
  const [sortByPrice, setSortByPrice] = useState("default");
  const [filterSize, setFilterSize] = useState("default");
  const [selectedBrands, setSelectedBrands] = useState([]);
  //

  const [newProducts, setNewProducts] = useState([]);
  //
  //tạo param url
  const apiFilter = "http://localhost:3001/products/filter";
  const apiFilterParams = {
    sortprice: sortByPrice,
    filterSize: filterSize,
    brands: selectedBrands.join(","),
  };
  const queryString = new URLSearchParams(apiFilterParams).toString();
  const requestUrl = `${apiFilter}?${queryString}`;
  console.log(requestUrl);
  //ket qua => http://localhost:3001/products/filter?sortBy=increase&filterSize=default&brands=Adidas
  //sắp xếp theo giá
  const handleSortPriceChange = (valueSort) => {
    setSortByPrice(valueSort);
  };
  //sắp xếp theo size
  const handleFilterSizeChange = (value) => {
    setFilterSize(value);
  };
  //sắp xếp theo brand
  const handleBrandFilterChange = (brand) => {
    const updatedBrands = [...selectedBrands];

    // Nếu thương hiệu đã được chọn, hủy chọn. Ngược lại, thêm vào danh sách.
    if (updatedBrands.includes(brand)) {
      const index = updatedBrands.indexOf(brand);
      updatedBrands.splice(index, 1);
    } else {
      updatedBrands.push(brand);
    }

    setSelectedBrands(updatedBrands);
  };
 
  //call api sau khi filter
  useEffect(() => {
    fetchData(requestUrl);
  }, [sortByPrice, filterSize, selectedBrands]);

  //call api
  const fetchData = async (requestUrl) => {
    try {
      const response = await axios.get(requestUrl);
      const data = response.data;
      console.log(data);
      setNewProducts(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className={cx("container", "container-products")}>
      <div className={cx("grid")}>
        <div className={cx("products-title", "row")}>
          <h2 className={cx("products-title-text", "col-full-width")}>
            TẤT CẢ SẢN PHẨM
          </h2>
        </div>
        <div className={cx("filter-price", "row")}>
          <div className={cx("col-9", "col-half")}></div>
          <div className={cx("sort-price", "col-3", "col-half")}>
            <select
              className={cx("sort-price-select")}
              value={sortByPrice}
              onChange={(e) => handleSortPriceChange(e.target.value)}
            >
              <option value="default" className={cx("sort-item")}>
                Mặc định
              </option>
              <option value="increase" className={cx("sort-item")}>
                Giá tăng dần
              </option>
              <option value="decrease" className={cx("sort-item")}>
                Giá giảm dần
              </option>
            </select>
          </div>
        </div>
        <div className={cx("body-products", "row")}>
          <div className={cx("col-3")}>
            <div className={cx("filter-brand", "row")}>
              <h4 className={cx("col-12", "filter-brand-title")}>
                Thương hiệu
              </h4>
              <ul>
                {["Adidas", "Nike", "Dior", "Balenciaga"].map((brand) => (
                  <li
                    key={brand}
                    className={cx("col-12", "brand-item", {
                      selected: selectedBrands.includes(brand),
                    })}
                    onClick={() => handleBrandFilterChange(brand)}
                  >
                    <IoMdArrowDropright className={cx("brand-item-icon")} />{" "}
                    {brand}
                  </li>
                ))}
              </ul>
            </div>

            {/*  */}
          </div>

          <div className={cx("col-9")}>
            {" "}
            <div className={cx("product-container", "row")}>
              {newProducts.map((product, index) => {
                return (
                  <Link
                    to={`/products/${product.product_id}`}
                    className={cx("product-item", "col-4", "col-half")}
                    key={index}
                  >
                    <div className={cx("product-item-inner")}>
                      <img className={cx("product-img")} src={product.image1} />
                      <h4 className={cx("product-title")}>{product.name}</h4>
                      <h6 className={cx("product-brand")}>{product.brand}</h6>
                      <h5 className={cx("product-price")}>
                        {Math.round(product.price)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                        ₫
                      </h5>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
