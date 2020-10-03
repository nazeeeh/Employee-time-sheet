function closeTasks() {
    location.assign("../contents/employee-dashboard.html");
}


function see () {
    eTasks = JSON.parse(localStorage.getItem("tasks"))

    if(eTasks==null) {
        eTasks = [];
    }
    eData = JSON.stringify(eTasks)
alert(eData);
}

// i need to get the data from the local storage then check if it matches the employee's name and save it