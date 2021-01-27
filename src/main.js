window.addEventListener('DOMContentLoaded', function() {
//BASE
const addButton = document.getElementById('add-button');
const sortButton = document.getElementById('sort-button');
const userInput = document.getElementById('text-input');
const list = document.getElementById('todo-list');
const userPriority = document.getElementById('priority-selector');
const counter = document.getElementById('counter').appendChild(document.createTextNode(""));
//BASE END

//FUNCTIONS
//FUNCTION: ADD TO LIST
const addToList = () => {
    const listItem = document.createElement('li');
    const itemContainer = document.createElement('div');
    const todoText = document.createElement('div');
    const todoDate = document.createElement('div');
    const todoPriority = document.createElement('div');
    itemContainer.classList.add('todo-container');
    todoText.classList.add('todo-text');
    todoDate.classList.add('todo-created-at');
    todoPriority.classList.add('todo-priority');
    todoText.appendChild(document.createTextNode(userInput.value));
    todoDate.appendChild(document.createTextNode(', added at: ' + comfyDate()))
    todoPriority.appendChild(document.createTextNode(', Priority ' + userPriority.value))
    list.appendChild(listItem);
    listItem.appendChild(itemContainer);
    itemContainer.appendChild(todoText);
    itemContainer.appendChild(todoDate);
    itemContainer.appendChild(todoPriority);
    userInput.value = "";
    userInput.focus();
    updateCounter()
}

//FUNCTION: UPDATE COUNTER
const updateCounter = () => {
  let count = list.querySelectorAll('li').length
  if (count === 1) {
    counter.textContent = count + " task"
  }
  else counter.textContent = count + " tasks"
}

//FUNCTION: COMFY DATE
const comfyDate = () => {
    const current_datetime = new Date();
    const formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();
    return formatted_date;
  }


//FUNCTION: SORT LIST



// --- BEGIN --- //
userInput.focus();
addButton.addEventListener('click',addToList);






































































})