const ProductModel = require("../../models/product");
const CommentModel = require("../../models/comment");
const ShoppingCartModel = require("../../models/shopping-cart");
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
      const username = req.query.username;
      const content = req.query.content;
      await CommentModel.addComments(req.query.id, username, content);
    } else if (req.query.content && !req.query.username) {
      const user = req.user;
      console.log(user.firstname);
      const username = user.firstname;
      const content = req.query.content;
      await CommentModel.addComments(req.query.id, username, content);
    }

    // Lấy bình luận sản phẩm

    const { listComment, totalPageComment, pageComment } =
      await CommentModel.getListComment(req.query.page, req.query.id);
    const listPageComment = [];
    for (let i = 0; i < totalPageComment; i++) {
      listPageComment.push(i + 1);
    }

    productDetail.forEach((product) => {
      if (req.user) {
        product.user = req.user;
      }
    });

    if (!req.user) {
      console.log("Xin mời đăng nhập");
    } else if (
      (req.query.id,
      req.user.id &&
        req.query.imageSrc &&
        req.query.price &&
        req.query.quantity &&
        req.user.id)
    ) {
      ShoppingCartModel.addItemToCart(
        req.query.id,
        req.user.id,
        req.query.imageSrc,
        req.query.price,
        req.query.quantity
      );
    }

    res.render("single-product", {
      listItem: productDetail,
      user: req.user,
      productRelevant: productRelevant,
      listComment: listComment,
      listPageComment,
      pageComment,
    });
  }
}
module.exports = new SingleProductController();
