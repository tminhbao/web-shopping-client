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
  const offset = (page - 1 || 1 - 1) * ITEM_PER_PAGE;

  // Lọc sản phẩm nếu không có filter theo brand
  if (!brand) {
    const sqlPaginate = `SELECT laptop.*, manufacture.manufacture_name as manu_name ,CONCAT_WS(" ", manufacture.manufacture_name, model.model_name, laptop.laptop_name) as name FROM laptop JOIN manufacture ON laptop.manufacture = manufacture.manufacture_id JOIN model ON laptop.model = model.model_id LIMIT ${ITEM_PER_PAGE} OFFSET ${offset};`
    //const sqlPaginate = `SELECT * FROM laptop LIMIT ${ITEM_PER_PAGE} OFFSET ${offset};`;
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

const getProductByNameAZ = async () => {
  const sqlProducByNameAZ = "SELECT * FROM laptop ORDER BY laptop_name ASC";
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
