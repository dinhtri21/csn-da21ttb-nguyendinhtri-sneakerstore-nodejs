const db = require("../db/db");

function getProductCart(req, res) {
  const cart = req.session.cart || [];
  // Tạo mảng các điều kiện cho mỗi sản phẩm trong giỏ hàng
  const conditions = cart.map((item) => {
    return ` (p.product_id = ${item.productId} AND v.size = '${item.size}') `;
  });
  const whereClause = conditions.join(" OR ");

  db.query(
    `SELECT p.*, v.size, v.color, v.quantity
    FROM products p
    JOIN variance v ON p.product_id = v.product_id
    WHERE ${whereClause}`,
    (err, results) => {
      if (err) {
        console.log("Lỗi truy vấn:" + err);
      } else {
        console.log(results);
        const newResults = results.map((result, index) => {
          return {
            ...result,
            quantity_oder: cart[index].quantity,
          };
        });
        console.log(newResults);
        res.json(newResults);
      }
    }
  );
}

module.exports = {
  getProductCart,
};
