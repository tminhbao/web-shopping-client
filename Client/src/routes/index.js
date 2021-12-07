const homeRouter = require('./home')
const errorRouter = require('./404');
const checkoutRouter = require('./checkout')
const loginRouter = require('./login');
const registerRouter = require('./register');
const shopRouter = require('./shop');
const shoppingCartRouter = require('./shopping-cart');
const singleProductRouter = require('./single-product');
const accountRouter = require('./account');
const logoutRouter = require('./logout')

function route(app) {
    app.use('/404', errorRouter);

    app.use('/checkout', checkoutRouter);

    app.use('/login', loginRouter);

    app.use('/register', registerRouter);

    app.use('/shop', shopRouter);

    app.use('/shopping-cart', shoppingCartRouter);

    app.use('/single-product', singleProductRouter);

    app.use('/account',accountRouter)
    
    app.post('/logout',logoutRouter)

    app.use('/', homeRouter);
}

module.exports = route;