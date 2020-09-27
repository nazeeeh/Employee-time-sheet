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
  logoOption = document.getElementById("logo");
  companyLogo = logoOption.options[logoOption.selectedIndex].text;
  // text = companyLogo.options[companyLogo.selectedIndex].text;
  // alert(companyLogo)
  // alert(companyLogo2)
  // alert(companyLogo.value)





  if (companyPassword == company2Password)
  {  // validate password and confirm password before storage

    switch(companyLogo)
    {
  
      case "Business":
        return companyLogo = "business_avatar.png";
        break;
  
      case "Engineer":
        companyLogo = "engineer_avatar.jpg";
        break;
  
      case "Information Technology":
        companyLogo = "information_tech_avatar.jpg";
        break;
  
      case "Medicine":
        companyLogo = "medic_avatar.png";
        break;
  
      case "Security":
        companyLogo = "security_avatar.png";
        break;
  
      case "Software":
        companyLogo = "software_avatar.jpg"
        break;
  
      default:
        companyLogo = "why"
    }
    alert(companyLogo)
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
