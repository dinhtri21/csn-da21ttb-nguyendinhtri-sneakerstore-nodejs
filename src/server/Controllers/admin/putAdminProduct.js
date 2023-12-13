const db = require("../../db/db");

const putAdminProduct = (req, res) => {
  const { product_id, name, description, price, brand, variants } = req.body;

  db.beginTransaction((err) => {
    if (err) {
      console.error("Lỗi khi bắt đầu giao dịch: " + err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    // Cập nhật thông tin trong bảng 'products'
    db.query(
      "UPDATE products SET name = ?, description = ?, price = ?, brand = ? WHERE product_id = ?",
      [name, description, price, brand, product_id],
      (err, results) => {
        if (err) {
          db.rollback(() => {
            console.error("Lỗi khi cập nhật thông tin sản phẩm: " + err);
            res.status(500).json({ error: "Internal Server Error" });
          });
          return;
        }

        // Lấy các biến thể cũ của sản phẩm
        db.query("SELECT * FROM variance WHERE product_id = ?", [product_id], (err, oldVariants) => {
          if (err) {
            db.rollback(() => {
              console.error("Lỗi khi truy vấn biến thể cũ: " + err);
              res.status(500).json({ error: "Internal Server Error" });
            });
            return;
          }

          // So sánh và sửa đổi biến thể nếu cần
          for (const variant of variants) {
            const oldVariant = oldVariants.find((v) => v.variance_id === variant.variance_id);
            if (oldVariant) {
              // Nếu biến thể cũ tồn tại, thực hiện sửa đổi
              db.query(
                "UPDATE variance SET size = ?, color = ?, quantity = ? WHERE variance_id = ?",
                [variant.size, variant.color, variant.quantity, variant.variance_id],
                (err, results) => {
                  if (err) {
                    db.rollback(() => {
                      console.error("Lỗi khi cập nhật biến thể: " + err);
                      res.status(500).json({ error: "Internal Server Error" });
                    });
                    return;
                  }
                }
              );
            } else {
              // Nếu biến thể cũ không tồn tại, thực hiện thêm mới
              db.query(
                "INSERT INTO variance (product_id, size, color, quantity) VALUES (?, ?, ?, ?)",
                [product_id, variant.size, variant.color, variant.quantity],
                (err, results) => {
                  if (err) {
                    db.rollback(() => {
                      console.error("Lỗi khi thêm biến thể mới: " + err);
                      res.status(500).json({ error: "Internal Server Error" });
                    });
                    return;
                  }
                }
              );
            }
          }

          // Commit giao dịch nếu mọi thứ diễn ra suôn sẻ
          db.commit((err) => {
            if (err) {
              db.rollback(() => {
                console.error("Lỗi khi commit giao dịch: " + err);
                res.status(500).json({ error: "Internal Server Error" });
              });
              return;
            }
            res.status(200).json({ success: true, message: "Update successful" });
          });
        });
      }
    );
  });
};

module.exports = {
  putAdminProduct,
};
