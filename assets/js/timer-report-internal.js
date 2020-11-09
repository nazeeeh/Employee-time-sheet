let currentUser = JSON.parse(localStorage.getItem("current_InternalUser")); //get user details of active internal user
let department =  currentUser[0].department //Gets department name and saves it into a variable
let employees = JSON.parse(localStorage.getItem(department)); //Get all employees from local storage and store them
let employeeName = [] //Declare an empty variable to store all names of all employee

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

function chooseMonth(id){
    monthBox = document.getElementById('showMonth')
    words = document.getElementsByClassName('each-month')[id].textContent
    monthBox.innerHTML = words
    selectedMonth = document.getElementsByClassName('each-month')[id].textContent
    showMonths()
}

// Loop through each object in employees and push the value of the name to employeeName
employees.forEach(element => {
    employeeName.push(element.name)
});
 
timingDatabase = [] //Declare an empty variable to store timing details of all employees in internals department

// Loop through every name in employeeNames and concatenate name with local storage containing timing details and store in timingDatabase
employeeName.forEach(element => {
    timingDatabase.push(JSON.parse(localStorage.getItem(`${element}_time`)))
})

// if list of department is empty, make an empty list
if(JSON.parse(localStorage.getItem(department)) == null || JSON.parse(localStorage.getItem(department)) == undefined) {
        employees = [];
    } else {
        employees = JSON.parse(localStorage.getItem(department))
}

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


function filterAndDisplay(){
    populateTimerReport()
}


function populateTimerReport(){
    // Head of the timeSheet table
    let add = ""
    // loop through every time entry
    timeSheet.forEach((element) => {
        // if entry says "err", don't display anything on the DOM
        if(element == "err"){
            add += ""
        }else{
        // if not, add the table body to the DOM
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
                document.getElementById("timeSheetCon").innerHTML = add
            }
            // else{
            //     alert(`Sorry! No Time Sheet available for ${selectedMonth}!`)
            // }
        }
    })
    // document.getElementById("timeSheetCon").innerHTML = add
}
