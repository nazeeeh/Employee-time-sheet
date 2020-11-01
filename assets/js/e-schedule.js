
var today = new Date();
var month = today.getMonth();
var year = today.getFullYear();
var months = [
    "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov", "Dec",
];

var weekDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] ;
var firstDay =  new Date(year, month, 1).getDay();
var fullDate = new Date(year, month+1, 0).getDate();


function calendar() {
    let presentMonth =  months[month] + " " + year;
    document.getElementById("presentMonth").innerHTML = presentMonth;
    
    let display = "";
    display +=
    ` <thead class = "thead-dark cell"> <tr> `
    let date = 0;
        for(let i = 0; i < weekDay.length; i++) {
            display +=  
            ` <th>${weekDay[i]}</th> `
            // console.log(weekDay[today.getDay()]) use this in selecting current day.
        }
        display += `<tbody>`

        // for(let i = 0; i < weekDay.length; i++)
        console.log("fullDate is "+fullDate)
        
        while(date < fullDate) {
            display += `<tr>`
            for(let i = 0; i < weekDay.length; i++) {
               
                if(date == today.getDate()-1){
                    display += `<td class ="cell today " onclick ="dateValue(event)" data-toggle="modal" data-target="#schedule">`
                }
                else{
                    display += `<td class ="cell" onclick ="dateValue(event)" data-toggle="modal" data-target="#schedule">`
                }
                
                if(firstDay === i || date > 0) {
                    
                    if (date < fullDate) {
                        date++;
                    }
                    else {
                        break;
                    }
                    
                    display += `${date}`
                } 
            }
        }

        display += ` </tr> </tbody> `
    
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
            <td> <a href="#" onclick="delSchedule(${[i]})" style=" color:red"><i class="fas fa-trash"></i></a> </td>  
        `
    }
    list += `</tr> </tbody> `
    
    document.getElementById("schedule-list").innerHTML = list;
}

function dateValue(e){
    // first checks if month is less than 10 
    // then append 0 to it, in order to display the month in the right format
   
    e = e.currentTarget.innerHTML;
    monthValue = month;
    
    if(monthValue < 10) {
        monthValue = "0"+ month;
    }
    
    if(e < 10) {
       e = "0"+ e;
    }
    
    eventDate = year + "-" + monthValue + "-" + e;
    
    document.getElementById("event-date").value = eventDate;
    console.log(eventDate)
}


calendar();

{/* <button> &times; </button> */}