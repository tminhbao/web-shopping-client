const db = require("../configs/connect");

// const removeCartItemButtons =
//   document.getElementsByClassName("li-product-remove");
// for (var i = 0; i < removeCartItemButtons.length; i++) {
//   var button = removeCartItemButtons[i];
//   button.addEventListener("click", removeCartItem);
// }
// const quantityInputs = document.getElementsByClassName("cart-plus-minus-box");
// for (var i = 0; i < quantityInputs.length; i++) {
//   var input = quantityInputs[i];
//   input.addEventListener("change", quantityChanged);
// }

// const addToCartButtons = document.getElementsByClassName("add-to-cart");
// for (var i = 0; i < addToCartButtons.length; i++) {
//   var button = addToCartButtons[i];
//   button.addEventListener("click", addToCartClicked);
// }

// const addToCartButtons = document.getElementsByClassName("add-to-cart");
// for (var i = 0; i < addToCartButtons.length; i++) {
//   var button = addToCartButtons[i];
//   button.addEventListener("click", addToCartClicked);
// }

// function removeCartItem(event) {
//   const buttonClicked = event.target;
//   buttonClicked.parentElement.parentElement.parentElement.remove();
//   updateCartTotal();
// }

// function quantityChanged(event) {
//   var input = event.target;
//   if (isNaN(input.value) || input.value <= 0) {
//     input.value = 1;
//   }
//   updateCartTotal();
// }

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

// function updateCartTotal() {
//   const cartItemContainer = document.getElementsByClassName("list-product")[0];
//   const cartRows = cartItemContainer.getElementsByClassName("cart-row");
//   var total = 0;
//   for (var i = 0; i < cartRows.length; i++) {
//     const cartRow = cartRows[i];
//     const priceElement = cartRow.getElementsByClassName("amount")[0];
//     const quantityElement = cartRow.getElementsByClassName(
//       "cart-plus-minus-box"
//     )[0];
//     const price = parseInt(priceElement.innerText.replace("VNĐ", ""));
//     const quantity = quantityElement.value;
//     total = total + price * quantity;
//   }
//   console.log(total);
//   document.getElementsByClassName("cart-total")[0].innerText = Number(total);
// }

module.exports = { addItemToCart, getCart, getTotalMoney };
