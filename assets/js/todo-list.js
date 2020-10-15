let todoList = [];
displayContent();

//Display function
function displayContent() {
    todoTask = '';
    for (i = 0; i < todoList.length; i++) {
        if (todoList != null || todoList != undefined) {
            todoTask += `<div>
        <div>
        <strong>Title:</strong> ${todoList[i].title}<br>
        <strong class="display">Description: </strong>${todoList[i].description}<br>
        <i class="fas fa-pencil-alt" onClick="editUser(${i})">
        </i><i class="far fa-trash-alt" onClick="deleteUser(${i})"></i><br>
        </div>
        </div>`;
        }
    }
    document.getElementById("todoTask").innerHTML = todoTask;
    todoList = JSON.parse(localStorage.getItem("todoList"));
}
displayContent();

// Adding new User
function addTodoList() {
    let newList = {
        title: prompt("Enter Title", "Enter Title"),
        description: prompt("Description", "Put a description")
    };
    todoList.push(newList);
    localStorage.setItem("todoList", JSON.stringify(todoList));
    displayContent();
}

//Editing User
function editUser(id) {
    let newTodoDetail = {
        title: prompt("Edit title", todoList[id].title),
        description: prompt("Edit description", todoList[id].description)
    };
    todoList[id] = newTodoDetail;
    localStorage.setItem("todoList", JSON.stringify(todoList));
    displayContent();
}

//Deleting User
function deleteUser(id) {
    if (confirm(`Are you sure you want to delete ${todoList[id].title}?`)) {
        todoList.splice(id, 1);
    }
    localStorage.setItem("todoList", JSON.stringify(todoList));
    displayContent();
}