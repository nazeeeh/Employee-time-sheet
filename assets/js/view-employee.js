/* 
THIS SCRIPT 

  > Handles the employee local storage from the admin local storage

*/



// get the current logged in user from local storage
var _is_Login_Internal = JSON.parse(localStorage.getItem("current_InternalUser")) // object

// get access to all employee record in the company   
let _get_employee_record = _is_Login_Internal[0].department // string

console.log(_get_employee_record)

let db = JSON.parse(localStorage.getItem(_get_employee_record))
console.log(db)

/* function to display all record in the local storage */
let _render_record = () => 
{


  var employee_con = "";
  let serialNumber = 0;
  for (i = 0; i <  db.length; i++)
  {
  
    employee_con += `
    <tr id="${i}" draggable="true">
      <td>${serialNumber+=1}</td>
      <td onclick="_viewRecord(${i})"> <i class="fas fa-dot-circle status red-status"></i>${ db[i].name}</td>
      <td>${ db[i].department}</td>
      <td>${ db[i].phone}</td>
      <td>${ db[i].user_type}</td>
      <td>${ db[i].joining_date} 
        <i class="fas fa-ellipsis-v more-icon" onclick="edit_form(${i})"></i>
      </td>
    </tr>
    `
  }

  document.getElementById("_record_board").innerHTML = employee_con;

}


_render_record()




let _viewRecord = (employee_id) =>
{

  document.getElementById("view-container").style.display= "block"
  recordToUpdate = db[employee_id]
  document.getElementById("view_name").innerHTML = recordToUpdate.name 
  document.getElementById("department").innerHTML = recordToUpdate.department 
  document.getElementById("role").innerHTML = recordToUpdate.role
  document.getElementById("salary").innerHTML = recordToUpdate.salary
  document.getElementById("email").innerHTML = recordToUpdate.email
  document.getElementById("tel").innerHTML = recordToUpdate.phone
  restrict_join_date = recordToUpdate.joining_date
  document.getElementById("identifier").value = employee_id


}



