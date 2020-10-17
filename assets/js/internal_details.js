
let islogged_In_Internal = JSON.parse(localStorage.getItem("current_InternalUser"));

if(islogged_In_Internal[0].user_type.toLowerCase() == "internal-admin")
{

  internalDetails()

}


// get login internal user details
function internalDetails()
{
  // this displays the user type on the dashboard node with id "role_display"
  document.getElementById("role_display").innerHTML = islogged_In_Internal[0].user_type.toUpperCase()
  // this displays the logo or image of the login user (logo should be changed to image of profile_img later)
  document.getElementById("logo").innerHTML = `<img id="companyImage" height = "100px" src="../assets/img/register/${islogged_In_Internal[0].logo}">`

  //this displays the company name on ever node with className "companyDisplay"
  let display_internal_details = () => {
    var _companyName = document.getElementsByClassName("companyDisplay");
    var i;
    for (i = 0; i < _companyName.length; i++) { // a loop function to insert txt into all returned className array 
      _companyName[i].innerHTML = `<span class="greetUser"></span> ${islogged_In_Internal[0].name}`;
    };
  };
  display_internal_details()
}


if (islogged_In_Internal[0].user_type.toLowerCase() == "internal-admin")
{
internalDetails()
}

// clear the temporary local storage for employee
let logOut = () =>
{
  localStorage.removeItem("current_InternalUser");
  location.assign('../contents/logout-confirmation.html')
}