const ProductModel = require("../../models/product");
class ShopController {
  async index(req, res) {
    const { listItem, page, totalPage } = await ProductModel.getList(
      req.query.page || 1,
      req.query.manufacture
    );
    const listProductNameAZ = await ProductModel.getProductByNameAZ(
      req.query.tenAZ,
      req.query.page || 1
    );
    const listPage = [];
    for (let i = 0; i < totalPage; i++) {
      listPage.push(i + 1);
    }

    res.render("shop", {
      listPro: listItem,
      listPage,
      page,
      listProductNameAZ: listProductNameAZ,
      user: req.user,
    });
  }
}
module.exports = new ShopController();
