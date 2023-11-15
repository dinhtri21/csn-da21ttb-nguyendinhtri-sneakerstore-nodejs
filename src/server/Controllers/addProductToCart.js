// const session = require("express-session");

const addProductToCart = (req, res) => {
  const { productId, quantity, size } = req.body;
  if (!req.session.cart) {
    //   console.log(req.session);
    req.session.cart = [];
  }
  //   console.log(req.session);
  req.session.cart.push({ productId, quantity, size });
  res.json({ message: "Thêm vào giỏ hàng thành công !" }); //trả về client thêm sản phẩm thành công
};

module.exports = {
  addProductToCart,
};
