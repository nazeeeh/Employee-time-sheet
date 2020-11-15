/* 
THIS SCRIPT 

  > Handles the employee local storage from the admin local storage

*/

// get the current logged in user from local storage
var _is_Login_Admin = JSON.parse(localStorage.getItem("current_AdminUser")) // object

// get access to all employee record in the company   
let _get_employee_record = _is_Login_Admin[0].employeeDb // string

// to get the database name in this format : companyName_employees
var _company_db_name = _is_Login_Admin[0].name // string

// parsed version of company record
let _parsed_employee_record = JSON.parse(_get_employee_record) // object

let _employee_localStorage = JSON.parse(localStorage.getItem(`${_company_db_name}_employees`))

// create local storage for company employee if deleted or not found
if (_employee_localStorage === null || _employee_localStorage === undefined)

{ // if company local storage does not exist create one 

    _employee_localStorage = []


/* function to display all record in the local storage */
let _render_record = () => {


    var employee_con = "";
    let serialNumber = 0;
    for (i = 0; i < _employee_localStorage.length; i++) {

        employee_con += `
    <tr id="${i}" draggable="true">
      <td>${serialNumber+=1}</td>
      <td onclick="_viewRecord(${i})"> <i class="fas fa-dot-circle status red-status"></i>${ _employee_localStorage[i].name}</td>
      <td>${ _employee_localStorage[i].department}</td>
      <td>${ _employee_localStorage[i].phone}</td>
      <td>${ _employee_localStorage[i].user_type}</td>
      <td>${ _employee_localStorage[i].joining_date} 
        <i class="fas fa-ellipsis-v more-icon popup" onclick="select(${i})">
        <span class="popuptext" id="myPopup${i}">
        <section class="small-popup">
        <a href="#" onClick="edit_form(${i})">Edit</a>
        <a href="#" onClick="deleteUser(${i})">Delete</a>
        </section>
        </span>
        </i>
        </td>
    </tr>
        `
    }

    document.getElementById("_record_board").innerHTML = employee_con;

}

_render_record()

// add new employee

function _add_employee() {

    new_email = document.getElementById("employee_email").value,
    new_name = document.getElementById("employee_name").value,
    new_role = document.getElementById("employee_role").value,
    new_phone = document.getElementById("employee_phone").value,
    assignedDepartment = document.getElementById("employee_department");
    assign_department = assignedDepartment.options[assignedDepartment.selectedIndex].value;
    userTypeOption = document.getElementById("employee_type");
    new_user_type = userTypeOption.options[userTypeOption.selectedIndex].value;
    // existingDepartment = JSON.parse(localStorage.getItem(assign_department))
    console.log(typeof(assign_department))
    console.log(assign_department)
    existingDepartment = JSON.parse(localStorage.getItem(`${assign_department}`))
    if (existingDepartment == null || existingDepartment == undefined) {
        existingDepartment = []
    }
    checkDuplicateUser = existingDepartment.find(x => x.name == new_email)

    // if(checkDuplicateUser !== undefined)
    // {

    //   document.getElementById("error_").innerHTML = `Email already registered for ${checkDuplicateUser} `

    // }
    // else
    // {

    // check for department
    let isExist_department = JSON.parse(localStorage.getItem(`${assign_department}`))

    if (JSON.parse(localStorage.getItem(`${assign_department}`)) === null || JSON.parse(localStorage.getItem(`${assign_department}`)) === undefined) {
        isExist_department = []
    }

    console.log("here " + isExist_department)
    is_employee_department = isExist_department.find(x => x.email == new_email)
    console.log(is_employee_department)
    console.log(new_email)
    if (is_employee_department !== undefined) {
        document.getElementById("error_").innerHTML = `${new_email} already exist `

    } else {


        let _employed_date = (employed_date) => {
            var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ];
            return month[employed_date.getMonth()] + " " + employed_date.getDate() + " " + employed_date.getFullYear();
        }


        if (!new_email || !new_name || !new_phone || !new_role || !new_user_type) {

            document.getElementById("error_").innerHTML = "Error - Form Cannot be blank"

        } else {

            switch (new_user_type) { // check which logo is selected
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


            samplel = {
                "name": "Sample Name",
                "salary": "12000",
                "Role": "Engineer",
            }

            // isExist_department.push(samplel)
            localStorage.setItem(`${assign_department}`, JSON.stringify(samplel))

            // new user info
            role = document.getElementById("employee_role").value,
                phone = document.getElementById("employee_phone").value,
                email = document.getElementById("employee_email").value;
            name = document.getElementById("employee_name").value;
            // create local storage for new users
            let employee_task = JSON.parse(localStorage.getItem(`${email}_task`))
            let allAssignedTasks = JSON.parse(localStorage.getItem(`${email}_AssignedTask`))
            let allUnassignedTasks = JSON.parse(localStorage.getItem(`${email}_UnassignedTask`))
            let allPendingTasks = JSON.parse(localStorage.getItem(`${email}_pendingTask`))
            let allCompletedTasks = JSON.parse(localStorage.getItem(`${email}_completedTask`))

            if (employee_task == null || employee_task == undefined) {
                employee_task = []
            }
            if (allAssignedTasks == null || allAssignedTasks == undefined) {
                allAssignedTasks = []
            }
            if (allUnassignedTasks == null || allUnassignedTasks == undefined) {
                allUnassignedTasks = []
            }
            if (allPendingTasks == null || allPendingTasks == undefined) {
                allPendingTasks = []
            }
            if (employee_task == null || employee_task == undefined) {
                employee_task = []
            }
            if (allCompletedTasks == null || allCompletedTasks == undefined) {
                allCompletedTasks = []
            }


            localStorage.setItem(`${email}_task`, JSON.stringify(employee_task))
            localStorage.setItem(`${email}_AssignedTask`, JSON.stringify(allAssignedTasks))
            localStorage.setItem(`${email}_UnassignedTask`, JSON.stringify(allUnassignedTasks))
            localStorage.setItem(`${email}_pendingTask`, JSON.stringify(allPendingTasks))
            localStorage.setItem(`${email}_completedTask`, JSON.stringify(allCompletedTasks))


            let newAdd = {
                "email": email,
                "name": name,
                "role": role,
                "address": "",
                "state": "",
                "country": "",
                "phone": phone,
                "joining_date": _employed_date(new Date()),
                "department": assign_department,
                "user_type": new_user_type,
                "password": "7444",
                "status": "Active",
                "salary": "120000",
                "currency": "Naira",
                "task": employee_task, // local storage for new user task
                "assignedTask": allAssignedTasks, // local storage for Assigned tasks
                "unassignedTasks": allUnassignedTasks,
                "pendingTasks": allPendingTasks,
                "completedTasks": allCompletedTasks
            }



            isExist_department.push(newAdd)
            localStorage.setItem(`${assign_department}`, JSON.stringify(isExist_department))
                // var _employee_department = JSON.parse(localStorage.getItem(`${companyName}_department`));
                // localStorage.setItem(`${companyName}_department`, JSON.stringify(isExist_department))

            document.getElementById("error_").innerHTML = `${newAdd.name} created successfully`

            document.getElementById("employee_email").value = "";
            document.getElementById("employee_name").value = "";
            document.getElementById("employee_role").value = "";
            document.getElementById("employee_phone").value = "";
            document.getElementById("employee_department").value = "";
            document.getElementById("employee_type").value = "";

            _employee_localStorage.push(newAdd);
            localStorage.setItem(`${_company_db_name}_employees`, JSON.stringify(_employee_localStorage))
            _render_record()

        }
    }

}




// search function

let _search_employee = () => {
    _look_for = document.getElementById("_search_param").value;
    // do not use let, for or var returns reference error for _employee_localStorage


    _employee_localStorage = _employee_localStorage.filter(_finder_ => _finder_.department.toUpperCase() == _look_for.toUpperCase());

    if (_employee_localStorage.length <= 1) {

        document.getElementById("_lookup_result").innerHTML = `${_employee_localStorage.length} Record Found <a  class="to-btn btn-deep" onclick="reload_board()">Ok</a>`;
        _render_record()

    } else {

        document.getElementById("_lookup_result").innerHTML = `${_employee_localStorage.length} Records Found <a  class="to-btn" onclick="reload_board()">Ok</a>`;
        _render_record()
    }
}


// reload after search

let reload_board = () => {

    location.reload()

}


//  pop up form control


function add_form() {

    form = document.getElementById("employ_form");
    form.style.display = "flex";

}

function close_form() {
    document.getElementById("employ_form").style.display = "none";
}

//  edit user

function edit_form(x) {

    form = document.getElementById("edit_form");
    form.style.display = "flex";
    _editRecord(x)

}

function close_editForm() {
    document.getElementById("edit_form").style.display = "none";
}

let _editRecord = (employee_id) => {

        recordToUpdate = _employee_localStorage[employee_id]
        console.log(recordToUpdate)
        document.getElementById("update_email").value = recordToUpdate.email
        document.getElementById("update_name").value = recordToUpdate.name
            // document.getElementById("update_type").value = recordToUpdate.user_type
            // document.getElementById("update_role").value = recordToUpdate.role
            // document.getElementById("update_phone").value = recordToUpdate.phone
            // document.getElementById("update_department").value = recordToUpdate.department
        assignedDepartment = document.getElementById("employee_department");
        assignedDepartment.options[assignedDepartment.selectedIndex].value = recordToUpdate.department;
        userTypeOption = document.getElementById("employee_type");
        new_user_type = userTypeOption.options[userTypeOption.selectedIndex].value;
        restrict_join_date = recordToUpdate.joining_date
        document.getElementById("identifier").value = employee_id
    }
    // let resetPassword = (employee_id) => {
    //     employee_id = document.getElementById("identifier").value;
    //     updatedRecord = {

//         "password": "employee"

//     }
//     _employee_localStorage[employee_id].password = "employee"
//     localStorage.setItem(`${_company_db_name}_employees`, JSON.stringify(_employee_localStorage))
//     _render_record()
//         // location.reload()
// }

let updatedRecord = () => { // function to collate and store new updated details
    employee_id = document.getElementById("identifier").value;
    updatedRecord = {

        "email": document.getElementById("update_email").value,
        "name": document.getElementById("update_name").value,
        "user_type": document.getElementById("update_type").value,
        "role": document.getElementById("update_role").value,
        "joining_date": restrict_join_date, // you can't change the joining date
        "phone": document.getElementById("update_phone").value,
        "department": document.getElementById("update_department").value

    }
    _employee_localStorage[employee_id] = updatedRecord
    localStorage.setItem(`${_company_db_name}_employees`, JSON.stringify(_employee_localStorage))
    _render_record()
    location.reload()
}

let deleteUser = (user_id) =>

    {
        swal({
                title: "Are you sure?",
                text: `Once deleted, you will not be able to recover this user! ${_employee_localStorage[user_id].name.toUpperCase()}`,
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    swal(`Poof! ${_employee_localStorage[user_id].name.toUpperCase()} Deleted!`, {
                        icon: "success",
                    });
                    _employee_localStorage.splice(user_id, 1)
                    localStorage.setItem(`${_company_db_name}_employees`, JSON.stringify(_employee_localStorage))
                    _render_record()
                } else {
                    swal("User restored!");
                }
            });
    }




let _viewRecord = (employee_id) => {

    document.getElementById("view-container").style.display = "block"
    recordToUpdate = _employee_localStorage[employee_id]
    document.getElementById("view_name").innerHTML = recordToUpdate.name
    document.getElementById("department").innerHTML = recordToUpdate.department
    document.getElementById("role").innerHTML = recordToUpdate.role
    document.getElementById("salary").innerHTML = recordToUpdate.salary
    document.getElementById("email").innerHTML = recordToUpdate.email
    document.getElementById("tel").innerHTML = recordToUpdate.phone
    restrict_join_date = recordToUpdate.joining_date
    document.getElementById("identifier").value = employee_id


}}