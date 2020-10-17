function backToDashboard() {
    location.assign("../../contents/internal-dashboard.html");
}

function assignNewTaskMain(){
    let addTaskMain = document.getElementById("new-task-main");
    if(addTaskMain.style.display == "block"){
         addTaskMain.style.display = "none"
     }else{
         addTaskMain.style.display = "block"
     }
 }
let _is_Login_Admin = JSON.parse(localStorage.getItem("currentUser"))
let tasks = JSON.parse(localStorage.getItem("tasks"));
let unassignedMainList = JSON.parse(localStorage.getItem("unassignedMainList"));
let assignedMainList = JSON.parse(localStorage.getItem("assignedMainList"));
let pending = JSON.parse(localStorage.getItem("pending"));
let companyName =  _is_Login_Admin[0].name;
let employees = JSON.parse(localStorage.getItem(`${companyName}_employees`))
// employeeDB = JSON.parse(employees)

alert(JSON.stringify(employees))

if(JSON.parse(localStorage.getItem("tasks")) == null){
    tasks = []
}

if(JSON.parse(localStorage.getItem("unassignedMainList")) == null){
    unassignedMainList = []
}

if(JSON.parse(localStorage.getItem("assignedMainList")) == null){
    assignedMainList = []
}

if(JSON.parse(localStorage.getItem("pending")) == null){
    pending = []
}

if(employees == null){
    employees = []
}

displayUnassigned(unassignedMainList)
displayMain(assignedMainList)
       
function displayMain(task){
    let add = ''
    for(i = 0; i < task.length; i++){
        add += `<div class="main-task" id="${i}">
        <p> <strong> Task name : </strong> ${task[i].name} <span>Assigned to : ${task[i].employee}</span> </p> 
        <div id="dateAndButtons"><div id="date"><span class="date">Due : ${task[i].due}</span> <span>Status : ${task[i].status}</span></div> <div id="buttons"><button onclick="deletesAssigned(${i})">Delete</button> <button onclick="showEditButton(${i})">Edit</button></div> </div>
        <div id="editMainTask${i}" class="edit-Main">
        <input type="text" id="edit-name-main${i}" placeholder="Edit Task"  required>
        <input type="text" id="edit-employee-main${i}" placeholder="Edit employee assigned" required>
        <input type="date" id="edit-due-date-main${i}" placeholder="Edit due date" required> <br>
        <button id="assign" onclick="editAssigned(${i})">Edit</button> <button id="cancel" onclick="cancelEdit(${i})">Cancel</button>
        </div>
      </div>
       `
    }
    document.getElementById("show-assigned-tasks").innerHTML = add
}

function displayUnassigned(task){
    let add = ''
    for(i = 0; i < task.length; i++){
        add += ` <div class="main-unassigned" id="${i}">
        <p><strong>Task name : </strong>${task[i].name}</p>
        <div class="assignEmployee"><p>Assign to employee:</p><input type="text" id="employee-main${i}"> <button onclick="deletesUnassigned(${i})">Delete</button></div>
      </div>
        `
    }
    document.getElementById("show-unassigned-tasks").innerHTML = add
}

function appendNewTaskMain(){
    let taskName = document.getElementById("task-name-main").value,
    employeeAssigned = document.getElementById("employee-assigned-main").value,
    dueDate = document.getElementById("due-date-main").value;
    newTask = {}
    if (taskName === ""){
        CancelTask()
        
    }else{

        newTask = {
            name : taskName,
            employee : employeeAssigned,
            due : dueDate,
            status : "Pending"
        }

        tasks.push(newTask)
        localStorage.setItem("tasks",  JSON.stringify(tasks))
    
        if(employeeAssigned == ""){
            unassignedMainList.push(newTask)
            localStorage.setItem("unassignedMainList",  JSON.stringify(unassignedMainList))
            displayUnassigned(unassignedMainList)
        }else if(employeeAssigned != ""){
            assignedMainList.push(newTask)
            pending.push(newTask)
            localStorage.setItem("assignedMainList",  JSON.stringify(assignedMainList))
            localStorage.setItem("pending",  JSON.stringify(pending))
            displayMain(assignedMainList)
        }
    }
    CancelTask()
   
}

