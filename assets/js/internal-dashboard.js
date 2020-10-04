
function assignNewTask(){
    let assignLink = document.getElementById("assign-link");
    let newTask = document.getElementById("new-task"); 
    let taskDisplay = document.getElementById("display-tasks");

    if (newTask.style.display === "none") {
        newTask.style.display = "block"
        assignLink.style.display = "none"
        taskDisplay.style.display = "none"
    }
    else {
        newTask.style.display = "none"
    }
}

function CancelNewTask(){
    let assignLink = document.getElementById("assign-link");
    let newTask = document.getElementById("new-task"); 
    let taskDisplay = document.getElementById("display-tasks");

    if (newTask.style.display === "block") {
        newTask.style.display = "none"
        assignLink.style.display = "block"
        taskDisplay.style.display = "block"
    }
    else {
        newTask.style.display = "block"
    }
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
    // I only set the second time to zero as soon as it hits 60 using this if statement. - Peter
    if(seconds == 60){
        document.getElementById("seconds").textContent = "00"
    } else if(seconds >= 10){
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
    // Did same as seconds for minutes also - Peter
    if(minutes == 60){
        document.getElementById("min").textContent = "00"
    } else if(minutes >= 10){
        document.getElementById("min").textContent = minutes
    } 
}

function setHours(){
    if(hours < 59){
        hours++
    }else if(hours == 59){
        hours = 0
        hours++
    }
    document.getElementById("hours").textContent = hours;
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

    let stopHours = "", stopMins = "", stopSecs = ""
    stopHours = hours
    stopMins = minutes
    stopSecs = seconds

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

    if(editTask.style.display == "block"){
        editTask.style.display = "none"
        displayTasks.style.display = "none"
        assignLink.style.display = "none"
    }else{
        editTask.style.display = "block"
        assignLink.style.display = "none"
    }
}

function cancelEdit(id){
    const editTask = document.getElementById("editTask" + id);
    const displayTasks = document.getElementById("display");
    const assignLink = document.getElementById("assign-link");

    if(editTask.style.display == "none"){
        editTask.style.display = "block"
        displayTasks.style.display = "block"
        assignLink.style.display = "block"
    }else{
        editTask.style.display = "none"
    }
}

function editTask(id){
    let editName = document.getElementById("edit-name" + id).value;
    let editEmployee = document.getElementById("edit-employee" + id).value;
    let editDueDate = document.getElementById("edit-due-date" + id).value;
console.log(editName, editEmployee, editDueDate)

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

function showNotificationBar(){
    const notificationBar = document.getElementById("notification-popup");

    if(notificationBar.style.display == "none"){
        notificationBar.style.display = "block"
    }else{
       notificationBar.style.display = "none"
    }
}
