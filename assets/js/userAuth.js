/*
      THIS SCRIPT 
                
 > handles the login validation 
and
 > create temporary local storage for their logged-in admin

*/ 

var unKnown = document.getElementById("errorMessage"); // error message box


let paceDB = JSON.parse(localStorage.getItem("paceDB")); // PACE local storage

let authUser = () =>
{ // function that authenticates users type

  var companyAuth = document.getElementById("companyAuth").value; // log me to this company
  var emailAuth = document.getElementById("emailAuth").value; // this is my email
  var pwAuth = document.getElementById("passwordAuth").value; //this is my password
  console.log(emailAuth)
  console.log(pwAuth)
  
  _find_company_InDb = paceDB.find(x=> x.email == companyAuth); // okay lemme check if the company exist in PACE local storage (line 13)
  
  if (_find_company_InDb == undefined || _find_company_InDb == null) // if response from PACE search is empty, company is not known
  {
    
    unKnown.innerHTML = "Invalid Company Email"
    
  }

  else if(_find_company_InDb.email === emailAuth && companyAuth === emailAuth) 
  
  { // checks if you're the owner of the company if your email is the same as the email you gave me
  
    if(_find_company_InDb.password === pwAuth) // oh you are the owner of the company? prove it
  
    { // if the password you gave me is the same with what is in the PACE CLIENT local storage 

      unKnown.innerHTML = "you are logged in as admin" 

      _start_Session() // revoke function to keep you signed in      
      
      current_UserDb.push(_find_company_InDb)  // store the loggedIn use into an array
      localStorage.setItem("currentUser", JSON.stringify(current_UserDb))// store the current user into temp local storage
      location.assign("../contents/admin-dashboard.html") // redirect you to the admin dashboard
      
    
    }

    else
    
    {

      unKnown.innerHTML = "Wrong admin password"

    }
  
  }
  
  else
  
  { // you are here because you are not the admin so let's fine your company and log you in
    
  _get_company_name = _find_company_InDb.name // getting the company name
    let _get_company_db = JSON.parse(localStorage.getItem(`${_get_company_name}_employees`)) // getting the company data base
    employee_InDb = _get_company_db.find(x=> x.email == emailAuth); // searching if your record exist using your email to search the company database

    if (employee_InDb == undefined || employee_InDb == null) // if the search result is empty
    
    { // your record is not in the company
    
      unKnown.innerHTML = "Email not found in the company"
    
    }
    
    else // okay your record was found but is the password correct?
    
    {

      if (employee_InDb.password == undefined || employee_InDb.password == null || employee_InDb.password != pwAuth) 
      
      {// if your password is not found or does not match with your record
  
        unKnown.innerHTML = "Incorrect Password!!!" // try again
  
      }
  
      else if (employee_InDb["password"] == pwAuth) // finally your password has matched your record 
  
      { // now let's fine your user type

        switch(employee_InDb.user_type)
        
        {

          case employee_InDb.user_type.toLowerCase() === "co-admin":

            location.assign("../contents/admin-dashboard.html");
            _start_Session()
            break;

          case employee_InDb.user_type.toLowerCase() === "internal admin":
            
            location.assign("../contents/internal-dashboard.html");
            _start_Session()
            break;
          
          case employee_InDb.user_type.toLowerCase() === "employee":
            
            location.assign("../contents/employee-dashboard.html");
            _start_Session()
            break;
            
          case employee_InDb.user_type.toLowerCase() === "others":
          
            location.assign("../contents/employee-dashboard.html");
            _start_Session()
              
            break;
        }

        unKnown.innerHTML = "innnnnn"

      }
    }
  }

  function _start_Session() // function to handle login session
  {

    let current_UserDb = JSON.parse(localStorage.getItem("currentUser"));// check if there's an existing session of a user
    if(current_UserDb == null || current_UserDb.length > 1) // if current user storage does not exist create one (if empty or more than 1)
    
    {
      
      current_UserDb = [] // create new array
      
    }

  }
}
  
  // controlling error when the local storage is empty 
//   try{

//     if(email_InDb["email"] === undefined || password_InDb["password"] === undefined)
//     {
  
//       unKnown.innerHTML = "Invalid Login Details"
  
  
//     }

//   }
//   catch(err){
    
//     unKnown.innerHTML = "Invalid Login Details"

//   }

//   // check if the parameters are empty

//   if(!emailAuth || !email_InDb["email"] || !pwAuth || !password_InDb["password"] )
//   {

//     unKnown.innerHTML = "Invalid Login Details"


//   }

//   // validation
//   if(emailAuth == email_InDb["email"] && pwAuth == password_InDb["password"])
//   {

//     let current_UserDb = JSON.parse(localStorage.getItem("currentUser"));// current loggedin user
//     if(current_UserDb == null || current_UserDb.length > 1) // if paceDB does not exist create one 
//     {

//       current_UserDb = []

//     }
//     current_UserDb.push(email_InDb)  // store the loggedIn use into an array
//     localStorage.setItem("currentUser", JSON.stringify(current_UserDb))// store the current user into temp local storage
//     location.assign("../contents/admin-dashboard.html"); //redirect to internal dashboard
    
//   }
//   else
//   {

//     unKnown.innerHTML = "Invalid Login Details"

//   }

// }


// // clear the temporary local storage 
// let logOut = () =>
// {
//   localStorage.removeItem("currentUser");
//   location.assign('../contents/logout-confirmation.html')
// }