window.addEventListener("DOMContentLoaded", function () {
  //BASE
  // BUTTONS
  const addButton = document.getElementById("add-button");
  const sortButton = document.getElementById("sort-button");
  const wipeButton = document.getElementById("wipe-button");
  const registerButton = document.getElementById("register-button");
  const signInButton = document.getElementById("load-list");
  //BUTTONS END
  //REGISTRATION
  const firstNameInput = document.getElementById("first-name");
  const lastNameInput = document.getElementById("last-name");
  const userPassword = document.getElementById("password");
  const registerConfirm = document.getElementById("registered");
  const introUsername = document.getElementById("intro-username");
  const introPassword = document.getElementById("intro-password");
  //REGISTRATION END
  //LIST
  const userInput = document.getElementById("text-input");
  const list = document.getElementById("todo-list");
  const userPriority = document.getElementById("priority-selector");
  const counter = document
    .getElementById("counter")
    .appendChild(document.createTextNode(""));
  //LIST END
  const X_MASTER_KEY = `$2b$10$VkZVpVqK/MhliqQKjLlGYOJ3ZxI71N1JOMqPZ4DLAkyZmH77.U1yW`;
  const storedPassword = JSON.parse(localStorage.getItem("password"));
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
  //FUNCTION: WIPE LIST
  const wipeList = async () => {
    const shouldIwipe = confirm("Are you sure you want to delete?");
    if (storedPassword === "601375f8ef99c57c734b5334") {
      return;
    } else if (shouldIwipe) {
      const safeWord = prompt(
        "To delete, please type: 'I'm a little piggy' without the ''s "
      );
      if (safeWord === "I'm a little piggy") {
        const PASS = storedPassword;
        const DELETE_BIN = `https://api.jsonbin.io/v3/b/${PASS}`;
        const binData = await fetch(DELETE_BIN, {
          method: "DELETE",
          headers: {
            "X-Master-Key": X_MASTER_KEY,
          },
        });
        // localStorage.setItem('password',"601375f8ef99c57c734b5334");
        localStorage.removeItem("password");
        window.location.reload();
      }
    }
  }; //601375f8ef99c57c734b5334
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
        "X-Master-Key": X_MASTER_KEY,
        "X-Bin-Private": false,
      },
      body: data,
    });
    const jsonRes = await response.json();
    const userCredentials = jsonRes.record[0];
    newUserDetails.push(userCredentials);
    registerConfirm.classList.toggle("hidden");
    introUsername.appendChild(
      document.createTextNode(
        userCredentials.firstname + " " + userCredentials.lastname
      )
    );
    introPassword.appendChild(document.createTextNode(jsonRes.metadata.id));
    registerConfirm.appendChild(
      document.createTextNode(
        "You'll be using it to recover your list info, so don't forget it! In this browser I'll also remember it for you :)"
      )
    );
    localStorage.setItem("password", JSON.stringify(jsonRes.metadata.id));
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
  const readBin = async (password) => {
    let PASS = userPassword.value;
    if (password) PASS = password;
    if (!PASS) PASS = "601375f8ef99c57c734b5334";
    const GET_BIN = `https://api.jsonbin.io/v3/b/${PASS}/latest`;
    const binData = await fetch(GET_BIN, {
      headers: {
        "X-Master-Key": X_MASTER_KEY,
      },
    });
    let main = await binData.json();
    const todoList = main.record["my-todo"];
    if (todoList) {
      for (let i = 0; i < todoList.length; i++) {
        oldList.push(todoList[i]);
      }
    }
    postBin();
  };
  // 601375f8ef99c57c734b5334

  //FUNCTION: UPDATE BIN
  const updateBin = async () => {
    let BIN_ID = `${userPassword.value}`;
    if (storedPassword) BIN_ID = storedPassword;
    const UPDATE_BIN_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;
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

  // --- BEGIN --- //
  readBin(storedPassword);
  userInput.focus();

  //ADD TO LIST (ENTER AND CLICK)
  addButton.addEventListener("click", addToList);
  userInput.onkeyup = (event) => {
    if (event.keyCode == 13 || event.which == 13) {
      addButton.click();
    }
  };

  //SORT LIST
  sortButton.addEventListener("click", sortList);

  //WIPE LIST
  wipeButton.addEventListener("click", wipeList);

  //REGISTER TO SERVICE
  registerButton.addEventListener("click", () => {
    createBin();
  });

  //SIGN IN
  signInButton.addEventListener("click", () => {
    localStorage.removeItem("password");
    localStorage.setItem("password", JSON.stringify(userPassword.value));
    readBin(storedPassword);
    window.location.reload();
  });
});

// 601358891de5467ca6bd94c2 FFFF
// 601358c4ef99c57c734b4871 SSSSS
