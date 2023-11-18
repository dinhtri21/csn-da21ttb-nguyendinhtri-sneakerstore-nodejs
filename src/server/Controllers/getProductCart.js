const db = require("../db/db");

function getProductCart(req, res) {
  const cart = req.session.cart || [];
  // Tạo mảng các điều kiện cho mỗi sản phẩm trong giỏ hàng
  const conditions = cart.map((item) => {
    return ` (p.product_id = ${item.productId} AND v.size = '${item.size}') `;
  });
  const whereClause = conditions.join(" OR ");

  if (cart.length == 0) {
    res.json([]);
  } else {
    db.query(
      `SELECT p.*, v.size, v.color, v.quantity
      FROM products p
      JOIN variance v ON p.product_id = v.product_id
      WHERE ${whereClause}`,
      (err, results) => {
        if (err) {
          console.log("Lỗi truy vấn hoặc mảng session cart đã rỗng" + err);
          res.json([]);
        } else {
          var total_amount_cart = 0;
          results.forEach(function (result, index) {
            total_amount_cart +=
              parseInt(cart[index].quantity) * parseInt(result.price);
          });

          const newResults = results.map((result) => {
            const existingProduct = req.session.cart.find((item) => {
              return (
                item.productId == result.product_id && item.size == result.size
              );
            });
            const quantity_oder = existingProduct.quantity;
            const total_amount_product =
              parseInt(existingProduct.quantity) * parseInt(result.price);
            return {
              ...result,
              quantity_oder,
              total_amount_product,
              total_amount_cart,
            };
          });
          res.json(newResults);
        }
      }
    );
  }
}

module.exports = {
  getProductCart,
};
