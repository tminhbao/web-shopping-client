const db = require("../configs/connect");

// Giới hạn sản phẩm mỗi trang
const ITEM_PER_PAGE = 15;

const executeQuery = (query) => {
  return new Promise((res, rej) => {
    db.query(query, (err, result) => {
      if (err) rej(err);
      else res(result);
    });
  });
};

// Lấy danh sách sản phẩm, tham số truyền vào là page & brand
const getList = async (page, brand) => {
  const offset = (page - 1 || 1 - 1) * ITEM_PER_PAGE;

  // Lấy danh sách sản phẩm (trường hợp KHÔNG CÓ brand)
  if (!brand) {
    const sqlPaginate = `SELECT laptop.*, manufacture.manufacture_name as manu_name ,CONCAT_WS(" ", manufacture.manufacture_name, model.model_name, laptop.laptop_name) as name FROM laptop JOIN manufacture ON laptop.manufacture = manufacture.manufacture_id JOIN model ON laptop.model = model.model_id LIMIT ${ITEM_PER_PAGE} OFFSET ${offset};`;
    const sqlTotalItem = `SELECT COUNT(*) AS totalItem FROM laptop`;

    const [listItem, totalItem] = await Promise.all([
      executeQuery(sqlPaginate),
      executeQuery(sqlTotalItem),
    ]);
    const totalPage = Math.ceil((totalItem[0].totalItem || 0) / ITEM_PER_PAGE);
    return { listItem, totalPage, page };
  }
  // Lấy danh sách sản phẩm (trường hợp CÓ brand)
  else {
    const sqlPaginate = `SELECT laptop.*, manufacture.manufacture_name as manu_name ,CONCAT_WS(" ", manufacture.manufacture_name, model.model_name, laptop.laptop_name) as name FROM laptop JOIN manufacture ON laptop.manufacture = manufacture.manufacture_id JOIN model ON laptop.model = model.model_id WHERE manufacture = '${brand}' LIMIT ${ITEM_PER_PAGE} OFFSET ${offset}`;
    const sqlTotalItem = `SELECT COUNT(*) AS totalItem FROM laptop WHERE manufacture = '${brand}'`;
    const [listItem, totalItem] = await Promise.all([
      executeQuery(sqlPaginate),
      executeQuery(sqlTotalItem),
    ]);
    const totalPage = Math.ceil((totalItem[0].totalItem || 0) / ITEM_PER_PAGE);
    return { listItem, totalPage, page };
  }
};

// Xem chi tiết sản phẩm (theo ID)
const getProductDetail = async (id) => {
  const sqlProductDetail = `SELECT laptop.*, manufacture.manufacture_name as manu_name ,CONCAT_WS(" ", manufacture.manufacture_name, model.model_name, laptop.laptop_name) as name FROM laptop JOIN manufacture ON laptop.manufacture = manufacture.manufacture_id JOIN model ON laptop.model = model.model_id HAVING laptop_id = '${id}'`;
  const productDetail = await executeQuery(sqlProductDetail);
  return productDetail;
};

// Lọc sản phẩm theo tên từ A --> Z
const getProductByNameAZ = async (tenAZ, pageNameAZ) => {
  if (tenAZ === "on") {
    const offset = (pageNameAZ - 1 || 1 - 1) * ITEM_PER_PAGE;
    const sqlPaginate = `SELECT laptop.*, manufacture.manufacture_name as manu_name ,CONCAT_WS(" ", manufacture.manufacture_name, model.model_name, laptop.laptop_name) as name FROM laptop JOIN manufacture ON laptop.manufacture = manufacture.manufacture_id JOIN model ON laptop.model = model.model_id ORDER BY name LIMIT ${ITEM_PER_PAGE} OFFSET ${offset}`;
    //const sqlPaginate = `SELECT * FROM laptop   LIMIT ${ITEM_PER_PAGE} OFFSET ${offset}`;
    const sqlTotalItem = `SELECT COUNT(*) AS totalItem FROM laptop`;
    const [listProductNameAZ, totalItem] = await Promise.all([
      executeQuery(sqlPaginate),
      executeQuery(sqlTotalItem),
    ]);
    const totalPageNameAZ = Math.ceil(
      (totalItem[0].totalItem || 0) / ITEM_PER_PAGE
    );
    return { listProductNameAZ, totalPageNameAZ, pageNameAZ };
  } else {
    const listProductNameAZ = null;
    const totalPageNameAZ = 0;
    const pageNameAZ = 0;
    return { listProductNameAZ, totalPageNameAZ, pageNameAZ };
  }
};

