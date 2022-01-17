if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  const removeCartItemButtons =
    document.getElementsByClassName("li-product-remove");
  for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  const quantityInputs = document.getElementsByClassName("cart-plus-minus-box");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  const addToCartButtons = document.getElementsByClassName("add-to-cart");
  for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i];
    button.addEventListener("click", addToCartClicked);
  }
}

function removeCartItem(event) {
  const buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.parentElement.remove();
  updateCartTotal();
}

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function addToCartClicked(event) {
  var button = event.target;
  var shopItem = button.parentElement.parentElement.parentElement.parentElement;
  var title = shopItem.querySelector("h2").innerText;
  var price = parseInt(
    shopItem.querySelector(".new-price").innerText.replace("đ", "")
  );
  var imageSrc = shopItem.querySelector(".imageSrc").src;
  var quantity = shopItem.querySelector("#quantity-product").value;
  addItemToCart(title, price, imageSrc, quantity);
}

function addItemToCart(title, price, imageSrc, quantity) {
  const cartRow = document.createElement("tr");
  cartRow.classList.add("cart-item");
  const cartItems = document.getElementsByClassName("cart-item")[0];
  const cartItemNames = cartItems.getElementsByClassName("product-info");
  console.log(cartItemNames);
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText === title) {
      console.log(cartItemNames[i].innerText);
      alert("This item is already added to the cart");
    }
    return;
  }
  var cartRowContents = `<tr class="cart-row cart-item">
    <td class="li-product-thumbnail "><a href=""><img
          style="width: 100px"
          src=${imageSrc}
          alt="Li's Product Image"
        /></a></td>
    <td class="li-product-name"><a href="#">${title}</a></td>
    <td class="li-product-price"><span class="amount">${price} VNĐ</span></td>
    <td class="quantity">
      <label>Quantity</label>
      <div class="cart-plus-minus">
        <input class="cart-plus-minus-box" value=${quantity} type="text" />
        <div class="dec qtybutton"><i
            class="fa fa-angle-down"
          ></i></div>
        <div class="inc qtybutton"><i
            class="fa fa-angle-up"
          ></i></div>
      </div>
    </td>
    <td class="product-subtotal"><span class="amount">23.490.000 VNĐ</span></td>
    <td class="li-product-remove">
      <a><i class="fa fa-times"></i>
      </a>
    </td>
  </tr>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
}

function updateCartTotal() {
  const cartItemContainer = document.getElementsByClassName("list-product")[0];
  const cartRows = cartItemContainer.getElementsByClassName("cart-row");
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    const cartRow = cartRows[i];
    const priceElement = cartRow.getElementsByClassName("amount")[0];
    const quantityElement = cartRow.getElementsByClassName(
      "cart-plus-minus-box"
    )[0];
    const price = parseInt(priceElement.innerText.replace("VNĐ", ""));
    const quantity = quantityElement.value;
    total = total + price * quantity;
  }
  console.log(total);
  document.getElementsByClassName("cart-total")[0].innerText = Number(total);
}
