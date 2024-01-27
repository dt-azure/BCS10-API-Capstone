// const toggle = document.querySelectorAll(".product-img");

// for (let i of toggle) {
//     console.log(i);
// }

// document.querySelectorAll(".btn-learnMore").addEventListener("click", () => {
//     toggle.classList.toggle("product-toggle");
// });

let productDescToggle = (id) => {
    document.querySelector(`#${id}`).classList.toggle("product-toggle");
};