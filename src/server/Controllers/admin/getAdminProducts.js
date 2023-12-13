const db = require("../../db/db");

const getAdminProducts = (req, res) => {
  const page = req.params.page || 1; // Trang mặc định là 1
  const itemsPerPage = 6; // Số đơn hàng trên mỗi trang

  const startIndex = (page - 1) * itemsPerPage;

  const productsQuery = `SELECT 
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
      GROUP BY p.product_id
      LIMIT ?, ?`;

  // Truy vấn sản phẩm
  const productsnumberQuery = `
  SELECT
    p.*,
    COUNT(*) OVER() AS total_number_products
  FROM
    products p;
`;

  // Thực hiện hai truy vấn
  db.query(
    productsQuery,
    [startIndex, itemsPerPage],
    (errOrder, resultOrder) => {
      if (errOrder) {
        console.error("Lỗi truy vấn OrderAdmin: " + errOrder);
        return res.status(500).json({ error: "Internal Server Error" });
      } else if (resultOrder.length === 0) {
        return res.status(404).json({ error: "Không có đơn hàng nào" });
      } else {
        // Kết quả của truy vấn đơn hàng
        const orderResult = resultOrder;

        // Thực hiện truy vấn sản phẩm
        db.query(productsnumberQuery, (errProduct, resultProduct) => {
          if (errProduct) {
            console.error("Lỗi truy vấn sản phẩm: " + errProduct);
            return res.status(500).json({ error: "Internal Server Error" });
          } else {
            // Kết quả của truy vấn sản phẩm
            const productResult = resultProduct;

            // Kết hợp kết quả từ cả hai truy vấn
            const combinedResult = orderResult.map((order) => {
              const productId = order.product_id;
              const productInfo = productResult.find(
                (product) => product.product_id === productId
              );

              return {
                ...order,
                total_number_products: productInfo
                  ? productInfo.total_number_products
                  : 0,
              };
            });

            res.json(combinedResult);
          }
        });
      }
    }
  );
};
module.exports = {
  getAdminProducts,
  // Các hàm xử lý yêu cầu khác có thể được thêm vào tùy theo nhu cầu của bạn.
};
