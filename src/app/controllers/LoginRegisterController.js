class LoginRegisterController {
    index(req, res) {
        res.render('login-register');
    }
}
module.exports = new LoginRegisterController;