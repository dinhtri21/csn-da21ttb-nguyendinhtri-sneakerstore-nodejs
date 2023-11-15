import { useEffect, useState } from "react";
import CartComponent from "../../components/Cart";

import axios from "axios";
function Cart() {
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
    };
    axiosProductsCart();
  }, []);
  return (
    <div>
      <CartComponent products={products} />
    </div>
  );
}

export default Cart;
