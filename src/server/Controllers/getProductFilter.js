const db = require("../db/db");

const getProductFilter = (req, res) => {
  const { sortprice, filterSize, brands, page, searchName } = req.query;

  const itemsPerPage = 9;
  const startIndex = (page - 1) * itemsPerPage;

  // Truy vấn để đếm số lượng sản phẩm sau khi áp dụng điều kiện lọc
  let countQuery = "SELECT COUNT(DISTINCT name) AS total FROM products";

  if (brands) {
    const brandArray = brands.split(",").map((brand) => brand.trim());
    const brandConditions = brandArray
      .map((brand) => `brand = '${brand}'`)
      .join(" OR ");
    countQuery += ` WHERE (${brandConditions})`;
  }

  // Áp dụng điều kiện tìm kiếm theo tên sản phẩm
  if (searchName) {
    const searchCondition = `name LIKE '%${searchName}%'`;
    countQuery += countQuery.includes("WHERE")
      ? ` AND (${searchCondition})`
      : ` WHERE (${searchCondition})`;
  }

  // Thực hiện truy vấn đếm
  db.query(countQuery, (countError, countResult) => {
    if (countError) {
      console.error("Error counting products:", countError);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    const totalProducts = countResult[0].total;

    // Truy vấn chính để lấy dữ liệu sản phẩm
    let sql = `SELECT 
                MIN(product_id) AS product_id,
                name,
                MIN(description) AS description,
                MIN(price) AS price,
                MIN(image1) AS image1,
                MIN(image2) AS image2,
                MIN(image3) AS image3,
                MIN(brand) AS brand,
                MIN(color) AS color,
                NULL AS size,
                SUM(quantity) AS quantity,
                ${totalProducts} AS total_number_products_filter
              FROM products`;

    // Áp dụng các điều kiện lọc
    if (brands) {
      const brandArray = brands.split(",").map((brand) => brand.trim());
      const brandConditions = brandArray
        .map((brand) => `brand = '${brand}'`)
        .join(" OR ");
      sql += ` WHERE (${brandConditions})`;
    }
    // Áp dụng điều kiện tìm kiếm theo tên sản phẩm
    if (searchName) {
      const searchCondition = `name LIKE '%${searchName}%'`;
      sql += sql.includes("WHERE")
        ? ` AND (${searchCondition})`
        : ` WHERE (${searchCondition})`;
    }

    // Áp dụng sắp xếp
    sql += ` GROUP BY name`;

    if (sortprice === "increase") {
      sql += " ORDER BY price ASC";
    } else if (sortprice === "decrease") {
      sql += " ORDER BY price DESC";
    }

    sql += ` LIMIT ${startIndex}, ${itemsPerPage}`;

    // Thực hiện truy vấn SQL chính
    console.log(sql);
    db.query(sql, (error, results) => {
      if (error) {
        console.error("Error executing query:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      if (results.length == 0) {
        // Không tìm thấy sản phẩm
        res.status(200).json([]);
        return;
      }
      console.log("--------------");
      console.log(results);
      res.json(results);
    });
  });
};

module.exports = {
  getProductFilter,
};
