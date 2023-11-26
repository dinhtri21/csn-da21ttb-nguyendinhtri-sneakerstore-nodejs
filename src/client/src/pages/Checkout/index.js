import CheckoutComponent from "../../components/Checkout";
import { useState, useEffect } from "react";
import axios from "axios";
function Checkout() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
      const axiosProductsCart = async () => {
        try {
          const response = await axios.get("http://localhost:3001/cart", {
            withCredentials: true, // Bật chế độ gửi cookie với yêu cầu
          });
          setProducts(response.data);
        } catch (err) {
          console.log(err);
        }
        // window.location.reload()
      };
      axiosProductsCart();
    }, []);
    return <CheckoutComponent products = {products}/>;
}

export default Checkout;