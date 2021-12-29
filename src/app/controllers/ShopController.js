const ProductModel = require("../../models/product");
class ShopController {
  async index(req, res) {
    const { listItem, page, totalPage } = await ProductModel.getList(
      req.query.page || 1,
      req.query.manufacture
    );
    const listPage = [];
    for (let i = 0; i < totalPage; i++) {
      listPage.push(i + 1);
    }
    const listProductNameAZ = await ProductModel.getProductByNameAZ(req, res);
    res.render("shop", {
      listPro: listItem,
      listPage,
      page,
      listProductNameAZ: listProductNameAZ,
    });
    console.log(listProductNameAZ);
  }
}
module.exports = new ShopController();
