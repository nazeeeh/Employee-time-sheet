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

let tasks = JSON.parse(localStorage.getItem("tasks"));
let unassignedMainList = JSON.parse(localStorage.getItem("unassignedMainList"));
let assignedMainList = JSON.parse(localStorage.getItem("assignedMainList"));
displayUnassigned(unassignedMainList)
displayMain(assignedMainList)
       
function displayMain(task){
    let add = ''
    for(i = 0; i < task.length; i++){
        add += `<div class="main-task" id="${i}">
        <p> <strong> Task name : </strong> ${task[i].name} <span>Assigned to : ${task[i].employee}</span> </p> 
        <div id="dateAndButtons"><div id="date"><span class="date">Due : ${task[i].due}</span> <span>Status : Pending</span></div> <div id="buttons"><button onclick="deletesAssigned(${i})">Delete</button> <button onclick="showEditButton(${i})">Edit</button></div> </div>
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
            due : dueDate
        }

        tasks.push(newTask)
        localStorage.setItem("tasks",  JSON.stringify(tasks))
    
        if(employeeAssigned == ""){
            unassignedMainList.push(newTask)
            localStorage.setItem("unassignedMainList",  JSON.stringify(unassignedMainList))
            displayUnassigned(unassignedMainList)
        }else if(employeeAssigned != ""){
            assignedMainList.push(newTask)
            localStorage.setItem("assignedMainList",  JSON.stringify(assignedMainList))
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