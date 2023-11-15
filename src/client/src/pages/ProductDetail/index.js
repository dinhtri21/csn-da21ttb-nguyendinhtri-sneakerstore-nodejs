import { useEffect, useState } from "react";
import ProductDetailComponent from "../../components/ProductDetail";
import { useParams } from "react-router-dom";

function Product() {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3001/products/${id}`);
        const data = await response.json();
        setProduct(data[0]);
      } catch (err) {
        console.log("err" + err);
      }
    };
    fetchProduct();
  }, []);
  return <ProductDetailComponent product={product} />;
}

export default Product;
