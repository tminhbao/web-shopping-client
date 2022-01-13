const ProductModel = require("../../models/product");
class SingleProductController {
  async index(req, res) {
    const productDetail = await ProductModel.getProductDetail(
      req.query.id || "laptop001"
    );
    const productRelevant = await ProductModel.getProductRelevant(
      req.query.id || "laptop001"
    );
    res.render("single-product", {
      listItem: productDetail,
      user: req.user,
      productRelevant: productRelevant,
    });
  }
}
module.exports = new SingleProductController();
