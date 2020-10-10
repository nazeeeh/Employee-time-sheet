
var today = new Date();
var month = today.getMonth();
var year = today.getFullYear();
day = today.getDate();

// month = today.getMonth();
// year = today.getFullYear();
var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];
var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// document.getElementById("demo").innerHTML = months[d.getMonth()];
document.getElementById("presentMonth").innerText=months[month] + " "+ year;

function calendar() {
    let display = `
    <thead class="thead-dark">
        <tr> `
        for(let i =0; i <days.length; i++) {
        display +=  `
        <th>
        ${days[i]}
        </th> `
        }
        `</tr>
    </thead>
    `
    display += `
        <tbody>
        `
        var a =0;
        var firstDay =  new Date(year, month, 1).getDay();
        var fullDay = new Date(year, month + 1, 0).getDate();
        while(a < fullDay) {
            display += 
            ` <tr> `
            for(let i =0; i <days.length; i++) {
                    display +=` <td class ="cell"> `
               if( firstDay === i || a > 0) {
                   display += `<a href="#" class="add-event" onclick="schedule(), displaySchedule()"><i class="fa fa-plus" aria-hidden="true"></i></a>`
                   if (a < fullDay) {
                        a++;
                    }
                    else {
                        break;
                    }
              display += `${a}`
               }
              
            }
            
           display += ` </td>`
        }
        `
        </tr>
        </tbody>
    `
    document.getElementById("table").innerHTML = display;
}

// document.getElementsByClassName("add-event").addEventListener("click", schedule);

    // get schedule from local storage
schedules = JSON.parse(localStorage.getItem("schedule"))
if(schedules == null){
    schedules = [];
}
// else {
//     schedules;
// }



function schedule() {
    let view = document.getElementById("schedule");
    view.style.display = "block";
}
function  addSchedule() {
    let view = document.getElementById("schedule");
    view.style.display = "none";
   
    newSchedule = {
        "eventName" : document.getElementById("event-name").value,
        "eventDate" : document.getElementById("event-date").value,
        "eventTime" : document.getElementById("event-time").value,
    }
    schedules.push(newSchedule);
    localStorage.setItem("schedule", JSON.stringify(schedules));
    displaySchedule();
    
}
function displaySchedule() {
    var list = `
    <thead>
            <tr>
            <th>S/N</th>
            <th>Event</th>
            <th> Date</th>
            <th> Time </th>
            </tr>
    </thead>
    `
    for(let i = 0; i < schedules.length; i++) {
        list += `
        <tbody>
            <tr> 
            <td> ${i + 1} </td>
            <td> ${schedules[i].eventName} </td>
            <td> ${schedules[i].eventDate} </td>
            <td> ${schedules[i].eventTime} </td>
        `
    }
    list += `
            </tr>
        </tbody> `
        list += `<button> ${"done"} </button>`
    document.getElementById("schedule-list").innerHTML = list;
}
// function hideScheduleList() {
//     let view = document.getElementById("schedule-list");
//     view.style.display = "none";
// }
calendar();



