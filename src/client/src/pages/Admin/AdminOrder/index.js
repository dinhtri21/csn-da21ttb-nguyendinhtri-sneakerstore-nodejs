import AdminOrderComponent from "../../../components/Admin/AdminOrder";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
function AdminOrder() {
  const [orders, setOrders] = useState([]);
  const { page } = useParams();
  useEffect(() => {
    axiosProduct(page);
  }, []);
  const axiosProduct = async (page) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/admin/getOrder/${page}`,
        {
          withCredentials: true, // Bật chế độ gửi cookie với yêu cầu
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
