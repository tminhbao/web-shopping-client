const ProductModel = require("../../models/product");
class ShopController {
  async index(req, res) {
    const { listItem, page, totalPage } = await ProductModel.getList(
      req.query.page || 0,
      req.query.manufacture
    );
    const listPage = [];
    for (let i = 0; i < totalPage; i++) {
      listPage.push(i + 1);
    }
    res.render("shop", { listPro: listItem, listPage, page });
  }
}
module.exports = new ShopController();
