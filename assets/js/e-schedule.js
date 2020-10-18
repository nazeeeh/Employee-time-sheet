
var today = new Date();
console.log("today" +" "+ today)
var month = today.getMonth();
var year = today.getFullYear();
var day = today.getDate();
console.log("day" +" "+ day)
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
    <thead class="thead-dark cell">
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
        var fullDay = new Date(year, month +1, 0).getDate();
        console.log("firstday:" + " "+ firstDay);
        console.log("fullday:" + " "+ fullDay);
        while(a < fullDay) {
            display += 
            ` <tr> `
            for(let i =0; i <days.length; i++) {
                    display +=` <td class ="cell"> `
                    
               if( firstDay === i || a > 0) {
                   display += 
                   `<a href="#" class="add-event" data-toggle="modal" data-target="#schedule">
                   <i class="fa fa-plus" aria-hidden="true"></i></a>`
                   if (a < fullDay) {
                        a++;
                    }
                    else {
                        break;
                    }
                    document.getElementById("event-date").value =`${a}`;
              display += `${a}`
              
               }
            
            }
            
           display += ` </td>`
        }
        
        display +=
        `
        </tr>
        </tbody>
    `
    // document.getElementById("event-date").value =`${a}`;
    document.getElementById("table").innerHTML = display;
}


    // get schedule from local storage
schedules = JSON.parse(localStorage.getItem("schedule"))
if(schedules == null){
    schedules = [];
}


// function schedule() {
//     let view = document.getElementById("schedule");
//     view.style.display = "block";
// }

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

function delSchedule(id) {
    check= confirm(`delete event ${schedules[id].eventName}?`);
    if(check){
        schedules.splice(id,1);
        localStorage.setItem("schedule", JSON.stringify(schedules));
        displaySchedule();
    }
     
}

function displaySchedule() {
    var list = `
   
    <thead class="thead-dark">
            <tr>
            <th>S/N</th>
            <th>Event</th>
            <th> Date</th>
            <th> Time </th>
            <th> del </th>
            </tr>
    </thead>
    <tbody>
    `
    for(let i = 0; i < schedules.length; i++) {
        list += `
            <tr> 
            <td> ${i + 1} </td>
            <td> ${schedules[i].eventName} </td>
            <td> ${schedules[i].eventDate} </td>
            <td> ${schedules[i].eventTime} </td>
            <td> <a href="#" onclick="delSchedule(${[i]})" style=" color:red"><i class="fas fa-circle"></i></a> </td>
           
        `
    }
    list += `
            </tr>
        </tbody> `
    document.getElementById("schedule-list").innerHTML = list;
}

calendar();

{/* <button> &times; </button> */}