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
var cumulativeSec;
var cumulativeMin;
var cumulativeHour;

function startTime(){
    let startTime = document.getElementById("start-time");
    let stopTime = document.getElementById("stop-time");

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
    cumulativeSec =  parseInt(document.getElementById("seconds").textContent);
    cumulativeMin =  parseInt(document.getElementById("mins").textContent);
    cumulativeHour =  parseInt(document.getElementById("hours").textContent);

    swal("Great work", `You worked for ${cumulativeHour}hours, ${cumulativeMin}minutes and ${cumulativeSec}seconds`, "success");


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
    xxx = document.getElementById("role_display").innerHTML
alert(xxx);
}

var isLoggedInUser = JSON.parse(localStorage.getItem("currentUsers"));



// =islogged_In_Admin[0].user_type.toUpperCase()

// if