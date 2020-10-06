/*

    THIS SCRIPT 
  > handles the display of users details on web pages
      import this and use accordingly

*/


let islogged_In = JSON.parse(localStorage.getItem("currentUser"));

let display_company_name = () => {
  var _companyName = document.getElementsByClassName("companyDisplay");
  var i;
  for (i = 0; i < _companyName.length; i++) {
    _companyName[i].innerHTML = `<span class="greetUser"></span> ${islogged_In[0].name}`;
  }
}
document.getElementById("logo").innerHTML = `<img id="companyImage" height = "100px" src="../assets/img/register/${islogged_In[0].logo}">`
display_company_name()

// clear the temporary local storage 
let logOut = () =>
{
  localStorage.removeItem("currentUser");
}