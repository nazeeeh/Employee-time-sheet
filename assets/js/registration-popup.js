// Get the modal
var modal = document.getElementById("form2_container");

// Get the button that opens the modal
var revoke_btn = document.getElementById("form_2Btn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close_form2")[0];

// When the user clicks the button, open the modal 
revoke_btn.onclick = function() {
  modal.style.display = "block";
  //Display Entered Company Name
  var newCompanyName = document.getElementById("name").value;
  if(newCompanyName == ""){
    
    document.getElementById("companyNameHolder").innerHTML = "Company Name";

  }
  else
  {
    
    document.getElementById("companyNameHolder").innerHTML = newCompanyName;

  }

}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

