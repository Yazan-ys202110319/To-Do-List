// Retrieving

let todo = JSON.parse(localStorage.getItem('todo')) || [];

const todoInput = document.getElementById("todoInput");

const todoList = document.getElementById("todoList");

const todoCount = document.getElementById("todoCount");

const addButton = document.querySelector(".add-button")

const deleteButton = document.getElementById("deleteButton");

// Initialize

// DOMContentLoaded = The page. when something happen the function will be called
document.addEventListener("DOMContentLoaded", function () {
    addButton.addEventListener("click", addTask);
    todoInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Means to not refresh the page after adding event.
            addTask();
        }
    });
    deleteButton.addEventListener("click", deleteAllTasks);
    displayAllTasks();
});


function addTask() {
    const newTask = todoInput.value.trim(); // value = the actual text. trim() = to remove any extra space after the task.
    if(newTask !== "") {
        todo.push({
            text: newTask,
            disabled: false,
        });
        saveToLocalStorage();
        todoInput.value = ""; // to delete after adding 
        displayAllTasks();
    }
}

function deleteAllTasks() {

}

function displayAllTasks() {
    todoList.innerHTML = "";
    todo.forEach((item, index) =>  {
        const p = document.createElement("p");
        p.innerHTML = `
            <div class = "todo-container">
                <input type = "checkbox" class = "todo-checkbox" id = "input-${index}" ${item.disabled ? "checked" : ""}>
                <p id = "todo-${index}" class = "${item.disabled ? "disabled" : ""}" onclick = "editTask(${index})">${item.text}</p>
            </div>
        `;
        p.querySelector(".todo-checkbox").addEventListener("change", () => 
            toggleTask(index)
        );
        todoList.appendChild(p);
    });
    todoCount.textContent = todo.length;
}

function toggleTask(index) {
    todo[index].disabled = !todo[index].disabled;
    saveToLocalStorage();
    displayAllTasks(); 
}

function deleteAllTasks() {
    todo = [];
    saveToLocalStorage();
    displayAllTasks(); 
}

function editTask(index) {
    const todoItem = document.getElementById(`todo-${index}`);
    const existingText = todo[index].text;
    const inputElement = document.createElement("input");

    inputElement.value = existingText;
    todoItem.replaceWith(inputElement);
    inputElement.focus();

    inputElement.addEventListener("blur", function() {
        const updatedText = inputElement.value.trim();
        if(updatedText){
            todo[index].text = updatedText;
            saveToLocalStorage();
        }
        displayAllTasks();
    });
}

function saveToLocalStorage() {
    localStorage.setItem("todo", JSON.stringify(todo));
}