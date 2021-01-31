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
  const registerData = [];
  const newUserDetails = [];
  const CREATE_BIN = `https://api.jsonbin.io/v3/b`;
  //REGISTRATION END
  //LIST
  const userInput = document.getElementById("text-input");
  const list = document.getElementById("todo-list");
  const listItemsAll = list.getElementsByTagName("LI");
  const listItemsAllArray = [];
  const oldList = [];
  const userPriority = document.getElementById("priority-selector");
  const search = document.getElementById("search");
  //LIST END
  //COUNTER - COUNTER-RELATED
  const counts = document.getElementById("tasks-finished");
  const finishedCounter = document.getElementById("finished-counter");
  const allSpans = list.getElementsByTagName("SPAN");
  const checkedArr = [];
  const counter = document
    .getElementById("counter")
    .appendChild(document.createTextNode(""));
  finishedCounter.style.display = "none";
  counts.style.display = "none";
  //COUNTER END
  // const viewSection = document.getElementById("view-section");
  const X_MASTER_KEY = `$2b$10$VkZVpVqK/MhliqQKjLlGYOJ3ZxI71N1JOMqPZ4DLAkyZmH77.U1yW`;
  const storedPassword = JSON.parse(localStorage.getItem("password"));
  const mainWrapper = document.getElementById("main-wrapper");
  navigator.permissions.query({ name: "clipboard-write" }).then((status) => {
    status.onchange = () => {};
  });
  //BASE END
  //FUNCTIONS
  //FUNCTION: ADD TO LIST
  const addToList = () => {
    if (userInput.value === "") {
      userInput.focus();
      return;
    }
    const listItem = document.createElement("li");
    const itemContainer = document.createElement("div");
    const todoText = document.createElement("div");
    const todoDate = document.createElement("div");
    const todoPriority = document.createElement("div");
    const buttonsDiv = document.createElement("div");
    const removeBtn = document.createElement("button");
    const copyBtn = document.createElement("button");
    //checkbox
    const checkedLabel = document.createElement("label");
    const checkedInput = document.createElement("input");
    const checkedDiv = document.createElement("div");
    checkedLabel.classList.add("checked-contain");
    checkedLabel.setAttribute("id", "check-label");
    checkedDiv.classList.add("checked-input");
    checkedInput.setAttribute("type", "checkbox");
    checkedLabel.appendChild(checkedInput);
    checkedLabel.appendChild(checkedDiv);
    //checkbox end
    const chosenPriority =
      userPriority.options[userPriority.selectedIndex].text;
    removeBtn.innerHTML = "Delete";
    removeBtn.classList.add("delete-button");
    copyBtn.innerHTML = "Copy";
    copyBtn.classList.add("copy-button");
    itemContainer.classList.add("todo-container");
    todoText.classList.add("todo-text");
    todoDate.classList.add("todo-created-at");
    todoPriority.classList.add("todo-priority");
    colorPriority(chosenPriority, todoPriority);
    buttonsDiv.classList.add("buttons-div");
    todoText.appendChild(document.createTextNode(userInput.value));
    todoDate.appendChild(
      document.createTextNode(", added at: " + comfyDate() + "Priority ")
    );
    todoPriority.appendChild(document.createTextNode(chosenPriority));
    buttonsDiv.appendChild(copyBtn);
    buttonsDiv.appendChild(removeBtn);
    list.appendChild(listItem);
    listItem.appendChild(itemContainer);
    itemContainer.appendChild(todoText);
    itemContainer.appendChild(todoDate);
    itemContainer.appendChild(todoPriority);
    itemContainer.appendChild(checkedLabel);
    itemContainer.appendChild(buttonsDiv);
    removeBtn.addEventListener("click", (e) => {
      const shouldDelete = confirm("Are you sure?");
      if (shouldDelete) {
        e.target.parentNode.parentNode.parentNode.remove();
        updateCounter();
        updateBin();
      }
    });
    list.onclick = (e) => {
      if (e.target.innerHTML !== "Copy") return;
      let fullLi = e.target.parentNode.parentNode.textContent;
      const liLength = fullLi.length;
      const text = fullLi.substr(0, liLength - 10);
      navigator.clipboard.writeText(text);
      e.target.innerHTML = "Copied!";
    };
    userInput.value = "";
    userInput.focus();
    updateCounter();
    updateBin();
  };
  //FUNCTION: COLOR PRIORITY
  const colorPriority = (priority, element) => {
    switch (priority) {
      case "1":
        element.classList.add("priorityOne");
        break;
      case "2":
        element.classList.add("priorityTwo");
        break;
      case "3":
        element.classList.add("priorityThree");
        break;
      case "4":
        element.classList.add("priorityFour");
        break;
      case "5":
        element.classList.add("priorityFive");
        break;
    }
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
  };
  //FUNCTION: UPDATE COUNTER
  const updateCounter = (n) => {
    const count = list.querySelectorAll("li").length;
    counter.textContent = count;
    if (n > 0) {
      counts.style.display = "unset";
      finishedCounter.style.display = "unset";
      finishedCounter.textContent = n;
    }
    if (n <= 0 || n === "" || n === undefined) {
      finishedCounter.textContent = "";
      finishedCounter.style.display = "none";
      counts.style.display = "none";
    }
    if (n > 0 && n === count) {
      mainWrapper.classList.add("done-all-tasks");
    } else {
      mainWrapper.classList.remove("done-all-tasks");
    }
    setTimeout(function () {
      if (count === 0 || !count) {
        mainWrapper.classList.add("no-tasks");
      } else {
        mainWrapper.classList.remove("no-tasks");
      }
    }, 800);
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
  const sortList = () => {
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
  };
  //FUNCTION: SEARCH LIST
  const searchList = () => {
    let isUppercase = document.querySelector(".upper-case");
    let filter = search.value.toUpperCase();
    if (isUppercase.checked) {
      filter = search.value;
    }
    for (let i = 0; i < listItemsAll.length; i++) {
      result = listItemsAll[i];
      let innerValue = result.textContent || result.innerText;
      if (isUppercase.checked) {
        if (innerValue.indexOf(filter) > -1) {
          listItemsAll[i].style.display = "";
        } else {
          listItemsAll[i].style.display = "none";
        }
      } else if (innerValue.toUpperCase().indexOf(filter) > -1) {
        listItemsAll[i].style.display = "";
      } else {
        listItemsAll[i].style.display = "none";
      }
    }
  };
  //FUNCTION: CREATE BIN
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
      const currentLapse = i;
      const { date, priority, text } = oldList[i];
      const { index } = oldList[oldList.length - 1];
      if (!date || !priority || !text) {
        return;
      }
      const listItem = document.createElement("li");
      const itemContainer = document.createElement("div");
      const todoText = document.createElement("div");
      const todoDate = document.createElement("div");
      const todoPriority = document.createElement("div");
      const removeBtn = document.createElement("button");
      const copyBtn = document.createElement("button");
      const buttonsDiv = document.createElement("div");
      //checkbox
      const checkedLabel = document.createElement("label");
      const checkedInput = document.createElement("input");
      const checkedDiv = document.createElement("div");
      checkedLabel.classList.add("checked-contain");
      checkedLabel.setAttribute("id", "check-label");
      checkedDiv.classList.add("checked-input");
      checkedInput.setAttribute("type", "checkbox");
      checkedLabel.appendChild(checkedInput);
      checkedLabel.appendChild(checkedDiv);
      if (index) {
        for (let t = 0; t < index.length; t++) {
          if (!checkedArr.includes(index[t])) checkedArr.push(index[t]);
          let k = index[t];
          if (k === currentLapse) {
            checkedInput.setAttribute("checked", "checked");
            itemContainer.classList.toggle("line-through");
            checkedLabel.appendChild(document.createElement("span"));
          }
        }
      }
      //checkbox end
      removeBtn.innerHTML = "Delete";
      removeBtn.classList.add("delete-button");
      copyBtn.innerHTML = "Copy";
      copyBtn.classList.add("copy-button");
      itemContainer.classList.add("todo-container");
      todoText.classList.add("todo-text");
      todoDate.classList.add("todo-created-at");
      todoPriority.classList.add("todo-priority");
      colorPriority(priority, todoPriority);
      buttonsDiv.classList.add("buttons-div");
      todoText.appendChild(document.createTextNode(text));
      todoDate.appendChild(document.createTextNode(date));
      todoPriority.appendChild(document.createTextNode(priority));
      buttonsDiv.appendChild(copyBtn);
      buttonsDiv.appendChild(removeBtn);
      list.appendChild(listItem);
      listItem.appendChild(itemContainer);
      itemContainer.appendChild(todoText);
      itemContainer.appendChild(todoDate);
      itemContainer.appendChild(todoPriority);
      itemContainer.appendChild(buttonsDiv);
      itemContainer.appendChild(checkedLabel);
      removeBtn.addEventListener("click", (e) => {
        const shouldDelete = confirm("Are you sure?");
        if (shouldDelete) {
          e.target.parentNode.parentNode.parentNode.remove();
          updateCounter();
          updateBin();
        }
      });
      list.onclick = (e) => {
        if (e.target.innerHTML !== "Copy") return;
        let fullLi = e.target.parentNode.parentNode.textContent;
        const liLength = fullLi.length;
        const text = fullLi.substr(0, liLength - 10);
        navigator.clipboard.writeText(text);
        e.target.innerHTML = "Copied!";
      };
      userInput.value = "";
      userInput.focus();
      updateCounter();
    }
  };
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
    if (checkedArr.length > 0) {
      finishedCounter.style.display = "unset";
      counts.style.display = "unset";
      finishedCounter.innerText = checkedArr.length;
    }
  };
  //FUNCTION: UPDATE BIN
  const updateBin = async (checked) => {
    let BIN_ID = `${userPassword.value}`;
    if (storedPassword) BIN_ID = storedPassword;
    const UPDATE_BIN_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;
    let todoList = [];
    const amountofChecks = {
      amount: list.getElementsByTagName("SPAN").length,
      index: checked,
    };
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
    todoList.push(amountofChecks);
    const binUpdate = await fetch(UPDATE_BIN_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "my-todo": todoList }),
    });
  };
  //FUNCTION: CHECK ITEM AS DONE
  const checkFinishedTasks = (e) => {
    let target = e.target;
    if (target.tagName !== "LABEL") return;
    for (let i = 0; i < listItemsAll.length; i++) {
      listItemsAllArray.push(listItemsAll[i]);
    }
    let listItemIndex = listItemsAllArray.indexOf(target.closest("LI"));
    const spans = target.getElementsByTagName("SPAN");
    target.parentNode.classList.toggle("line-through");
    if (target.parentNode.classList.contains("line-through")) {
      target.appendChild(document.createElement("span"));
      setTimeout(function () {
        updateCounter(allSpans.length);
      });
      checkedArr.push(listItemIndex);
      updateBin(checkedArr);
    }
    if (!target.parentNode.classList.contains("line-through")) {
      spans[0].remove();
      let remove = checkedArr.indexOf(listItemIndex);
      if (remove !== -1) {
        checkedArr.splice(remove, 1);
      }
      updateCounter(allSpans.length);
      updateBin(checkedArr);
    }
    listItemsAllArray.length = 0;
  };

  ///////////////////////***********************************************************/////////////////////////////////
  /*---          -----       BEGIN       -----          ---*/
  ///////////////////////***********************************************************/////////////////////////////////
  //LOAD USER'S LIST
  readBin(storedPassword);
  //FOCUS ON TASK INPUT BOX
  userInput.focus();
  //FOCUS ON TASK INPUT EVERY TIME YOU CHANGE PRIORITY
  userPriority.addEventListener("change", () => {
    userInput.focus();
  });
  //CHECKBOX WHEN HOVER ON LI: "FINISH TASK"
  list.addEventListener("click", checkFinishedTasks);
  //ADD TO LIST (ENTER AND CLICK)
  addButton.addEventListener("click", addToList);
  userInput.onkeyup = (event) => {
    if (event.keyCode == 13 || event.which == 13) {
      addButton.click();
    }
  };
  //SORT LIST
  sortButton.addEventListener("click", sortList);
  //SEARCH LIST
  search.addEventListener("keyup", searchList);
  //WIPE LIST
  wipeButton.addEventListener("click", wipeList);
  //REGISTER TO SERVICE (ENTER AND CLICK)
  registerButton.addEventListener("click", () => {
    if (!firstNameInput.value || !lastNameInput.value) {
      alert("Please enter your name first =)");
      return;
    }
    createBin();
  });
  lastNameInput.onkeyup = (event) => {
    if (event.keyCode == 13 || event.which == 13) {
      if (!firstNameInput.value || !lastNameInput.value) {
        alert("Please enter your name first =)");
        return;
      }
      registerButton.click();
    }
  };
  firstNameInput.onkeyup = (event) => {
    if (event.keyCode == 13 || event.which == 13) {
      if (!firstNameInput.value || !lastNameInput.value) {
        alert("Please enter your name first =)");
        return;
      }
      registerButton.click();
    }
  };
  //SIGN IN
  signInButton.addEventListener("click", () => {
    if (userPassword.value.length < storedPassword.length) {
      alert(
        `Please check your password and try again. Your saved password is: ${storedPassword}`
      );
    }
    if (userPassword.value === storedPassword || userPassword.value === "") {
      readBin(storedPassword);
      window.location.reload();
    }
    if (
      userPassword.value !== storedPassword &&
      userPassword.value.length >= storedPassword.length
    ) {
      localStorage.removeItem("password");
      localStorage.setItem("password", JSON.stringify(userPassword.value));
      readBin(storedPassword);
      window.location.reload();
    }
  });
});

// "601700fd13b20d48e8bfb495"
