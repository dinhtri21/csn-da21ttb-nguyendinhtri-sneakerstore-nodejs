const db = require("../db/db");

const getListProducts = (req, res) => {
  db.query("SELECT * from products", (err, results) => {
    if (err) {
      console.error("Lỗi truy vấn listproduct: " + err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      const listProducts = results.map((result) => {
        return result;
      });
      res.json(listProducts);
    }
  });
};
module.exports = {
  getListProducts,
  // Các hàm xử lý yêu cầu khác có thể được thêm vào tùy theo nhu cầu của bạn.
};
