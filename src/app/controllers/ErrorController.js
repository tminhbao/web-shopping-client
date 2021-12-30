class ErrorController {
  index(req, res) {
    res.render("404", { user: req.user });
  }
}
module.exports = new ErrorController();
