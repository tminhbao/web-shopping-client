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

    // Sắp xếp sản phẩm theo tên từ Z --> A
    const { listProductNameZA, pageNameZA, totalPageNameZA } =
      await ProductModel.getProductByNameZA(
        req.query.tenZA,
        req.query.page || 1
      );
    const listPageNameZA = [];
    for (let i = 0; i < totalPageNameZA; i++) {
      listPageNameZA.push(i + 1);
    }

    // Sắp xếp sản phẩm theo giá từ thấp tới cao
    const { listProductPriceLowHigh, pagePriceLowHigh, totalPagePriceLowHigh } =
      await ProductModel.getProductByPriceLowHigh(
        req.query.pricelowhigh,
        req.query.page || 1
      );
    const listPagePriceLowHigh = [];
    for (let i = 0; i < totalPagePriceLowHigh; i++) {
      listPagePriceLowHigh.push(i + 1);
    }

    // Sắp xếp sản phẩm theo giá từ cao tới thấp
    const { listProductPriceHighLow, pagePriceHighLow, totalPagePriceHighLow } =
      await ProductModel.getProductByPriceHighLow(
        req.query.pricehighlow,
        req.query.page || 1
      );
    const listPagePriceHighLow = [];
    for (let i = 0; i < totalPagePriceHighLow; i++) {
      listPagePriceHighLow.push(i + 1);
    }

    // Tìm kiếm sản phẩm
    const { listProductSearching, pageSearching, totalPageSearching } =
      await ProductModel.getProductBySearching(
        req.query.search,
        req.query.page || 1
      );
    const listPageSearching = [];
    for (let i = 0; i < totalPageSearching; i++) {
      listPageSearching.push(i + 1);
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
    } else if (req.query.pricelowhigh === "on") {
      res.render("shop", {
        listProductPriceLowHigh: listProductPriceLowHigh,
        listPagePriceLowHigh,
        pagePriceLowHigh,
        user: req.user,
      });
    } else if (req.query.pricehighlow === "on") {
      res.render("shop", {
        listProductPriceHighLow: listProductPriceHighLow,
        listPagePriceHighLow,
        pagePriceHighLow,
        user: req.user,
      });
    } else if (req.query.search) {
      if (req.query.search) {
        res.render("shop", {
          listProductSearching: listProductSearching,
          listPageSearching,
          pageSearching,
          user: req.user,
        });
      }
    } else {
      res.render("shop", {
        listPro: listItem,
        listPage,
        page,
        user: req.user,
      });
    }
  }
  async search(req, res) {
    const { listProductSearching, pageSearching, totalPageSearching } =
      await ProductModel.getProductBySearching(
        req.query.search,
        req.query.page || 1
      );
    const listPageSearching = [];
    for (let i = 0; i < totalPageSearching; i++) {
      listPageSearching.push(i + 1);
    }
    if (req.query.search) {
      res.render("shop", {
        listProductSearching: listProductSearching,
        listPageSearching,
        pageSearching,
        user: req.user,
      });
    }
  }
}
module.exports = new ShopController();
