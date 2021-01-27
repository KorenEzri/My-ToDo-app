window.addEventListener('DOMContentLoaded', function() {
//BASE
const addButton = document.getElementById('add-button');
const sortButton = document.getElementById('sort-button');
const userInput = document.getElementById('text-input');
const list = document.getElementById('todo-list');
const userPriority = document.getElementById('priority-selector');
const counter = document.getElementById('counter');
let count = list.querySelectorAll('li').length
console.log(count)
//BASE END

//FUNCTIONS
//ADD TO LIST
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
    count = list.querySelectorAll('li').length
    console.log(count)
}
//COMFY DATE
const comfyDate = () => {
    const current_datetime = new Date();
    const formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();
    return formatted_date;
  }

//BEGIN
userInput.focus();
// counter.appendChild(document.createTextNode(count + ' tasks'));
addButton.addEventListener('click',addToList);






































































})