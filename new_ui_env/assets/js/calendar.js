
var today = new Date();
var month = today.getMonth();
var year = today.getFullYear();
var months = [
    "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov", "Dec",
];

var weekDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] ;
var firstDay =  new Date(year, month, 1).getDay();
var fullDate = new Date(year, month+1, 0).getDate();


function cal() {
    let presentMonth =  months[month] + " " + year;
    document.getElementById("presentMonth").innerHTML = presentMonth;
    
    let display = "";
    display +=
    ` <thead class = "pace-thead"> <tr> `
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
calendar = JSON.parse(localStorage.getItem("companyCalendar"))
if(calendar == null){
    calendar = [];
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
    calendar.push(newSchedule);
    localStorage.setItem("companyCalendar", JSON.stringify(calendar));
    displaySchedule();
    
}

function delSchedule(id) {
    check= confirm(`delete event ${calendar[id].eventName}?`);
    if(check){
        calendar.splice(id,1);
        localStorage.setItem("companyCalendar", JSON.stringify(calendar));
        displaySchedule();
    }
     
}

function displaySchedule() {
    var list = `
   
    <thead class="pace-thead">
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
    for(let i = 0; i < calendar.length; i++) {
        list += `
            <tr> 
            <td> ${i + 1} </td>
            <td> ${calendar[i].eventName} </td>
            <td> ${calendar[i].eventDate} </td>
            <td> ${calendar[i].eventTime} </td>
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
    monthValue = month + 1;
    
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



let isLoggedInEmployee = JSON.parse(localStorage.getItem("current_EmployeeUser"));
if(isLoggedInEmployee) {
    displaySchedule()
}


// let sortedCalendar = calendar.slice().sort.(( (a, b) => 
// {new Date( a.date) - new Date(b.date)}
// ));
// // let sortedCalendar = calendar.sort(( a, b => a - b));
// console.log("sorted", sortedCalendar)

// for(let i = 0; i <  paceDB.length; i++) {
//     let calUserType = document.getElementById('cal-user-type');
//     // let brand = document.getElementsByClassName('navbar-brand');
//     // brand.innerText = paceDB[i].name;
//     let companyName = paceDB[i].name
//     let userType = JSON.parse(localStorage.getItem(`${companyName}_employees`))
//     // alert(companyName)
//     console.log("userType",userType)
//     if(userType[i].user_type === "Employee") {
//         calUserType.style.display = "none";
//         console.log("activerrr",  userType[i].user_type)
//        alert(  userType[i].user_type)
//     }
// }


cal();

{/* <button> &times; </button> */}