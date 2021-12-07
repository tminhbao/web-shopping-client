class AccountController {
    index(req,res){
        res.render('account',{user:req.user});
    }
}
module.exports = new AccountController;

