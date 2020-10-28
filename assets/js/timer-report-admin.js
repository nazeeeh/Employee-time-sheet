department = ["texting", "production", "stuff", "stuff", "stuff"]

function showDepartments(){
let departments = document.getElementsByClassName('each-department')

    for(i = 0; i < departments.length; i++){
        
        if(document.getElementsByClassName('each-department')[i].style.display == "block"){
            document.getElementsByClassName('each-department')[i].style.display = "none"
        }
        else{
            document.getElementsByClassName('each-department')[i].style.display = "block"
        }
    }
}

function showDepartmentTimeSheet(id){
    departmentBox = document.getElementById('showDepartment')
    words = document.getElementsByClassName('each-department')[id].textContent
    departmentBox.innerHTML = words
    showDepartments()
    let employeesInDepartment = JSON.parse(localStorage.getItem(words))
    getEmployeeTimeSheetDataBase(employeesInDepartment)
}

function getEmployeeTimeSheetDataBase(partDepartment){
    let employeeName = [] //Declare an empty variable to store all names of all employee

    // Loop through each object in employees and push the value of the name to employeeName
    partDepartment.forEach(element => {
        employeeName.push(element.name)
    });

    timingDatabase = [] //Declare an empty variable to store timing details of all employees in internals department

    // Loop through every name in employeeNames and concatenate name with local storage containing timing details and store in timingDatabase
    employeeName.forEach(element => {
        timingDatabase.push(JSON.parse(localStorage.getItem(`${element}_time`)))
    })

    
    timeSheet = [] //Declare an empty variable to store timing details of employees that have been online and hac=ve stopped their time

    // Loop through each item in timingDatabase and check if an entry is null
    timingDatabase.forEach((element) => {
        try{
            element.forEach(item => {
                    timeSheet.push(item) 
        }) 
        }
        catch(err){ //catch the type error and push 'err' instead
            timeSheet.push("err")
        }
    })
    alert(timeSheet)
    displayTimeSheet(timeSheet)
}

function displayTimeSheet(sheet){
    let add = ""
    // loop through every time entry
    sheet.forEach((element) => {
    // if entry says "err", don't display anything on the DOM
    if(element == "err"){
        add += ""
    }else{
    // if not, add the table body to the DOM
    add +=`<tr>
            <td>${element.date}</td>
            <td><strong>${element.name}</strong></td>
            <td>${element.loginTime}</td>
            <td>${element.hour}:${element.minute}:${element.second}</td>
        </tr>
        `
    }
    })

    document.getElementById("con").innerHTML = add

    
}


