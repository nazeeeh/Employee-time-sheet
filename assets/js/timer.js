// sorry, i was here(Tolu)
var date = new Date()
var year = date.getFullYear()
var month = date.getMonth()+1
var day = date.getDate()
var hour = date.getHours()
var minute = date.getMinutes()
var second = date.getSeconds()

let seconds = 0, minutes = 0, hours = 0

    
function setSecs(){
    if(seconds < 60){
        seconds++
    }else if(seconds == 60){
        seconds = 0
        seconds++
    }

    document.getElementById("seconds").textContent = "0" + seconds
    // I only set the second time to zero as soon as it hits 60 using this if statement. - Peter
    if(seconds == 60){
        document.getElementById("seconds").textContent = "00"
    } else if(seconds >= 10){
        document.getElementById("seconds").textContent = seconds
    }   
}

function setMins(){
    if(minutes < 60){
        minutes++
    }else if(minutes == 60){
        minutes = 0
        minutes++
    }

    document.getElementById("mins").textContent = "0" + minutes
    if(minutes >= 10){
        document.getElementById("mins").textContent = minutes
    }
    // Did same as seconds for minutes also - Peter
    if(minutes == 60){
        document.getElementById("min").textContent = "00"
    } else if(minutes >= 10){
        document.getElementById("min").textContent = minutes
    } 
}

function setHours(){
    if(hours < 59){
        hours++
    }else if(hours == 59){
        hours = 0
        hours++
    }
    document.getElementById("hours").textContent = hours;
}

var usedSec;
var usedMin;
var usedHour;

function startTime(){
    let startTime = document.getElementById("start-time");
    let stopTime = document.getElementById("stop-time");
    // sorry, i was here(Tolu)
    loggedIn = `${hour}:${minute}:${second}`
    /* This sets the values to zero first;
    then it starts to count the time used */
    document.getElementById("seconds").textContent = "00"
    document.getElementById("mins").textContent = "00"
    document.getElementById("hours").textContent = "00"

    if (stopTime.style.display == "block") {
        stopTime.style.display = "none";
        startTime.style.display = "block";
    }
    else {
        startTime.style.display = "none";
        stopTime.style.display = "block";
    }
    
   timeSec = setInterval(setSecs, 1000);
   timeMins = setInterval(setMins, 60000);
   timeHours = setInterval(setHours, 3600000);

}

function stopTime(){
    clearInterval(timeSec);
    clearInterval(timeMins);
    clearInterval(timeHours);

    // Gets the value of the time as soon as time is stopped
    usedSec =  parseInt(document.getElementById("seconds").textContent);
    usedMin =  parseInt(document.getElementById("mins").textContent);
    usedHour =  parseInt(document.getElementById("hours").textContent);

    swal("Great work", `You worked for ${usedHour}hours, ${usedMin}minutes and ${usedSec}seconds`, "success");


    let stopHours = "", stopMins = "", stopSecs = ""
    stopHours = hours
    stopMins = minutes
    stopSecs = seconds

    let startTime = document.getElementById("start-time");
    let stopTime = document.getElementById("stop-time");

    if (startTime.style.display == "block") {
        startTime.style.display = "none";
        stopTime.style.display = "block";
    }
    else {
        startTime.style.display = "block";
        stopTime.style.display = "none";
    }

    seconds = 0, minutes = 0, hours = 0

    timeValue();
}

function timeValue() {
    let isLogged_In_Admin = JSON.parse(localStorage.getItem("current_AdminUser"));
    let isLogged_In_InternalUser = JSON.parse(localStorage.getItem("current_InternalUser"));
    let isLogged_In_EmployeeUser = JSON.parse(localStorage.getItem("current_EmployeeUser"));

    user_role = document.getElementById("role_display").innerHTML.toLowerCase();
    
    name = ""

    if(user_role == "admin"){
        name = isLogged_In_Admin[0].name
    }else if (user_role == "internal-admin"){
        name =isLogged_In_InternalUser[0].name
    }else{
        name = isLogged_In_EmployeeUser[0].name
    }
    // sorry, i was here(Tolu)
    var usedTime = {
        "name" : name,
        "loginTime": loggedIn,
        "hour" : usedHour,
        "minute" : usedMin,
        "second" : usedSec,
        "date" : `${day}-${month}-${year}`
    }

switch(user_role) {
    case user_role = "admin":
        if(localStorage.getItem(`${isLogged_In_Admin[0].name}_time`) == null) {
            var isLogged_In_Admin_Time = [];
        } else {
            var isLogged_In_Admin_Time = JSON.parse(localStorage.getItem(`${isLogged_In_Admin[0].name}_time`))
        }
        isLogged_In_Admin_Time.push(usedTime);
        localStorage.setItem(`${isLogged_In_Admin[0].name}_time`, JSON.stringify(isLogged_In_Admin_Time));
        break;            

    case user_role = "internal-admin":
        if(localStorage.getItem(`${isLogged_In_InternalUser[0].name}_time`) == null) {
            var isLogged_In_InternalUser_Time = [];
        } else {
            var isLogged_In_InternalUser_Time = JSON.parse(localStorage.getItem(`${isLogged_In_InternalUser[0].name}_time`))
        }
        isLogged_In_InternalUser_Time.push(usedTime);
        localStorage.setItem(`${isLogged_In_InternalUser[0].name}_time`, JSON.stringify(isLogged_In_InternalUser_Time));
        break;

    case user_role = "employee":
        if(localStorage.getItem(`${isLogged_In_EmployeeUser[0].name}_time`) == null) {
            var isLogged_In_EmployeeUser_Time = [];
        } else {
            var isLogged_In_EmployeeUser_Time = JSON.parse(localStorage.getItem(`${isLogged_In_EmployeeUser[0].name}_time`))
        }
        isLogged_In_EmployeeUser_Time.push(usedTime);
        localStorage.setItem(`${isLogged_In_EmployeeUser[0].name}_time`, JSON.stringify(isLogged_In_EmployeeUser_Time));
        break;
}


//     var isLoggedInUser = JSON.parse(localStorage.getItem("currentUsers"));
    
//     for(var i=0; i<isLoggedInUser.length; i++) {
        
//     }
}