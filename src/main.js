window.addEventListener("DOMContentLoaded", function () {
  //BASE
  // BUTTONS
  const addButton = document.getElementById("add-button");
  const sortButton = document.getElementById("sort-button");
  const registerButton = document.getElementById("register-button");
  const signInButton = document.getElementById("load-list");
  //BUTTONS END
  //REGISTRATION
  const firstNameInput = document.getElementById("first-name");
  const lastNameInput = document.getElementById("last-name");
  const userPassword = document.getElementById("password");
  const registerConfirm = document.getElementById("registered");
  //REGISTRATION END
  //LIST
  const userInput = document.getElementById("text-input");
  const list = document.getElementById("todo-list");
  const userPriority = document.getElementById("priority-selector");
  const counter = document
    .getElementById("counter")
    .appendChild(document.createTextNode(""));
  //LIST END
  //BASE END

  //FUNCTIONS
  //FUNCTION: ADD TO LIST
  const addToList = (text, date, priority) => {
    if (userInput.value === "") {
      userInput.focus();
      return;
    }
    const listItem = document.createElement("li");
    const itemContainer = document.createElement("div");
    const todoText = document.createElement("div");
    const todoDate = document.createElement("div");
    const todoPriority = document.createElement("div");
    itemContainer.classList.add("todo-container");
    todoText.classList.add("todo-text");
    todoDate.classList.add("todo-created-at");
    todoPriority.classList.add("todo-priority");
    todoText.appendChild(document.createTextNode(userInput.value));
    todoDate.appendChild(
      document.createTextNode(", added at: " + comfyDate() + "Priority: ")
    );
    todoPriority.appendChild(document.createTextNode(userPriority.value));
    list.appendChild(listItem);
    listItem.appendChild(itemContainer);
    itemContainer.appendChild(todoText);
    itemContainer.appendChild(todoDate);
    itemContainer.appendChild(todoPriority);
    userInput.value = "";
    userInput.focus();
    updateCounter();
    updateBin();
  };
  //FUNCTION: UPDATE COUNTER
  const updateCounter = () => {
    let count = list.querySelectorAll("li").length;
    counter.textContent = count;
  };
  //FUNCTION: COMFY DATE
  const comfyDate = () => {
    const current_datetime = new Date();
    const formatted_date =
      current_datetime.getFullYear() +
      "-" +
      (current_datetime.getMonth() + 1) +
      "-" +
      current_datetime.getDate() +
      " " +
      current_datetime.getHours() +
      ":" +
      current_datetime.getMinutes() +
      ":" +
      current_datetime.getSeconds() +
      "  ";
    return formatted_date;
  };
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
        let priorityValue = listItems[i].querySelector("div.todo-priority")
          .innerHTML;
        if (
          priorityValue <
          listItems[i + 1].querySelector("div.todo-priority").innerHTML
        ) {
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
  const registerData = [];
  const newUserDetails = [];
  const CREATE_BIN = `https://api.jsonbin.io/v3/b`;
  const CREATE_BIN_KEY = `$2b$10$M/SuUy3w9OBnfU3zREzMHODNu1OFT8C1.5uGt.UGXEWctobSXMIjO`;
  const createBin = async () => {
    registerData.push({
      firstname: firstNameInput.value,
      lastname: lastNameInput.value,
    });
    const data = JSON.stringify(registerData);
    const response = await fetch(CREATE_BIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": CREATE_BIN_KEY,
        "X-Bin-Private": false,
      },
      body: data,
    });
    const jsonRes = await response.json();
    const userCredentials = jsonRes.record[0];
    newUserDetails.push(userCredentials);
    registerConfirm.appendChild(
      document.createTextNode("Congratulations! Your log-in details are: ")
    );
    registerConfirm.appendChild(document.createElement("br"));
    registerConfirm.appendChild(
      document.createTextNode(
        "Username: " +
          userCredentials.firstname +
          " " +
          userCredentials.lastname
      )
    );
    registerConfirm.appendChild(document.createElement("br"));
    registerConfirm.appendChild(
      document.createTextNode(
        "Your super-secret-Password is: " + jsonRes.metadata.id
      )
    );
    registerConfirm.appendChild(document.createElement("br"));
    registerConfirm.appendChild(
      document.createTextNode(
        "You'll be using it to recover your list info, so don't forget it! In this browser I'll also remember it for you :)"
      )
    );
  };
  //FUNCTION: READ BIN / SIGN IN
  const postBin = () => {
    for (let i = 0; i < oldList.length; i++) {
      const { date, priority, text } = oldList[i];
      const listItem = document.createElement("li");
      const itemContainer = document.createElement("div");
      const todoText = document.createElement("div");
      const todoDate = document.createElement("div");
      const todoPriority = document.createElement("div");
      itemContainer.classList.add("todo-container");
      todoText.classList.add("todo-text");
      todoDate.classList.add("todo-created-at");
      todoPriority.classList.add("todo-priority");
      todoText.appendChild(document.createTextNode(text));
      todoDate.appendChild(document.createTextNode(date));
      todoPriority.appendChild(document.createTextNode(priority));
      list.appendChild(listItem);
      listItem.appendChild(itemContainer);
      itemContainer.appendChild(todoText);
      itemContainer.appendChild(todoDate);
      itemContainer.appendChild(todoPriority);
      userInput.value = "";
      userInput.focus();
      updateCounter();
    }
  };

  const oldList = [];
  const readBin = async () => {
    const PASS = "601333211de5467ca6bd88ef";
    const GET_BIN = `https://api.jsonbin.io/v3/b/${PASS}/latest`;
    const binData = await fetch(GET_BIN);
    let main = await binData.json();
    const todoList = main.record["my-todo"];
    if (todoList) {
      for (let i = 0; i < todoList.length; i++) {
        oldList.push(todoList[i]);
      }
    }
    postBin();
  };

  //FUNCTION: UPDATE BIN
  const updateBin = async () => {
    const BIN_ID = `${userPassword.value}`;
    const UPDATE_BIN_URL = `https://api.jsonbin.io/v3/b/601333211de5467ca6bd88ef`;
    let todoList = [];
    const allDates = document.querySelectorAll(
      "#todo-list > li > div > div.todo-created-at"
    );
    const allTextInputs = document.querySelectorAll(
      "#todo-list > li > div > div.todo-text"
    );
    const allPriorities = document.querySelectorAll(
      "#todo-list > li > div > div.todo-priority"
    );
    for (let j = 0; j < allDates.length; j++) {
      const obj = {
        date: allDates[j].textContent,
        text: allTextInputs[j].textContent,
        priority: allPriorities[j].textContent,
      };
      todoList.push(obj);
    }
    const binUpdate = await fetch(UPDATE_BIN_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "my-todo": todoList }),
    });
  };
  // 601305b81de5467ca6bd77e7

  // --- BEGIN --- //
  readBin();

  userInput.focus();
  addButton.addEventListener("click", addToList);
  sortButton.addEventListener("click", sortList);
  registerButton.addEventListener("click", () => {
    createBin();
  });

  signInButton.addEventListener("click", () => {
    if (!oldList[0]) readBin();
  });
});
