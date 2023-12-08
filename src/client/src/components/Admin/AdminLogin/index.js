import classNames from "classnames/bind";
import styles from "./AdminLogin.module.scss";
import images from "../../../assets/images";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  // Hàm để lưu trữ token vào localStorage
  const saveToken = (token) => {
    localStorage.setItem("token", token);
  };
  // Hàm để đọc token từ localStorage
  const loadToken = () => {
    return localStorage.getItem("token");
  };

  // Hàm để xóa token từ localStorage
  const clearToken = () => {
    localStorage.removeItem("token");
  };

  const handleLogin = () => {
    const axiosLogin = async () => {
      axios
        .post("http://localhost:3001/admin/login", { email, password })
        .then((response) => {
          clearToken();
          console.log(response.data);
          saveToken(response.data.token);
          alert("Đăng nhập thành công!");
          window.location.href = "/admin/dashboard";
          // navigate("/admin/dashboard");
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    };
    axiosLogin();
  };

  return (
    <div className={cx("login-container")}>
      <div className={cx("login-inner")}>
        <div className={cx("login-form")}>
          <div className={cx("login-form-inner")}>
            <h1 className={cx("login-form-title-1")}>SNEAKER STORE</h1>
            <h2 className={cx("login-form-title-2")}>ĐĂNG NHẬP</h2>
            <p className={cx("login-form-p")}>
              Xin chào, vui lòng nhập thông tin đăng nhập!
            </p>
            <div className={cx("login-form-input")}>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Email"
              />
            </div>
            <div className={cx("login-form-input")}>
              <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <button className={cx("login-form-button")} onClick={handleLogin}>
              Đăng nhập
            </button>
          </div>
        </div>
        <div className={cx("login-img")}>
          <img src={images.login}></img>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
