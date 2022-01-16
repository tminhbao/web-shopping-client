const express = require("express");
const handlebars = require("express-handlebars");
const hbs = handlebars.create({ extname: ".hbs" });
const app = express();
const port = 3000;
const route = require("./src/routes/index");
const bodyParser = require("body-parser");

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
const path = require("path");
app.set("views", path.join(__dirname, "src/resources/views"));

app.use(express.static("src/public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const session = require("express-session");
const cookieParser = require("cookie-parser");
const connectFlash = require("connect-flash");
const passport = require("passport");

app.use(cookieParser("secret"));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

// Enable flash message
app.use(connectFlash());

app.use(passport.initialize());
app.use(passport.session());

route(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
