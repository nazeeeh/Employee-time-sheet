/* 
THIS SCRIPT 

  > Handles the employee local storage from the admin local storage

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
let _render_record = () => 
{


  var employee_con = "";
  let serialNumber = 0;
  for (i = 0; i <  _employee_localStorage.length; i++)
  {
  
    employee_con += `
    <tr id="${i}" draggable="true">
      <td>${serialNumber+=1}</td>
      <td> <i class="fas fa-dot-circle status red-status"></i>${ _employee_localStorage[i].name}</td>
      <td>${ _employee_localStorage[i].department}</td>
      <td>${ _employee_localStorage[i].phone}</td>
      <td>${ _employee_localStorage[i].user_type}</td>
      <td>${ _employee_localStorage[i].joining_date} 
        <i class="fas fa-ellipsis-v more-icon" onclick="edit_form(${i})"></i>
      </td>
    </tr>
    `
  }

  document.getElementById("_record_board").innerHTML = employee_con;

}

_render_record()

// add new employee

// let _add_employee = () =>
function _add_employee(){


  new_email = document.getElementById("employee_email").value,
  new_name = document.getElementById("employee_name").value,
  new_role = document.getElementById("employee_role").value,
  new_phone = document.getElementById("employee_phone").value,
  assign_department = document.getElementById("employee_department").value,
  new_user_type = document.getElementById("employee_type").value
  let _employed_date = (employed_date) => 
  {
    var month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",];
    return month[employed_date.getMonth()]+" "+employed_date.getDate()+" "+employed_date.getFullYear();
  }


  if(!new_email || !new_name || !new_phone || !new_role || !new_user_type)
  {

    document.getElementById("error_").innerHTML = "Error - Form Cannot be blank"

  }
   else 
  {

    switch(new_user_type)
    {// check which logo is selected
  
      case "443":
        new_user_type = "Co-Admin";
        break;
  
      case "332":
        new_user_type = "Internal-Admin";
        break;
  
      case "554":
        new_user_type = "Employee";
        break;

      default:
        new_user_type = "Others"
    }
  
    _employee_email = document.getElementById("employee_email").value;
    _employee_name = document.getElementById("employee_name").value;
    _employee_role = document.getElementById("employee_role").value;
    _employee_phone = document.getElementById("employee_phone").value;
    // check for department
    let isExist_department = JSON.parse(localStorage.getItem(`${assign_department}`))
    if (isExist_department === null|| isExist_department === undefined)
    {
      isExist_department = []
    }
    console.log("here"+ isExist_department.name)
    if(is_employee_department = isExist_department.find(x=> x.email == _employee_email))
    {
      
      document.getElementById("error_").innerHTML = `${_employee_email} already exist `
      
    } 
    samplel = 
    {
      "name" : "Sample Name",  
      "salary" : "12000",  
      "Role" : "Engineer",  
    }
  
    // isExist_department.push(samplel)
   localStorage.setItem(`${assign_department}`, JSON.stringify(samplel))

    let newAdd = {
      "email" : document.getElementById("employee_email").value,
      "name" : document.getElementById("employee_name").value,
      "role" : document.getElementById("employee_role").value,
      "phone" : document.getElementById("employee_phone").value,
      "joining_date" : _employed_date(new Date()),
      "department": assign_department,
      "user_type" : new_user_type,
      "password" : "7444",
      "status" : "Active",
      "salary":"120000",
      "currency":"Naira",
    }



    isExist_department.push(newAdd)
    localStorage.setItem(`${assign_department}`, JSON.stringify(isExist_department))

    document.getElementById("error_").innerHTML = `${newAdd.name} created successfully`
    
    _employee_localStorage.push(newAdd);
    localStorage.setItem(`${_company_db_name}_employees`, JSON.stringify(_employee_localStorage))
    _render_record()

  }
}


// search function

let _search_employee = () =>
{
  _look_for = document.getElementById("_search_param").value;
  // do not use let, for or var returns reference error for _employee_localStorage

  // 99999999999999 set option like drop down to collect which type of seacrch
  _employee_localStorage = _employee_localStorage.filter( _finder_ => _finder_.department == _look_for);
  
  if(_employee_localStorage.length <= 1)
  {
    
    document.getElementById("_lookup_result").innerHTML = `${_employee_localStorage.length} Record Found <a  class="to-btn btn-deep" onclick="reload_board()">Ok</a>`;
    _render_record()
    
  }
  else
  {

    document.getElementById("_lookup_result").innerHTML = `${_employee_localStorage.length} Records Found <a  class="to-btn" onclick="reload_board()">Ok</a>`;
    _render_record()
  }
}


// reload after search

let reload_board = () =>
{

  location.reload()

}


//  pop up form control


function add_form(){

  form = document.getElementById("employ_form");
  form.style.display = "flex";
  
}
function close_form(){
  document.getElementById("employ_form").style.display = "none";
}

// close form when user click outside the form
// var form = document.getElementById("employ_form");
// window.onclick = function(event) {
//   if (event.target == form ) {// or use employ_form
//     form.style.display = "none";
//   }
// }

//  edit user

function edit_form(x){

  form = document.getElementById("edit_form");
  form.style.display = "flex";
  _editRecord(x)
  
}

function close_editForm(){
  document.getElementById("edit_form").style.display = "none";
}

let _editRecord = (employee_id) =>
{

  recordToUpdate = _employee_localStorage[employee_id]
  document.getElementById("update_email").value = recordToUpdate.email 
  document.getElementById("update_name").value = recordToUpdate.name
  document.getElementById("update_type").value = recordToUpdate.user_type
  document.getElementById("update_role").value = recordToUpdate.role
  document.getElementById("update_phone").value = recordToUpdate.phone
  restrict_join_date = recordToUpdate.joining_date
  document.getElementById("identifier").value = employee_id


}
let updatedRecord = () =>
{ // function to collate and store new updated details
  employee_id = document.getElementById("identifier").value;
  updatedRecord = {

    "email" : document.getElementById("update_email").value,
    "name" : document.getElementById("update_name").value,
    "user_type" : document.getElementById("update_type").value,
    "role" : document.getElementById("update_role").value,
    "joining_date" : restrict_join_date,
    "phone" : document.getElementById("update_phone").value,

  }
  _employee_localStorage[employee_id] = updatedRecord
  localStorage.setItem(`${_company_db_name}_employees`, JSON.stringify(_employee_localStorage))
  _render_record()
  location.reload()
}