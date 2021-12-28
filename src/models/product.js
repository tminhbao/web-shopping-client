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

// Lấy danh sách, tham số truyền vào là một page

const getList = async (page, brand) => {
  const offset = (page || 1 - 1) * ITEM_PER_PAGE;

  // Lọc sản phẩm nếu không có filter theo brand
  if (!brand) {
    const sqlPaginate = `SELECT * FROM laptop LIMIT ${ITEM_PER_PAGE} OFFSET ${offset};`;
    const sqlTotalItem = `SELECT COUNT(*) AS totalItem FROM laptop`;

    const [listItem, totalItem] = await Promise.all([
      executeQuery(sqlPaginate),
      executeQuery(sqlTotalItem),
    ]);
    const totalPage = Math.ceil((totalItem[0].totalItem || 0) / ITEM_PER_PAGE);
    return { listItem, totalPage, page };
  }
  // Lọc sản phẩm theo brand
  else {
    const sqlPaginate = `SELECT * FROM laptop WHERE manufacture = '${brand}' LIMIT ${ITEM_PER_PAGE} OFFSET ${offset}`;
    const sqlTotalItem = `SELECT COUNT(*) AS totalItem FROM laptop WHERE manufacture = '${brand}'`;
    const [listItem, totalItem] = await Promise.all([
      executeQuery(sqlPaginate),
      executeQuery(sqlTotalItem),
    ]);
    const totalPage = Math.ceil((totalItem[0].totalItem || 0) / ITEM_PER_PAGE);
    return { listItem, totalPage, page };
  }
};

const getProductDetail = async (id) => {
  const sqlProductDetail = `SELECT * FROM laptop HAVING laptop_id = '${id}'`;
  const productDetail = await executeQuery(sqlProductDetail);
  return productDetail;
};

const getProductByBrand = async (brand) => {
  const sqlProducByBrand = `SELECT * FROM laptop WHERE manufacture = '${brand}'`;
  const productByBrand = await executeQuery(sqlProducByBrand);
  return productByBrand;
};

const getProductByNameAZ = async (req, res) => {
  if (req.body === "ten-A-Z=sales") {
    const sqlPaginate = `SELECT * FROM laptop WHERE manufacture = '${brand}' LIMIT ${ITEM_PER_PAGE} OFFSET ${offset}`;
    const sqlTotalItem = "SELECT * FROM laptop ORDER BY laptop_name ASC";
    const [listItem, totalItem] = await Promise.all([
      executeQuery(sqlPaginate),
      executeQuery(sqlTotalItem),
    ]);
    const totalPage = Math.ceil((totalItem[0].totalItem || 0) / ITEM_PER_PAGE);
    return { listItem, totalPage, page };
  }
};

const getProductByNameZA = async () => {
  const sqlProducByNameZA = "SELECT * FROM laptop ORDER BY laptop_name DESC";
};

const getProductByPriceLowHigh = async () => {
  const sqlProductByPriceLowHigh = "SELECT * FROM laptop ORDER BY price ASC";
};

const getProductByPriceHighLow = async () => {
  const sqlProductByPriceHighLow = "SELECT * FROM laptop ORDER BY price DESC";
};

module.exports = { getList, getProductDetail, getProductByBrand };
