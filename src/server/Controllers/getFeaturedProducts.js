const db = require("../db/db");

const getFeaturedProducts = (req, res) => {
  // Sử dụng DISTINCT và ORDER BY RAND() để lấy một sản phẩm duy nhất từ mỗi nhóm tên
  db.query("SELECT DISTINCT * FROM products ORDER BY RAND() LIMIT 12", (err, results) => {
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
  getFeaturedProducts,
  // Các hàm xử lý yêu cầu khác có thể được thêm vào tùy theo nhu cầu của bạn.
};
