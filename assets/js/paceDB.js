/*
SCRIPT That handles the registration details of clients 
*/ 

let checkDb = JSON.parse(localStorage.getItem("paceDB"));
if(checkDb == null) // if paceDB does not exist create one 
{

  checkDb=[]

}
let getUserDetails = () =>
{ // function to get all user's details
  
  companyName = document.getElementById("name").value;
  companyEmail = document.getElementById("email").value;
  companyTel = document.getElementById("phone").value;
  companyType = document.getElementById("type").value;
  companyUrl = document.getElementById("url").value;
  companyPassword = document.getElementById("password").value;
  company2Password = document.getElementById("cpassword").value;
  companyLogo = document.getElementById("logo").value;

  if (companyPassword == company2Password)
  {  // validate password and confirm password before storage

    let newCompany = {
      "name" : companyName,
      "email" : companyEmail,
      "phone" : companyTel,
      "type" : companyType,
      "password" : companyPassword,
      "url" : companyUrl,
      "logo" : companyLogo

    }

    checkDb.push(newCompany)
    localStorage.setItem("paceDB", JSON.stringify(checkDb))
    validateReg()

  }

  else

  {

    alert("Password Mismatch")

  }

}
