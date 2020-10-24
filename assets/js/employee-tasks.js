function closeTasks() {
    location.assign("../contents/employee-dashboard.html");
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
let employees = JSON.parse(localStorage.getItem(`${companyName}_employees`)); //Get all the employees of user company
let employeeTask = JSON.parse(localStorage.getItem(`${currentUserEmail}_task`)); //Current User Tasks

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

if(pending == null || undefined){
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
alert(JSON.stringify(pending))

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
    for(let i = 0; i <employeeTask.length; i++) {
        view += `
            <tr>
            <td>${i + 1}</td>
            <td>${employeeTask[i].name}</td>
            <td>${employeeTask[i].due}</td>
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
 
function acceptTask(id){ //what to do when the 'accepted button' is clicked
    pending.push(employeeTask[id]) //push the task to the pending list
    employeeTask.splice(id, 1) //delete the task from it's current list
    // findTask(id) //this should find the internal user that accepted the task and let them the know the task has been accepted
    // Set local storage of both lists
    localStorage.setItem(`${currentUserEmail}_task`, JSON.stringify(employeeTask))
    localStorage.setItem(`${currentUserEmail}_pendingTask`, JSON.stringify(pending))
}
//this should find the internal user that accepted the task and let them the know the task has been accepted but it's not working, I failed but ill come back to it
//this should find the internal user that accepted the task and let them the know the task has been accepted but it's not working, I failed but ill come back to it
//this should find the internal user that accepted the task and let them the know the task has been accepted but it's not working, I failed but ill come back to it
//this should find the internal user that accepted the task and let them the know the task has been accepted but it's not working, I failed but ill come back to it
function findTask(id){
    eachEmployeeTask = eachEmployeesTask()
    theEmail = getEmails()
    for(var i = 0; i < eachEmployeeTask.length; i++){
        // taskIndex = eachEmployeeTask[i].findIndex(x => (x.name == employeeTask[id].name))
        // alert(taskIndex)
        alert(JSON.stringify(eachEmployeeTask[i]))
            alert(JSON.stringify(employeeTask[id].name))
        if(eachEmployeeTask[i].includes(employeeTask[id]).name){
            eachEmployeeTask[i].name = eachEmployeeTask[i].name
            eachEmployeeTask[i].employee = eachEmployeeTask[i].employee
            eachEmployeeTask[i].due = eachEmployeeTask[i].due
            eachEmployeeTask[i].status = "Accepted"
            alert(JSON.stringify(eachEmployeeTask[i].status))
            localStorage.setItem(`${theEmail[taskIndex + 1]}_task`, JSON.stringify(eachEmployeeTask))
            alert(JSON.stringify(eachEmployeeTask))
        }else{
            eachEmployeeTask[i].status = "Accepted"
            localStorage.setItem(`${theEmail[i + 1]}_task`, JSON.stringify(eachEmployeeTask))
            

            alert("no!")
        }
    }        
}

function getEmails(){
    employeeEmails = []
    for(var i = 0; i < employees.length; i++){
        employeeEmails.push(employees[i].email)
    }
    return employeeEmails
}

function GetAllTasks(){
    theEmail = getEmails()
    allTasks = []
    for(var i = 0; i < theEmail.length; i++){
        allTasks.push(theEmail[i] + "_task")
    }
    return allTasks
}

function eachEmployeesTask(){
    allTasks = GetAllTasks()
    eachEmployeeTask = []
    for(var i = 0; i < allTasks.length - 1; i++){
        eachEmployeeTask.push(JSON.parse(localStorage.getItem(`${allTasks[i + 1]}`)))
    }
    alert(eachEmployeeTask.length)
    alert(JSON.stringify(eachEmployeeTask))
    return eachEmployeeTask
}
//this should find the internal user that accepted the task and let them the know the task has been accepted but it's not working, I failed but ill come back to it
//this should find the internal user that accepted the task and let them the know the task has been accepted but it's not working, I failed but ill come back to it
//this should find the internal user that accepted the task and let them the know the task has been accepted but it's not working, I failed but ill come back to it
//this should find the internal user that accepted the task and let them the know the task has been accepted but it's not working, I failed but ill come back to it

function completeTask(id){ //What to do do when the 'completed' button is clicked
    completedTasks.push(pending[id]) //push the task from pending list to completed list
    pending.splice(id, 1) //Delete the task from pending list so it doesn't display anymore
    viewAcceptedTasks() //DIsplay the now current pending list
    // Set local storage
    localStorage.setItem(`${currentUserEmail}_pendingTask`, JSON.stringify(pending))
    localStorage.setItem(`${currentUserEmail}_completedTask`,  JSON.stringify(completed))

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
    </table>
    `
    document.getElementById("accepted-tasks").innerHTML = views;
}







