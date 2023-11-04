var express = require("express");
var router = express.Router();
const getListProducts = require("../Controllers/getListProducts");
const getProduct = require('../Controllers/getProduct');
const addProductToCart = require('../Controllers/addProductToCart');

router.get("/", getListProducts.getListProducts);
router.get("/:id", getProduct.getProduct);
router.get("/addToCart",addProductToCart.addProductToCart);

module.exports = router;
