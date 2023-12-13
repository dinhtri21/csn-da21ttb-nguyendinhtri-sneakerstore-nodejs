const db = require("../db/db");

const getProduct = (req, res) => {
  db.query(
    `SELECT 
        p.product_id,
        p.name,
        p.description,
        p.price,
        p.image1,
        p.image2,
        p.image3,
        p.brand,
        JSON_ARRAYAGG(JSON_OBJECT('variance_id', v.variance_id, 'size', v.size, 'color', v.color, 'quantity', v.quantity)) as variants
      FROM products p
      JOIN variance v ON p.product_id = v.product_id
      WHERE p.product_id = ${req.params.id}
      GROUP BY p.product_id`,
    (err, result) => {
      if (err) {
        console.error("Lỗi truy vấn listproduct: " + err);
        return res.status(500).json({ error: "Internal Server Error" });
      } else if (result.length == 0) {
        return res.status(404).json({ error: "Sản phẩm không tồn tại" });
      } else {
        res.json(result);
      }
    }
  );
};

module.exports = {
  getProduct,
};
