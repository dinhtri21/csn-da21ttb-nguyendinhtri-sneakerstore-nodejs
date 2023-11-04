const db = require("../db/db");

const getProduct = (req, res) => {
  db.query(
    `SELECT * FROM products WHERE Product_id = ${req.params.id}`,
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
