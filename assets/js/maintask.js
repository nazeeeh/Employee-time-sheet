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
let check = JSON.parse(localStorage.getItem("paceDB"))
// let _is_Login_Admin = JSON.parse(localStorage.getItem("currentUser"))
let tasks = JSON.parse(localStorage.getItem("tasks"));
let unassignedMainList = JSON.parse(localStorage.getItem("unassignedMainList"));
let assignedMainList = JSON.parse(localStorage.getItem("assignedMainList"));
let pending = JSON.parse(localStorage.getItem("pending"));
let companyName =  check[0].name;
// let _employee_Db = JSON.parse(localStorage.getItem(`${companyName}_employees`))
let employees = JSON.parse(localStorage.getItem(`${companyName}_employees`));
let currentUser = JSON.parse(localStorage.getItem("current_InternalUser"))
let currentUserEmail = currentUser[0].email
let employeeTask = JSON.parse(localStorage.getItem(`${currentUserEmail}_task`))
// employeeDB = JSON.parse(employees)
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

if(JSON.parse(localStorage.getItem(`${currentUserEmail.email}_task`)) == null || undefined){
    employeeTask = []
}

// alert(JSON.stringify(employees))
// alert(currentUserEmail)
displayUnassigned(unassignedMainList)
displayMain(employeeTask)
       
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
        <button id="assign" onclick="editAssigned(${i})">Edit</button> <button id="cancel" onclick="CloseEditButton(${i})">Cancel</button>
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
        employeeTask.push(newTask)
        localStorage.setItem("tasks",  JSON.stringify(tasks))
        localStorage.setItem(`${currentUserEmail}_task`, JSON.stringify(employeeTask))
        employeeNames = []
        for(i = 0; i < employees.length; i++){
            employeeNames.push(employees[i].name)
        }
        if(employeeAssigned == ""){
            unassignedMainList.push(newTask)
            localStorage.setItem("unassignedMainList",  JSON.stringify(unassignedMainList))
            displayUnassigned(unassignedMainList)
        }else if(employeeAssigned != ""){
            assignedMainList.push(newTask)
            pending.push(newTask)
            // if (employeeAssigned in employeeNames){
                
            // }
            localStorage.setItem("assignedMainList",  JSON.stringify(assignedMainList))
            localStorage.setItem("pending",  JSON.stringify(pending))
            displayMain(employeeTask)
        }
        alert(JSON.stringify(employeeTask))

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
    // userIndex = tasks.findIndex(x => x.name == assignedMainList[id].name)
    // tasks.splice(userIndex, 1)
    // localStorage.setItem("tasks",  JSON.stringify(tasks))

    // userIndex = pending.findIndex(x => x.name == assignedMainList[id].name)
    // pending.splice(userIndex, 1)
    // localStorage.setItem("pending",  JSON.stringify(pending))

    employeeTask.splice(id, 1)
    // localStorage.setItem("assignedMainList",  JSON.stringify(assignedMainList))

    // userIndex2 = employeeTask.findIndex(x => x.name == assignedMainList[id].name)
    // employeeTask.splice(userIndex2, 1);
    localStorage.setItem(`${currentUserEmail}_task`, JSON.stringify(employeeTask))
    // alert(userIndex2)
    displayMain(employeeTask)
}

function deletesUnassigned(id){
    userIndex = tasks.findIndex(x => x.name == unassignedMainList[id].name)
    tasks.splice(userIndex, 1)
    localStorage.setItem("tasks",  JSON.stringify(tasks))
    
    unassignedMainList.splice(id, 1)
    localStorage.setItem("unassignedMainList",  JSON.stringify(unassignedMainList))
    displayUnassigned(unassignedMainList)

    userIndex2 = employeeTask.findIndex(x => x.name == tasks[id].name)
    localStorage.setItem(`${currentUserEmail}_task`, JSON.stringify(employeeTask))
    employeeTask.splice(userIndex2, 1);
    alert(userIndex2)

}

function showEditButton(id){
    let editForm = document.getElementById("editMainTask" + id)

    if (editForm.style.display == "block"){
        editForm.style.display = "none"
    }else{editForm.style.display = "block"}
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
    // console.log(employeeTask[userIndex2], tasks)

    userIndex = tasks.findIndex(x => x.name == assignedMainList[id].name)
    // userIndex2 = employeeTask.findIndex(x => x.name == tasks[id].name)
    if(editName === ""){
        // tasks[userIndex].name = tasks[userIndex].name
        employeeTask[id].name = employeeTask[id].name
        // employeeTask[userIndex2].name = employeeTask[userIndex2].name
    } else{employeeTask[id].name = editName
        // employeeTask[id].name = editName
        // employeeTask[userIndex2].name = editName
    }

    if( editEmployee === ""){
        // tasks[userIndex].employee = tasks[userIndex].employee
        employeeTask[id].employee = employeeTask[id].employee
        // employeeTask[userIndex2].employee = employeeTask[userIndex2].employee
    } else{
        // tasks[userIndex].employee = editEmployee
        employeeTask[id].employee = editEmployee
        // employeeTask[userIndex2].employee = editEmployee
    }

    if(editDueDate === ""){
        // tasks[userIndex].due = tasks[userIndex].due
        employeeTask[id].due = employeeTask[id].due
        // employeeTask[userIndex2].due = employeeTask[userIndex2].due
    }else{
        // tasks[userIndex].due = editDueDate
        employeeTask[id].due = editDueDate
        // employeeTask[userIndex2].due = editDueDate
    }

    localStorage.setItem("tasks",  JSON.stringify(tasks))
    localStorage.setItem("unassignedMainList",  JSON.stringify(unassignedMainList))
    localStorage.setItem(`${currentUserEmail}_task`, JSON.stringify(employeeTask))
    displayMain(employeeTask)
}

    document.getElementById("employee-assigned-main").addEventListener('keyup', displayOptions)
    
    function displayOptions(){
    let employeeName = document.getElementById("employee-assigned-main").value
    let searchResult = document.querySelector('.employee')
    employeeNames = []
        for(i = 0; i < employees.length; i++){
            employeeNames.push(employees[i].name)
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
            div.setAttribute('onclick', `appendName(${i})`)
        });

        if (employeeName == ""){
            searchResult.innerHTML = ''
        }

        return employeeResult
    }
  

function appendName(id){
    results = displayOptions()
    // console.log(results)
    let searchResult = document.querySelector('.employee')
    // console.log(results, id)
    document.getElementById("employee-assigned-main").value = results[id]
    searchResult.innerHTML = ''
}

// function displayEmployee(){
//     // document.getElementById("employee").style.display == "block"
//     let add = ''
//     for(i = 0; i < found.length; i++){
//         add += `<div id="${i}" class="resultsEmployee" onclick="appendName(${i})">
//         <p>${found[i].name}</p>
//         </div>
//         <hr>
//         `
//     }
//     document.getElementById("employee").innerHTML = add
// }
