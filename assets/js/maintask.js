function backToDashboard() {
    location.assign("../../contents/internal-dashboard.html");
}

// get name of current user and display on user dashboard
document.getElementById("tasksInternalName").innerHTML =  currentUser[0].name

// reload the page every 1 minute
setTimeout(function(){
    location.reload()
},10000)

// get current date
var date = new Date()
var year = date.getFullYear()
var month = date.getMonth()+1
var day = date.getDate()

disableAssign()

// display form to add new task
function assignNewTaskMain(){
    let addTaskMain = document.getElementById("new-task-main");
    if(addTaskMain.style.display == "block"){
        addTaskMain.style.display = "none"
    }else{
        addTaskMain.style.display = "block"
    }
    // clear input every time the the form is displayed
    taskName = document.getElementById("task-name-main").value = ""
    employeeAssigned = document.getElementById("employee-assigned-main").value = ""
    dueDate = document.getElementById("due-date-main").value = ""
}
 
// disables the assign button when task name and due date data inputs are empty
function disableAssign(){
    let taskName = document.getElementById("task-name-main").value,
    dueDate = document.getElementById("due-date-main").value;
    if(taskName == "" || dueDate == ""){
        document.getElementById("assign-main").style.disabled= true
    }else{
        document.getElementById("assign-main").style.disabled= false
    }
}

let check = JSON.parse(localStorage.getItem("paceDB")) //get company details
let tasks = JSON.parse(localStorage.getItem("tasks")); //get general task details
let currentUser = JSON.parse(localStorage.getItem("current_InternalUser")); //get current user details
let currentUserEmail = currentUser[0].email //get email of user from current user details
let unassignedMainList = JSON.parse(localStorage.getItem(`${currentUserEmail}_UnassignedTask`)); //get user unassigned tasks
let assignedMainList = JSON.parse(localStorage.getItem(`${currentUserEmail}_AssignedTask`)); //get user assigned tasks
let pending = JSON.parse(localStorage.getItem(`${currentUserEmail}_pendingTask`)); //get user pending tasks
let completed = JSON.parse(localStorage.getItem(`${currentUserEmail}_completedTask`)); //get user's completed tasks
let companyName =  check[0].name; //get name of company from company details
let department =  currentUser[0].department //get current user
let employees = JSON.parse(localStorage.getItem(department)); //get all employees in user department
let employeeTask = JSON.parse(localStorage.getItem(`${currentUserEmail}_task`)); //get all user tasks

// if local storage does not exist, create an empty list for all above items
if(JSON.parse(localStorage.getItem("tasks")) == null || undefined){
    tasks = []
}

if(JSON.parse(localStorage.getItem("current_InternalUser")) == null || undefined){
    currentUser = []
}

if(JSON.parse(localStorage.getItem(`${currentUserEmail}_UnassignedTask`)) == null || undefined){
    unassignedMainList = []
}

if(JSON.parse(localStorage.getItem(`${currentUserEmail}_AssignedTask`)) == null || undefined){
    assignedMainList = []
}

if(JSON.parse(localStorage.getItem(`${currentUserEmail}_pendingTask`)) == null || undefined){
    pending = []
}

if(employees == null || undefined){
    employees = []
}

if(employeeTask == null || undefined){
    employeeTask = []
}
// if local storage does not exist, create an empty list

// loop through details of all employees in user's department and get employee names
function getEmployeeNames(){
    let employeeNames = []
    for(i = 0; i < employees.length; i++){
        employeeNames.push(employees[i].name)
    }
    return employeeNames
}

// display unassigned list or drafts
displayUnassigned(unassignedMainList)
//display all assigned lists
displayMain(assignedMainList)

function displayMain(task){
    let add = ''
    //loop through every task and display task details on dashboard, edit input fields are hidden
    for(i = 0; i < task.length; i++){
        add += `<div class="main-task" id="${i}">
        <p> <strong> Task name : </strong> ${task[i].name} <span>Assigned to : ${task[i].employee}</span> </p> 
        <div id="dateAndButtons"><div id="date"><span class="date">Start Date : ${task[i].startDate}</span><span class="date">Due Date: ${task[i].due}</span> <span class="status">Status : ${task[i].status}</span></div> <div id="buttons"><button onclick="deletesAssigned(${i})">Delete</button> <button onclick="showEditButton(${i})">Edit</button></div> </div>
        <div id="editMainTask${i}" class="edit-Main">
        <input type="text" id="edit-name-main${i}" placeholder="Edit Task"  required>
        <section>
        <input type="text" class="edit-employee" id="edit-employee-main${i}" onkeyup="editAutoComplete(${i})" placeholder="Edit employee assigned" onclick="displayOptions()" required>
        <div class="suggestions" id="autoComplete${i}"></div>
        </section>
        <input type="date" id="edit-due-date-main${i}" placeholder="Edit due date" required> <br>
        <button id="assign" onclick="editAssigned(${i})">Edit</button> <button id="cancel" onclick="CloseEditButton(${i})">Cancel</button>
        </div>
      </div>
       `
    }
    document.getElementById("show-assigned-tasks").innerHTML = add
}

