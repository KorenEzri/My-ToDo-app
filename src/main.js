// const { default: axios } = require("axios");


window.addEventListener('DOMContentLoaded', function() {
//BASE
// BUTTONS
const addButton = document.getElementById('add-button');
const sortButton = document.getElementById('sort-button');
const registerButton = document.getElementById('register-button');
//BUTTONS END
//REGISTRATION
const firstNameInput = document.getElementById('first-name');
const lastNameInput = document.getElementById('last-name');
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
  userInput.focus();

}

//FUNCTION: CREATE BIN
const registerData = []
const newUserData = []
const CREATE_BIN = `https://api.jsonbin.io/b`;
const CREATE_BIN_KEY = `$2b$10$M/SuUy3w9OBnfU3zREzMHODNu1OFT8C1.5uGt.UGXEWctobSXMIjO`;
registerData.push({firstname: firstNameInput.value, lastname: lastNameInput.value})

const createBin = async (url = CREATE_BIN, data = JSON.stringify(registerData)) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'secret-key': CREATE_BIN_KEY,
      'private': false
    },
    body: data
  });
  const jsonRes = await response.json();
  const userId = jsonRes.id;
  const userCredentials = jsonRes.data;
  console.log(userCredentials)
  newUserData.push({name: userId}, {initial: userCredentials});
  registerConfirm.appendChild(document.createTextNode('Congratulations! Your log-in details are: '));
  registerConfirm.appendChild(document.createElement('br'));
  registerConfirm.appendChild(document.createTextNode('Username: ' + userCredentials.firstname + " " + userCredentials.lastname))
  registerConfirm.appendChild(document.createElement('br'));
  registerConfirm.appendChild(document.createTextNode('Your super-secret-ID-number is: ' + userId))
  registerConfirm.appendChild(document.createElement('br'));
  registerConfirm.appendChild(document.createTextNode("You'll be using it to recover your list info, so don't forget it! In this browser I'll also remember it for you :)"))
}



//READ BIN
//https://api.jsonbin.io/ 
const GET_BIN = `https://api.jsonbin.io/b/6011a1e8bca934583e429069`;
const getListInfo = async () => {
  const { data } = await axios.get(GET_BIN);
  console.log(data)
}
// getListInfo()


//UPDATE BIN
//https://api.jsonbin.io/
const BIN_ID = `6011e7e388655a7f320e3c66`
const UPDATE_BIN = `https://api.jsonbin.io/b/${BIN_ID}`
const updateBin = async () => {
  const { data } = await axios.put(UPDATE_BIN, { 
  'title': 'Update',
  'content': 'Expialidotious'
  })
  console.log(data)
  getListInfo()
}
// updateBin()


// --- BEGIN --- //
userInput.focus();
addButton.addEventListener('click',addToList);
sortButton.addEventListener('click',sortList);

//REGISTRATION
registerButton.addEventListener('click', () => {
  createBin();
})


































































})