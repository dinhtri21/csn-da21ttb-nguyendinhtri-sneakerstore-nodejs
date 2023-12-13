import classNames from "classnames/bind";
import styles from "./AdminPopup.module.scss";
import { VscCloseAll } from "react-icons/vsc";
import { useEffect, useState } from "react";
import axios from "axios";

const cx = classNames.bind(styles);

function AdminPopup({ product, isVisible, onClose }) {
  const [productData, setProductData] = useState();
  const [variantsData, setVariantsData] = useState([]);

  useEffect(() => {
    setProductData(product);
    setVariantsData(product.variants);
  }, [product]);

  if (!isVisible) {
    return null;
  }

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...variantsData];
    newVariants[index] = { ...newVariants[index], [field]: value };
    setVariantsData(newVariants);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Gửi dữ liệu về server
      const response = await axios.put(
        `http://localhost:3001/admin/putAdminProduct`,
        {
          ...productData,
          variants: variantsData,
        }
      );

      if (response.status === 200) {
        console.log(response);
        // // Cập nhật UI nếu thành công
        // onUpdate({ ...productData, variants: variantsData });
        // onClose(); // Đóng popup sau khi cập nhật thành công
      } else {
        // Xử lý lỗi nếu có
        console.error("Update failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={cx("container", "container-popup")}>
      <div className={cx("grid", "grid-popup")}>
        <div className={cx("row")}>
          <div className={cx("col-11")}>
            <h1 className={cx("title-popup")}>SỬA SẢN PHẨM</h1>
          </div>
          <div onClick={onClose} className={cx("col-1", "close")}>
            <VscCloseAll className={cx("close-icon")} />
          </div>
        </div>
        {/*  */}
        <form onSubmit={handleSubmit}>
          {/* Form cho thông tin product */}

          <div className={cx("row")}>
            <div className={cx("col-3", "label-div")}>
              <label htmlFor="id">ID</label>
            </div>
            <div className={cx("col-1")}>
              <span>{productData.product_id}</span>
            </div>
          </div>
          {/*  */}
          <div className={cx("row")}>
            <div className={cx("col-3", "label-div")}>
              <label htmlFor="name">Tên sản phẩm</label>
            </div>
            <div className={cx("col-9")}>
              <input
                className={cx("input-form", "input-form-name")}
                id="name"
                type="text"
                name="name"
                value={productData.name}
                onChange={handleProductChange}
              ></input>
            </div>
          </div>
          {/*  */}
          <div className={cx("row")}>
            <div className={cx("col-3", "label-div")}>
              <label htmlFor="description">Mô tả</label>
            </div>
            <div className={cx("col-9")}>
              <textarea
                className={cx("input-form")}
                value={productData.description}
                onChange={handleProductChange}
                name="description"
                id="description"
              ></textarea>
            </div>
          </div>
          {/*  */}
          <div className={cx("row")}>
            <div className={cx("col-3", "label-div")}>
              <label htmlFor="color">Màu sắc</label>
            </div>
            <div className={cx("col-6")}>
              <input
                className={cx("input-form")}
                id="color"
                type="text"
                name="color"
                value={
                  variantsData && variantsData[0] ? variantsData[0].color : ""
                }
                onChange={(e) =>
                  handleVariantChange(0, "color", e.target.value)
                }
              ></input>
            </div>
          </div>
          {/*  */}
          <div className={cx("row")}>
            <div className={cx("col-3", "label-div")}>
              <label htmlFor="price">Giá</label>
            </div>
            <div className={cx("col-6")}>
              <input
                className={cx("input-form")}
                id="price"
                type="text"
                name="price"
                onChange={handleProductChange}
                value={productData.price}
              ></input>
            </div>
          </div>
          {/*  */}
          <div className={cx("row")}>
            <div className={cx("col-3", "label-div")}>
              <label htmlFor="brand">Thương hiệu</label>
            </div>
            <div className={cx("col-6")}>
              <input
                className={cx("input-form")}
                id="brand"
                type="text"
                name="brand"
                value={productData.brand}
                onChange={handleProductChange}
              />
            </div>
          </div>
          {/*  */}
          <div className={cx("row")}>
            <div className={cx("col-3", "label-div")}>
              <label htmlFor="size">Size và Số lượng</label>
            </div>
            <div className={cx("col-9")}>
              {variantsData &&
                variantsData.map((variant, index) => {
                  return (
                    <div key={index} className={cx("row")}>
                      <div className={cx("col-6")}>
                        <input
                          className={cx("input-form")}
                          type="text"
                          value={variant.size}
                          onChange={(e) =>
                            handleVariantChange(index, "size", e.target.value)
                          }
                        ></input>
                      </div>
                      <div className={cx("col-6")}>
                        <input
                          className={cx("input-form")}
                          type="text"
                          value={variant.quantity}
                          onChange={(e) =>
                            handleVariantChange(0, "quantity", e.target.value)
                          }
                        ></input>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          {/*  */}

          <div className={cx("row")}>
            <div className={cx("col-12", "btn-submit-div")}>
              <button className={cx("btn-submit")} type="submit">
                Lưu
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminPopup;
