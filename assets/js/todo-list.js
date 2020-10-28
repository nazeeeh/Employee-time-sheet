let root = document.getElementById("root");
tdList = JSON.parse(localStorage.getItem("todoList"));
tdListTracker = parseInt(localStorage.getItem("todoListTracker"));
tdListBreakDown = JSON.parse(localStorage.getItem("todoListBreakDown"));
tdListBreakDownTracker = parseInt(localStorage.getItem("todoListBreakDownTracker"));
//check if To do list  is stored in the local storage and assigns data if not
if (tdList == null || tdList == undefined) {
    //create a dummy data for the task list
    todoList = [{
            "id": 1,
            "name": "Monday"
        },
        {
            "id": 2,
            "name": "Tuesday"
        }
    ];
    localStorage.setItem("todoList", JSON.stringify(todoList));
    localStorage.setItem("todoListTracker", 2);
}
//check if To do list breakdown is stored in the local storage and assigns data if not
if (tdListBreakDown == null || tdListBreakDown == undefined) {
    todoListBreakDown = [{
            "id": 1,
            "parentID": 1,
            "parentName": "Monday",
            "comment": "Doctor Appointment",
            "desc": "Click here to write a description"
        },
        {
            "id": 2,
            "parentID": 2,
            "parentName": "Tuesday",
            "comment": "Coding Interview",
            "desc": "Click here to write a description"
        }
    ];
    localStorage.setItem("todoListBreakDown", JSON.stringify(todoListBreakDown));
    localStorage.setItem("todoListBreakDownTracker", 2);
}
//to display the To Do List
function displayContent() {
    content = "";
    for (var i = 0; i < tdList.length; i++) {
        tdName = tdList[i].name;
        tdID = tdList[i].id;
        content += `
                    <div class="todoList">
                        <div class="header"><h2>${tdName}</h2>
                        <button onclick="deleteParent('${tdID}')">X</button></div>
                        <input class="comment" id="${tdName+tdID}">
                        <button class="btn-save" onclick="addChildTodo('${tdName}', '${tdID}')">Add</button><div>
                        `;
        for (var j = 0; j < tdListBreakDown.length; j++) {
            parentID = tdListBreakDown[j].parentID
            if (tdID == parentID) {
                content += `
                        <div class="card"><p>${tdListBreakDown[j].comment}</p>
                        <button onclick="deleteChildTodo('${tdListBreakDown[j].id}')">X</button></div>
                    `;
            } else {
                continue;
            }
        }
        content += `</div></div>`;
    }
    document.getElementById("root").innerHTML = content;
}
//Function call for the TO DO List
displayContent();
//function to Add a parent list
function addParent() {
    listValue = document.getElementById("addTodoListInput").value;
    tdListTracker = parseInt(localStorage.getItem("todoListTracker"));
    if (listValue == null || listValue == undefined || listValue.length == "0") {
        alert("Error!!! To-do list Name cannot be empty")
    } else if (listValue.length < 3) {
        alert("Error!!! To-do list Name must be greater than 3 Characters")
    } else {
        newList = {
            "id": (tdListTracker + 1),
            "name": listValue
        }
        tdList.push(newList);
        localStorage.setItem("todoList", JSON.stringify(tdList));
        localStorage.setItem("todoListTracker", (tdListTracker + 1));
        document.getElementById("addTodoListInput").value = "";
        displayContent(); //displays the updated info
    }
}
//function to Add a child to do list
function addChildTodo(parentName, parentIdTracker) {
    listValue = document.getElementById(parentName + parentIdTracker).value;
    tdListBreakDownTracker = parseInt(localStorage.getItem("todoListBreakDownTracker"));
    if (listValue == null || listValue == undefined || listValue.length == "0") {
        alert("Error!!! Task list Name cannot be empty")
    } else if (listValue.length < 3) {
        alert("Error!!! Task list Name must be greater than 3 Characters")
    } else {
        newList = {
            "id": (tdListBreakDownTracker + 1),
            "parentID": parentIdTracker,
            "parentName": parentName,
            "comment": listValue,
            "desc": "Click here to write a description"
        }
        tdListBreakDown.push(newList);
        localStorage.setItem("todoListBreakDown", JSON.stringify(tdListBreakDown));
        localStorage.setItem("todoListBreakDownTracker", (tdListBreakDownTracker + 1));
        displayContent(); //displays the updated info
    }
}
//function to Delete a parent list
function deleteParent(id) {
    tdListIndex = tdList.findIndex(x => x.id == id);
    tdList.splice(tdListIndex, 1);
    localStorage.setItem("todoList", JSON.stringify(tdList));
    displayContent(); //displays the updated info
}
//function to delete a child to do list
function deleteChildTodo(id) {
    tdListIndex = tdListBreakDown.findIndex(x => x.id == id);
    tdListBreakDown.splice(tdListIndex, 1);
    localStorage.setItem("todoListBreakDown", JSON.stringify(tdListBreakDown));
    displayContent(); //displays the updated info
}