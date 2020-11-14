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

}
/* function to display all record in the local storage */
let renderRecord = () => {


    var employee_con = "";
    let serialNumber = 0;
    for (i = 0; i < _employee_localStorage.length; i++) {

        employee_con += `
        <tr>
        <th scope="row">${serialNumber+=1} <i class="fas fa-edit edit-btn" data-toggle="modal" data-target="#editEmployeeRecord" onclick="editEmployeeRecord(${i})"></i></th>
        <td id="${i}" draggable="true" data-toggle="modal" data-target="#profileDisplayForm" onclick="_viewRecord(${i})" class="view-profile">${_employee_localStorage[i].firstName}</td>
        <td>${_employee_localStorage[i].secondName}</td>
        <td>${_employee_localStorage[i].phone}</td>
        <td>${_employee_localStorage[i].department}</td>
        <td>${_employee_localStorage[i].role}</td>
        <td>${_employee_localStorage[i].joining_date}</td>
    </tr>
        `
    }

    document.getElementById("employeeList").innerHTML = employee_con;

}

renderRecord()

// add new employee

function addEmployee() {

    new_email = document.getElementById("employee_email").value,
    new_name = document.getElementById("employee_name").value,
    secondName = document.getElementById("secondName").value,
    address1 = document.getElementById("inputAddress1").value,
    address2 = document.getElementById("inputAddress2").value,
    city = document.getElementById("inputCity").value,
    state = document.getElementById("inputState").value,
    password = document.getElementById("password").value,
    salary = document.getElementById("salary").value,
    cpassword = document.getElementById("cPassword").value,
    assign_role = document.getElementById("employee_role");
    new_role = assign_role.options[assign_role.selectedIndex].value;
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
        // document.getElementById("error_").innerHTML = `${new_email} already exist `
        swal({
            text: "Email already exist!",
            button: "okay",
            icon: "warning"
          });

    } else {


        let _employed_date = (employed_date) => {
            var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ];
            return month[employed_date.getMonth()] + " " + employed_date.getDate() + " " + employed_date.getFullYear();
        }


        if (!new_email || !new_name || !new_phone || !new_role || !new_user_type) {

            // document.getElementById("error_").innerHTML = "Error - Form Cannot be blank"
            // swal{
            //     "text" = "form cannot be blank"
            // }

            // alert("form cannot be blank")
            swal({
                text: "Form cannot be blank!",
                button: "okay",
                icon: "warning"
              });

        } else if(password !== cpassword){
            swal({
                text: "Password Mismatch!",
                button: "okay",
                icon: "warning"
              });

        } else if(password.length <= 6){
            swal({
                text: "Weak Password!",
                button: "okay",
                icon: "warning"
              });

        } else if(assign_department === "blank" || new_user_type === "blank" || new_role === "blank"){
            swal({
                text: "Role, Department and User Type are Required!",
                button: "okay",
                icon: "warning"
              });
            }
            else {
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
                "firstName": name,
                "secondName": secondName,
                "role": role,
                "address1": address1,
                "address2": address2,
                "city": city,
                "state": state,
                "country": "",
                "phone": phone,
                "joining_date": _employed_date(new Date()),
                "department": assign_department,
                "user_type": new_user_type,
                "password": password,
                "status": "Active",
                "salary": salary,
                "currency": "Naira",
                "task": employee_task, // local storage for new user task
                "assignedTask": allAssignedTasks, // local storage for Assigned tasks
                "unassignedTasks": allUnassignedTasks,
                "pendingTasks": allPendingTasks,
                "completedTasks": allCompletedTasks,
                "accessToCompanyDB": _company_db_name
            }



            isExist_department.push(newAdd)
            localStorage.setItem(`${assign_department}`, JSON.stringify(isExist_department))
                // var _employee_department = JSON.parse(localStorage.getItem(`${companyName}_department`));
                // localStorage.setItem(`${companyName}_department`, JSON.stringify(isExist_department))

            // document.getElementById("error_").innerHTML = `${newAdd.name} created successfully`
            swal({
                text: "Employed!",
                button: "okay",
                icon: "success"
              });

            document.getElementById("employee_email").value = "";
            document.getElementById("employee_name").value = "";
            document.getElementById("employee_role").value = "";
            document.getElementById("employee_phone").value = "";
            document.getElementById("employee_department").value = "";
            document.getElementById("password").value = "";
            document.getElementById("cPassword").value = "";
            document.getElementById("employee_type").value = "";

            _employee_localStorage.push(newAdd);
            localStorage.setItem(`${_company_db_name}_employees`, JSON.stringify(_employee_localStorage))
            renderRecord()

        }
    }

}




// search function
let searchBtn = document.getElementById("searchEmployeeBtn");
searchBtn.addEventListener("click", searchEmployee)
function searchEmployee(searchForm){
    searchForm.preventDefault()
    searchFor = document.getElementById("searchParam").value;
    // do not use let, for or var returns reference error for _employee_localStorage

    _employee_localStorage = _employee_localStorage.filter(_finder_ => _finder_.department.toUpperCase() == searchFor.toUpperCase());

    if (_employee_localStorage.length <= 1) {
        document.getElementById("searchResponse").innerHTML = `${_employee_localStorage.length} Record Found <a  class="btn pace-bg-accent text-white mr-auto" onclick="reload_board()">Ok</a>`;
        renderRecord()

    } else {

        document.getElementById("searchResponse").innerHTML = `${_employee_localStorage.length} Records Found <a  class="to-btn pace-bg-accent" onclick="reload_board()">Ok</a>`;
        renderRecord()
    }
}


// reload after search

