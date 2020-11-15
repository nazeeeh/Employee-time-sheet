let check = JSON.parse(localStorage.getItem("paceDB")) //get company details
let tasks = JSON.parse(localStorage.getItem("tasks")); //get general task details
let currentUser = JSON.parse(localStorage.getItem("current_AdminUser")); //get current user details
let currentUserEmail = currentUser[0].email //get email of user from current user details
let unassignedMainList = JSON.parse(localStorage.getItem(`${currentUserEmail}_UnassignedTask`)); //get user unassigned tasks
let assignedMainList = JSON.parse(localStorage.getItem(`${currentUserEmail}_AssignedTask`)); //get user assigned tasks
let pending = JSON.parse(localStorage.getItem(`${currentUserEmail}_pendingTask`)); //get user pending tasks
let completed = JSON.parse(localStorage.getItem(`${currentUserEmail}_completedTask`)); //get user's completed tasks
let companyName =  check[0].name; //get name of company from company details
let department =  currentUser[0].department //get current user
let employees = JSON.parse(localStorage.getItem(`${companyName}_employees`)); //get all employees in user department
let employeeTask = JSON.parse(localStorage.getItem(`${currentUserEmail}_task`)); //get all user tasks

// if local storage does not exist, create an empty list for all above items
if(JSON.parse(localStorage.getItem("tasks")) == null || undefined){
    tasks = []
}

if(JSON.parse(localStorage.getItem("current_InternalUser")) == null || undefined){
    currentUser = []
}

if(JSON.parse(localStorage.getItem(`${currentUserEmail}_UnassignedTask`)) == null || undefined){
    unassignedMainList = []
}

if(JSON.parse(localStorage.getItem(`${currentUserEmail}_AssignedTask`)) == null || undefined){
    assignedMainList = []
}

if(JSON.parse(localStorage.getItem(`${currentUserEmail}_pendingTask`)) == null || undefined){
    pending = []
}

if(employees == null || undefined){
    employees = []
}

if(employeeTask == null || undefined){
    employeeTask = []
}
// if local storage does not exist, create an empty list
displayTasks()
// alert(JSON.stringify(employees))
function getTaskDetails(){
    let title = document.getElementById('title').value,
        name = document.getElementById("name").value,
        message = document.getElementById("taskMessage").value,
        attachment1 = document.getElementById("attachment1").value,
        attachment2 = document.getElementById("attachment2").value,
        dueDate = document.getElementById("taskDueDate").value,
        department = document.getElementById("department").value;
    newTask(title, department, name, message, attachment1, attachment2, dueDate)
}

function getEmployeeNames(){
    let employeeNames = []
    for(i = 0; i < employees.length; i++){
        firstName = (employees[i].firstName)
        secondName = (employees[i].secondName)

        employeeNames.push(firstName +" " + secondName)
    }
    return employeeNames
}

// get current date
var date = new Date()
var year = date.getFullYear()
var month = date.getMonth()+1
var day = date.getDate()

function newTask(title, department, name, message, attachment1, attachment2, dueDate){
    let theTask = {
        "title" : title,
        "department" : department,
        "name" : name,
        "message" : message,
        document : attachment1,
        document1 : attachment2,
        // "startDate" : startDate,
        "due" : dueDate,
        "status" : "Pending",
        "Date" : `${year}-${day}-${month}`,
        "id" : generateID()
    }

    employeeNames = getEmployeeNames()
    sendTaskToEmployee(name, theTask)
    employeeTask.push(theTask)
    localStorage.setItem(`${currentUserEmail}_task`, JSON.stringify(employeeTask))
    displayTasks()
}

function displayTasks(){
    // employeeTask.splice(0,3)
    // localStorage.setItem(`${currentUserEmail}_task`, JSON.stringify(employeeTask))
    let add = ""
    for(i = 0; i < employeeTask.length; i++){
        add += `
        <tr id='${i}'>
        <td><a href="#">${i + 1}</a></td>
        <td>${employeeTask[i].name}</td>
        <td>${employeeTask[i].title}</td>
        <td><span class="badge badge-success">${employeeTask[i].status}</span></td>
        <td>
            <a href="#" class="task-duration">${employeeTask[i].Date}</a>
        </td>
        <td><a href="#" class="task-duration">${employeeTask[i].due}</a></td>
        </tr>
        `
    }
    document.getElementById('tasksTable').innerHTML = add
}

function generateID(){
   return Math.floor(Math.random() * 1000000)
}

function sendTaskToEmployee(name, theTask){
    if(employeeNames.includes(name)){
        pushToEmployee(name,theTask)
        assignedMainList.push(newTask)
        // pending.push(newTask)
        // employeeTask.push(newTask)
    }else{
    swal("Sorry!",`${employeeAssigned} is not an employee!`, "error")
    }
}

function pushToEmployee(name, theTask){
    name = name.split(" ")
    Email = findEmployee(name[0])
    let assignedEmployee = JSON.parse(localStorage.getItem(`${Email}_task`));
    assignedEmployee.push(theTask)
    localStorage.setItem(`${Email}_task`,  JSON.stringify(assignedEmployee))
}

function findEmployee(theName){
    found = employees.find(x => x.firstName.toLowerCase() == theName.toLowerCase())
    foundEmail = found.email
    return foundEmail
}

//

function displayOptions(){
    let employeeName = document.getElementById("name").value
    let searchResult = document.getElementById('employeeNames')
        searchResult.innerHTML = ''
        employeeNames = getEmployeeNames()
        let employeeResult = employeeNames.filter(function(employeeNames){
            return employeeNames.toLowerCase().startsWith(employeeName.toLowerCase());
        });
        employeeResult.forEach(element => {
            i = employeeResult.indexOf(element)
            let div =document.createElement('option')
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
        let searchResult = document.querySelector('.employee')
        document.getElementById("employee-assigned-main").value = results[id]
        searchResult.innerHTML = ''
    }
    