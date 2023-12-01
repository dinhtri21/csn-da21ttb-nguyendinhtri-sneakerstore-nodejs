const { sendEmail } = require("../email/emailService");
const db = require("../db/db");
const fs = require("fs");
const handlebars = require("handlebars");
const path = require("path");

const postOrder = (req, res) => {
  const orderData = req.body;

  console.log(orderData);
  //   customer
  // Thực hiện truy vấn để thêm đơn hàng vào cơ sở dữ liệu

  db.beginTransaction((err) => {
    if (err) {
      console.error("Lỗi khi bắt đầu giao dịch: " + err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    const Address = `${orderData.customerInfo.ward}, ${orderData.customerInfo.district}, ${orderData.customerInfo.province}`
    db.query(
      "INSERT INTO customer (fullname, email, phone_number, address) VALUES (?, ?, ?, ?)",
      [
        orderData.customerInfo.fullName,
        orderData.customerInfo.email,
        orderData.customerInfo.phone,
        Address,
      ],
      (err, results) => {
        if (err) {
          db.rollback();
          console.error("Lỗi khi thêm thông tin khách hàng: " + err);
          res.status(500).json({ error: "Internal Server Error" });
          return;
        }
        const customerId = results.insertId;
        const currentDate = new Date()
          .toISOString()
          .slice(0, 19)
          .replace("T", " ");
        var paymentId = 0;
        orderData.paymentMethod == "cod" ? (paymentId = 1) : (paymentId = 2);

        db.query(
          "INSERT INTO orders (customer_id, order_date, order_status, total,oder_note, payment_id) VALUES (?, ?, ?, ?, ?, ?)",
          [
            customerId,
            currentDate,
            "Đang xử lý",
            orderData.total_product_cart,
            orderData.note,
            paymentId,
          ],
          (err, results) => {
            if (err) {
              db.rollback();
              console.error("Lỗi khi thêm thông tin đơn hàng: " + err);
              res.status(500).json({ error: "Internal Server Error" });
              return;
            }

            const orderId = results.insertId;
            const products = orderData.products;
            const values = products.map((product) => [
              orderId,
              product.productId,
              product.quantity,
              orderData.total_product_cart,
              product.variance_id,
            ]);

            db.query(
              "INSERT INTO order_details (order_id, product_id, quantity, total_amount_product, variance_id) VALUES ?",
              [values],
              (err) => {
                if (err) {
                  db.rollback();
                  console.error(
                    "Lỗi khi thêm thông tin chi tiết đơn hàng: " + err
                  );
                  res.status(500).json({ error: "Internal Server Error" });
                  return;
                }
                // Nếu đến đây mà không có lỗi, tiến hành commit
                db.commit((err) => {
                  if (err) {
                    db.rollback();
                    console.error("Lỗi khi commit giao dịch: " + err);
                    res.status(500).json({ error: "Internal Server Error" });
                    return;
                  }

                  //câu hinh đường dẫn
                  const templatePath = path.join("views", "email-template.hbs");
                  const templateSource = fs.readFileSync(templatePath, "utf-8");
                  const template = handlebars.compile(templateSource);

                  //Data truyền vào email
                  const productTemplate = products.map((product) => {
                    return {
                      productName: product.productName,
                      productImage: product.productImage,
                      quantity: product.quantity,
                      size: product.size,
                      price: Math.round(product.price)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, "."),
                      variance_id: product.variance_id,
                      total_amount_product:Math.round(product.total_amount_product)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, "."),
                    };
                  });

                  const templateData = {
                    orderId: orderId,
                    date: currentDate,
                    customter: orderData.customerInfo,
                    products: productTemplate,
                    total_product_cart: Math.round(orderData.total_product_cart)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, "."),
                    note: orderData.note,
                  };
                  
                  console.log(templateData);
                  // console.log(templateData);
                  // Thay thế dữ liệu vào template
                  const htmlContent = template(templateData);

                  const mailOptions = {
                    from: "dinhtri.21092003@gmail.com",
                    to: orderData.customerInfo.email,
                    subject: "Xác nhận đơn hàng",
                    html: htmlContent,
                  };

                  // Gửi email sử dụng module emailService
                  sendEmail(mailOptions);
                  // Gửi thông báo thành công về cho client
                  res
                    .status(200)
                    .json({ success: true, message: "Đặt hàng thành công!" });
                });
              }
            );
          }
        );
        //
      }
    );
  });
};
module.exports = {
  postOrder,
};
