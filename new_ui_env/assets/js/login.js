/*
      THIS SCRIPT 
                
 > handles the login validation 
and
 > create temporary local storage for their logged-in admin

*/ 
let logInButton = document.getElementById("logIn");
logInButton.addEventListener("click", authUser);


var unKnown = document.getElementById("errorMessage"); // error message box


let paceDB = JSON.parse(localStorage.getItem("paceDB")); // PACE local storage

if(JSON.parse(localStorage.getItem("paceDB")) == null){
  paceDB = JSON.parse(localStorage.getItem("paceDB"))
}

function authUser(e) 
{ // function that authenticates users type
  e.preventDefault()
  var companyEmail = document.getElementById("companyEmail").value; // log me to this company
  var employeeEmail = document.getElementById("employeeEmail").value; // this is my email
  var pwAuth = document.getElementById("password").value; //this is my password
  console.log(employeeEmail)
  console.log(pwAuth)
  
  _find_company_InDb = paceDB.find(x=> x.email == companyEmail); // okay lemme check if the company exist in PACE local storage (line 13)
  
  if (_find_company_InDb == undefined || _find_company_InDb == null) // if response from PACE search is empty, company is not known
  {
    
    unKnown.innerHTML = "Invalid Company Email"
    
  }

  else if(_find_company_InDb.email === employeeEmail && companyEmail === employeeEmail) 
  
  { // checks if you're the owner of the company if your email is the same as the email you gave me
  
    if(_find_company_InDb.password === pwAuth) // oh you are the owner of the company? prove it
  
    { // if the password you gave me is the same with what is in the PACE CLIENT local storage 

      unKnown.innerHTML = "You are logged in as admin" 

      location.assign("../contents/admin-dashboard/admin-dashboard.html") // redirect you to the admin dashboard
      _start_AdminSession(_find_company_InDb) // revoke function to keep you signed in            
      
    
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
    employee_InDb = _get_company_db.find(x=> x.email == employeeEmail); // searching if your record exist using your email to search the company database

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
  
      else if (employee_InDb.password == pwAuth) // finally your password has matched your record 
  
      { // now let's find your user type

      check = employee_InDb.user_type.toUpperCase()
      switch(check)
      
        {

          case check = "CO-ADMIN":

            location.assign("../contents/admin-dashboard.html");
            _start_AdminSession(employee_InDb)
            break;

          case check = "INTERNAL-ADMIN":
            location.assign("../contents/internal-dashboard/internal-dashboard.html");
            _start_InternalSession(employee_InDb)
            break;
          
          case check = "EMPLOYEE":
            
            location.assign("../contents/employee-dashboard/employee-dashboard.html");
            _start_EmployeeSession(employee_InDb)
            break;
            
          case check = "OTHERS":
          
            location.assign("../contents/employee-dashboard.html");
            _start_EmployeeSession()
              
            break;
        }

        // unKnown.innerHTML = `${check.user_type.toUpperCase()} innn `

      }
    }
  }

  function session(logMe_in){
    let current_Users = JSON.parse(localStorage.getItem("currentUsers"))
    if(current_Users == null || current_Users == undefined || current_Users.length > 3)
    {
      current_Users = []
    }

    current_Users.push(logMe_in)
    localStorage.setItem("currentUsers", JSON.stringify(current_Users))
  }

// Admin login session
  function _start_AdminSession(logMe_in) // function to handle login session
  {
    let current_AdminDb = JSON.parse(localStorage.getItem("current_AdminUser"));// check if there's an existing session of a user
    if(current_AdminDb == null || current_AdminDb.length > 1) // if current user storage does not exist create one (if empty or more than 1)
    
    {
      
      current_AdminDb = [] // create new array
      
    }
    current_AdminDb.push(logMe_in)  // store the loggedIn use into an array
    localStorage.setItem("current_AdminUser", JSON.stringify(current_AdminDb))// store the current user into temp local storage
    session(logMe_in)
  }

  //  Internal user login session
  function _start_InternalSession(logMe_in) // function to handle login session
  {
    let current_InternalDb = JSON.parse(localStorage.getItem("current_InternalUser"));// check if there's an existing session of a user
    if(current_InternalDb == null || current_InternalDb.length > 1) // if current user storage does not exist create one (if empty or more than 1)
    
    {
      
      current_InternalDb = [] // create new array
      
    }
    current_InternalDb.push(logMe_in)  // store the loggedIn use into an array
    localStorage.setItem("current_InternalUser", JSON.stringify(current_InternalDb))// store the current user into temp local storage
    session(logMe_in)
  }



  // Employee login session function
  function _start_EmployeeSession(logMe_in) // function to handle login session
  {
    let current_EmployeeDb = JSON.parse(localStorage.getItem("current_EmployeeUser"));// check if there's an existing session of a user
    if(current_EmployeeDb == null || current_EmployeeDb.length > 1) // if current user storage does not exist create one (if empty or more than 1)
    
    {
      
      current_EmployeeDb = [] // create new array
      
    }
    alert(current_EmployeeDb)
    current_EmployeeDb.push(logMe_in)  // store the loggedIn use into an array
    localStorage.setItem("current_EmployeeUser", JSON.stringify(current_EmployeeDb))// store the current user into temp local storage
    session(logMe_in)
  }
};