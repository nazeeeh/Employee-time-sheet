// SCRIPT That handles the registration details of clients 

let checkDb = localStorage.getItem("paceDB");
if (checkDb == null){ // checks if the local storage name does not exist
  checkDb = [] // creates an empty array if not exist
}
let company = [
  {
    "name" : "",
    "email" : "",
    "phone" : "",
    "type" : "",
    "password" : ""
  }
]

// alert(JSON.stringify(company));

let getUserDetails = () =>
{ // function to get all user's details
  companyName = document.getElementById("name").Value;
  companyEmail = document.getElementById("email").Value;
  companyTel = document.getElementById("phone").Value;
  companyType = document.getElementById("type").Value;
  companyPassword = document.getElementById("cpassword").Value;

  let newCompany = {
    "name" : companyName,
    "email" : companyEmail,
    "phone" : companyTel,
    "type" : companyType,
    "password" : companyPassword
  }
  company.push(newCompany)
  alert(JSON.stringify(company))

  alert(companyEmail)
  alert(companyName)
}

// getUserDetails()