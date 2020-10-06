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

function startTime(){
    let startTime = document.getElementById("start-time");
    let stopTime = document.getElementById("stop-time");

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
}
