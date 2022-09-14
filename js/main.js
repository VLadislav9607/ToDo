const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const taskList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

let tasks = [];

if (localStorage.getItem('tasks')) {
   tasks = JSON.parse(localStorage.getItem('tasks'));
   tasks.forEach((task) => renderTask(task));

}


check();

form.addEventListener('submit', addTask);
taskList.addEventListener('click', deleteTask);
taskList.addEventListener('click', doneTask);


//Function

function addTask(event) {
   //Відключаємо дефолтне перезавантаження сторінки при відправці форми 
   event.preventDefault();


   const taskText = taskInput.value


   const newTask = {
      id: Date.now(),
      done: false,
      text: taskText,
   };

   tasks.push(newTask);

   saveToLocalStorage();

   renderTask(newTask);

   //Інпут чистий після відправки
   taskInput.value = '';
   taskInput.focus();

   check();

}

function deleteTask(event) {
   if (event.target.dataset.action !== 'delete') return;

   const parenNode = event.target.closest('.list-group-item');

   const id = Number(parenNode.id);

   tasks = tasks.filter((task) => task.id !== id);

   saveToLocalStorage();

   parenNode.remove();

   check();

}

function doneTask(event) {
   if (event.target.dataset.action !== 'done') return;

   const parenNode = event.target.closest('.list-group-item');

   const id = Number(parenNode.id);
   const task = tasks.find((task) => task.id === id);
   task.done = !task.done;

   const titleTask = parenNode.querySelector('.task-title');
   titleTask.classList.add('task-title--done');
}


function check() {
   if (tasks.length === 0) {

      const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
      <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
      <div class="empty-list__title">Сьоні відпочивай</div>
   </li>`;

      taskList.insertAdjacentHTML('afterbegin', emptyListHTML);
   };

   if (tasks.length > 0) {
      const emptyEl = document.querySelector('#emptyList');
      emptyEl ? emptyEl.remove() : null;
   };
}

function saveToLocalStorage() {
   localStorage.setItem('tasks', JSON.stringify(tasks))
}


function renderTask(task) {
   const cssClass = task.done ? 'task-title task-title--done' : 'task-title';

   //Міняємо розмітку
   const taskHTML = `<li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
                     <span class="${cssClass}">${task.text}</span>
                     <div class="task-item__buttons">
                        <button type="button" data-action="done" class="btn-action">
                            <img src="./img/tick.svg" alt="Done" width="18" height="18">
                        </button>
                         <button type="button" data-action="delete" class="btn-action">
                           <img src="./img/cross.svg" alt="Done" width="18" height="18">
                        </button>
                     </div>
                     </li>`;
   //Добавляємо задачу в список
   taskList.insertAdjacentHTML('beforeend', taskHTML);
}