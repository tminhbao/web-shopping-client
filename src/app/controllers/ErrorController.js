class ErrorController {
    index(req,res){
        res.render('404');
    }
}
module.exports = new ErrorController;