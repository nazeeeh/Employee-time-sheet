
var unKnown = document.getElementById("errorMessage");


let paceDB = JSON.parse(localStorage.getItem("paceDB"));


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
  
  
  // controlling error when the local storage is empty 
  try{

    if(email_InDb["email"] === undefined || password_InDb["password"] === undefined)
    {
  
      unKnown.innerHTML = "Invalid Login Details"
  
  
    }

  }
  catch(err){
    
    unKnown.innerHTML = "Invalid Login Details"

  }

  // check if the parameters are empty

  if(!emailAuth || !email_InDb["email"] || !pwAuth || !password_InDb["password"] )
  {

    unKnown.innerHTML = "Invalid Login Details"


  }

  // validation
  if(emailAuth == email_InDb["email"] && pwAuth == password_InDb["password"])
  {

    let current_UserDb = JSON.parse(localStorage.getItem("currentUser"));// current loggedin user
    if(current_UserDb == null || current_UserDb.length > 1) // if paceDB does not exist create one 
    {

      current_UserDb = []

    }
    current_UserDb.push(email_InDb)  // store the loggedIn use into an array
    localStorage.setItem("currentUser", JSON.stringify(current_UserDb))// store the current user into temp local storage
    location.assign("../contents/internal-dashboard.html"); //redirect to internal dashboard
    
  }
  else
  {

    unKnown.innerHTML = "Invalid Login Details"

  }

}
