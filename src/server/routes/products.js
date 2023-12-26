var express = require("express");
var router = express.Router();
const getListProducts = require("../Controllers/getListProducts");
const getProduct = require("../Controllers/getProduct");
const addProductToCart = require("../Controllers/addProductToCart");
const getProductFilter = require("../Controllers/getProductFilter");

router.get("/hot", getListProducts.getListProducts);
router.get("/filter", getProductFilter.getProductFilter);
router.get("/:name", getProduct.getProduct);
router.get("/addToCart", addProductToCart.addProductToCart);


module.exports = router;

