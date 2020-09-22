var email = document.getElementById("email");
var password = document.getElementById("password");
var url_link = document.getElementById("url_link");
document.getElementById("demo_btn").addEventListener("click", function() {
  if (email.value != null){
    const check = confirm(
      `Continue to register as ${email.value} with company url ${url_link.value}?`);
    if (check == false)
    {
      // to close the alert only when user click cancel
      return;
    }
    else
    {
      // window.location.assign("online link.html", 500)
      window.location.href = "https://pacetimesheet.netlify.app/contents/confirmation.html", 500;
      alert(`Redirecting ${email.value} to Dashboard: `)
    }
  }
  else{
    alert(`Email ${email.value} is not valid`)
  }
});

