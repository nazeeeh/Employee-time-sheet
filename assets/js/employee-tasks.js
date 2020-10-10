function closeTasks() {
    location.assign("../contents/employee-dashboard.html");
}

 // getting tasks from local storage
let assignedMainList = JSON.parse(localStorage.getItem("assignedMainList"));
let tasks = JSON.parse(localStorage.getItem("tasks"));
let pending = JSON.parse(localStorage.getItem("pending"));
let acceptedTasks = []

if(JSON.parse(localStorage.getItem("acceptedTasks")) == null)
{
    tasks = [];
}else{
    JSON.parse(localStorage.getItem("acceptedTasks"))
}

if(tasks == null)
{
    tasks = [];
}

if(assignedMainList == null)
{
    assignedMainList = [];
}

if(pending == null){
    pending = []
}
else{
    viewTasks()
}


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
    `
    for(let i = 0; i <pending.length; i++) {
        view += `
        <tbody>
            <tr>
            <td>${i + 1}</td>
            <td>${pending[i].name}</td>
            <td>${pending[i].due}</td>
            <td><a href="#" onclick="acceptTask(${i}), accepted(${i})">accept</a></td>
        ` }
        view += `
        </tr>
    </tbody>
    </table>
    `
    document.getElementById('view-tasks').innerHTML = view;
}


function acceptTask(id){
    acceptedTasks.push(assignedMainList[id])
    localStorage.setItem("acceptedTasks",  JSON.stringify(acceptedTasks))

    userIndex = acceptedTasks.findIndex(x => x.name == pending[id].name)
    pending.splice(id, 1)
    localStorage.setItem("pending",  JSON.stringify(pending))
    viewTasks()
}

function accepted(id) { 
    assignedMainList[id].status = "Accepted"
    localStorage.setItem("assignedMainList",  JSON.stringify(assignedMainList))
}








