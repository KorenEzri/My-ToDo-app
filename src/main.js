window.addEventListener('DOMContentLoaded', function() {
//BASE
const addButton = document.getElementById('add-button');
const sortButton = document.getElementById('sort-button');
const userInput = document.getElementById('text-input');
const list = document.getElementById('todo-list');
const userPriority = document.getElementById('priority-selector');
const counter = document.getElementById('counter').appendChild(document.createTextNode(""));
const saved = localStorage.getItem('listinput')
//BASE END

//FUNCTIONS
//FUNCTION: ADD TO LIST
const addToList = () => {
    if (userInput.value === "") {
      userInput.focus(); return;}
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
    todoDate.appendChild(document.createTextNode(', added at: ' + comfyDate() + ',  Priority: '))
    todoPriority.appendChild(document.createTextNode(userPriority.value))
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
function sortList() {
  let i;
  let shouldSwitch;
  let switching = true;
  while (switching) {
    switching = false;
    const listItems = list.getElementsByTagName("LI");
    for (i = 0; i < listItems.length - 1; i++) {
      shouldSwitch = false;
      let priorityValue = listItems[i].querySelector("div.todo-priority").innerHTML;
      if (priorityValue > listItems[i + 1].querySelector("div.todo-priority").innerHTML) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      listItems[i].parentNode.insertBefore(listItems[i + 1], listItems[i]);
      switching = true;
    }
  }
}


// --- BEGIN --- //
userInput.focus();
addButton.addEventListener('click',addToList);
sortButton.addEventListener('click',sortList);






































































})