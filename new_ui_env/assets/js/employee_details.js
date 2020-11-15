

let islogged_In_Employee = JSON.parse(localStorage.getItem("current_EmployeeUser"));


//  function to employee user details
if(islogged_In_Employee[0].user_type.toLowerCase() == "employee")
{
  employeeDetails()
}

function employeeDetails()
{

  // this displays the user type on the dashboard node with id "role_display"
  document.getElementById("displayType").innerHTML = islogged_In_Employee[0].user_type.toUpperCase()
  document.getElementById("displayRole").innerHTML = islogged_In_Employee[0].role.toUpperCase()
  // this displays the logo or image of the login user (logo should be changed to image of profile_img later)
  // document.getElementById("logo").innerHTML = `<img id="companyImage" height = "100px" src="../assets/img/register/${islogged_In_Employee[0].logo}">`

  //this displays the company name on ever node with className "companyDisplay"
  let getFullName = `${islogged_In_Employee[0].firstName + " " +islogged_In_Employee[0].secondName}`
  let display_company_name = () => {
    var _EmployeeName = document.getElementsByClassName("employeeName");
    var i;
    for (i = 0; i < _EmployeeName.length; i++) { // a loop function to insert txt into all returned className array 
      _EmployeeName[i].innerHTML = `<span class="greetUser"></span> ${getFullName}`;
    };
  };

  display_company_name()
};


// clear the temporary local storage for employee
let logOut = () =>
{
  localStorage.removeItem("current_EmployeeUser");
  location.assign('../contents/logout-confirmation.html')
}