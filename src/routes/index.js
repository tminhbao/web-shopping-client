const homeRouter = require("./home");
const errorRouter = require("./404");
const checkoutRouter = require("./checkout");
const loginRouter = require("./login");
const registerRouter = require("./register");
const shopRouter = require("./shop");
const shoppingCartRouter = require("./shopping-cart");
const singleProductRouter = require("./single-product");
const accountRouter = require("./account");
const logoutRouter = require("./logout");
const forgotRouter = require("./forgot");
const resetPasswordRouter = require("./resetpassword");
const editInfoRouter = require("./editinfo");
const changePasswordRouter = require("./changepassword");

function route(app) {
  app.use("/404", errorRouter);
  app.use("/checkout", checkoutRouter);
  app.use("/login", loginRouter);
  app.use("/register", registerRouter);
  app.use("/shop", shopRouter);
  app.use("/shopping-cart", shoppingCartRouter);
  app.use("/single-product", singleProductRouter);
  app.use("/account", accountRouter);
  app.post("/logout", logoutRouter);
  app.use("/forgot", forgotRouter);
  app.post("/forgot", forgotRouter);
  app.use("/resetpassword", resetPasswordRouter);
  app.use("/editinfo", editInfoRouter);
  app.use("/changepassword", changePasswordRouter);
  app.use("/", homeRouter);
}

module.exports = route;
