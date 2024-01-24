// const storeApiURL = "https://65a9efbb081bd82e1d95bdd2.mockapi.io/product/";
const storeApiURL =
  "https://65a5f64474cf4207b4ef0e03.mockapi.io/PhoneProducts/";
const cartApiURL = "https://65a9efbb081bd82e1d95bdd2.mockapi.io/cart/";
const toggle = document.querySelectorAll(".product-img");

// Fetch product from API
let fetchProductList = () => {
  turnOnLoading();

  axios({
    url: storeApiURL,
    method: "GET",
  })
    .then(function (res) {
      turnOffLoading();
      printProductList(res);
    })
    .catch();
};

// Print product list
let printProductList = (list) => {
  let row = "";
  let rowApple = "";
  let rowSamsung = "";

  for (let i of list.data) {
    let currentRow = renderProduct(
      i.id,
      i.name,
      i.price,
      i.screen,
      i.backCamera,
      i.frontCamera,
      i.img
    );
    row += currentRow;

    if (i.type === "Apple") {
      rowApple += currentRow;
    } else if (i.type === "Samsung") {
      rowSamsung += currentRow;
    }
  }

  document.getElementById("printAll").innerHTML = row;
  document.getElementById("printApple").innerHTML = rowApple;
  document.getElementById("printSamsung").innerHTML = rowSamsung;
};

// Get cart info
// let getCartItems = async () => {
//     let res = await axios({
//         url: cartApiURL,
//         method: "GET",
//       });

//     document.getElementById("cartCounter").innerHTML = `${res.data.length}`;
// };

// Fetch cart list
let fetchCartList = async (first) => {
  cartList = new Array();

  let res = await axios({
    url: cartApiURL,
    method: "GET",
  });

  for (let i of res.data) {
    cartList.push(i);
  }

  document.getElementById("cartCounter").innerHTML = `${countCartItem(
    cartList
  )}`;

  printCartList();
};

// Add to cart
let addToCart = async (id) => {
  turnOnLoading();
  let hasItem = cartList.find((item) => item.id == id);

  if (hasItem) {
    let cartURL = cartApiURL + `${hasItem.index}`;
    hasItem.quantity++;
    let putItem = await axios
      .put(cartURL, hasItem)
      .then(function () {
        fetchCartList();
        turnOffLoading();
      })
      .catch();
  } else {
    let storeURL = storeApiURL + `${id}`;

    let storeItem = await axios({
      url: storeURL,
      method: "GET",
    });

    cartItem = {
      id: storeItem.data.id,
      name: storeItem.data.name,
      price: storeItem.data.price,
      img: storeItem.data.img,
      quantity: 1,
    };

    await axios.post(cartApiURL, cartItem);

    console.log(cartItem);
    fetchCartList();
    turnOffLoading();
  }

  // fetchCartList();
};

// Print cart list
let printCartList = () => {
  let row = "";

  for (let i of cartList) {
    row += renderCartItem(i);
  }

  document.getElementById("cartView").innerHTML = row;
  calcCartValue();
};

// Increase quantity
let addQuant = (id) => {
  let cartURL = cartApiURL + `${id}`;
  let cartItem = cartList.find((item) => item.id == id);

  cartItem.quantity++;
  axios
    .put(cartURL, cartItem)
    .then(function () {
      fetchCartList();
    })
    .catch();

  printCartList();
};

// Decrease quantity
let reduceQuant = async (id) => {
  let cartItem = cartList.find((item) => item.id == id);
  let cartURL = cartApiURL + `${cartItem.index}`;

  if (cartItem.quantity == 1) {
    cartList.splice(cartList.indexOf(cartItem), 1);
    await axios
      .delete(cartURL, cartItem)
      .then(function () {
        // fetchCartList();
      })
      .catch();
  } else {
    cartItem.quantity--;
    await axios
      .put(cartURL, cartItem)
      .then(function () {
        // fetchCartList();
      })
      .catch();
  }

  printCartList();
  fetchCartList();
};

// Remove item from cart
let removeItem = async (id) => {
  turnOnLoading();
  let cartItem = cartList.find((item) => item.id == id);
  let cartURL = cartApiURL + `${cartItem.index}`;

  await axios
    .delete(cartURL, cartItem)
    .then(function () {
      // fetchCartList();
    })
    .catch();

  await fetchCartList();
  printCartList();
  turnOffLoading();
};

// Remove all items from cart
let resetCart = async () => {
  turnOnLoading();
  for (let i of cartList) {
    await axios.delete(cartApiURL + i.index);
  }

  await fetchCartList();
  printCartList();
  turnOffLoading();
};

// Close Modal
$("#cartModal").click(function (ev) {
  if (ev.target != this) return;
  $("#cartModal").modal("hide");
});

// Toggle Cart View
document.getElementById("cartBtn").addEventListener("click", () => {
  document.getElementById("shoppingCart").classList.toggle("show");
});

// Loading screen
function turnOnLoading() {
  document.getElementById("loading").style.display = "block";
}

function turnOffLoading() {
  document.getElementById("loading").style.display = "none";
}

// Change header on scroll
$(window).on("scroll", function () {
  var scroll = $(window).scrollTop();

  if (scroll >= 20) {
    $("#header").addClass("header-changed");
  } else {
    $("#header").removeClass("header-changed");
  }
});


// Toggle menu
document.querySelector(".navbar-toggler").addEventListener("click", () => {
  document.getElementById("navbarCollapsed").classList.toggle("show");
})

fetchProductList();
fetchCartList();
