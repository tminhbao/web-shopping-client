class ShoppingCartController {
    index(req,res) {
        res.render('shopping-cart');
    }
}
module.exports = new ShoppingCartController;