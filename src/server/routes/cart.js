var express = require("express");
var router = express.Router();

const addProductToCart = require("../Controllers/addProductToCart");
const getProductCart = require('../Controllers/getProductCart')

router.post("/addtocart",addProductToCart.addProductToCart);
router.get("/",getProductCart.getProductCart);
//addProductToCart.addProductToCart
module.exports = router;
