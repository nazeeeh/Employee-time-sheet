
function assignNewTask(){
    let assignLink = document.getElementById("assign-link");
    let newTask = document.getElementById("new-task"); 
    let taskDisplay = document.getElementById("display-tasks");

    if (newTask.style.display === "none") {
        newTask.style.display = "block";
        assignLink.style.display = "none";
        taskDisplay.style.display = "none"
    }
    else {
        newTask.style.display = "none";
    }
}

function CancelNewTask(){
    let assignLink = document.getElementById("assign-link");
    let newTask = document.getElementById("new-task"); 
    let taskDisplay = document.getElementById("display-tasks");

    if (newTask.style.display === "block") {
        newTask.style.display = "none";
        assignLink.style.display = "block";
        taskDisplay.style.display = "block"
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

    taskName.push(newTask)
    onclick="CancelNewTask()" 
}

let seconds = 0, minutes = 0, hours = 0

    
function setSecs(){
    if(seconds < 60){
        seconds++
    }else if(seconds == 60){
        seconds = 0
        seconds++
    }

    document.getElementById("seconds").textContent = "0" + seconds
    if(seconds >= 10){
        document.getElementById("seconds").textContent = seconds
    }
}

function setMins(){
    if(minutes < 60){
        minutes++
    }else if(minutes == 60){
        minutes = 0
        minutes++
    }

    document.getElementById("mins").textContent = "0" + minutes
    if(minutes >= 10){
        document.getElementById("mins").textContent = minutes
    }
}

function setHours(){
    if(hours < 59){
        hours++
    }else if(hours == 59){
        hours = 0
        hours++
    }
    document.getElementById("hours").textContent = hours
}

function startTime(){
    let startTime = document.getElementById("start-time");
    let stopTime = document.getElementById("stop-time");

    if (stopTime.style.display == "block") {
        stopTime.style.display = "none";
        startTime.style.display = "block";
    }
    else {
        startTime.style.display = "none";
        stopTime.style.display = "block";
    }
    
   timeSec = setInterval(setSecs, 1000);
   timeMins = setInterval(setMins, 60000);
   timeHours = setInterval(setHours, 3600000);

}

function stopTime(){
    clearInterval(timeSec);
    clearInterval(timeMins);
    clearInterval(timeHours);

    let stopHours = hours, stopMins = minutes, stopSecs = seconds

    let startTime = document.getElementById("start-time");
    let stopTime = document.getElementById("stop-time");

    if (startTime.style.display == "block") {
        startTime.style.display = "none";
        stopTime.style.display = "block";
    }
    else {
        startTime.style.display = "block";
        stopTime.style.display = "none";
    }

    seconds = 0, minutes = 0, hours = 0
}

tasks = [
    {
        "name":"Assign tasks to all users",
        "employee" : "Toluwanimi",
        "due": "23rd March 2021"
    },
   
]

// if(JSON.parse(localStorage.getItem("tasks")) != tasks){
//     tasks = JSON.parse(localStorage.getItem("tasks"))
// }else{
//     tasks
// }
localStorage.setItem("tasks",  JSON.stringify(tasks))

displayTask()

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
    displayTask(tasks)
    CancelNewTask()
}

function displayTask(){
    add = ''
    for(i = 0; i < tasks.length; i++){
        add += `<div id="${i}">
        <p class="taskName"><i class="fas fa-check"></i>${tasks[i].name}</p>
        <a class="delete-task" onclick="deleteTask(${i})">Delete</a>
        <a class="edit-task">Edit</a>
        </div>
        `
    }
    document.getElementById("display-tasks").innerHTML = add
}

function deleteTask(me){
    tasks.splice(me, 1)
    // localStorage.setItem("adminUsers",  JSON.stringify(adminUsers))
    displayTask()
}
