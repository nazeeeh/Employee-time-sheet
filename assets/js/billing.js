/* 
THIS SCRIPT 
Utilizes the employee local storage from the admin local storage to calculate bill or payable amount for the month.
*/

// get the current logged in user from local storage
var _is_Login_Admin = JSON.parse(localStorage.getItem("currentUser")) // object

// get access to all employee record in the company   
let _get_employee_record = _is_Login_Admin[0].employeeDb // string

// to get the data base name in this format : companyName_employees
var _company_db_name = _is_Login_Admin[0].name // string





// parsed version of company record
let _parsed_employee_record = JSON.parse(_get_employee_record) // object


let _employee_localStorage = JSON.parse(localStorage.getItem(`${_company_db_name}_employees`))

// create local storage for company employee if deleted or not found
if(_employee_localStorage === null || _employee_localStorage === undefined) 
{// if company local storage does not exist create one 
  
_employee_localStorage = []
  
}
/* function to display all record in the local storage */
var worked_hour = [];
var salary = [];

let _render_record = () => 
{

  var employee_con = "";
//   let serialNumber = 0;
  for (i = 0; i <  _employee_localStorage.length; i++)
  {
  
    var worked_hour_val = getArbitraryNum(140,160);
    worked_hour.push(worked_hour_val);
    var salary_val = getArbitraryNum(120,500)*1000;
    salary.push(salary_val);
    employee_con += `
    <tr id="${i}" draggable="true">
      <td>${i+1}</td>
      <td> <i class="fas fa-dot-circle status red-status"></i>${ _employee_localStorage[i].name}</td>
      <td>${ _employee_localStorage[i].role}</td>
      <td>${salary_val}</td>
      <td>${worked_hour_val}</td>
    </tr>
    `

  }

  document.getElementById("_billing_board").innerHTML = employee_con;

}

_render_record();

// search function

// let _search_employee = () =>
// {
//   _look_for = document.getElementById("_search_param").value;
//   // do not use let, for or var returns reference error for _employee_localStorage

//   // 99999999999999 set option like drop down to collect which type of seacrch

//   _employee_localStorage = _employee_localStorage.filter( _finder_ => _finder_.name.toLowerCase() == _look_for);
  
//   if(_employee_localStorage.length <= 1)
//   {
//     document.getElementById("_lookup_result").innerHTML = `${_employee_localStorage.length} Record Found <a  class="to-btn btn-deep" onclick="reload_board()">Ok</a>`;
//     _render_record();
//   }
//   else
//   {

//     document.getElementById("_lookup_result").innerHTML = `${_employee_localStorage.length} Records Found <a  class="to-btn" onclick="reload_board()">Ok</a>`;
//     _render_record()
//   }
// }


// reload after search

let reload_board = () =>
{

  location.reload()

}

function getArbitraryNum(min, max) {
    var init = Math.random()*(max-min) + min;
    return Math.floor(init);
}

function calculateSalary(){
    var expected_hour = document.getElementById("expected-hour").value;

    var receivable_pay = [];
    if (expected_hour == "") { 
        alert("Kindly input an Expected Value to Calculate");     
    
    } else {
            for (var i = 0; i < worked_hour.length; i++) {
                receivable_pay_val = (worked_hour[i] * salary[i]) / expected_hour;
                receivable_pay.push(Math.round(receivable_pay_val));
            }
            var employee_con = "";
                for (i = 0; i <  _employee_localStorage.length; i++) {
                employee_con += `
                <tr id="${i}" draggable="true">
                  <td>${i+1}</td>
                  <td> <i class="fas fa-dot-circle status red-status"></i>${ _employee_localStorage[i].name}</td>
                  <td>${ _employee_localStorage[i].role}</td>
                  <td>${salary[i]}</td>
                  <td>${worked_hour[i]}</td>
                  <td>${receivable_pay[i]}</td>
                </tr>
                `
              }
            
              document.getElementById("_billing_board").innerHTML = employee_con;
        }
}
