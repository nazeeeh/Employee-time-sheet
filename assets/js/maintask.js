function assignNewTaskMain(){
    let addTaskMain = document.getElementById("new-task-main");
    if(addTaskMain.style.display == "block"){
         addTaskMain.style.display = "none"
     }else{
         addTaskMain.style.display = "block"
     }
 }

let tasks = JSON.parse(localStorage.getItem("tasks"));
mainTask = []
let unassignedMainList = JSON.parse(localStorage.getItem("unassignedMainList"));
assignedMainList = []
mainTask = tasks
localStorage.setItem("mainTask",  JSON.stringify(mainTask))

function displayMain(task){
    let add = ''
    for(i = 0; i < task.length; i++){
        add += `<div class="main-task">
        <p> ${task[i].name} <span>Assigned to : ${task[i].employee}</span> </p> 
        <span class="date">Due : ${task[i].due}</span> <span>Status : Pending</span> <button>Delete</button> <button>Edit</button>
      </div>
       `
    }
    document.getElementById("assigned-task-main").innerHTML = add
}

function displayUnassigned(task){
    let add = ''
    for(i = 0; i < task.length; i++){
        add += ` <div class="main-unassigned">
        <p>${task[i].name}</p>
        <p>Assign to employee:</p><input type="text" id="employee-main">
      </div>
        `
    }
    document.getElementById("unassigned-task-main").innerHTML = add
}

function appendNewTaskMain(){
    let taskName = document.getElementById("task-name-main").value,
    employeeAssigned = document.getElementById("employee-assigned-main").value,
    dueDate = document.getElementById("due-date-main").value;
    newTask = {}
    
  
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
        displayMain(assignedMainList)
    }
}
