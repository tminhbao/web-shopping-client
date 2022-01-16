// Mình setup một chút xíu về cái template
// Ở bước này thì mình cần phải query ra toàn bộ cái element chứa product bằng js. cho nên mình cần có 1 class riêng cho cái này

// E mở giúp a cái template render ra danh sách product với
// Ko e, cái danh sách product có button add to card á

const buttons = document.querySelectorAll("#product-add-to-card-btn");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    // Chỗ này mình cần check xem thử cái số lượng sản phẩm có > 0 hay ko để cho phép click

    const quantityProduct =
      Number(document.querySelector("#quantity-product").value) || 0;

    if (quantityProduct <= 0) return;

    const productId = button.getAttribute("data-src");
    const userId = button.getAttribute("data-user");

    // Giờ lưu vào nè
    StorageUtil.addProduct(userId, productId, quantityProduct);
  });
});

// Nhưng mà nó đang bị cái form

// Giờ e cần lưu cái id của product + quantity
// Nãy a code hơi nhầm rồi, sưa lại

// Mình cần pass vào trong cái element button cái id của laptop, để mình biết đang chọn cái laptop nào
