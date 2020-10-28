let currentUser = JSON.parse(localStorage.getItem("current_InternalUser")); //get user details of active internal user
let department =  currentUser[0].department //Gets department name and saves it into a variable
let employees = JSON.parse(localStorage.getItem(department)); //Get all employees from local storage and store them
let employeeName = [] //Declare an empty variable to store all names of all employee

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

populateTimerReport()

function populateTimerReport(){
    // Head of the timeSheet table
    let add = ` 
    <table>
    <thead>
        <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Login Time</th>
            <th>Hours spent</th>
        </tr>
    </thead>
    <tbody>
    `
    // loop through every time entry
    timeSheet.forEach((element) => {
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
            `
        }
    })
        //add the closing tags 
        add +=`
        </tr> 
        </tbody>
        </table>
        ` 
    document.getElementById("billing-reports-con").innerHTML = add
}
