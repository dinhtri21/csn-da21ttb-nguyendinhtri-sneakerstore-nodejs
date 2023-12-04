import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart/Cart";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Checkout from "./pages/Checkout";
import Admin from "./pages/Admin";

function App() {
  const isAdminRoute = window.location.pathname.startsWith("/admin");

  return (
    <div className="App">
      {isAdminRoute ? null : <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
      {isAdminRoute ? null : <Footer />}
    </div>
  );
}

export default App;
