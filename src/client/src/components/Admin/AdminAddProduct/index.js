import classNames from "classnames/bind";
import styles from "./AdminPopup.module.scss";
import { VscCloseAll } from "react-icons/vsc";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const cx = classNames.bind(styles);

function AdminPopup({ isVisible, onClose, onAddProductSuccess }) {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    color: "",
    price: "",
    brand: "",
    size: "",
    quantity: "",
  });

  if (!isVisible) {
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // Kiểm tra xem có file được chọn hay không
    if (file) {
      // Kiểm tra định dạng file
      if (file.type.startsWith("image/")) {
        // Nếu là file ảnh, tiến hành xử lý
        setImageFile(file);

        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        // Nếu không phải là file ảnh, thông báo và đặt giá trị của input về null
        alert("Vui lòng chọn một file ảnh.");
        e.target.value = null; // Đặt giá trị của input về null để yêu cầu người dùng nhập lại
      }
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("color", productData.color);
    formData.append("price", productData.price);
    formData.append("brand", productData.brand);
    formData.append("size", productData.size);
    formData.append("quantity", productData.quantity);
    formData.append("image1", imageFile);

    try {
      const token = Cookies.get("token"); // Lấy token từ cookie
      const response = await axios.post(
        `http://localhost:3001/admin/addProduct`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          
          },
        }
      );

      if (response.status === 201) {
        console.log("Product added successfully");
        setProductData({
          name: "",
          description: "",
          color: "",
          price: "",
          brand: "",
          size: "",
          quantity: "",
        });
        setImagePreview(null);
        onAddProductSuccess();
        onClose();
        navigate(`/admin/dashboard/products/${1}`);
      } else {
        console.error("Error adding product:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className={cx("container", "container-popup")}>
      <div className={cx("grid", "grid-popup")}>
        <div className={cx("row")}>
          <div className={cx("col-11")}>
            <h1 className={cx("title-popup")}>THÊM SẢN PHẨM</h1>
          </div>
          <div onClick={onClose} className={cx("col-1", "close")}>
            <VscCloseAll className={cx("close-icon")} />
          </div>
        </div>
        {/*  */}
        <form onSubmit={handleAddProduct} encType="multipart/form-data">
          {/* Form cho thông tin product */}
          <div className={cx("row")}>
            <div className={cx("col-3", "label-div")}>
              <label htmlFor="brand">Ảnh</label>
            </div>
            <div className={cx("col-3")}>
              <input
                className={cx("input-form")}
                id="image1"
                type="file"
                name="image1"
                onChange={handleImageChange}
                required
              />
            </div>
          </div>
          <div className={cx("row")}>
            <div className={cx("col-3")}></div>
            {imagePreview && (
              <div className={cx("col-9", "imagePreview-div")}>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className={cx("imagePreview")}
                />
              </div>
            )}
          </div>

          <div className={cx("row")}>
            <div className={cx("col-3", "label-div")}>
              <label htmlFor="id">Mã sản phẩm (ID)</label>
            </div>
            <div className={cx("col-9")}>
              <span>Tự động</span>
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
                required
                onChange={handleInputChange}
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
                val
                name="description"
                id="description"
                value={productData.description}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
          </div>
          {/*  */}
          <div className={cx("row")}>
            <div className={cx("col-3", "label-div")}>
              <label htmlFor="color">Màu sắc</label>
            </div>
            <div className={cx("col-4")}>
              <input
                className={cx("input-form")}
                id="color"
                type="text"
                name="color"
                value={productData.color}
                required
                onChange={handleInputChange}
              ></input>
            </div>
            {/*  */}
            <div className={cx("col-2", "label-div")}>
              <label htmlFor="price">Giá</label>
            </div>
            <div className={cx("col-3")}>
              <input
                className={cx("input-form")}
                id="price"
                type="number"
                name="price"
                value={productData.price}
                required
                onChange={handleInputChange}
              ></input>
            </div>
          </div>
          {/* .... */}
          <div className={cx("row")}>
            <div className={cx("col-3", "label-div")}>
              <label htmlFor="brand">Thương hiệu</label>
            </div>
            <div className={cx("col-4")}>
              <input
                className={cx("input-form")}
                id="brand"
                type="text"
                name="brand"
                value={productData.brand} // Lấy giá trị từ state
                required
                onChange={handleInputChange} // Gọi hàm xử lý khi có sự thay đổi
              />
            </div>
            {/*  */}
            <div className={cx("col-2", "label-div")}>
              <label htmlFor="brand">Size</label>
            </div>
            <div className={cx("col-3")}>
              <input
                className={cx("input-form")}
                id="size"
                type="number"
                name="size"
                value={productData.size}
                required
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className={cx("row")}>
            <div className={cx("col-3", "label-div")}>
              <label htmlFor="brand">Số lượng</label>
            </div>
            <div className={cx("col-3")}>
              <input
                className={cx("input-form")}
                id="quantity"
                type="number"
                name="quantity"
                value={productData.quantity}
                required
                onChange={handleInputChange}
              />
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
