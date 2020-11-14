// sorry, i was here(Tolu)
var date = new Date()
var year = date.getFullYear()
var month = date.getMonth()+1
var day = date.getDate()
var hour = date.getHours()
var minute = date.getMinutes()
var second = date.getSeconds()

let seconds = 0, minutes = 0, hours = 0

if(JSON.parse(localStorage.getItem("seconds")) == null){
    seconds = 0
}else{
    seconds = JSON.parse(localStorage.getItem("seconds"))
}

if(JSON.parse(localStorage.getItem("minutes")) == null){
    minutes = 0
}else{
    minutes = JSON.parse(localStorage.getItem("minutes"))
}

if(JSON.parse(localStorage.getItem("hours")) == null){
    hours = 0
}else{
    hours = JSON.parse(localStorage.getItem("hours"))
}

getCurrentHours()

function getCurrentHours(){
    let startTime = document.getElementById("start-time");
    let stopTime = document.getElementById("stop-time");

    if(seconds === 0 && minutes === 0 && hours === 0){
        startTime.style.display = "block";
    }else{
        document.getElementById("seconds").textContent = seconds
        document.getElementById("mins").textContent = "0" + minutes
        document.getElementById("hours").textContent = '0' + hours
        stopTime.style.display = "block";
        startTime.style.display = "none";
        timeSec = setInterval(setSecs, 1000);
        timeMins = setInterval(setMins, 60000);
        timeHours = setInterval(setHours, 3600000);
    }
}

function setSecs(){
    if(seconds < 60){
        seconds++
        localStorage.setItem("seconds", JSON.stringify(seconds))
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
        localStorage.setItem("minutes", JSON.stringify(minutes))
    }else if(minutes == 60){
        minutes = 0
        minutes++
        localStorage.setItem("minutes", JSON.stringify(minutes))
    }

    document.getElementById("mins").textContent = "0" + minutes
    if(minutes >= 10){
        document.getElementById("mins").textContent = minutes
    }
    // Did same as seconds for minutes also - Peter
    if(minutes == 60){
        document.getElementById("mins").textContent = "00"
    } else if(minutes >= 10){
        document.getElementById("mins").textContent = minutes
    } 
}

function setHours(){
    if(hours < 59){
        hours++
        localStorage.setItem("hours", JSON.stringify(hours))
    }else if(hours == 59){
        hours = 0
        hours++
        localStorage.setItem("hours", JSON.stringify(hours))
    }
    document.getElementById("hours").textContent = hours;
}

var usedSec;
var usedMin;
var usedHour;
var loggedIn = ''

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

    // swal("Great work", `You worked for ${usedHour}hours, ${usedMin}minutes and ${usedSec}seconds`, "success");

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
    localStorage.setItem("hours", JSON.stringify(hours))
    localStorage.setItem("minutes", JSON.stringify(minutes))
    localStorage.setItem("seconds", JSON.stringify(seconds))


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

    months = ""
    switch (month){
        case month = 01:
            months = "January"
        break

        case month = 02:
            months = "Febuary"
        break

        case month = 03:
            months = "March"
        break

        case month = 04:
            months = "April"
        break

        case month = 05:
            months = "May"
        break

        case month = 06:
            months = "June"
        break

        case month = 07:
            months = "July"
        break

        case month = 08:
            months = "August"
        break

        case month = 09:
            months = "September"
        break

        case month = 10:
            months = "October"
        break

        case month = 11:
            months = "November"
        break

        case month = 12:
            months = "December"
        break        
    }

    if((usedHour == 8 || usedHour > 8) & usedMin > 1){
        let overTime = (8 - usedHour)
    }else{
        overTime = "NILL"
    }

    let dailyWage = 50 * 8

    if(overTime == "NILL"){
        overTimeWage = "NILL"
    }else{
        let overTimeWage = 10 * (8 - usedHour)
    }
    
    if(usedHour < 1){
        payableWage = 0
    }else{
        payableWage = usedHour * 50
    }

    // sorry, i was here(Tolu)
    var usedTime = {
        "name" : name,
        "loginTime": loggedIn,
        "hour" : usedHour,
        "minute" : usedMin,
        "second" : usedSec,
        "date" : `${day}-${month}-${year}`,
        "month" : months,
        "overTime" : overTime,
        "dailyWage" : dailyWage,
        "overTimeWage" : overTimeWage,
        "payableWage" : payableWage
    }

    // The function takes in two arguments - the userArray from the localStorage and the usedTime recorded for the user
    function timeAppend(userTime, newTime) {
        var lengthTime = userTime.length;
        if(userTime[lengthTime-1].date == newTime.date) {
            // Sums the value of the two seconds and find the minute and second from it while it appends the minute to the minute variable
            var overflowMinute = parseInt((userTime[lengthTime-1].second + newTime.second)/60)
            userTime[lengthTime-1].second =(userTime[lengthTime-1].second + newTime.second)%60;
            userTime[lengthTime-1].second += newTime.second;
        
            // Sums the value of the two minutes and find the hour and minute from it while it appends the hour to the hour variable
            var overflowHour = parseInt((userTime[lengthTime-1].minute + newTime.minute)/60)
            userTime[lengthTime-1].minute =(userTime[lengthTime-1].minute + newTime.minute)%60;
            userTime[lengthTime-1].minute += (newTime.minute + overflowMinute);
        
            // Sums both hours and sets the value to the sum
            userTime[lengthTime-1].hour += (newTime.hour + overflowHour);    
        } else {
            userTime.push(newTime);
        }
}
    
switch(user_role) {
    case user_role = "admin":
        if(localStorage.getItem(`${isLogged_In_Admin[0].name}_time`) == null) {
            var isLogged_In_Admin_Time = [];
        } else {
            var isLogged_In_Admin_Time = JSON.parse(localStorage.getItem(`${isLogged_In_Admin[0].name}_time`))
        }

        timeAppend(isLogged_In_Admin_Time, usedTime);
        
        localStorage.setItem(`${isLogged_In_Admin[0].name}_time`, JSON.stringify(isLogged_In_Admin_Time));
    break;            

    case user_role = "internal-admin":
        if(localStorage.getItem(`${isLogged_In_InternalUser[0].name}_time`) == null) {
            var isLogged_In_InternalUser_Time = [];
        } else {
            var isLogged_In_InternalUser_Time = JSON.parse(localStorage.getItem(`${isLogged_In_InternalUser[0].name}_time`))
        }

        timeAppend(isLogged_In_InternalUser_Time, usedTime);

        localStorage.setItem(`${isLogged_In_InternalUser[0].name}_time`, JSON.stringify(isLogged_In_InternalUser_Time));
    break;

    case user_role = "employee":
        if(localStorage.getItem(`${isLogged_In_EmployeeUser[0].name}_time`) == null) {
            var isLogged_In_EmployeeUser_Time = [];
        } else {
            var isLogged_In_EmployeeUser_Time = JSON.parse(localStorage.getItem(`${isLogged_In_EmployeeUser[0].name}_time`))
        }
        timeAppend(isLogged_In_EmployeeUser_Time, usedTime);

        localStorage.setItem(`${isLogged_In_EmployeeUser[0].name}_time`, JSON.stringify(isLogged_In_EmployeeUser_Time));
    break;
}


//     var isLoggedInUser = JSON.parse(localStorage.getItem("currentUsers"));
    
//     for(var i=0; i<isLoggedInUser.length; i++) {
        
//     }
}