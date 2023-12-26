var express = require("express");
var router = express.Router();

var postAdminLogin = require("../Controllers/admin/postAdminLogin");
var getAdminOrder = require("../Controllers/admin/getAdminOrder");
var getOverviewData = require("../Controllers/admin/getOverviewData");
var getAdminProducts = require("../Controllers/admin/getAdminProducts");
var putAdminProduct = require("../Controllers/admin/putAdminProduct");
var getCustomer = require("../Controllers/admin/getCustomer");
const addProduct = require("../Controllers/admin/addProducts")
const deleteProduct = require("../Controllers/admin/deleteProduct");

router.post("/login", postAdminLogin.postAdminLogin);
router.get("/getOrder/:page", getAdminOrder.getAdminOrder);
router.get("/getCustomer/:page", getCustomer.getCustomer);
router.get("/gettotalrevenue", getOverviewData.getOverviewData);
router.get("/getAdminProducts/:page", getAdminProducts.getAdminProducts);
router.put("/putAdminProduct", putAdminProduct.putAdminProduct);
router.post("/addProduct", addProduct.addProduct);
router.delete("/delete/:product_id", deleteProduct.deleteProduct);

module.exports = router;