// Lọc sản phẩm theo tên từ Z --> A
const getProductByNameZA = async (tenZA, pageNameZA) => {
  if (tenZA === "on") {
    const offset = (pageNameZA - 1 || 1 - 1) * ITEM_PER_PAGE;
    const sqlPaginate = `SELECT laptop.*, manufacture.manufacture_name as manu_name ,CONCAT_WS(" ", manufacture.manufacture_name, model.model_name, laptop.laptop_name) as name FROM laptop JOIN manufacture ON laptop.manufacture = manufacture.manufacture_id JOIN model ON laptop.model = model.model_id ORDER BY name DESC LIMIT ${ITEM_PER_PAGE} OFFSET ${offset}`;
    //const sqlPaginate = `SELECT * FROM laptop   LIMIT ${ITEM_PER_PAGE} OFFSET ${offset}`;
    const sqlTotalItem = `SELECT COUNT(*) AS totalItem FROM laptop`;
    const [listProductNameZA, totalItem] = await Promise.all([
      executeQuery(sqlPaginate),
      executeQuery(sqlTotalItem),
    ]);
    const totalPageNameZA = Math.ceil(
      (totalItem[0].totalItem || 0) / ITEM_PER_PAGE
    );
    return { listProductNameZA, totalPageNameZA, pageNameZA };
  } else {
    const listProductNameZA = null;
    const totalPageNameZA = 0;
    const pageNameZA = 0;
    return { listProductNameZA, totalPageNameZA, pageNameZA };
  }
};

// Lọc sản phẩm theo giá từ thấp tới cao
const getProductByPriceLowHigh = async (pricelowhigh, pagePriceLowHigh) => {
  if (pricelowhigh === "on") {
    const offset = (pagePriceLowHigh - 1 || 1 - 1) * ITEM_PER_PAGE;
    const sqlPaginate = `SELECT laptop.*, manufacture.manufacture_name as manu_name ,CONCAT_WS(" ", manufacture.manufacture_name, model.model_name, laptop.laptop_name) as name FROM laptop JOIN manufacture ON laptop.manufacture = manufacture.manufacture_id JOIN model ON laptop.model = model.model_id ORDER BY price LIMIT ${ITEM_PER_PAGE} OFFSET ${offset}`;
    const sqlTotalItem = `SELECT COUNT(*) AS totalItem FROM laptop`;
    const [listProductPriceLowHigh, totalItem] = await Promise.all([
      executeQuery(sqlPaginate),
      executeQuery(sqlTotalItem),
    ]);
    const totalPagePriceLowHigh = Math.ceil(
      (totalItem[0].totalItem || 0) / ITEM_PER_PAGE
    );
    return { listProductPriceLowHigh, totalPagePriceLowHigh, pagePriceLowHigh };
  } else {
    const listProductPriceLowHigh = null;
    const totalPagePriceLowHigh = 0;
    const pagePriceLowHigh = 0;
    return { listProductPriceLowHigh, totalPagePriceLowHigh, pagePriceLowHigh };
  }
};
// Lọc sản phẩm theo giá từ cao tới thấp
const getProductByPriceHighLow = async (pricehighlow, pagePriceHighLow) => {
  if (pricehighlow === "on") {
    const offset = (pagePriceHighLow - 1 || 1 - 1) * ITEM_PER_PAGE;
    const sqlPaginate = `SELECT laptop.*, manufacture.manufacture_name as manu_name ,CONCAT_WS(" ", manufacture.manufacture_name, model.model_name, laptop.laptop_name) as name FROM laptop JOIN manufacture ON laptop.manufacture = manufacture.manufacture_id JOIN model ON laptop.model = model.model_id ORDER BY price DESC LIMIT ${ITEM_PER_PAGE} OFFSET ${offset}`;
    const sqlTotalItem = `SELECT COUNT(*) AS totalItem FROM laptop`;
    const [listProductPriceHighLow, totalItem] = await Promise.all([
      executeQuery(sqlPaginate),
      executeQuery(sqlTotalItem),
    ]);
    const totalPagePriceHighLow = Math.ceil(
      (totalItem[0].totalItem || 0) / ITEM_PER_PAGE
    );
    return { listProductPriceHighLow, totalPagePriceHighLow, pagePriceHighLow };
  } else {
    const listProductPriceHighLow = null;
    const totalPagePriceHighLow = 0;
    const pagePriceHighLow = 0;
    return { listProductPriceHighLow, totalPagePriceHighLow, pagePriceHighLow };
  }
};

module.exports = {
  getList,
  getProductDetail,
  getProductByNameAZ,
  getProductByNameZA,
  getProductByPriceLowHigh,
  getProductByPriceHighLow,
};
