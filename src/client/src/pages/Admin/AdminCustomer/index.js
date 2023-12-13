
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AdminCustomerComponent from "../../../components/Admin/AdminCustomer"
function AdminCustomer() {
  const [customer, setCustomer] = useState([]);
  const { page } = useParams();
  useEffect(() => {
    axiosProduct(page);
  }, []);
  
  const axiosProduct = async (page) => {
    console.log("hàm3")
    try {
      const response = await axios.get(
        `http://localhost:3001/admin/getCustomer/${page}`,
        {
          withCredentials: true, // Bật chế độ gửi cookie với yêu cầu
        }
      );
      setCustomer(response.data);
    } catch (err) {
      console.log("err" + err);
    }
  };

  return <AdminCustomerComponent page = {page} axiosProduct={axiosProduct} customer={customer} />;
}

export default AdminCustomer;

