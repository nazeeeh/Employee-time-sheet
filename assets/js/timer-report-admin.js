department = ["texting", "production", "stuff", "stuff", "stuff"]

function showMonths(){
    let theMonth = document.getElementsByClassName('each-month')

    for(i = 0; i < theMonth.length; i++){
        
        if(document.getElementsByClassName('each-month')[i].style.display == "block"){
            document.getElementsByClassName('each-month')[i].style.display = "none"
        }
        else{
            document.getElementsByClassName('each-month')[i].style.display = "block"
        }
    }
}
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


let timeSheet = [] //Declare an empty variable to store timing details of employees that have been online and hac=ve stopped their time
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
}

function chooseMonth(id){
    monthBox = document.getElementById('showMonth')
    words = document.getElementsByClassName('each-month')[id].textContent
    monthBox.innerHTML = words
    selectedMonth = document.getElementsByClassName('each-month')[id].textContent
    showMonths()
}

function filterAndDisplay(){
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
            if((element.month == "October" && selectedMonth == "October") || (element.month == "January" && selectedMonth == "January" )||( element.month == "Febuary" && selectedMonth == "Febuary") || (element.month == "March" && selectedMonth == "March" )|| element.month == "April" && selectedMonth == "April" || element.month == "May" && selectedMonth == "May" || element.month == "June" && selectedMonth == "June" || element.month == "July" && selectedMonth == "July" || element.month == "August" && selectedMonth == "August" || (element.month == "September" && selectedMonth == "September") || (element.month == "November" && selectedMonth == "November") || (element.month == "December" && selectedMonth == "December")){
                // if not, add the table body to the DOM
                add +=`<tr>
                <td>${element.date}</td>
                <td><strong>${element.name}</strong></td>
                <td>${element.loginTime}</td>
                <td>${element.hour}:${element.minute}:${element.second}</td>
                <td>${element.dailyWage}</td>
                <td>${element.overTime}</td>
                <td>${element.overTimeWage}</td>
                <td>${element.payableWage}</td>
                </tr>
                `
                document.getElementById("con").innerHTML = add
            }
                
        }
    })

}


