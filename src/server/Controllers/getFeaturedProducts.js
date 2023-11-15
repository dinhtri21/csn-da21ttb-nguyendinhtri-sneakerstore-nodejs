const db = require("../db/db");

const getFeaturedProducts = (req, res) => {
  db.query("SELECT * from products", (err, results) => {
    if (err) {
      console.error("Lỗi truy vấn listproduct: " + err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      const listProducts = results.map((result) => {
        return result;
      });
      // console.log(listProducts.slice(0, 4));
      const listProducts_4item = listProducts.slice(0, 4);
      res.json(listProducts_4item);
    }
  });
};
module.exports = {
  getFeaturedProducts,
  // Các hàm xử lý yêu cầu khác có thể được thêm vào tùy theo nhu cầu của bạn.
};
