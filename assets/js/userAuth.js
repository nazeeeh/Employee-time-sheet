
var unKnown = document.getElementById("errorMessage");


let paceDB = JSON.parse(localStorage.getItem("paceDB"));
// isExist = paceDB.find(findEmail)
email = paceDB[0].email;
password = paceDB[0].password;

console.log(email)
console.log(password)



let authUser = () =>
{
  var emailAuth = document.getElementById("emailAuth").value;
  var pwAuth = document.getElementById("passwordAuth").value;
  console.log(emailAuth)
  console.log(pwAuth)
  if(emailAuth == email && pwAuth == password){

    // window.location.href = "https://pacetimesheet.netlify.app/contents/confirmation.html", 500;

    location.assign("../contents/internal-dashboard.html"); //redirect to internal dashboard
    
  }
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

