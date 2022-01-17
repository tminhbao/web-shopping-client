const db = require("../configs/connect");

const executeQuery = (query) => {
  return new Promise((res, rej) => {
    db.query(query, (err, result) => {
      if (err) rej(err);
      else res(result);
    });
  });
};

function addItemToCart(laptop_id, user_id, image, price, quantity) {
  const sql = `INSERT INTO shoppingcart (laptop_id,user_id,image,price, quantity) VALUES ('${laptop_id}','${user_id}','${image}',${price},${quantity})`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
}

async function getCart(user_id) {
  const sql = `SELECT shoppingcart.*,CONCAT_WS(" ", manufacture.manufacture_name, model.model_name, laptop.laptop_name) as name, shoppingcart.price*shoppingcart.quantity AS total FROM shoppingcart,manufacture,model,laptop WHERE shoppingcart.laptop_id = laptop.laptop_id AND laptop.manufacture = manufacture.manufacture_id AND laptop.model = model.model_id AND user_id = ${user_id}`;
  const listProductCart = await executeQuery(sql);
  return listProductCart;
}

async function getTotalMoney(user_id) {
  const sql = `SELECT sum(shoppingcart.price*shoppingcart.quantity) AS totalMoney FROM shoppingcart,manufacture,model,laptop WHERE shoppingcart.laptop_id = laptop.laptop_id AND laptop.manufacture = manufacture.manufacture_id AND laptop.model = model.model_id AND user_id = ${user_id}`;
  const totalMoney = await executeQuery(sql);
  return totalMoney;
}

async function updateCart(user_id, laptop_id, quantity) {
  const sqlDelete = `DELETE FROM shoppingcart WHERE laptop_id = '${laptop_id}' AND user_id = '${user_id}' `;
  const sql = `UPDATE shoppingcart SET quantity = ${quantity} WHERE laptop_id = '${laptop_id}' AND user_id = '${user_id}'`;
  let listCartUpdate = null;
  if (quantity == 0) listCartUpdate = await executeQuery(sqlDelete);
  else listCartUpdate = await executeQuery(sql);
  return listCartUpdate;
}

async function updateCheckout(
  created,
  user_id,
  firstname,
  lastname,
  email,
  address,
  phone,
  note
) {
  const sql = `INSERT INTO checkout (created,user_id,firstname,lastname,email,address,phone,note) 
  VALUES ('${created}','${user_id}','${firstname}','${lastname}','${email}','${address}','${phone}','${note}')`;
  const listCheckout = await executeQuery(sql);
  return listCheckout;
}

async function getCheckout(user_id) {
  const sql = `SELECT * FROM checkout WHERE user_id = '${user_id}'`;
  const listCheckout = await executeQuery(sql);
  return listCheckout;
}

module.exports = {
  addItemToCart,
  getCart,
  getTotalMoney,
  updateCart,
  updateCheckout,
  getCheckout,
};
