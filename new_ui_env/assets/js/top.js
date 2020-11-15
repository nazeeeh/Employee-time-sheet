calendar = JSON.parse(localStorage.getItem("companyCalendar"));
schedule = JSON.parse(localStorage.getItem("schedule"));
todo = JSON.parse(localStorage.getItem("todoListBreakDown"));
// document.getElementById('cal-top-due')
document.getElementById('cal-top').innerHTML = calendar[0].eventName;
document.getElementById('cal-top-due').innerHTML = `Date: ${calendar[0].eventDate}`;

document.getElementById('eSchedule-event').innerHTML = schedule[0].eventName;
document.getElementById('eSchedule-event-due').innerHTML = `Date: ${schedule[0].eventDate}`;

document.getElementById('todo-event').innerHTML = todo[0].comment;
document.getElementById('todo-event-due').innerHTML = `Date: ${ todo[0].parentName}`;

// first equal the date and time to a variable
// then sort the calendar
// then come here and pick the top index

// let topCalDue = document.getElementById('cal-top-due').innerHTML;
// let topCalEvent = document.getElementById('cal-top').innerHTML;
// topCalEvent = calendar[0].eventName;
// // topCalDue = `Date: ${calendar[0].eventDate}`;
