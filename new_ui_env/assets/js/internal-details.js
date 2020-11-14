
let islogged_In_Internal = JSON.parse(localStorage.getItem("current_InternalUser"));

if(islogged_In_Internal[0].user_type.toLowerCase() == "internal-admin")
{

  internalDetails()

}


// get login internal user details
function internalDetails()
{
  // this displays the user type on the dashboard node with id "role_display"
  document.getElementById("displayType").innerHTML = islogged_In_Internal[0].user_type.toUpperCase()
  document.getElementById("displayRole").innerHTML = islogged_In_Internal[0].role.toUpperCase()
  // this displays the logo or image of the login user (logo should be changed to image of profile_img later)
  // document.getElementById("logo").innerHTML = `<img id="companyImage" height = "100px" src="../assets/img/register/${islogged_In_Internal[0].logo}">`

  //this displays the company name on ever node with className "displayName"
  let display_internal_details = () => {
    var _companyName = document.getElementsByClassName("displayName");
    var i;
    let fullName = islogged_In_Internal[0].firstName + " " + islogged_In_Internal[0].secondName
    for (i = 0; i < _companyName.length; i++) { // a loop function to insert txt into all returned className array 
      _companyName[i].innerHTML = `<span class="greetUser"></span> ${fullName}`;
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
  swal({
    text: "Logged Out!",
    button: false,
    icon: "success"
  });
  localStorage.removeItem("current_InternalUser");
  location.assign('../../contents/login.html')
}