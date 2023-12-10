var express = require("express");
var router = express.Router();

var postAdminLogin = require("../Controllers/admin/postAdminLogin")
var getAdminOrder = require("../Controllers/admin/getAdminOrder")
var getOverviewData = require("../Controllers/admin/getOverviewData")

router.post("/login",postAdminLogin.postAdminLogin)
router.get("/getOrder/:page",getAdminOrder.getAdminOrder)
router.get("/gettotalrevenue",getOverviewData.getOverviewData)

module.exports = router;