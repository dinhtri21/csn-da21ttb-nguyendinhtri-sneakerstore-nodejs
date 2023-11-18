var express = require("express");
var router = express.Router();

const addProductToCart = require("../Controllers/addProductToCart");
const getProductCart = require('../Controllers/getProductCart');
const updateProductQuantity = require('../Controllers/updateProductQuantity');
const removeProductCart = require('../Controllers/removeProductCart')

router.post("/addtocart",addProductToCart.addProductToCart);
router.get("/",getProductCart.getProductCart);
router.post("/updateProductCart",updateProductQuantity.updateProductQuantity);
router.post("/removeProductCart",removeProductCart.removeProductCart)

//addProductToCart.addProductToCart
module.exports = router;
