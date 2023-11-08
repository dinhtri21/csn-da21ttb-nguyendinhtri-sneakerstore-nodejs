import BannerHome from "../../components/BannerHome";
import BodyHome from "../../components/BodyHome";
import { useState, useEffect } from "react";

function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3001/featured");
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.log("Error: " + err);
      }
    };
    fetchProducts();
  }, []);
  return (
    <div>
      <BannerHome />
      <BodyHome products={products} />
    </div>
  );
}

export default Home;
