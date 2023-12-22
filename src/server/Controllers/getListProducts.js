const db = require("../db/db");

const getListProducts = (req, res) => {

  db.query(
    `SELECT
  p.name,
  MIN(p.product_id) AS product_id,
  p.description,
  p.price,
  p.image1,
  p.image2,
  p.image3,
  p.brand,
  COALESCE(SUM(od.quantity), 0) AS total_sold
FROM
  products p
LEFT JOIN
  order_details od ON p.product_id = od.product_id
GROUP BY
  p.name, p.description, p.price, p.image1, p.image2, p.image3, p.brand
ORDER BY
 total_sold DESC
  LIMIT ${0}, ${8}`,
    (err, results) => {
      if (err) {
        console.error("Lỗi truy vấn listproduct: " + err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        const listProducts = results.map((result) => {
          return result;
        });
        res.json(listProducts);
      }
    }
  );
};
module.exports = {
  getListProducts,
  // Các hàm xử lý yêu cầu khác có thể được thêm vào tùy theo nhu cầu của bạn.
};
