let check = JSON.parse(localStorage.getItem("paceDB")) //get company details
let tasks = JSON.parse(localStorage.getItem("tasks")); //get general task details
let currentUser = JSON.parse(localStorage.getItem("current_InternalUser")); //get current user details
let currentUserEmail = currentUser[0].email //get email of user from current user details
let unassignedMainList = JSON.parse(localStorage.getItem(`${currentUserEmail}_UnassignedTask`)); //get user unassigned tasks
let assignedMainList = JSON.parse(localStorage.getItem(`${currentUserEmail}_AssignedTask`)); //get user assigned tasks
let pending = JSON.parse(localStorage.getItem(`${currentUserEmail}_pendingTask`)); //get user pending tasks
let completed = JSON.parse(localStorage.getItem(`${currentUserEmail}_completedTask`)); //get user's completed tasks
let companyName =  check[0].name; //get name of company from company details
let department =  currentUser[0].department //get current user
let employees = JSON.parse(localStorage.getItem(department)); //get all employees in user department
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

class task{
    constructor(){
        this.task = {
            "title" : title,
            "department" : department,
            "name" : name,
            "message" : message,
            document : docs,
            document1 : docs1,
            "startDate" : startDate,
            "due" : dueDate,
            "status" : "In Progress",
            "Date" : `${year}-${day}-${month}`,
            "id" : this.generateID
        }
    }

    addNewTask(title, department, name, message, document, document1, startDay, dueDay, status, date){
        newTask = {
            "title" : title,
            "department" : department,
            "name" : name,
            "message" : message,
            document : document,
            document1 : document1,
            "startDate" : startDay,
            "due" : dueDay,
            "status" : status,
            "Date" : date,
            "id" : this.generateID
        }

        this.newTask.push(newTask)
    }

    displayTasks(){
        newTask = ""
        for(let i = 0; i < this.task; i++){
            newTask += `
            <tr id='${i}'>
            <td><a href="#">${i + 1}</a></td>
            <td>${this.task.name[i]}</td>
            <td>${this.task.title[i]}</td>
            <td><span class="badge badge-success">${this.task.status[i]}</span></td>
            <td>
                <a href="#" class="btn btn-sm pace-bg-primary">${this.task.startDate[i]}</a>
            </td>
            <td><a href="#" class="btn btn-sm pace-bg-primary">${this.task.dueDate[i]}</a></td>
            </tr>
            `
        }
    }

    deleteTask(index){
        this.task.splice(index, 1)
    }

    editTask(index, name, startDay, dueDay, title){
        if((name === "" || name === null) || (startDay === "" || startDay === null) (dueDay === "" || dueDay === null) (title === "" || title === null)){
            name = this.task.employeeAssigned[index]
            startDay = this.task.startDate[index]
            dueDay = this.task.dueDate[index]
            title = this.task.title[index]
        }
    }

    generateID(){
        Math.floor(Math.random() * 1000000)
    }

    assign(){
        let title = document.getElementById('title'),
            name = document.getElementById("name"),
            message = document.getElementById("taskDescription"),
            attachment1 = document.getElementById("attachment1"),
            attachment2 = document.getElementById("attachment2"),
            dueDate = document.getElementById("taskDueDate"),
            department = document.getElementById("department")

        this.attachDetails(title, name, message, attachment1, attachment2, dueDate, department) 
    }

    attachDetails(title, name, message, attachment1, attachment2, dueDate, department){
        
        let newTask = {
            "title" : title,
            "department" : department,
            "name" : name,
            "message" : message,
            document : attachment1,
            document1 : attachment2,
            "startDate" : startDate,
            "due" : dueDate,
            "status" : "In Progress",
            "Date" : `${year}-${day}-${month}`,
            "id" : this.generateID
        }

        this.task.push(newTask)
    }
}

assignNewTask = new task()
// alert("hi")
