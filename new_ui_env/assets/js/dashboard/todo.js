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
                        <div class="todo-header">
                            <h2>${tdName}</h2>
                            <button class="deleteBtn" onclick="deleteParent('${tdID}')">
                            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                            </button>
                        </div>
                        <input class="children-comment" id="${tdName+tdID}">
                        <button class="btn-save pace-bg-primary btn-save-children" onclick="addChildTodo('${tdName}', '${tdID}')">Comment</button><div>
                        `;
        for (var j = 0; j < tdListBreakDown.length; j++) {
            parentID = tdListBreakDown[j].parentID
            if (tdID == parentID) {
                content += `
                        <div class="card"><p>${tdListBreakDown[j].comment}</p>
                        <button class="deleteBtn" onclick="deleteChildTodo('${tdListBreakDown[j].id}')">
                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                        </button></div>
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
        swal({
            title: "Todo Cannot be empty",
            // text: `Please n `,
            icon: "error",
            button: "Okay",
        })
    } else if (listValue.length < 3) {
        swal({
            title: "Todo Cannot be empty",
            text: `Todo list name must be more than 3 Characters `,
            icon: "error",
            button: "Okay",
        })

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
        swal({
            // title: `Todo list name cannot be empty `,
            text: "Todo Cannot be empty",
            icon: "error",
            button: "Okay",
        })
    } else if (listValue.length < 3) {
        swal({
            // title: `Todo list name cannot be empty `,
            text: "Task List Name must be greater than 3 characters",
            icon: "error",
            button: "Okay",
        })
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