const ProductModel = require("../../models/product");
const CommentModel = require("../../models/comment");
class SingleProductController {
  async index(req, res) {
    // Hiển thị chi tiết sản phẩm
    const productDetail = await ProductModel.getProductDetail(
      req.query.id || "laptop001"
    );
    // Hiển thị các sản phẩm liên quan
    const productRelevant = await ProductModel.getProductRelevant(
      req.query.id || "laptop001"
    );

    // Thêm bình luận sản phẩm
    if (req.query.username && req.query.content) {
      const user = req.user;
      const username = req.query.username;
      if (user) username = user.firstname;
      const content = req.query.content;
      await CommentModel.addComments(req.query.id, username, content);
    }

    // Lấy bình luận sản phẩm
    const listComment = CommentModel.getListComment(
      req.query.page || 1,
      req.query.id
    );

    res.render("single-product", {
      listItem: productDetail,
      user: req.user,
      productRelevant: productRelevant,
    });
  }
}
module.exports = new SingleProductController();
