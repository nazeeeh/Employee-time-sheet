
var unKnown = document.getElementById("errorMessage");


let paceDB = JSON.parse(localStorage.getItem("paceDB"));
// isExist = paceDB.find(findEmail)
// email = paceDB[0].email;
// password = paceDB[0].password;




let authUser = () =>
{
  var emailAuth = document.getElementById("emailAuth").value;
  var pwAuth = document.getElementById("passwordAuth").value;
  console.log(emailAuth)
  console.log(pwAuth)

  email_InDb = paceDB.find(x=> x.email == emailAuth);
  password_InDb = paceDB.find(x=> x.password == pwAuth);
  
  // console.log(email_InDb["email"])
  // console.log(password_InDb["password"])

  if(emailAuth == email_InDb["email"] && pwAuth == password_InDb["password"]){

    // window.location.href = "https://pacetimesheet.netlify.app/contents/confirmation.html", 500;

    // current loggedin user

    let current_UserDb = JSON.parse(localStorage.getItem("currentUser"));
    if(current_UserDb == null || current_UserDb.length > 1) // if paceDB does not exist create one 
    {

      current_UserDb=[]

    }
    current_UserDb.push(email_InDb)
    localStorage.setItem("currentUser", JSON.stringify(current_UserDb))
    
    location.assign("../contents/internal-dashboard.html"); //redirect to internal dashboard
    
  }
  // else if(emailAuth === undefined || pwAuth === undefined){

  //   unKnown.innerHTML = "Invalid Login Details"
  
  // }
  else
  {

    unKnown.innerHTML = "Invalid Login Details"

  }

}



// if(isExist )
// {

//   alert("i dey here")

// }
// else
// {

//   alert("not found")

// }

// function findEmail(x)
// {
//   // alert(JSON.stringify(paceDB))
//   x.name == "test1@gmail.com";

// }

