// display stop button and hide stop button when Start button is clicked
function changeTimerButton (){
    let startTime = document.getElementById("start-time");
    let stopTime = document.getElementById("stop-time");

    if (stopTime.style.display === "none") {
        stopTime.style.display = "block";
        startTime.style.display = "none";
    }
    else {
        startTime.style.display = "block";
        stopTime.style.display = "none";
    }
}

// display start button and hide stop button when Stop button is clicked
function changeTimerButton2 (){
    let startTime = document.getElementById("start-time");
    let stopTime = document.getElementById("stop-time");

    if (startTime.style.display === "none") {
        startTime.style.display = "block";
        stopTime.style.display = "none";
    }
    else {
        startTime.style.display = "none";
        stopTime.style.display = "block";
    }
   
}

function assignNewTask(){
    let assignLink = document.getElementById("assign-link");
    let newTask = document.getElementById("new-task"); 

    if (newTask.style.display === "none") {
        newTask.style.display = "block";
        assignLink.style.display = "none";
    }
    else {
        newTask.style.display = "none";
    }
}

function CancelNewTask(){
    let assignLink = document.getElementById("assign-link");
    let newTask = document.getElementById("new-task"); 

    if (newTask.style.display === "block") {
        newTask.style.display = "none";
        assignLink.style.display = "block";
    }
    else {
        newTask.style.display = "block";
    }
}

let tasks = []

function addNewTask(){
    let taskName = document.getElementById("task-name").value;
    let employeeAssigned= document.getElementById("employee-assigned").value;
    let dueDate = document.getElementById("due-date").value;

    let newTask = {
        "nameOfTask" : taskName,
        "employeeToBeAssigned" : employeeAssigned,
        "expectedDueDate" : dueDate
    }

    if(taskName==""){
        prompt("please input task name")
    }
    else if(employeeAssigned==""){
        prompt("please input Employee name")
    }
    else if(dueDate==""){
        prompt("please input due date")
    }
    else{
        taskName.push(newTask)
        onclick="CancelNewTask()"
    }

   
}