function myFunction() {
  var element = document.getElementById("close");

  if (element.classList) { 
    element.classList.toggle("close");
  } else {
    var classes = element.className.split(" ");
    var i = classes.indexOf("close");

    if (i >= 0) 
      classes.splice(i, 1);
    else 
      classes.push("close");
      element.className = classes.join(" "); 
  }
}

// clear the temporary local storage 
let logOut = () =>
{
  localStorage.removeItem("currentUser");
  location.assign('../contents/logout-confirmation.html')
}
// alert("working")