/* 
THIS SCRIPT Utilizes local storage to calculate bill or payable amount for the month.
*/

// get the current logged in AdminUser from local storage
var _is_Login_Admin = JSON.parse(localStorage.getItem("current_AdminUser")) // object

// get access to all employee record in the company   
let _get_employee_record = _is_Login_Admin[0].employeeDb // string

// to get the data base name in this format : companyName_employees
var _company_db_name = _is_Login_Admin[0].name // string

// parsed version of company record
let _parsed_employee_record = JSON.parse(_get_employee_record) // object


let _employee_localStorage = JSON.parse(localStorage.getItem(`${_company_db_name}_employees`))

// create local storage for company employee if deleted or not found
if (_employee_localStorage === null || _employee_localStorage === undefined) { // if company local storage does not exist create one 

    _employee_localStorage = []

}
/* function to display all record in the local storage */
var worked_hour = [];
var salary = [];

let _render_record = () => {
    for (var i = 0; i < _employee_localStorage.length; i++) {
        employeeTime = JSON.parse(localStorage.getItem(`${_employee_localStorage[i].name}_time`));
        var totalHour = 0,
            totalMin = 0,
            totalSec = 0;
        if (employeeTime == null) {
            employeeTime == [];
        } else {
            for (var j = 0; j < employeeTime.length; j++) {
                totalHour += employeeTime[j].hour;
                totalMin += employeeTime[j].minute;
                totalSec += employeeTime[j].second;
            }
        }
        var totalTime = Math.round((totalHour + (totalMin / 60) + (totalSec / 3600)) * 10) / 10;
        worked_hour.push(Math.round(totalTime));
    }

    var employee_con = "";
    //   let serialNumber = 0;
    for (i = 0; i < _employee_localStorage.length; i++) {

        salary.push(_employee_localStorage[i].salary);
        employee_con += `
    <tr id="${i}" draggable="true">
      <td>${i+1}</td>
      <td> <i class="fas fa-dot-circle status red-status"></i>${name}</td>
      <td>${ _employee_localStorage[i].role}</td>
      <td>${worked_hour[i]}</td>
      <td>${ _employee_localStorage[i].salary}</td>
      <td>${ _employee_localStorage[i].salary}</td>
</tr>
    `

    }

    document.getElementById("_billing_board").innerHTML = employee_con;

}

_render_record();

let reload_board = () => {

    location.reload()

}

// function getArbitraryNum(min, max) {
//     var init = Math.random()*(max-min) + min;
//     return Math.floor(init);
// }

function calculateSalary() {
    var expected_hour = document.getElementById("expected-hour").value;

    var receivable_pay = [];
    if (expected_hour == "") {
        swal("Empty Input", "Kindly input an Expected Value to Calculate", "warning");

    } else {
        for (var i = 0; i < worked_hour.length; i++) {
            receivable_pay_val = (worked_hour[i] * salary[i]) / expected_hour;
            receivable_pay.push(Math.round(receivable_pay_val));
        }

        var employee_con = "";
        for (i = 0; i < _employee_localStorage.length; i++) {
            employee_con += `
        <tr id="${i}" draggable="true">
          <td>${i+1}</td>
          <td> <i class="fas fa-dot-circle status red-status"></i>${ _employee_localStorage[i].name}</td>
          <td>${ _employee_localStorage[i].role}</td>
          <td>${ _employee_localStorage[i].salary}</td>
          <td>${worked_hour[i]}</td>
          <td>${receivable_pay[i]}</td>
        </tr>
        `
        }

        document.getElementById("_billing_board").innerHTML = employee_con;
    }
}