function displayUnassigned(task){
    let add = ''
    //loop through every unassigned task and display task details on dashboard
    for(i = 0; i < task.length; i++){
        add += ` <div class="main-unassigned" id="${i}">
        <p><strong>Task name : </strong>${task[i].name}</p>
        <div class="assignEmployee"><div id="unAssignedSearch"><input type="text" id="employee-main${i}" onkeyup="unassignedAutoComplete(${i})">
        <div class="suggestionAutocomplete">
        </div>
        </div> <button id="toAssignUnassigned${i}" class="to-Assign-Unassigned" onclick="changeFromUnassigned(${i})">Assign Employee</button> <button onclick="deletesUnassigned(${i})">Delete</button></div>
      </div>
        `
    }
    document.getElementById("show-unassigned-tasks").innerHTML = add
}

function appendNewTaskMain(){
    let taskName = document.getElementById("task-name-main").value,
    employeeAssigned = document.getElementById("employee-assigned-main").value,
    dueDate = document.getElementById("due-date-main").value,
    message = document.getElementById("message").value,
    docs = document.getElementById("file").value;
    
    newTask = {}
    if (taskName != "" || dueDate != ""){
        newTask = {
            "name" : taskName,
            "employee" : employeeAssigned,
            "due" : dueDate,
            "status" : "Pending",
            "startDate" : `${year}-${day}-${month}`,
            "message" : message,
            document : docs
        }

        tasks.push(newTask)
        Names = getEmployeeNames()
        if(employeeAssigned == ""){
            unassignedMainList.push(newTask)
            employeeTask.push(newTask)
            CancelTask()
            displayUnassigned(unassignedMainList)
            localStorage.setItem(`${currentUserEmail}_UnassignedTask`,  JSON.stringify(unassignedMainList))
            localStorage.setItem("tasks",  JSON.stringify(tasks))
        }else if(employeeAssigned != ""){
            employeeNames = getEmployeeNames()
            if( employeeNames.includes(employeeAssigned)){
                pushToEmployee(employeeAssigned)
                assignedMainList.push(newTask)
                pending.push(newTask)
                employeeTask.push(newTask)
                localStorage.setItem(`${currentUserEmail}_AssignedTask`,  JSON.stringify(assignedMainList))
                localStorage.setItem("tasks",  JSON.stringify(tasks))
            CancelTask()
            }else{swal("Sorry!",`${employeeAssigned} is not an employee!`, "error")}
        }

        localStorage.setItem(`${currentUserEmail}_pendingTask`,  JSON.stringify(pending))
        displayMain(assignedMainList)
    }   
}

function setLocal(){
    if(assignedEmployee == null || undefined){
        assignedEmployee = []
    }
}

function CancelTask(){
    let addTaskMain = document.getElementById("new-task-main");
    if(addTaskMain.style.display == "block"){
         addTaskMain.style.display = "none"
    }else{
         addTaskMain.style.display = "none"
    } 
}

function verifyEmployee(id){
    employeeName = document.getElementById("employee-main" + id).value
    newTask = {
        name : unassignedMainList[id].name,
        employee : employeeName,
        due : unassignedMainList[id].due,
        name : unassignedMainList[id].name,
        status : "pending"
    }

    Email = findEmployee(employeeName)
    let assignedEmployee = JSON.parse(localStorage.getItem(`${Email}_task`));
    assignedEmployee.push(newTask)
    localStorage.setItem(`${Email}_task`,  JSON.stringify(assignedEmployee))


    assignedMainList.push(newTask)
    localStorage.setItem(`${currentUserEmail}_AssignedTask`,  JSON.stringify(assignedMainList))
    localStorage.setItem(`${currentUserEmail}_UnassignedTask`,  JSON.stringify(unassignedMainList))
    displayMain(assignedMainList)
    deletesUnassigned(id)

}

function changeFromUnassigned(id){
    employeeName = document.getElementById("employee-main" + id).value
    let employeeNames = []
    for(i = 0; i < employees.length; i++){
        employeeNames.push(employees[i].name)
    }

    if(employeeNames.includes(employeeName)){
        verifyEmployee(id)
        
    }
}

