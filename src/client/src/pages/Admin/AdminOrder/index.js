import AdminOrderComponent from "../../../components/Admin/AdminOrder";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
function AdminOrder() {
  const [orders, setOrders] = useState([]);
  const { page } = useParams();
  useEffect(() => {
    axiosProduct(page);
  }, []);
  
  const axiosProduct = async (page) => {
    try {
      const token = Cookies.get("token"); // Lấy token từ cookie
      const response = await axios.get(
        `https://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/admin/getOrder/${page}`,
        {
          withCredentials: true, // Bật chế độ gửi cookie với yêu cầu
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        }
      );
      setOrders(response.data);
    } catch (err) {
      console.log("err" + err);
    }
  };

  return <AdminOrderComponent page = {page} axiosProduct={axiosProduct} orders={orders} />;
}

export default AdminOrder;
