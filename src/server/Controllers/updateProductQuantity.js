// Add this route in your server code
const updateProductQuantity = (req, res) => {
  const { productId, quantity, size } = req.body;
  if (!req.session.cart) {
    return res.status(400).json({ message: "Cart not found" });
  }

  const existingProduct = req.session.cart.find((item) => {
    return item.productId == productId && item.size == size;
  });

  if (!existingProduct) {
    return res.status(404).json({ message: "Product not found in cart" });
  }

  existingProduct.quantity = quantity;
  console.log(req.session);
  res.json({ message: "Update quantity success!" });
};

module.exports = {
  updateProductQuantity,
};
