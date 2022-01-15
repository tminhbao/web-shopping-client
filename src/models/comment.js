const db = require("../configs/connect");
// Giới hạn bình luận mỗi trang
const ITEM_PER_PAGE = 5;

const executeQuery = (query) => {
  return new Promise((res, rej) => {
    db.query(query, (err, result) => {
      if (err) rej(err);
      else res(result);
    });
  });
};

// Lấy danh sách bình luận, tham số truyền vào là page
const getListComment = async (pageComment, id) => {
  const offset = (pageComment - 1 || 1 - 1) * ITEM_PER_PAGE;
  const sqlPaginate = `SELECT * FROM comments WHERE laptop_id = '${id}' LIMIT ${ITEM_PER_PAGE} OFFSET ${offset};`;
  const sqlTotalItem = `SELECT COUNT(*) AS totalItem FROM comments`;
  const [listComment, totalItem] = await Promise.all([
    executeQuery(sqlPaginate),
    executeQuery(sqlTotalItem),
  ]);
  const totalPageComment = Math.ceil(
    (totalItem[0].totalItem || 0) / ITEM_PER_PAGE
  );
  return { listComment, totalPageComment, pageComment };
};

const addComments = async (laptop_id, username, content) => {
  const sql = `INSERT INTO comments (laptop_id, username, content) VALUES ('${laptop_id}', '${username}', '${content}')`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
};

module.exports = { getListComment, addComments };
