let islogged_In = JSON.parse(localStorage.getItem("currentUser"));

document.getElementById("companyDisplay").innerHTML = `<span class="greetUser">Welcome,</span> ${islogged_In[0].name}`;
// alert(paceDB[0].logo)

  document.getElementById("logo").innerHTML = `<img id="companyImage" height = "100px" src="../assets/img/register/${islogged_In[0].logo}">`


// clear the temporary local storage 
let logOut = () =>
{
  localStorage.removeItem("currentUser");
}