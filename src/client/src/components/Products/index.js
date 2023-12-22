import classNames from "classnames/bind";
import styles from "./Products.module.scss";
import { Link } from "react-router-dom";
import { useEffect,  useState } from "react";
import { IoMdArrowDropright } from "react-icons/io";
import axios from "axios";
//Phân trang
import ReactPaginate from "react-paginate";
import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
//Phân trang



const cx = classNames.bind(styles);

function Products() {

  const [sortByPrice, setSortByPrice] = useState("default");
  const [filterSize, setFilterSize] = useState("default");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [amountPage, setAmountPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axiosProducts(currentPage);
  }, [sortByPrice, filterSize, currentPage]);
  useEffect(() => {
    axiosProductsBrand(1);
  }, [selectedBrands]);

  const axiosProducts = async (page) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/products/filter`,
        {
          params: {
            sortprice: sortByPrice,
            filterSize: filterSize,
            brands: selectedBrands.join(","),
            page: page,
          },
        }
      );

      setNewProducts(response.data);
      setAmountPage(
        Math.ceil(response.data[0]?.total_number_products_filter / 9)
      );
    } catch (err) {
      console.log("Error: " + err);
    }
  };

  const axiosProductsBrand = async (page) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/products/filter`,
        {
          params: {
            sortprice: sortByPrice,
            filterSize: filterSize,
            brands: selectedBrands.join(","),
            page: page,
          },
        }
      );

      setNewProducts(response.data);
      setAmountPage(
        Math.ceil(response.data[0]?.total_number_products_filter / 9)
      );
      setCurrentPage(1);
    } catch (err) {
      console.log("Error: " + err);
    }
  };


  const handleSortPriceChange = (valueSort) => {
    setSortByPrice(valueSort);
  };
  //BEGIN: Sắp xếp theo size//
  const handleFilterSizeChange = (value) => {
    setFilterSize(value);
  };
  //END: Sắp xếp theo size//
  //BEGIN: Sắp xếp theo brand//
  const handleBrandFilterChange = (brand) => {
    const updatedBrands = [...selectedBrands];
    if (updatedBrands.includes(brand)) {
      const index = updatedBrands.indexOf(brand);
      updatedBrands.splice(index, 1);
    } else {
      updatedBrands.push(brand);
    }
    setSelectedBrands(updatedBrands);
  };
  //END: Sắp xếp theo brand//
  const handlePageChange = ({ selected }) => {
    const newPage = selected + 1;
    setCurrentPage(newPage);
  };

  return (
    <div className={cx("container", "container-products")}>
      <div className={cx("grid")}>
        <div className={cx("products-title", "row")}>
          <h2 className={cx("products-title-text", "col-full-width", "col-6")}>
            TẤT CẢ SẢN PHẨM
          </h2>
          <div className={cx("filter-price", "col-6")}>
            <div className={cx("col-9", "col-half")}></div>
            <div className={cx("sort-price", "col-3", "col-half")}>
              <select
                className={cx("sort-price-select")}
                value={sortByPrice}
                onChange={(e) => handleSortPriceChange(e.target.value)}
              >
                <option value="default" className={cx("sort-item")}>
                  Sắp xếp theo:
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
        </div>
        <div className={cx("body-products", "row")}>
          <div className={cx("col-3")}>
            <div className={cx("filter-brand", "row")}>
              <h4 className={cx("col-12", "filter-brand-title")}>
                Thương hiệu
              </h4>
              <ul>
                {["Adidas", "Nike", "Converse", "Balenciaga"].map((brand) => (
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
                const urlName = product.name.replace(/\s+/g, "-").toLowerCase();
                return (
                  <Link
                    to={`/products/${urlName}`}
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

        {/* Thanh phân trang */}
        <div className={cx("row")}>
          <div className={cx("col-12", "page-container")}>
            <ReactPaginate
            forcePage={currentPage - 1} // Trừ 1 vì ReactPaginate tính từ 0
              previousLabel={<BsChevronLeft />}
              nextLabel={<BsChevronRight />}
              breakLabel={"..."}
              pageCount={amountPage}
              marginPagesDisplayed={1}
              pageRangeDisplayed={3}
              onPageChange={handlePageChange}
              containerClassName={cx("pagination")}
              pageClassName={cx("pagination-item")}
              pageLinkClassName={cx("pagination-item-a")}
              activeClassName={cx("pagination-item-a", "active")}
              previousClassName={cx("pagination-item-a")}
              nextClassName={cx("pagination-item-a", "next")}
              breakClassName={cx("pagination-item-a", "previous")}
            />
          </div>
        </div>
        {/*  */}
      </div>
    </div>
  );
}

export default Products;
