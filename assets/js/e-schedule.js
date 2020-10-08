
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
    display = `
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
// firstDay = new Date(year, month, 0).getDate();
// alert(firstDay)
// alert(day)
calendar();


