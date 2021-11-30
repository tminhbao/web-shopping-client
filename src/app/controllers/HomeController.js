const ProductModel = require("../../models/product");
class HomeController {
    async index(req, res) {
        const page = req.query.page || 1;
        const { listItem } = await ProductModel.getList(page)
        res.render('home', { listPro: listItem });
    }
}
module.exports = new HomeController;