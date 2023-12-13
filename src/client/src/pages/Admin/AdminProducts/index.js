import AdminProductsComponent from "../../../components/Admin/AdminProducts";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function AdminProducts() {
    const [products, setProducts] = useState([]);
    const { page } = useParams();
    useEffect(() => {
      axiosProducts(page);
    }, []);
    
    const axiosProducts = async (page) => {
      try {
        const response = await axios.get(
          `http://localhost:3001/admin/getAdminProducts/${page}`,
          {
            withCredentials: true, // Bật chế độ gửi cookie với yêu cầu
          }
        );
        setProducts(response.data);
        console.log(products);
      } catch (err) {
        console.log("err" + err);
      }
    };
  
  return <AdminProductsComponent page = {page} axiosProducts={axiosProducts} products={products}/>;
}

export default AdminProducts;
