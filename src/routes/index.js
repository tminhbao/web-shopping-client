const homeRouter = require('./home')
const errorRouter = require('./404');
const checkoutRouter = require('./checkout')
const loginRegisterRouter = require('./login-register');
const shopRouter = require('./shop');
const shoppingCartRouter = require('./shopping-cart');
const singleProductRouter = require('./single-product');
function route(app) {

    app.use('/404',errorRouter);

    app.use('/checkout',checkoutRouter);

    app.use('/login-register',loginRegisterRouter);

    app.use('/shop',shopRouter);

    app.use('/shopping-cart',shoppingCartRouter);

    app.use('/single-product',singleProductRouter);

    app.use('/',homeRouter);
}

module.exports = route;