/*basices part start*/
//setup nav
var navbar = document.querySelector("nav.navbar");
var navOpenBtn = document.querySelector(".nav-btn");
var navCloseBtn = document.querySelector(".navbar-close-btn");
//close navbar
navCloseBtn.addEventListener("click", () => {
  navbar.classList.remove("show-navbar");
});
//open navbar
navOpenBtn.addEventListener("click", () => {
  navbar.classList.add("show-navbar");
});
/*basices part end*/
