// get the current logged in user from local storage
var _is_Login_Admin = JSON.parse(localStorage.getItem("currentUser")) // object

// get access to all employee record in the company   
let _get_employee_record = _is_Login_Admin[0].employeeDb // string

// to get the data base name in this format : companyName_employees
var _company_db_name = _is_Login_Admin[0].name // string

// parsed version of company record
let _parsed_employee_record = JSON.parse(_get_employee_record) // object


let _employee_localStorage = JSON.parse(localStorage.getItem(`${_company_db_name}_employees`))


/* function to display all record in the local storage */
let _render_record = () => 
{
  console.log("heheheh")
  var employee_con = "";
  let serialNumber = 0;
  for (i = 0; i <  _employee_localStorage.length; i++)
  {
  
    employee_con += `
    <tr>
      <td>${serialNumber+=1}</td>
      <td> <i class="fas fa-dot-circle status red-status"></i>${ _employee_localStorage[i].name}</td>
      <td>${ _employee_localStorage[i].role}</td>
      <td>090879988383</td>
      <td>Aug 12, 2020 <i class="fas fa-ellipsis-v more-icon"></i></td>
    </tr>
    `
  }

  document.getElementById("_record_board").innerHTML = employee_con;

}

_render_record()

// add new employee

let add = () =>
{
  let newAdd = {
    "name" : prompt("Enter Name"),
    "role" : prompt("Enter role"),
    "complain" : prompt("Enter Complain")
  }
  alert( _employee_localStorage)
   _employee_localStorage.push(newAdd);
  localStorage.setItem(`${_db_name}_employees`, JSON.stringify( _employee_localStorage))
  _render_record()
}


// sea