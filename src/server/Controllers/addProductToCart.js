// const session = require("express-session");

const addProductToCart = (req, res) => {
  const { productId, quantity, size, varianceId} = req.body;
  if (!req.session.cart) {
    req.session.cart = [];
  }

  const existingProduct = req.session.cart.find(
    (item) => item.productId == productId && item.size == size
  );

  if (existingProduct) {
    // Nếu sản phẩm đã tồn tại, chỉ cập nhật số lượng
    existingProduct.quantity += quantity;
    res.json({ message: "Cập nhật giỏ hàng thành công!" });
  } else {
    // Nếu sản phẩm chưa tồn tại, thêm sản phẩm mới vào giỏ hàng
    req.session.cart.push({ productId, quantity, size, varianceId});
    res.json({ message: "Thêm vào giỏ hàng thành công!" });
  }

  console.log(req.session);
};

module.exports = {
  addProductToCart,
};

