// get the current logged in user from local storage
var _is_Login_Admin = JSON.parse(localStorage.getItem("currentUser")) // object

// get access to all employee record in the company   
let _get_employee_record = _is_Login_Admin[0].employeeDb // string

// to get the data base name in this format : companyName_employees
var _company_db_name = _is_Login_Admin[0].name // string

// parsed version of company record
let _parsed_employee_record = JSON.parse(_get_employee_record) // object


let this_is_it = JSON.parse(localStorage.getItem(`${_company_db_name}_employees`))


/* function to display all record in the local storage */
let show = () => 
{
  console.log("heheheh")
  var employee_con = "";
  for (i = 0; i < this_is_it.length; i++)
  {
    employee_con += `
      <strong>${this_is_it[i].name}</strong>
      <strong>${this_is_it[i].role}</strong>
      <strong>${this_is_it[i].complain}</strong>
    `
  }
  document.getElementById("show").innerHTML = employee_con;

}

show()


let add = () =>
{
  let newAdd = {
    "name" : prompt("Enter Name"),
    "role" : prompt("Enter role"),
    "complain" : prompt("Enter Complain")
  }
  alert(this_is_it)
  this_is_it.push(newAdd);
  localStorage.setItem(`${_db_name}_employees`, JSON.stringify(this_is_it))
  show()
}