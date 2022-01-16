const PREFIX = "product__";

class StorageUtil {
  static addProduct(userId, productId, quantity) {
    // Tại sao mình cần userID, bởi vì có thể có nhiều thằng user đăng nhập nên mình cần phân biệt món hàng này thêm cho thằng nào.
    // Giả sử nếu ko có userID, e là người đăng nhập vào máy e, sau đó thêm hàng vào giỏ, rồi đăng suất, cái a là người tiếp theo đăng nhập vào => tự nhiên có hàng trong giỏ hàng là sai bét rồi

    // LocalStorage làm việc dạng như MongoDB v á, nghĩa là nó chỉ cần KEY - VALUE, 1 key sẽ tương ứng với 1 value, nhưng value của thằng này chỉ nhận kiểu string,
    // cho nên e thấy ở bên dưới a phải dùng JSON để chuyển đổi qua lại
    const key = PREFIX + userId;

    // 1. Lấy danh sách product hiện tại từ trong localStorage ra
    // NOTE: nên nhớ là localStorage chỉ làm việc với string, cho nên thằng localStorage.getItem() => return ra 1 string;
    // Chỗ này e cần chuyển nó về dạng array.
    // Trong js mình có 1 hàm để chuyển mọi đối tượng về string là: JSON.stringify, ngược lại để ép từ string -> object, array thì mình dùng JSON.parse

    // Dấu || trong biểu thức bên dưới có nghĩa là nếu vế trước = null, undefined, chuỗi rỗng "",... thì nó sẽ lấy giá trị sau làm mặc đinh.

    let currentProducts = StorageUtil.getProduct(userId);

    // 2. Thêm product mới vào trong danh sách
    // Chỗ này code tào lao rồi :))))
    let isNewProd = true;
    currentProducts.forEach((prod) => {
      if (prod.productId === productId) {
        isNewProd = false;
        prod.quantity += quantity;
      }
    });

    if (isNewProd) {
      currentProducts.push({ productId, quantity });
    }

    // 3. Sau khi thêm product vào xong thì mình sẽ set lại vào trong localStorage.
    localStorage.setItem(key, JSON.stringify(currentProducts));
  }

  static getProduct(userId) {
    const key = PREFIX + userId;
    const productsString = localStorage.getItem(key);

    if (productsString) {
      return JSON.parse(productsString);
    }
    return [];
  }

  static removeProduct(userId, productId, quantityRemove) {
    let currentProducts = StorageUtil.getProduct(userId);

    // 2. Chỗ này mình đang làm cái chuyện là lấy cái product trong giỏ ra để xóa bớt,
    // nếu số lượng còn lại trong giỏ = 0 thì mình remove nó ra khỏi giỏ luôn
    currentProducts = currentProducts.fillter((prod) => {
      if (prod.productId === productId) {
        const remainQuantity = prod.quantity - quantityRemove;
        if (remainQuantity <= 0) return false;

        // Nếu số lượng vẫn > 0, thì cập nhật lại số lượng trong giỏ hàng
        prod.quantity = remainQuantity;
        return true;
      }

      return true;
    });

    // 3. set lại vào trong localStorage.
    localStorage.setItem(key, JSON.stringify(currentProducts));
  }
}

// Mình vừa viết tạm xong 1 cái LocalStorageutils để hỗ trợ mình thêm product vào trong localStorage cho tiện.
// Giờ tới phần add product vào trong nè

// Khi mình link file này vào bên trong file html, thì cái class StorageUtils của a sẽ tự động được đính vào trong object window của browser,
// cho nên a có thể truy cập global ở bất kì đâu a muốn
// Sở dĩ a nói trước để cho e hiểu ở file main.js a dùng nó mà e lại ko thấy import ở đâu :))))

// A viết lên trên này nha, ba a đang ngủ nên ko nói được. E cứ nói qua FB đi a nghe a viết lại.

// E link 2 cái file này vào trong giúp a đi :))))

// Bỏ cái chỗ preview đi :v ko e làm chết bỏ luôn á
// bấm dô là bay ra trang checkout thôi á

// Giờ có danh sách sản phẩm rồi, nhưng mà giờ làm sao hiển thị ra :))))
// Hoặc là a có thể code js để call api cũng được, e muốn cái nào :))))
// Chắc code js đi cho nó mới lạ :))))

// Chỗ này sẽ khác hơn tí xíu, tại mình phải render ra html ở trên Browser chứ ko phải như hiện tại là ở phía server
