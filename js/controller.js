// Render product card
let renderProduct = (
  id,
  productName,
  price,
  screen,
  backCam,
  frontCam,
  img
) => `
<div class="product-card col-12 col-sm-6 col-lg-4 text-center">
<div class="product-content">
  <div id="item-${id}" class="product-img mx-auto">
    <img
      src="${img}"
      class="img-fluid"
      alt=""
    />
    <div class="product-desc">
      <div id="phoneName" class="mb-3">${productName}</div>
      <div id="screenSize" class="mb-3 text-left">Screen size: <span class="spec">${screen}</span></div>
      <div id="backCamera" class="mb-3 text-left">Back Camera: <span class="spec">${backCam}</span></div>
      <div id="frontCamera" class="mb-3 text-left">Front Camera: <span class="spec">${frontCam}</span></div>
    </div>
  </div>

  <div class="product-text">
      <div class="product-name">
          <span>${productName}</span>
      </div>

      <div class="product-price">
          <span>$ ${Intl.NumberFormat("en", {
            minimumFractionDigits: 2,
          }).format(price)}</span>
      </div>
  </div>

  <div class="product-footer d-flex justify-content-center">
      <button class="btn btn-learnMore" onclick="productDescToggle('item-${id}')">LEARN MORE</button>
      <button class="btn btn-buyNow" onclick="addToCart('${id}')">
          <i class="fa-solid fa-cart-shopping"></i>
          ADD TO CART
      </button>
  </div>
</div>
</div>
`;

// Increase quantity by 1
let increaseCount = (url, quantity) => {
  let product = axios.get(url);
};

// Count number of items in cart
let countCartItem = (cartList) => {
  {
    let count = 0;

    if (cartList === null) {
      return 0;
    }

    for (let i of cartList) {
      count += i.quantity;
    }

    return count;
  }
};

// Render cart item list
let renderCartItem = (item) => `
  <div class="cart-item d-flex">
    <div class="item-img">
      <img src="${item.img}"
        alt="" class="img-fluid" />
    </div>

    <div class="item-info d-flex flex-column justify-content-between">
      <span class="item-name">${item.name}</span>
      <div class="item-quant d-flex justify-content-between">
        <div class="btn-decrease d-flex align-items-center justify-content-center" onclick="reduceQuant(${item.id})">
            <i class="fa-solid fa-minus"></i>
        </div>

        <span class="item-count">${item.quantity}</span>

        <div class="btn-increase d-flex align-items-center justify-content-center" onclick="addQuant(${item.id})">
            <i class="fa-solid fa-plus"></i>
        </div>
      </div>
    </div>

    <div class="item-del align-self-center" onclick="removeItem(${item.id})">
      <i class="fa-solid fa-trash-can"></i>
    </div>
  </div>
`;


// Calculate total cart value
let calcCartValue = () => {
  let total = 0;

  for (let i of cartList) {
    total += i.quantity * i.price;
  }

  document.getElementById("totalCost").innerHTML = `$${Intl.NumberFormat("en-US", {
    style: "decimal", minimumFractionDigits: 2,
  }).format(total)}`;
}


// Close cart window
document.querySelector(".close-cart").addEventListener("click", () => {
  document.getElementById("shoppingCart").classList.toggle("show");
});