const session = require('express-session');

const addProductToCart = (req, res) => {

    const {productId, quantity, size} = req.body;

    if(!req.session.cart){
        req.session.cart = []
    }
    req.session.cart.push({ productId, quantity, size});
    res.json({ success: true }); //trả về client thêm sản phẩm thành công
}

module.exports = {
    addProductToCart,
}