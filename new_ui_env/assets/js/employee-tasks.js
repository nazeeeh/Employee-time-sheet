function closeTasks() {
    location.assign("../../contents/employee-dashboard/index.html");
}
function taskPage() {
    location.assign("employee-tasks.html")
}

let acceptedTasks = [] //Contains tasks that have been accepted
let check = JSON.parse(localStorage.getItem("paceDB")) //Get all registered companies of Pace
let tasks = JSON.parse(localStorage.getItem("tasks")); //Get all tasks
let currentUser = JSON.parse(localStorage.getItem("current_EmployeeUser"));//Get the current user
let currentUserEmail = currentUser[0].email //Get the email of the current user
let assignedMainList = JSON.parse(localStorage.getItem(`${currentUserEmail}_AssignedTask`)); // Get list of Tasks that have been assigned
let pending = JSON.parse(localStorage.getItem(`${currentUserEmail}_pendingTask`)); //Current user's pending tasks
let completed = JSON.parse(localStorage.getItem(`${currentUserEmail}_completedTask`)); //current user's completed task
let companyName =  check[0].name; //Find the name of all the companies of Pace
let department =  currentUser[0].department
let employees = JSON.parse(localStorage.getItem(department)); //Get all the employees of user company
let employeeTask = JSON.parse(localStorage.getItem(`${currentUserEmail}_task`)); //Current User Tasks


// function goToReport(id){
//     let name = employeeTask[id].name
//     promise = new Promise(function(resolve, reject){
//         location.assign("../contents/report.html");
//     })

//     promise.then(
//         result => document.getElementById("title").value = name
//     )
// }

// SETTING ALL LIST ITEMS TO LOCAL STORAGE
if(JSON.parse(localStorage.getItem("tasks")) == null || undefined){
    tasks = []
}

if(JSON.parse(localStorage.getItem("current_InternalUser")) == null || undefined){
    currentUser = []
}

if(JSON.parse(localStorage.getItem(`${currentUserEmail}_AssignedTask`)) == null || undefined){
    assignedMainList = []
}

if(JSON.parse(localStorage.getItem(`${currentUserEmail}_completedTask`)) == null || undefined){
    completed = []
}

if(JSON.parse(localStorage.getItem(`${currentUserEmail}_pendingTask`)) == null || undefined){
    pending = []
}

if(employees == null || undefined){
    employees = []
}

if(employeeTask == null || undefined){
    employeeTask = []
}else{
    viewTasks()
    viewAcceptedTasks() //Display all current user's task on User dashboard
}

if(JSON.parse(localStorage.getItem("acceptedTasks")) == null)
{
    acceptedTasks = [];
}


// DONE

// function to display tasks gotten from local storage
function viewTasks() {
    let view = `
    <thead class = "pace-thead">
            <tr>
            <th>S/N</th>
            <th>Task</th>
            <th>Due</th>
            <th> Status</th>
            <th>Requests</th>
            </tr>
        </thead>
        <tbody>
    `
    for(let i = 0; i <employeeTask.length; i++) {
        if(employeeTask[i].document != ""){
            view += `
            <tr>
            <th>${i + 1}</th>
            <td>${employeeTask[i].name} <i class="fa fa-paperclip" aria-hidden="true"></i></td>
            <td>${employeeTask[i].due}</td>
            <td><a href="#" onclick="acceptTask(${i})">accept</a></td>
            <td><a href="#" onclick="">Requests</a></td>
        `
        }else{
            view += `
            <tr>
            <td>${i + 1}</td>
            <td>${employeeTask[i].name}</td>
            <td>${employeeTask[i].due}</td>
            <td><a href="#" onclick="acceptTask(${i})">Accept</a></td>
            <td><a href="#" onclick="goToReport(${i})">Requests</a></td>
        ` 
        }
      }
        view += `
        </tr>
    </tbody>
    `
    // view += `<button onclick="closeTasks()">close</button>`
    document.getElementById('view-tasks').innerHTML = view;

    // viewAcceptedTasks()
}

// alert(JSON.stringify(employeeTask))
 
function acceptTask(id){ //what to do when the 'accepted button' is clicked
    eachInternalsTask(id, "In Progress", employeeTask)

    pending.push(employeeTask[id]) //push the task to the pending list
    employeeTask.splice(id, 1) //delete the task from it's current list
    viewTasks()
    localStorage.setItem(`${currentUserEmail}_task`, JSON.stringify(employeeTask))
    
    viewAcceptedTasks() //Display all current user's task on User dashboard

    localStorage.setItem(`${currentUserEmail}_pendingTask`, JSON.stringify(pending))
}



function findInternal(){
    internal = []
    for(var i = 0; i < employees.length; i++){
        if(user_role = "internal-admin")
        internal.push(employees[i])
    }
    return internal
}

function getEmails(){
    internal = findInternal()
    theEmail = []
    for(var i = 0; i < internal.length; i++){
        theEmail.push(internal[i].email)
    }
    return theEmail
}

function eachInternalsTask(id, changeTo, whatTask){
    theEmail = getEmails()
    internalTask = []
    for(var i = 0; i < theEmail.length - 1; i++){
        internalTask = (JSON.parse(localStorage.getItem(`${theEmail[i]}_AssignedTask`)))
        internalTask.forEach(element => {
            if(whatTask[id].name == element.name){
                element.status = changeTo
                localStorage.setItem(`${theEmail[i]}_AssignedTask`, JSON.stringify(internalTask))
            }
        });
    }
    return internalTask
}


function completeTask(id){ //What to do do when the 'completed' button is clicked
    eachInternalsTask(id, "Completed", pending) //DIsplay the now current pending list

    completed.push(pending[id]) //push the task from pending list to completed list
    pending.splice(id, 1) //Delete the task from pending list so it doesn't display anymore
    localStorage.setItem(`${currentUserEmail}_pendingTask`, JSON.stringify(pending))

    // Set local storage
    localStorage.setItem(`${currentUserEmail}_completedTask`,  JSON.stringify(completed))
    viewAcceptedTasks()
}



// function to display accepted tasks
function viewAcceptedTasks() {
    let views = `
    <thead class = "pace-thead">
            <tr>
            <th>S/N</th>
            <th>Task</th>
            <th>Due</th>
            <th>Status</th>
            </tr>
        </thead>
        <tbody>
    `

    for( let i = 0; i < pending.length; i++) {
        views += `
            <tr>
            <td>${i + 1}</td>
            <td>${pending[i].name}</td>
            <td>${pending[i].due}</td>
            <td onclick="completeTask(${i})"><a href="#">completed</a></td>
        ` }
        views += `
        </tr>
    </tbody>
    `
    document.getElementById("accepted-tasks").innerHTML = views;
}




