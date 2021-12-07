const ProductModel = require("../../models/product");
// class HomeController {
//     async index(req, res) {
//         const page = req.query.page || 1;
//         const { listItem } = await ProductModel.getList(page)
//         const user = req.username;
//         res.render('home', { listPro: listItem,user});
//         //console.log(user) ???
//     }
// }
// module.exports = new HomeController;

const index = async (req, res) => {
    const page = req.query.page || 1;
    const { listItem } = await ProductModel.getList(page)
    return res.render('home', { listPro: listItem, user:req.user });
}
module.exports = {index}