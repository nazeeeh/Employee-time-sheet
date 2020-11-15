function showDepartmentTimeSheet(){
    words = document.getElementById('role')
    words = words.options[words.selectedIndex].value
    // words = document.getElementById('role').value
    alert(words)
    let employeesInDepartment = JSON.parse(localStorage.getItem(words))
    alert(employeesInDepartment)
    getEmployeeTimeSheetDataBase(employeesInDepartment)
}


let timeSheet = [] //Declare an empty variable to store timing details of employees that have been online and hac=ve stopped their time
function getEmployeeTimeSheetDataBase(partDepartment){
    let employeeName = [] //Declare an empty variable to store all names of all employee

    // Loop through each object in employees and push the value of the name to employeeName
    partDepartment.forEach(element => {
        firstName = (element.firstName)
        secondName = (element.secondName)

        employeeName.push(firstName +" " + secondName)
    });
    
    alert(employeeName)
    timingDatabase = [] //Declare an empty variable to store timing details of all employees in internals department

    // Loop through every name in employeeNames and concatenate name with local storage containing timing details and store in timingDatabase
    employeeName.forEach(element => {
        timingDatabase.push(JSON.parse(localStorage.getItem(`generalReport`)))
    })
    alert(JSON.stringify(timingDatabase))
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

    filterAndDisplay()
}
function test (){

    selectedMonth = document.getElementById('month')
    s = selectedMonth.options[selectedMonth.selectedIndex].value
    alert(s)
}

function filterAndDisplay(){
    selectedMonth = document.getElementById('month')
    selectedMonth = selectedMonth.options[selectedMonth.selectedIndex].value
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
            if((element.month == "October" && selectedMonth == "October") || (element.month == "January" && selectedMonth == "January" )||( element.month == "Febuary" && selectedMonth == "Febuary") || (element.month == "March" && selectedMonth == "March" )|| element.month == "April" && selectedMonth == "April" || element.month == "May" && selectedMonth == "May" || element.month == "June" && selectedMonth == "June" || element.month == "July" && selectedMonth == "July" || element.month == "August" && selectedMonth == "August" || (element.month == "September" && selectedMonth == "September") || (element.month == "November" && selectedMonth == "November") || (element.month == "December" && selectedMonth == "December")){
                // if not, add the table body to the DOM
                add +=`<tr>
                <td>${i + 1}</td>
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
                document.getElementById("printArea").innerHTML = add
            }
                
        }
    })

}


// printing section
function printReport() {
    window.frames["print_frame"].document.body.innerHTML = document.getElementById("printArea").innerHTML;
    window.frames["print_frame"].window.focus();
    window.frames["print_frame"].window.print();
  }