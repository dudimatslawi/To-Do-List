// create array:
let toDoList = [];

function addNote() {
    // prevent page from refresh:
    event.preventDefault();

    const taskBox = document.getElementById("taskBox");
    const timeBox = document.getElementById("timeBox");

    // get user value:
    const task = taskBox.value;
    const time = timeBox.value;

    // clear input background color:
    taskBox.style.backgroundColor = "";
    timeBox.style.backgroundColor = "";

    // validation:

    if (!inputValidation(taskBox, "You forget enter your task 😅"))
        return

    if (!inputValidation(timeBox, "You forgot enter task limit date 😅"))
        return

    // check if date limit legal:
    const today = new Date();

    if (new Date(time) < today) {
        timeBox.value = ""
        inputValidation(timeBox, "Please enter a future date 🔜🗓")
        return
    }

    // create object for each task
    const toDo = {
        task,
        time
    };

    // send object to array:
    toDoList.push(toDo);

    // saving in local storage:

    saveToStorage();

    // display array from local storage to the page:

    displayToDoList();

    // fade to the last note:
    fadeEnteredNote();

    // clear input boxes:

    clearInput();

};

// function that saves user data in local storage:
function saveToStorage() {
    const json = JSON.stringify(toDoList);
    localStorage.setItem("toDoList", json);
}

// function that get user input on page load:
function loadFromStorage() {
    const json = localStorage.getItem("toDoList");
    // if there is an array in storage use it if do'nt create new array:
    toDoList = json ? JSON.parse(json) : [];
}

// function that display user input on page:
function displayToDoList() {
    const noteContainer = document.getElementById("noteContainer");

    // build html for every note:
    let html = "";
    for (let i = 0; i < toDoList.length; i++) {
        // get user deadline:
        const time = new Date(toDoList[i].time);

        html += `
        
        <div class="note" id="note${i}">
        <div>
        ${toDoList[i].task}
        </div>
        <div>
        ${time.toLocaleDateString()}
        <div id="dateLimit">:date limit</div>
        <br>
        ${time.toLocaleTimeString()}
        </div> 
        <button id="deleteButton" type="button" class="btn btn-outline-danger" onclick="deleteMe(${i})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" fill="currentColor" class="bi bi-clipboard2-x" viewBox="0 0 16 16">
        <path d="M9.5 0a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5.5.5 0 0 1 .5.5V2a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 2v-.5a.5.5 0 0 1 .5-.5.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5h3Z"/>
        <path d="M3 2.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 0 0-1h-.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1H12a.5.5 0 0 0 0 1h.5a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-12Z"/>
        <path d="M8 8.293 6.854 7.146a.5.5 0 1 0-.708.708L7.293 9l-1.147 1.146a.5.5 0 0 0 .708.708L8 9.707l1.146 1.147a.5.5 0 0 0 .708-.708L8.707 9l1.147-1.146a.5.5 0 0 0-.708-.708L8 8.293Z"/>
        </svg></button>
        
        </div>
        
        `
    }

    // display on page:
    noteContainer.innerHTML = html;
}

// load and display user data on page load:
function loadToDoList() {

    // load array from storage:
    loadFromStorage();
    // display array on page:
    displayToDoList();
}

// clear input boxes
function clearInput() {
    const taskBox = document.getElementById("taskBox");
    const timeBox = document.getElementById("timeBox");

    taskBox.value = "";
    timeBox.value = "";

}
// delete note from to do list and display on page:
function deleteMe(indexToDelete) {

    // display fade out animation 
    const deletedNote = document.getElementById(`note${indexToDelete}`);
    deletedNote.style.animation = `fadeOut 2s`;

    // delay the rest of the function:
    setTimeout(() => {
        // delete note from array:
        toDoList.splice(indexToDelete, 1);

        // save array back to storage:
        saveToStorage();

        // display the updated array:
        displayToDoList();
    }, 1000);

}

// validation on input box function:
function inputValidation(inputBox, alertMessage) {

    if (!inputBox.value) {
        alert(alertMessage);
        inputBox.style.backgroundColor = "pink";
        inputBox.value = "";
        inputBox.focus();
        return false
    }
    return true

}

// animate new note by fade in:
function fadeEnteredNote() {
    const enteredNote = document.getElementById(`note${toDoList.length - 1}`);
    enteredNote.style.animation = `fadeIn 2s`;

}

