const db = require("../db/db");
const getProductFilter = (req, res) => {
  const { sortprice, filterSize, brands } = req.query;
  
  let sql = "SELECT * FROM products WHERE 1";
  // Áp dụng các điều kiện lọc

  if (brands) {
    const brandArray = brands.split(",").map((brand) => brand.trim());
    const brandConditions = brandArray
      .map((brand) => `brand = '${brand}'`)
      .join(" OR ");
    sql += ` AND (${brandConditions})`;
  }

  if (sortprice === "increase") {
    sql += " ORDER BY price ASC";
  } else if (sortprice === "decrease") {
    sql += " ORDER BY price DESC";
  }

  // if (filterSize) {
  //   sql += ` AND size = '${filterSize}'`; // Thay 'size' bằng tên cột kích thước thực tế
  // }

  console.log(sql);
  // Thực hiện truy vấn SQL
  db.query(sql, (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.json(results);
  });
};
module.exports = {
  getProductFilter,
};
