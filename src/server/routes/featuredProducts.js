var express = require("express");
var router = express.Router();

const getFeaturedProducts = require("../Controllers/getFeaturedProducts");

router.get("/", getFeaturedProducts.getFeaturedProducts);

module.exports = router;
