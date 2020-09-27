let paceDB = JSON.parse(localStorage.getItem("paceDB"));

document.getElementById("name").innerHTML = paceDB[0].name;
// alert(paceDB[0].logo)


  document.getElementById("logo").innerHTML = `<img id="companyImage" height = "100px" src="../assets/img/register/${paceDB[0].logo}">`



let logOut = () =>
{

  localStorage.clear("paceDB");

}