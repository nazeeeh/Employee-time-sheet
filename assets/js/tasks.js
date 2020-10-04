function assignNewTask(){
    let assignLink = document.getElementById("assign-link");
    let newTask = document.getElementById("new-task"); 
    let taskDisplay = document.getElementById("display-tasks");
    let seeAllTasks = document.getElementById("see-all-tasks")
    
    if (newTask.style.display == "block") {
        newTask.style.display = "none"
        seeAllTasks.style.display = "block"
        
    }
    else {
        newTask.style.display = "block"
        assignLink.style.display = "none"
        taskDisplay.style.display = "none"
        seeAllTasks.style.display = "none"
    }
}

function CancelNewTask(){
    let assignLink = document.getElementById("assign-link");
    let newTask = document.getElementById("new-task"); 
    let taskDisplay = document.getElementById("display-tasks");
    let seeAllTasks = document.getElementById("see-all-tasks")

    if (newTask.style.display === "block") {
        newTask.style.display = "none"
        assignLink.style.display = "block"
        taskDisplay.style.display = "block"
        seeAllTasks.style.display = "block"
    }
    else {
        newTask.style.display = "block"
    }
}


tasks = []

if(JSON.parse(localStorage.getItem("tasks")) != tasks){
    tasks = JSON.parse(localStorage.getItem("tasks"))
}else{
    tasks
}
localStorage.setItem("tasks",  JSON.stringify(tasks))

displayTask()

function displayTask(){
    let add = ''
    for(i = 0; i < tasks.length; i++){
        add += `<div id="${i}">
        <p class="taskName"><i class="fas fa-check"></i>${tasks[i].name}</p>
        <a class="delete-task" onclick="deleteTask(${i})">Delete</a>
        <a class="edit-task" onclick="showEditForm(${i})">Edit</a>
        </div>
        <div id="editTask${i}" class="editForm">
        <input type="text" id="edit-name${i}" placeholder="Edit Task"  required>
        <input type="text" id="edit-employee${i}" placeholder="Edit employee assigned" required>
        <input type="text" id="edit-due-date${i}" placeholder="Edit due date" required> <br>
        <button id="assign" onclick="editTask(${i})">Edit</button> <button id="cancel" onclick="cancelEdit(${i})">Cancel</button>
        </div>
        `
    }
    document.getElementById("display-tasks").innerHTML = add
}

function addTask(){
    let taskName = document.getElementById("task-name").value,
    employeeAssigned = document.getElementById("employee-assigned").value,
    dueDate = document.getElementById("due-date").value;

    newTask = {
        name : taskName,
        employee : employeeAssigned,
        due : dueDate
    }

    tasks.push(newTask)
    localStorage.setItem("tasks",  JSON.stringify(tasks))
    displayTask()
    CancelNewTask()
}

function showEditForm(id){
    const editTask = document.getElementById("editTask" + id);
    const displayTasks = document.getElementById("display");
    const assignLink = document.getElementById("assign-link");
    const seeAllTasks = document.getElementById("see-all-tasks")

    if(editTask.style.display == "none"){
        editTask.style.display = "block"
        displayTasks.style.display = "block"
        assignLink.style.display = "block"
        seeAllTasks.style.display = "block"
    }else{
        editTask.style.display = "block"
        assignLink.style.display = "none"
        seeAllTasks.style.display = "none"
    }
}

function cancelEdit(id){
    const editTask = document.getElementById("editTask" + id);
    const displayTasks = document.getElementById("display");
    const assignLink = document.getElementById("assign-link");
    const seeAllTasks = document.getElementById("see-all-tasks")


    if(editTask.style.display == "none"){
        editTask.style.display = "block"
        displayTasks.style.display = "block"
        assignLink.style.display = "block"
        
    }else{
        editTask.style.display = "none"
        assignLink.style.display = "block"
        seeAllTasks.style.display = "block"

    }
}

function editTask(id){
    let editName = document.getElementById("edit-name" + id).value;
    let editEmployee = document.getElementById("edit-employee" + id).value;
    let editDueDate = document.getElementById("edit-due-date" + id).value;
    if(editName === ""){
        tasks[id].name = tasks[id].name
    } else{tasks[id].name = editName}

    if( editEmployee === ""){
        tasks[id].employee = tasks[id].employee
    } else{tasks[id].employee = editEmployee}

    if(editDueDate === ""){
        tasks[id].due = tasks[id].due
    }else{tasks[id].due = editDueDate
    }


    localStorage.setItem("tasks",  JSON.stringify(tasks))
    displayTask()
}

function deleteTask(id){
    tasks.splice(id, 1)
    localStorage.setItem("tasks",  JSON.stringify(tasks))
    displayTask()
}

