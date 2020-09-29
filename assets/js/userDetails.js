let islogged_In = JSON.parse(localStorage.getItem("currentUser"));

document.getElementById("name").innerHTML = islogged_In[0].name;
// alert(paceDB[0].logo)


  document.getElementById("logo").innerHTML = `<img id="companyImage" height = "100px" src="../assets/img/register/${islogged_In[0].logo}">`



let logOut = () =>
{

  localStorage.clear("currentUser");

}