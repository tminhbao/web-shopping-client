async function main() {
  const listProduct = StorageUtil.getProduct("4");
  const url = `http://localhost:3000/shopping-cart/product?product=${JSON.stringify(
    listProduct
  )}`;
  const res = await fetch(url).then((r) => r.json());
  const listProductDetails = res.data;

  console.log(listProductDetails);

  const name = [];
  for (let i = 0; i < listProductDetails.length; i++)
    name[i] = listProductDetails[i].name;

  // Giờ mình có hết toàn bộ product rồi, giờ render lên

  let html = "";

  listProductDetails.forEach((prod) => {
    html += `
    <tr class="cart-row">
    <td class="li-product-thumbnail"><a href=""><img
          style="width: 100px"
          src="images/product/acer-nitro-5.jpg"
          alt="Li's Product Image"
        /></a></td>
    <td class="li-product-name"><a href="#">Acer Nitro 5</a></td>
    <td class="li-product-price"><span class="amount">23.490.000
        VNĐ</span></td>
    <td class="quantity">
      <label>Quantity</label>
      <div class="cart-plus-minus">
        <input
          class="cart-plus-minus-box"
          value="1"
          type="text"
        />
        <div class="dec qtybutton"><i
            class="fa fa-angle-down"
          ></i></div>
        <div class="inc qtybutton"><i
            class="fa fa-angle-up"
          ></i></div>
      </div>
    </td>
    <td class="product-subtotal"><span class="amount">23.490.000
        VNĐ</span></td>
    <td class="li-product-remove">
      <a><i class="fa fa-times"></i>
      </a>
    </td>
  </tr>`;

    document.querySelector("#list-product").innerHTML = html;
    // Mình có được html rồi, giờ gắn lên dom
  });
}

window.addEventListener("load", () => {
  main();
});

// AJAX - Restfull API

// E tháy mình có 1 sản phẩm ko :)))
