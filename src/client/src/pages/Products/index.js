import { useEffect, useState } from "react";
import ProductsComponent from "../../components/Products";

function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3001/products");
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.log("Error: " + err);
      }
    };
    fetchProducts();
  }, []);
  return <ProductsComponent products={products} />;
}

export default Products;
