async function main(){
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
// //variables js on todo app 
// const addTodoBtn = document.getElementById("add-todo-btn");
// const TodoInput = document.getElementById("todo-input");
const bodyTag = document.querySelector("body");
const IconThemSwitcher = document.querySelector(".banner-text-icon-todo i"); 
const BtnThemSwitcher = document.querySelector(".banner-text-icon-todo");
// get todo part Start 
// addTodoBtn.addEventListener('click',()=>{

// });
// end todo part 
// dark and light switcher them

BtnThemSwitcher.addEventListener('click',()=>{
  bodyTag.classList.toggle('light');
  bodyTag.classList.toggle('dark');

  IconThemSwitcher.classList.toggle("bi-brightness-high");
  IconThemSwitcher.classList.toggle("bi-moon-stars-fill");

});
}
document.addEventListener('DOMContentLoaded',main);