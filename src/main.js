// const { default: axios } = require("axios");


window.addEventListener('DOMContentLoaded', function() {
//BASE
// BUTTONS
const addButton = document.getElementById('add-button');
const sortButton = document.getElementById('sort-button');
const registerButton = document.getElementById('register-button');
const signInButton = document.getElementById('load-list');
//BUTTONS END
//REGISTRATION
const firstNameInput = document.getElementById('first-name');
const lastNameInput = document.getElementById('last-name');
const userPassword = document.getElementById('password');
const registerConfirm = document.getElementById('registered');
//REGISTRATION END
//LIST
const userInput = document.getElementById('text-input');
const list = document.getElementById('todo-list');
const userPriority = document.getElementById('priority-selector');
const counter = document.getElementById('counter').appendChild(document.createTextNode(""));
//LIST END
const saved = localStorage.getItem('listinput')
//BASE END


//FUNCTIONS
//FUNCTION: ADD TO LIST
const addToList = (saved) => {
  // if (saved) {userInput.value = saved}
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
    updateCounter();
    updateBin()
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
  userInput.focus();

}

//FUNCTION: CREATE BIN
const registerData = []
const newUserDetails = []
const CREATE_BIN = `https://api.jsonbin.io/v3/b`;
const CREATE_BIN_KEY = `$2b$10$M/SuUy3w9OBnfU3zREzMHODNu1OFT8C1.5uGt.UGXEWctobSXMIjO`;

const createBin = async () => {
  registerData.push({firstname: firstNameInput.value, lastname: lastNameInput.value})
  const data = JSON.stringify(registerData)
  const response = await fetch(CREATE_BIN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Master-Key': CREATE_BIN_KEY,
      'X-Bin-Private': false
    },
    body: data
  });
  const jsonRes = await response.json();
  const userCredentials = jsonRes.record[0];
  newUserDetails.push(userCredentials);
  registerConfirm.appendChild(document.createTextNode('Congratulations! Your log-in details are: '));
  registerConfirm.appendChild(document.createElement('br'));
  registerConfirm.appendChild(document.createTextNode('Username: ' + userCredentials.firstname + " " + userCredentials.lastname))
  registerConfirm.appendChild(document.createElement('br'));
  registerConfirm.appendChild(document.createTextNode('Your super-secret-Password is: ' + jsonRes.metadata.id))
  registerConfirm.appendChild(document.createElement('br'));
  registerConfirm.appendChild(document.createTextNode("You'll be using it to recover your list info, so don't forget it! In this browser I'll also remember it for you :)"))
}

//FUNCTION: READ BIN / SIGN IN
const postBin = () => {
  console.log(oldList)
  for (let i = 0; i < oldList.length; i++) {
    let textItem = oldList[i];
    const listItem = document.createElement('li');
    const itemContainer = document.createElement('div');
    const todoText = document.createElement('div');
    const todoDate = document.createElement('div');
    const todoPriority = document.createElement('div');
    itemContainer.classList.add('todo-container');
    todoText.classList.add('todo-text');
    todoDate.classList.add('todo-created-at');
    todoPriority.classList.add('todo-priority');
    todoText.appendChild(document.createTextNode(textItem));
    // todoDate.appendChild(document.createTextNode(', added at: ' + comfyDate() + ',  Priority: '))
    // todoPriority.appendChild(document.createTextNode(userPriority.value))
    list.appendChild(listItem);
    listItem.appendChild(itemContainer);
    itemContainer.appendChild(todoText);
    // itemContainer.appendChild(todoDate);
    // itemContainer.appendChild(todoPriority);
    userInput.value = "";
    userInput.focus();
    updateCounter();
  }
}


const oldList = []
const readBin = async () => {
  const PASS = userPassword.value
  const GET_BIN = `https://api.jsonbin.io/v3/b/${PASS}/latest`;
  const binData = await fetch(GET_BIN);
  let main = await binData.json();
  // console.log(main)
  const todoList = main.record.todoList
  if (todoList) {
    for (let i = 0; i < todoList.length; i++) {
      oldList.push(todoList[i])
      console.log(todoList[i])
    }
  }
  postBin();
};


// 6012b512500b216d079955b4

//FUNCTION: UPDATE BIN
const updateBin = async () => {
  const BIN_ID = `${userPassword.value}`
  const UPDATE_BIN_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`
  let todoList = []
  const listItem = list.getElementsByTagName("li");
  for (let j = 0; j < listItem.length; j++) {
    let save = listItem[j].textContent;
    todoList.push(save);
  }
  todoList = todoList.concat(oldList)

  const binUpdate = await fetch(UPDATE_BIN_URL, {
    method: 'PUT',
    headers: {
    'Content-Type': 'application/json'
  },
    body: data = JSON.stringify({todoList})
  })
  let main = await binUpdate.json();
  console.log(main, 'this is the response from updateBin')
};


//



// --- BEGIN --- //
userInput.focus();
addButton.addEventListener('click',addToList);
sortButton.addEventListener('click',sortList);

//REGISTRATION
registerButton.addEventListener('click', () => {
  createBin();
})

signInButton.addEventListener('click',() => {
  readBin();
})


































































})