function CancelTask(){
    let addTaskMain = document.getElementById("new-task-main");
    if(addTaskMain.style.display == "block"){
         addTaskMain.style.display = "none"
    }else{
         addTaskMain.style.display = "none"
    } 
}

function deletesAssigned(id){
    userIndex = tasks.findIndex(x => x.name == assignedMainList[id].name)
    tasks.splice(userIndex, 1)
    localStorage.setItem("tasks",  JSON.stringify(tasks))

    userIndex = pending.findIndex(x => x.name == assignedMainList[id].name)
    pending.splice(userIndex, 1)
    localStorage.setItem("pending",  JSON.stringify(pending))

    assignedMainList.splice(id, 1)
    localStorage.setItem("assignedMainList",  JSON.stringify(assignedMainList))
    displayMain(assignedMainList)
}

function deletesUnassigned(id){
    userIndex = tasks.findIndex(x => x.name == unassignedMainList[id].name)
    tasks.splice(userIndex, 1)
    localStorage.setItem("tasks",  JSON.stringify(tasks))
    
    unassignedMainList.splice(id, 1)
    localStorage.setItem("unassignedMainList",  JSON.stringify(unassignedMainList))
    displayUnassigned(unassignedMainList)
}

function showEditButton(id){
    let editForm = document.getElementById("editMainTask" + id)

    if (editForm.style.display == "block"){
        editForm.style.display = "none"
    }else{editForm.style.display = "block"}
}

function editAssigned(id){
    let editName = document.getElementById("edit-name-main" + id).value;
    let editEmployee = document.getElementById("edit-employee-main" + id).value;
    let editDueDate = document.getElementById("edit-due-date-main" + id).value;

    userIndex = tasks.findIndex(x => x.name == assignedMainList[id].name)

    if(editName === ""){
        tasks[userIndex].name = tasks[userIndex].name
        assignedMainList[id].taskName = assignedMainList[id].name
    } else{tasks[userIndex].name = editName
        assignedMainList[id].name = editName
    }

    if( editEmployee === ""){
        tasks[userIndex].employee = tasks[userIndex].employee
        assignedMainList[id].employee = assignedMainList[id].employee
    } else{tasks[userIndex].employee = editEmployee
        assignedMainList[id].employee = editEmployee
    }

    if(editDueDate === ""){
        tasks[userIndex].due = tasks[userIndex].due
        assignedMainList[id].due = assignedMainList[id].due
    }else{tasks[userIndex].due = editDueDate
        assignedMainList[id].due = editDueDate
    }

    localStorage.setItem("tasks",  JSON.stringify(tasks))
    localStorage.setItem("unassignedMainList",  JSON.stringify(unassignedMainList))
    displayMain(assignedMainList)
}
var foundele = []
var found2 = []

function showEmployee(){
    employeeAssigned = document.getElementById("employee-assigned-main")
    found = []
    employeeAssigned.addEventListener('keydown', displayOptions)
    let searchDetails = employeeAssigned.value
    function displayOptions(){
        found = (employees.filter(x => (x.name).toLowerCase().includes((searchDetails))))
        alert(JSON.stringify(found))
        for(i = 0; i < found.length; i++){
            foundele.push(found[i].name)
        }
        found2 = foundele.filter(x => x.toLowerCase().includes((searchDetails)))
        console.log(found2)
        displayEmployee()

    }
  
}

function appendName(id){
    document.getElementById("employee").style.display == "none"
    employeeAssigned = document.getElementById("employee-assigned-main")
    employeeAssigned.value = found[id].name

}

function displayEmployee(){
    // document.getElementById("employee").style.display == "block"
    let add = ''
    for(i = 0; i < found.length; i++){
        add += `<div id="${i}" class="resultsEmployee" onclick="appendName(${i})">
        <p>${found[i].name}</p>
        </div>
        <hr>
        `
    }
    document.getElementById("employee").innerHTML = add
}

showEmployee()