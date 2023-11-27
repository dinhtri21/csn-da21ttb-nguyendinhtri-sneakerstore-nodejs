var express = require("express");
var router = express.Router();
const getListProducts = require("../Controllers/getListProducts");
const getProduct = require("../Controllers/getProduct");
const addProductToCart = require("../Controllers/addProductToCart");
const getFeaturedProducts = require("../Controllers/getFeaturedProducts");
const getProductFilter = require("../Controllers/getProductFilter");

router.get("/", getListProducts.getListProducts);
router.get("/filter", getProductFilter.getProductFilter);
router.get("/:id", getProduct.getProduct);
router.get("/addToCart", addProductToCart.addProductToCart);
router.get("/featured", getFeaturedProducts.getFeaturedProducts);


module.exports = router;

