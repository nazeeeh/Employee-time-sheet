function assignNewTask(){
    let assignLink = document.getElementById("assign-link");
    let newTask = document.getElementById("new-task"); 
    let taskDisplay = document.getElementById("display-tasks");
    let seeAllTasks = document.getElementById("see-all-tasks");
    
    if (newTask.style.display == "block") {
        newTask.style.display = "none"
        seeAllTasks.style.display = "block"   
    }else {
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
    let seeAllTasks = document.getElementById("see-all-tasks");

    if (newTask.style.display === "block") {
        newTask.style.display = "none"
        assignLink.style.display = "block"
        taskDisplay.style.display = "block"
        seeAllTasks.style.display = "block"
    }else {
        newTask.style.display = "block"
    }
}

tasks = []
// let acceptedTasks = JSON.parse(localStorage.getItem("acceptedTasks"));
let PaceStorage = JSON.parse(localStorage.getItem("paceDB"))
// let tasks = JSON.parse(localStorage.getItem("tasks"));
let theCurrentUser = JSON.parse(localStorage.getItem("current_InternalUser"));
let theCurrentUserEmail = theCurrentUser[0].email
let unassignedTask = JSON.parse(localStorage.getItem(`${theCurrentUserEmail}_UnassignedTask`));
let assignedTasks = JSON.parse(localStorage.getItem(`${theCurrentUserEmail}_AssignedTask`));
let pendingTasks = JSON.parse(localStorage.getItem(`${theCurrentUserEmail}_pendingTask`));
let completedTasks = JSON.parse(localStorage.getItem(`${theCurrentUserEmail}_completedTask`));
let NameOfCurrentCompany =  PaceStorage[0].name;
let theEmployees = JSON.parse(localStorage.getItem(`${NameOfCurrentCompany}_employees`));
let theEmployeeTask = JSON.parse(localStorage.getItem(`${theCurrentUserEmail}_task`));

if(JSON.parse(localStorage.getItem("tasks")) == null){
    tasks = []
}else{
    tasks = JSON.parse(localStorage.getItem("tasks"))
}

if(JSON.parse(localStorage.getItem("current_InternalUser")) == null || undefined){
    theCurrentUser = []
}else{
    theCurrentUser = JSON.parse(localStorage.getItem("current_InternalUser"))
}

if(JSON.parse(localStorage.getItem(`${theCurrentUserEmail}_UnassignedTask`)) == null || undefined){
    unassignedTask = []
}

if(JSON.parse(localStorage.getItem(`${theCurrentUserEmail}_AssignedTask`)) == null || undefined){
    assignedTasks = []
}

if(JSON.parse(localStorage.getItem(`${theCurrentUserEmail}_pendingTask`)) == null || undefined){
    pendingTasks = []
}

if(theEmployees == null || undefined){
    theEmployees = []
}

if(JSON.parse(localStorage.getItem(`${theCurrentUserEmail}_task`)) == null || undefined){
    theEmployeeTask = []
}


if(completedTasks == null){
    completedTasks = []
}

displayTask()
showTaskNumbers()

function showTaskNumbers(){
    document.getElementById("PendingTask").innerHTML = pendingTasks.length
    document.getElementById("unassigned-number").innerHTML = unassignedTask.length
    document.getElementById("completedTask").innerHTML = completedTasks.length
}
function displayTask(){
    let add = ''
    for(i = 0; i < theEmployeeTask.length; i++){
        add += `<div id="${i}">
        <p class="taskName"><i class="fas fa-check"></i>${theEmployeeTask[i].name}</p>
        <a class="delete-task" onclick="deleteTask(${i})">Delete</a>
        <a class="edit-task" onclick="showEditForm(${i})">Edit</a>
        </div>
        <div id="editTask${i}" class="editForm">
        <input type="text" id="edit-name${i}" placeholder="Edit Task"  required>
        <div>
        <input type="text" id="edit-employee${i}" placeholder="Edit employee assigned" onkeyup="showAutoComplete(${i})" required>
        <div class ="autoCompleteBox">
        </div>
        </div>
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

    newTask = {}
    if(taskName === ""){
        CancelNewTask()
    } else{
        newTask = {
            "name" : taskName,
            "employee" : employeeAssigned,
            "due" : dueDate,
            "status": "pending"
        }
        if(employeeAssigned == ""){
            unassignedTask.push(newTask)
            theEmployeeTask.push(newTask)
            showTaskNumbers()
        }else if(employeeAssigned != ""){
            assignedTasks.push(newTask)
            theEmployeeTask.push(newTask)
            pendingTasks.push(newTask)
            showTaskNumbers()        }
    }

    tasks.push(newTask)
    localStorage.setItem("tasks", JSON.stringify(tasks))
    localStorage.setItem(`${theCurrentUserEmail}_AssignedTask`,  JSON.stringify(assignedTasks))
    localStorage.setItem(`${theCurrentUserEmail}_pendingTask`,  JSON.stringify(pendingTasks))
    localStorage.setItem(`${theCurrentUserEmail}_UnassignedTask`,  JSON.stringify(unassignedTask))
    localStorage.setItem(`${theCurrentUserEmail}_task`, JSON.stringify(theEmployeeTask))

    displayTask()
    CancelNewTask()
}

function showEditForm(id){
    const editTask = document.getElementById("editTask" + id);
    const assignLink = document.getElementById("assign-link");
    const seeAllTasks = document.getElementById("see-all-tasks")

    if(editTask.style.display == "none"){
        editTask.style.display = "block"
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
    editNames(id)
    editEmployees(id)
    editDueDates(id)

    localStorage.setItem("tasks", JSON.stringify(tasks))
    localStorage.setItem(`${theCurrentUserEmail}_AssignedTask`,  JSON.stringify(assignedTasks))
    localStorage.setItem(`${theCurrentUserEmail}_pendingTask`,  JSON.stringify(pendingTasks))
    localStorage.setItem(`${theCurrentUserEmail}_UnassignedTask`,  JSON.stringify(unassignedTask))
    localStorage.setItem(`${theCurrentUserEmail}_task`, JSON.stringify(theEmployeeTask))

    displayTask()
    cancelEdit(id)
}

function editNames(id){
    let editName = document.getElementById("edit-name" + id).value;

    userIndex = assignedTasks.findIndex(x => x.name == theEmployeeTask[id].name)
    userIndex2 = theEmployeeTask.findIndex(x => x.name == theEmployeeTask[id].name)
    userIndex3 =  unassignedTask.findIndex(x => x.name == theEmployeeTask[id].name)
    userIndex4 = pendingTasks.findIndex(x => x.name == theEmployeeTask[id].name)
    // userIndex5 = completed.findIndex(x => x.name == assignedMainList[id].name)
    if(editName === ""){
        tasks[id].name = tasks[id].name
        theEmployeeTask[userIndex2].name = theEmployeeTask[userIndex2].name
        // completed.name[userIndex5].name = assignedMainList[id].name
        if(userIndex == -1){
            unassignedTask[userIndex3].name = unassignedTask[userIndex3].name 
        }else{
            assignedTasks[userIndex].name = assignedTasks[userIndex].name
            pendingTasks[userIndex4].name = pendingTasks[userIndex4].name
        }
    } else{
        tasks[id].name = editName
        theEmployeeTask[userIndex2].name = editName
        // completed.name[userIndex5].name = editName
        if(userIndex == -1){
            unassignedTasks[userIndex3].name = editName
        }else{
            assignedTasks[userIndex].name = editName
            pendingTasks[userIndex4].name = editName
        }
    }
 
}

function editEmployees(id){
    let editEmployee = document.getElementById("edit-employee" + id).value;

    userIndex = assignedTasks.findIndex(x => x.name == theEmployeeTask[id].name)
    userIndex2 = theEmployeeTask.findIndex(x => x.name == theEmployeeTask[id].name)
    userIndex3 =  unassignedTask.findIndex(x => x.name == theEmployeeTask[id].name)
    userIndex4 = pendingTasks.findIndex(x => x.name == theEmployeeTask[id].name)

    if( editEmployee === ""){
        tasks[id].employee = tasks[id].employee
        theEmployeeTask[userIndex2].employee = theEmployeeTask[userIndex2].employee
        // completed.name[userIndex5].employee = assignedMainList[id].employee
        if(userIndex == -1){
            unassignedTask[userIndex3].employee = unassignedTask[userIndex3].employee   
        }else{
            assignedTasks[userIndex].employee = assignedTasks[userIndex].employee
            pendingTasks[userIndex4].employee =pendingTasks[userIndex4].employee
        }
    } else{
        tasks[id].employee = editEmployee
        theEmployeeTask[userIndex2].employee = editEmployee
        // completed.name[userIndex5].employee = editEmployee
        if(userIndex == -1){
            unassignedTask[userIndex3].employee = editEmployee   
        }else{
            assignedTasks[userIndex].employee = editEmployee
            pendingTasks[userIndex4].employee = editEmployee
        }
    }
}

function editDueDates(id){
    let editDueDate = document.getElementById("edit-due-date" + id).value;

    userIndex = assignedTasks.findIndex(x => x.name == theEmployeeTask[userIndex2].name)
    userIndex2 = theEmployeeTask.findIndex(x => x.name == theEmployeeTask[id].name)
    userIndex3 =  unassignedTask.findIndex(x => x.name == theEmployeeTask[id].name)
    userIndex4 = pendingTasks.findIndex(x => x.name == theEmployeeTask[id].name)

    if(editDueDate === ""){
        tasks[id].due = tasks[id].due
        theEmployeeTask[userIndex2].due = theEmployeeTask[userIndex2].due
        // completed.name[userIndex5].due = assignedMainList[id].due
        if(userIndex == -1){
            unassignedTask[userIndex3].due = unassignedTask[userIndex3].due
        }else{
            assignedTasks[userIndex].due = assignedTasks[userIndex].due
            pendingTasks[userIndex4].due = pendingTasks[userIndex4].due
        }
    }else{
        tasks[id].due = tasks[id].due
        theEmployeeTask[userIndex2].due = editDueDate
        // completed.name[userIndex5].due = editDueDate
        if(userIndex == -1){
            unassignedTask[userIndex3].due = editDueDate   
        }else{
            assignedTasks[userIndex].due = editDueDate
            pendingTasks[userIndex4].due = editDueDate
        }
    }
}

function deleteTask(id){
    userIndex = assignedTasks.findIndex(x => x.name == theEmployeeTask[id].name)
    userIndex2 = theEmployeeTask.findIndex(x => x.name == theEmployeeTask[id].name)
    userIndex3 =  unassignedTask.findIndex(x => x.name == theEmployeeTask[id].name)
    userIndex4 = pendingTasks.findIndex(x => x.name == theEmployeeTask[id].name)
    // userIndex5 = completed.findIndex(x => x.name == assignedMainList[id].name)
    unassignedTask.splice(userIndex3, 1)

    assignedTasks.splice(userIndex, 1)

    pendingTasks.splice(userIndex4, 1)

    theEmployeeTask.splice(userIndex2, 1)

    tasks.splice(id, 1)
    displayTask()
    showTaskNumbers()
    localStorage.setItem("tasks", JSON.stringify(tasks))
    localStorage.setItem(`${theCurrentUserEmail}_AssignedTask`,  JSON.stringify(assignedTasks))
    localStorage.setItem(`${theCurrentUserEmail}_pendingTask`,  JSON.stringify(pendingTasks))
    localStorage.setItem(`${theCurrentUserEmail}_task`, JSON.stringify(theEmployeeTask))
    localStorage.setItem(`${theCurrentUserEmail}_UnassignedTask`,  JSON.stringify(unassignedTask))
}

function showAutoComplete(id){
    let employeeName = document.getElementById("edit-employee" + id).value
    let searchResult = document.querySelector('.autoCompleteBox')
    let employeeNames = []

    for(i = 0; i < theEmployees.length; i++){
        employeeNames.push(theEmployees[i].name)
    }
    searchResult.innerHTML = ''
    let employeeResult = employeeNames.filter(function(employee){
        return employee.toLowerCase().startsWith(employeeName.toLowerCase());
    });

    employeeResult.forEach(element => {
        i = employeeResult.indexOf(element)
        let div =document.createElement('div')
        div.innerHTML = element
        searchResult.appendChild(div)
        div.setAttribute("id", `${i}`)
        div.setAttribute('onclick', `appendResults(${i}, ${id})`)
    });

    if (employeeName == ""){
        searchResult.innerHTML = ''
    }
    return employeeResult
}

function appendResults(id, i){
    results = showAutoComplete(i)
    let searchResult = document.querySelector('.autoCompleteBox')
    document.getElementById("edit-employee" + i).value = results[id]
    searchResult.innerHTML = ''
}