let reload_board = () => {

    location.reload()

}
// const btn = document.getElementById('showPassword').addEventListener('checked', showPassword())
//  edit employee details
function showPassword(){
    const getInput = document.getElementById('editPassword')
    const getConfirmInput = document.getElementById('cEditPassword')
    if (getInput.type === 'password' && getConfirmInput.type === 'password'){
        getInput.type = 'text'; 
        getConfirmInput.type = 'text';
    } else{
        getInput.type = 'password';
        getConfirmInput.type = 'password';
    }
}

function editEmployeeRecord(employee_id){

        recordToUpdate = _employee_localStorage[employee_id]
        document.getElementById("editFirstName").value = recordToUpdate.firstName
        document.getElementById("editSecondName").value = recordToUpdate.secondName
        document.getElementById("editSalary").value = recordToUpdate.salary
        document.getElementById("editPassword").value = recordToUpdate.password
        document.getElementById("cEditPassword").value = recordToUpdate.password;
        document.getElementById("editEmail").value = recordToUpdate.email
        document.getElementById("editPhone").value = recordToUpdate.phone
        assignedDepartment = document.getElementById("editDepartment");
        assignedDepartment.options[assignedDepartment.selectedIndex].text = 'current: ' + recordToUpdate.department;
        assignedRole = document.getElementById("editRole");
        assignedRole.options[assignedRole.selectedIndex].text = 'current: ' + recordToUpdate.role;
        userTypeOption = document.getElementById("editType");
        userTypeOption.options[userTypeOption.selectedIndex].text = 'current: ' + recordToUpdate.user_type;
        restrict_join_date = recordToUpdate.joining_date
        document.getElementById("identifier").value = employee_id
    }   

let updateRecord = () => { // function to collate and store new updated details
    employee_id = document.getElementById("identifier").value;
    departmentOption = document.getElementById("editDepartment");
    assignedDepartment = departmentOption.options[departmentOption.selectedIndex].value;
    roleOption = document.getElementById("editRole");
    assignedRole = roleOption.options[roleOption.selectedIndex].value;
    userTypeOption = document.getElementById("editType");
    userType = userTypeOption.options[userTypeOption.selectedIndex].value;
    editedFirstName = document.getElementById("editFirstName").value;
    editedSecondName = document.getElementById("editSecondName").value;
    editedSalary = document.getElementById("editSalary").value;
    editedPassword = document.getElementById("editPassword").value;
    cEditedPassword = document.getElementById("cEditPassword").value;
    editedEmail = document.getElementById("editEmail").value;
    editedPhone = document.getElementById("editPhone").value;
    if (!assignedDepartment || !assignedRole || !userType || !editedSalary || !editedSecondName || !editedEmail || !editedPhone){
        swal({
            'text' : 'All fields are required',
            'button' : 'Okay',
            'icon' : 'warning'
        })
    } else if (editedPassword != cEditedPassword){
        swal({
            'text' : 'Password Mismatch',
            'button' : 'Okay',
            'icon' : 'warning'
        })
    }
    else {
        updatedRecord = {
            "firstName" : editedFirstName,
            "secondName" :editedSecondName,
            "email" : editedEmail,
            "phone" : editedPhone,
            "salary" : editedSalary,
            "password" : editedPassword,
            "user_type": userType,
            "department": assignedDepartment,
            "role": assignedRole,
            "joining_date" : restrict_join_date, // can't be edited
        }
        _employee_localStorage[employee_id] = updatedRecord
        localStorage.setItem(`${_company_db_name}_employees`, JSON.stringify(_employee_localStorage))
        
        swal({
            'title' : 'Record Updated',
            'button' : 'Okay',
            'icon' : 'success'
        })
        renderRecord()
        location.reload()
    }
}

// delete record
let deleteUser = () =>

{

    let user_id = document.getElementById("del-identifier").value
    swal({
            title: "Are you sure?",
            text: `You will not be able to recover this user! ${_employee_localStorage[user_id].firstName}`,
            icon: "warning",
            buttons: ["Cancel", "Confirm"],
            dangerMode: true
        })
        .then((willDelete) => {
            if (willDelete) {
                swal(`Poof! ${_employee_localStorage[user_id].firstName.toUpperCase()} Deleted!`, {
                    icon: "success",
                });
                _employee_localStorage.splice(user_id, 1)
                localStorage.setItem(`${_company_db_name}_employees`, JSON.stringify(_employee_localStorage))
                renderRecord()
            } else {
                swal("User restored!");
            }
        });
}

// deleteBtn = document.getElementById("deleteRecord").addEventListener('click', deleteUser(x))



let _viewRecord = (employee_id) => {

    recordToUpdate = _employee_localStorage[employee_id]
    firstName = recordToUpdate.firstName
    secondName = recordToUpdate.secondName
    fullName = firstName +  ' ' + secondName
    document.getElementById("displayFullName").innerHTML = fullName.toUpperCase();
    document.getElementById("displayDepartment").innerHTML = recordToUpdate.department
    document.getElementById("displayRole").innerHTML = recordToUpdate.role
    document.getElementById("displaySalary").innerHTML = recordToUpdate.salary
    document.getElementById("displayEmail").innerHTML = recordToUpdate.email
    document.getElementById("displayAddress1").innerHTML = recordToUpdate.address
    document.getElementById("displayAddress2").innerHTML = recordToUpdate.address2
    document.getElementById("displayCity").innerHTML = recordToUpdate.city
    document.getElementById("displayState").innerHTML = recordToUpdate.state
    // document.getElementById("displayPhne").innerHTML = recordToUpdate.city
    document.getElementById("displayJoinedDate").innerHTML = recordToUpdate.joining_date
    document.getElementById("del-identifier").value = employee_id

}