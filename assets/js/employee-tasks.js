function closeTasks() {
    location.assign("../contents/employee-dashboard.html");
}

let acceptedTasks = []
let completedTasks = []
 // getting tasks from local storage
let assignedMainList = JSON.parse(localStorage.getItem("assignedMainList"));
let tasks = JSON.parse(localStorage.getItem("tasks"));
let pending = JSON.parse(localStorage.getItem("pending"));


if(JSON.parse(localStorage.getItem("acceptedTasks")) == null)
{
    acceptedTasks = [];
}
// else{
//     JSON.parse(localStorage.getItem("acceptedTasks"))
// }

if(JSON.parse(localStorage.getItem("completedTasks")) == null)
{
    completedTasks = [];
}else{
    JSON.parse(localStorage.getItem("completedTasks"))
}

if(tasks == null||undefined){
    tasks = [];
}

if(assignedMainList == null||undefined){
    assignedMainList = [];
}

if(pending == null||undefined){
    pending = []
}
else{
    viewTasks()
}

viewAcceptedTasks()

// function to display tasks gotten from local storage
function viewTasks() {
    let view = `
    <table>
    <thead>
            <tr>
            <th>S/N</th>
            <th>Task</th>
            <th>Due Date</th>
            <th> Status</th>
            </tr>
        </thead>
        <tbody>
    `
    for(let i = 0; i <pending.length; i++) {
        view += `
            <tr>
            <td>${i + 1}</td>
            <td>${pending[i].name}</td>
            <td>${pending[i].due}</td>
            <td><a href="#" onclick="acceptTask(${i})">accept</a></td>
        ` }
        view += `
        </tr>
    </tbody>
    </table>
    `
    view += `<button onclick="closeTasks()">close</button>`
    document.getElementById('view-tasks').innerHTML = view;
    // viewAcceptedTasks()
}

// pacedb viewemployee 
function acceptTask(id){
    acceptedTasks.push(pending[id])
    localStorage.setItem("acceptedTasks", JSON.stringify(acceptedTasks))
    accepted(id)
    
    pending.splice(id, 1)
    localStorage.setItem("pending",  JSON.stringify(pending))
    viewTasks()
    viewAcceptedTasks()
}

function accepted(id) { 
    userIndex = assignedMainList.findIndex(x => x.name == pending[id].name)
    alert(userIndex)
    assignedMainList[userIndex].status = "Accepted"
    localStorage.setItem("assignedMainList",  JSON.stringify(assignedMainList))
}

function completeTask(id){
    completedTasks.push(acceptedTasks[id])
    localStorage.setItem("completedTasks",  JSON.stringify(completedTasks))

    userIndex = assignedMainList.findIndex(x => x.name == completedTasks[id].name)
    assignedMainList[userIndex].status = "Completed"
    localStorage.setItem("assignedMainList",  JSON.stringify(assignedMainList))

    acceptedTasks.splice(id, 1)
    localStorage.setItem("acceptedTasks",  JSON.stringify(acceptedTasks))

    viewAcceptedTasks()
}

// function to display accepted tasks
function viewAcceptedTasks() {
    let views = `
    <table>
    <thead>
            <tr>
            <th>S/N</th>
            <th>Task</th>
            <th>Due Date</th>
            <th> Status</th>
            </tr>
        </thead>
        <tbody>
    `
    alert(acceptedTasks)
    for( let i = 0; i < acceptedTasks.length; i++) {
        views += `
            <tr>
            <td>${i + 1}</td>
            <td>${acceptedTasks[i].name}</td>
            <td>${acceptedTasks[i].due}</td>
            <td onclick="completeTask(${i})"><a href="#">completed</a></td>
        ` }
        views += `
        </tr>
    </tbody>
    </table>
    `
    document.getElementById("accepted-tasks").innerHTML = views;
}







