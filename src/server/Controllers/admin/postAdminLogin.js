const db = require("../../db/db");
const jwt = require("jsonwebtoken");
const postAdminLogin = (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM admin WHERE admin_email = ? AND admin_password = ?",
    [email, password],
    (err, result) => {
      if (err) {
        console.error("Lỗi sai email hoặc pass: " + err);
        res.status(500).json({ message: "Lỗi truy vấn CSDL." });
        return;
      }

      if (result.length === 0) {
        return res
          .status(401)
          .json({ message: "Email hoặc mật khẩu không chính xác." });
      } else {
        console.log(result);
        const admin = result[0];
        // Tạo JWT token
        const token = jwt.sign(
          { adminId: admin.admin_id, email: admin.admin_email },
          "your-secret-key",
          {
            expiresIn: "1h",
          }
        );
        // Gửi token về client
        //  res.status(200).json({ success: true, message: "Thành công" });
        res.status(200).json({ token, message: "Thành công" });
      }
    }
  );
};

module.exports = {
  postAdminLogin,
};