function deletesAssigned(id){
    userIndex = tasks.findIndex(x => x.name == assignedMainList[id].name)
    userIndex2 = employeeTask.findIndex(x => x.name == assignedMainList[id].name)
    userIndex3 =  unassignedMainList.findIndex(x => x.name == assignedMainList[id].name)
    userIndex4 = pending.findIndex(x => x.name == assignedMainList[id].name)
    // userIndex5 = completed.findIndex(x => x.name == assignedMainList[id].name)

    tasks.splice(userIndex, 1)
    localStorage.setItem("tasks",  JSON.stringify(tasks))

    employeeTask.splice(userIndex2, 1)
    localStorage.setItem(`${currentUserEmail}_task`, JSON.stringify(employeeTask))

    assignedMainList.splice(id, 1)
    localStorage.setItem(`${currentUserEmail}_AssignedTask`,  JSON.stringify(unassignedMainList))

    pending.splice(userIndex4, 1)
    localStorage.setItem(`${currentUserEmail}_pendingTask`,  JSON.stringify(unassignedMainList))

    displayMain(assignedMainList)
}

function deletesUnassigned(id){
    userIndex = tasks.findIndex(x => x.name == unassignedMainList[id].name)
    tasks.splice(userIndex, 1)
    localStorage.setItem("tasks",  JSON.stringify(tasks))
    
    unassignedMainList.splice(id, 1)
    localStorage.setItem(`${currentUserEmail}_UnassignedTask`,  JSON.stringify(unassignedMainList))
    displayUnassigned(unassignedMainList)

    userIndex2 = employeeTask.findIndex(x => x.name == unassignedMainList[id].name)
    localStorage.setItem(`${currentUserEmail}_task`, JSON.stringify(employeeTask))
    employeeTask.splice(userIndex2, 1);
    // alert(userIndex2)

}

function showEditButton(id){
    let editForm = document.getElementById("editMainTask" + id)

    if (editForm.style.display == "block"){
        editForm.style.display = "none"
    }else{editForm.style.display = "block"}

    editName = document.getElementById("edit-name-main" + id).value = ""
    editEmployee = document.getElementById("edit-employee-main" + id).value = ""
    editDueDate = document.getElementById("edit-due-date-main" + id).value = ""
}

function CloseEditButton(id){
    let editForm = document.getElementById("editMainTask" + id)

    if (editForm.style.display == "none"){
        editForm.style.display = "block"
    }else{editForm.style.display = "none"}
}

function editAssigned(id){
    let editName = document.getElementById("edit-name-main" + id).value;
    let editEmployee = document.getElementById("edit-employee-main" + id).value;
    let editDueDate = document.getElementById("edit-due-date-main" + id).value;

    userIndex = tasks.findIndex(x => x.name == assignedMainList[id].name)
    userIndex2 = employeeTask.findIndex(x => x.name == assignedMainList[id].name)
    userIndex4 = pending.findIndex(x => x.name == assignedMainList[id].name)
    // userIndex5 = completed.findIndex(x => x.name == assignedMainList[id].name)

    if(editName === ""){
        tasks[userIndex].name = tasks[userIndex].name
        employeeTask[userIndex2].name = employeeTask[userIndex2].name
        assignedMainList[id].name = assignedMainList[id].name
        pending[userIndex4].name = assignedMainList[userIndex4].name
        // completed.name[userIndex5].name = assignedMainList[id].name
    } else{
        tasks[userIndex].name = editName
        employeeTask[userIndex2].name = editName
        assignedMainList[id].name = editName
        pending[userIndex4].name = editName
        // completed.name[userIndex5].name = editName
    }

    if( editEmployee === ""){
        tasks[userIndex].employee = tasks[userIndex].employee
        employeeTask[userIndex2].employee = employeeTask[userIndex2].employee
        assignedMainList[id].employee = assignedMainList[id].employee
        pending[userIndex4].employee = assignedMainList[userIndex4].employee
        // completed.name[userIndex5].employee = assignedMainList[id].employee
    } else{
        Names = getEmployeeNames()
        if(Names.includes(editEmployee)){
            Email = findEmployee(editEmployee)
            let assignedEmployee = JSON.parse(localStorage.getItem(`${Email}_task`));
            tasks[userIndex].employee = editEmployee
            employeeTask[userIndex2].employee = editEmployee
            assignedMainList[id].employee = editEmployee
            pending[userIndex4].employee = editEmployee
            localStorage.setItem(`${Email}_task`,  JSON.stringify(assignedEmployee))
        }else{swal("Sorry!",`${employeeAssigned} is not an employee!`, "error")}
        // completed.name[userIndex5].employee = editEmployee
    }

    if(editDueDate === ""){
        tasks[userIndex].due = tasks[userIndex].due
        employeeTask[userIndex2].due = employeeTask[userIndex2].due
        assignedMainList[id].due = assignedMainList[id].due
        pending[userIndex4].due = assignedMainList[userIndex4].due
        // completed.name[userIndex5].due = assignedMainList[id].due
    }else{
        tasks[userIndex].due = tasks[userIndex].due
        employeeTask[userIndex2].due = editDueDate
        assignedMainList[id].due = editDueDate
        pending[userIndex4].due = editDueDate
        // completed.name[userIndex5].due = editDueDate
    }

    localStorage.setItem("tasks",  JSON.stringify(tasks))
    localStorage.setItem(`${currentUserEmail}_AssignedTask`,  JSON.stringify(unassignedMainList))
    localStorage.setItem(`${currentUserEmail}_pendingTask`,  JSON.stringify(unassignedMainList))
    localStorage.setItem(`${currentUserEmail}_completedTask`,  JSON.stringify(unassignedMainList))
    localStorage.setItem(`${currentUserEmail}_task`, JSON.stringify(employeeTask))
    displayUnassigned(unassignedMainList) 
    CloseEditButton(id)  
}

