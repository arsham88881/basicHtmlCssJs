async function main() {
  //nav part basices part
  basicesPart();
  //show exist todos
  showTodo(JSON.parse(localStorage.getItem("todos")));
  //add todo function
  addtodo();
  //draggable feature between list items
  dragOption();
  //filters
  const filters = document.querySelector(".filters");
  filters.addEventListener('click',(e)=>{
    //console.log(e.target.id);
    const id = e.target.id;
    if(id){
      document.querySelector('.on').classList.remove('on');
      document.getElementById(id).classList.add('on');
      document.querySelector('.tasks').className=`tasks ${id}`;
    }
  });
  const btnMultipleDelete = document.getElementById('remove-multiple');
  btnMultipleDelete.addEventListener('click',()=>{
    var indexs = [];
    const allcheckedtask = document.querySelectorAll('.task.checked');
    allcheckedtask.forEach((singletask)=>{
      const alltasks = [...document.querySelectorAll('.task')];
      indexs.push(alltasks.indexOf(singletask));
      singletask.classList.add('cancel-task-action');
      singletask.addEventListener('animationend',()=>{
        singletask.remove();
      });
    });
    removeMultiple(indexs);
  });

} //end of main() function
document.addEventListener("DOMContentLoaded", main);

function dragOption() {
  const ul = document.querySelector(".tasks");
  ul.addEventListener("dragover", (e) => {
    e.preventDefault();
    if (
      e.target.classList.contains("task") &&
      !e.target.classList.contains("draggable")
    ) {
      const draggedelement = document.querySelector(".draggable");
      const allTasks = [...document.querySelectorAll(".task")]; //get all elements on ul on task
      const currentPos = allTasks.indexOf(draggedelement);
      const wantedPos = allTasks.indexOf(e.target);

      if (currentPos > wantedPos) {
        ul.insertBefore(draggedelement, e.target);
      } else {
        ul.insertBefore(draggedelement, e.target.nextsibling);
      }
      const todos = JSON.parse(localStorage.getItem("todos"));
      const removed = todos.splice(currentPos, 1);
      todos.splice(wantedPos, 0, removed[0]);
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  });
}

function showTodo(todos) {
  if (!todos) {
    return null;
  }
  todos.forEach((taskObj) => {
    buildTask(taskObj);
  });
  const remmainder = document.querySelector("#reminder span");
  remmainder.textContent = document.querySelectorAll(
    ".task:not(.checked)"
  ).length;
}
function taskStatus(index, completeStatus) {
  var todos = JSON.parse(localStorage.getItem("todos"));
  todos[index].Iscomplete = completeStatus;
  localStorage.setItem("todos", JSON.stringify(todos));
}
function removeTask(index) {
  const todos = JSON.parse(localStorage.getItem("todos"));
  todos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function removeMultiple(indexs){
  var todos = JSON.parse(localStorage.getItem('todos'));
  todos = todos.filter((singletask,index)=>{
    return !indexs.includes(index);
  });//میاد اون هایی که توی لیست ایندکس ها ی حدفی نیست رو برمیگردونه توی تو دو
  localStorage.setItem('todos',JSON.stringify(todos));
}

function buildTask(item) {
  //create elemetns
  const task = document.createElement("li");
  const BtnContainer = document.createElement("div");
  const checkInput = document.createElement("input");
  const taskText = document.createElement("p");
  const cancelTaskBtn = document.createElement("div");
  const cancelIcon = document.createElement("i");
  //set classes
  task.classList.add("task");
  BtnContainer.classList.add("btn-container");
  checkInput.classList.add("task-check");
  taskText.classList.add("task-text");
  cancelTaskBtn.classList.add("cancel-task-btn");
  cancelIcon.classList.add("bi");
  cancelIcon.classList.add("bi-x");
  //set attributes
  taskText.innerHTML = item.title;
  if (item.Iscomplete) {
    task.classList.add("checked");
    checkInput.checked = true;
  }
  task.setAttribute("draggable", "true");
  checkInput.setAttribute("type", "checkbox");
  //ordered by parent and child figure
  cancelTaskBtn.appendChild(cancelIcon);
  BtnContainer.appendChild(checkInput);
  task.appendChild(BtnContainer);
  task.appendChild(taskText);
  task.appendChild(cancelTaskBtn);
  // append all to main parent
  document.querySelector(".tasks").appendChild(task);
  //event set
  //dragable feature
  task.addEventListener("dragstart", () => {
    task.classList.add("draggable");
  });
  task.addEventListener("dragend", () => {
    task.classList.remove("draggable");
  });
  //cancelation and reminder task meconizem
  cancelTaskBtn.addEventListener("click", () => {
    const currentTask = cancelTaskBtn.parentElement;
    var currentTaskIndex = [...document.querySelectorAll(".task")].indexOf(
      currentTask
    );
    removeTask(currentTaskIndex);
    currentTask.classList.add("cancel-task-action");
    currentTask.addEventListener("animationend", () => {
      setTimeout(() => {
        currentTask.remove();
        const remmainder = document.querySelector("#reminder span");
        remmainder.textContent = document.querySelectorAll(
          ".task:not(.checked)"
        ).length;
      }, 100);
    });
  });
  //check micanisem on task
  checkInput.addEventListener("click", () => {
    const currentTask = checkInput.parentElement.parentElement;
    const checkstatus = checkInput.checked;
    const currentTaskIndex = [...document.querySelectorAll(".task")].indexOf(
      currentTask
    );
    taskStatus(currentTaskIndex, checkstatus);

    checkstatus
      ? currentTask.classList.add("checked")
      : currentTask.classList.remove("checked");

    const remmainder = document.querySelector("#reminder span");
    remmainder.textContent = document.querySelectorAll(
      ".task:not(.checked)"
    ).length;
  });
}
function basicesPart() {
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
function addtodo() {
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
  todoInput.addEventListener("keydown", (e) => {
    //enter shortcut for addtask
    if (e.key == "Enter") {
      addTodoBtn.click();
    }
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
    if (currentTodo.title) {
      todoInput.value = "";
      allTodos.push(currentTodo);
      showTodo([currentTodo]); //? I don't know shot a array with one object to showtodo() function
      //توی این لوجیک به عنوان دو تا ظرف که ترتیب های یکسانی دارن نگاه میشود و تا توی حالت درگر هم عمل میکند درست
      localStorage.setItem("todos", JSON.stringify(allTodos));
    } else {
      window.alert("وظیفه ی خود را وارد کنید !");
    }
  });
}
