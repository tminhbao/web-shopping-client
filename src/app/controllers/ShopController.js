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

    // Sắp xếp sản phẩm theo tên từ A --> Z
    const { listProductNameAZ, pageNameAZ, totalPageNameAZ } =
      await ProductModel.getProductByNameAZ(
        req.query.tenAZ,
        req.query.page || 1
      );
    const listPageNameAZ = [];
    for (let i = 0; i < totalPageNameAZ; i++) {
      listPageNameAZ.push(i + 1);
    }

    // Sắp xếp sản phẩm theo tên từ Z -->
    const { listProductNameZA, pageNameZA, totalPageNameZA } =
      await ProductModel.getProductByNameZA(
        req.query.tenZA,
        req.query.page || 1
      );
    const listPageNameZA = [];
    for (let i = 0; i < totalPageNameZA; i++) {
      listPageNameZA.push(i + 1);
    }

    if (req.query.tenAZ === "on") {
      res.render("shop", {
        listProductNameAZ: listProductNameAZ,
        listPageNameAZ,
        pageNameAZ,
        user: req.user,
      });
    } else if (req.query.tenZA === "on") {
      res.render("shop", {
        listProductNameZA: listProductNameZA,
        listPageNameZA,
        pageNameZA,
        user: req.user,
      });
    } else {
      res.render("shop", {
        listPro: listItem,
        listPage,
        page,
        user: req.user,
      });
    }
  }
}
module.exports = new ShopController();
