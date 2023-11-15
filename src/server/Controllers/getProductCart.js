const db = require("../db/db");

function getProductCart(req, res) {
  const cart = req.session.cart || [];
  const placeholders = cart.map((cart) => `${cart.productId}`).join(",");
  db.query(
    `SELECT * FROM products
    WHERE product_id IN (${placeholders})`,
    (err, results) => {
      if (err) {
        console.log("Lỗi truy vấn:" + err);
      } else {
        const newResults = results.map((result, index) => {
          return {
            ...result,
            variance: cart[index],
          };
        });
        res.json(newResults);
      }
    }
  );
}

module.exports = {
  getProductCart,
};
