import { useEffect, useState } from "react";
import ProductsComponent from "../../components/Products";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const axiosProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/products", {
          withCredentials: true, // Bật chế độ gửi cookie với yêu cầu
        });
        
        setProducts(response.data);
      } catch (err) {
        console.log("Error: " + err);
      }
    };
    axiosProducts();
  }, []);
  return <ProductsComponent products={products} />;
}

export default Products;
