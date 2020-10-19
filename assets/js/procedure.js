// Validation script for registration


var email = document.getElementById("email");
var password = document.getElementById("password");
var url = document.getElementById("url");
var name = document.getElementById("name");
var tel = document.getElementById("phone");
var type = document.getElementById("type");
var logo = document.getElementById("logo");

let validateReg = () => 
{
  

  if (email.value == "" || password.value == "" || url.value == "" || name.value == "" || tel.value == "" || type.value == ""){
    
    console.log(`All Field are required
    Email: ${email.value}
    Company URL: ${url.value}`)
  }
  else
  {
    const check = confirm(
      `Continue to register as 
      Email: ${email.value}
      Company url: ${url.value}?`);
    if (check == false)
    {
      // to close the alert only when user click cancel
      return;
    }
    else
    {
      // window.location.assign/href("online link.html", 500)
      // alert(`Redirecting ${email.value} to Dashboard: `)
      location.assign("../contents/confirmation.html", 500);
    }
  }

};

