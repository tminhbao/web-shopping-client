const db = require('../configs/connect');

// Giới hạn sản phẩm mỗi trang
const ITEM_PER_PAGE = 15;

const executeQuery = (query) => {
  return new Promise((res, rej) => {
    db.query(query, (err, result) => {
      if (err) rej(err)
      else res(result);
    })
  })
}

// Lấy danh sách, tham số truyền vào là một page

const getList = async (page) => {
  const offset = (page || 1 - 1) * ITEM_PER_PAGE;
  
  const sqlPaginate = `SELECT * FROM laptop LIMIT ${ITEM_PER_PAGE} OFFSET ${offset};`;
  const sqlTotalItem = `SELECT COUNT(*) AS totalItem FROM laptop`

  const [listItem, totalItem] = await Promise.all([executeQuery(sqlPaginate), executeQuery(sqlTotalItem)])
  const totalPage = Math.ceil((totalItem[0].totalItem || 0) / ITEM_PER_PAGE);

  return { listItem, totalPage, page }
}

const getProductDetail = async (id) => {
  const sqlProductDetail = `SELECT * FROM laptop HAVING laptop_id = '${id}'`
  const productDetail = await executeQuery(sqlProductDetail);
  return productDetail;
}

const getProductByBrand = async (brand) => {

  const sqlProducByBrand = `SELECT * FROM laptop WHERE manufacture = '${brand}'`
  const productByBrand = await executeQuery(sqlProducByBrand);
  return productByBrand;

  
  // const offset = (page || 1 - 1) * ITEM_PER_PAGE;
  
  // const sqlPaginate = `SELECT * FROM laptop LIMIT WHERE manufacture = '${brand}'`;
  // const sqlTotalItem = `SELECT COUNT(*) AS totalItem FROM laptop`

  // const [listItem, totalItem] = await Promise.all([executeQuery(sqlPaginate), executeQuery(sqlTotalItem)])
  // const totalPage = Math.ceil((totalItem[0].totalItem || 0) / ITEM_PER_PAGE);

  // return { listItem, totalPage, page }
}
module.exports = { getList, getProductDetail, getProductByBrand }