document.getElementById("employee-assigned-main").addEventListener('keyup', displayOptions)

function unassignedAutoComplete(id){
    let employeeName = document.getElementById("employee-main" + id).value
    let employeeNames = []
    for(i = 0; i < employees.length; i++){
        employeeNames.push(employees[i].name)
    }
    document.getElementsByClassName('suggestionAutocomplete')[id].innerHTML = ''
    let employeeResult = employeeNames.filter(function(employee){
        return employee.toLowerCase().startsWith(employeeName.toLowerCase());
    });

    employeeResult.forEach(element => {
        i = employeeResult.indexOf(element)
        let div =document.createElement('div')
        div.innerHTML = element
        document.getElementsByClassName('suggestionAutocomplete')[id].appendChild(div)
        div.setAttribute("id", `${i}`)
        div.setAttribute('onclick', `appendUnassignedName(${i}, ${id})`)
    });

    if (employeeName == ""){
        document.getElementsByClassName('suggestionAutocomplete')[id].innerHTML = ''
    }
    return employeeResult
} 

function appendUnassignedName(id, i){
    results = unassignedAutoComplete(i)
    document.getElementById("employee-main" + i ).value = results[id]
    document.getElementsByClassName('suggestionAutocomplete')[id].innerHTML = ''
}

function editAutoComplete(id){
    let employeeName = document.getElementById("edit-employee-main" + id).value
    
    let employeeNames = []
    for(i = 0; i < employees.length; i++){
        employeeNames.push(employees[i].name)
    }

    console.log(employeeNames)
    document.getElementsByClassName('suggestions')[id].innerHTML = ''
    let employeeResult = employeeNames.filter(function(employee){
        return employee.toLowerCase().startsWith(employeeName.toLowerCase());
    });

    employeeResult.forEach(element => {
        i = employeeResult.indexOf(element)
        let div =document.createElement('div')
        div.innerHTML = element
        document.getElementsByClassName('suggestions')[id].appendChild(div)
        div.setAttribute("id", `${i}`)
        div.setAttribute('onclick', `appendNameEdit(${i}, ${i})`)
    });

    if (employeeName == ""){
        document.getElementsByClassName('suggestions')[id].innerHTML = ''
    }
    return employeeResult
    // employeeName.addEventListener('click',)
} 

function appendNameEdit(id, i){
    results = editAutoComplete(i)
    document.getElementById("edit-employee-main" + i).value = results[id]
    document.getElementsByClassName('suggestions')[id].innerHTML = ''
}

function displayOptions(){
let employeeName = document.getElementById("employee-assigned-main").value
let searchResult = document.querySelector('.employee')
    searchResult.innerHTML = ''
    employeeNames = getEmployeeNames()
    let employeeResult = employeeNames.filter(function(employee){
        return employee.toLowerCase().startsWith(employeeName.toLowerCase());
    });

    employeeResult.forEach(element => {
        i = employeeResult.indexOf(element)
        let div =document.createElement('div')
        div.innerHTML = element
        searchResult.appendChild(div)
        div.setAttribute("id", `${i}`)
        div.setAttribute('onclick', `appendName(${i})`)
    });

    if (employeeName == ""){
        searchResult.innerHTML = ''
    }
    return employeeResult
}

function appendName(id){
    results = displayOptions()
    let searchResult = document.querySelector('.employee')
    document.getElementById("employee-assigned-main").value = results[id]
    searchResult.innerHTML = ''
}

function findEmployee(theName){
   found = employees.find(x => x.name.toLowerCase() == theName.toLowerCase())
   foundEmail = found.email
   return foundEmail
}

function pushToEmployee(name){
    Email = findEmployee(name)
    let assignedEmployee = JSON.parse(localStorage.getItem(`${Email}_task`));
    assignedEmployee.push(newTask)
    localStorage.setItem(`${Email}_task`,  JSON.stringify(assignedEmployee))
}


