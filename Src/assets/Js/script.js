async function main() {
  //nav part basices part
  basicesPart();
  //show exist todos
  if(!localStorage.getItem("todos")){
    document.querySelector("#not-exist-todo").innerHTML='هیچ تسکی موجود نیست';
  }
  else{
  showTodo();
  }
  //add todo function
  addtodo();


  //show todo
} //end of main() function
document.addEventListener("DOMContentLoaded", main);

function showTodo(){
  const todos = JSON.parse(localStorage.getItem("todos"));
  
  todos.forEach(taskObj => {
    buildTask(taskObj);
  });
}
function buildTask(item){
  //create elemetns
  const task = document.createElement('li');
  const BtnContainer = document.createElement('div');
  const checkInput = document.createElement('input');
  const taskText = document.createElement('p');
  const cancelTaskBtn = document.createElement('div');
  const cancelIcon = document.createElement('i');
  //set classes
  task.classList.add("task");
  BtnContainer.classList.add("btn-container");
  checkInput.classList.add("task-check");
  taskText.classList.add("task-text");
  cancelTaskBtn.classList.add("cancel-task-btn");
  cancelIcon.classList.add("bi");
  cancelIcon.classList.add("bi-x");
  //set attributes
  taskText.innerHTML=item.title;
  //
  task.setAttribute('draggable','true');
  checkInput.setAttribute('type','checkbox');
  //ordered by parent and child figure
  cancelTaskBtn.appendChild(cancelIcon);
  BtnContainer.appendChild(checkInput);
  task.appendChild(BtnContainer);
  task.appendChild(taskText);
  task.appendChild(cancelTaskBtn);
 // append all to main parent
  document.querySelector(".tasks").appendChild(task);
}
function basicesPart(){
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
}
function addtodo(){
  // //variables js on todo app
  const bodyTag = document.querySelector("body");
  const IconThemSwitcher = document.querySelector(".banner-text-icon-todo i");
  const BtnThemSwitcher = document.querySelector(".banner-text-icon-todo");
  const addTodoBtn = document.getElementById("add-todo-btn");
  const todoInput = document.querySelector("#todo-input");
  // dark and light switcher them
  BtnThemSwitcher.addEventListener("click", () => {
    bodyTag.classList.toggle("light");
    bodyTag.classList.toggle("dark");

    IconThemSwitcher.classList.toggle("bi-brightness-high");
    IconThemSwitcher.classList.toggle("bi-moon-stars-fill");
  });
  //add todo
  addTodoBtn.addEventListener("click", () => {
    var allTodos = !localStorage.getItem("todos")
      ? []
      : JSON.parse(localStorage.getItem("todos"));
    var currentTodo = {
      title: todoInput.value.trim(), //every where use queryselector bug lower when detecting
      Iscomplete: false,
    };
    if(currentTodo.title){
    todoInput.value = "";
    allTodos.push(currentTodo);
    localStorage.setItem("todos", JSON.stringify(allTodos));
    location.reload();
    }
    else{
      window.alert("وظیفه ی خود را وارد کنید !");
    }
  });
}