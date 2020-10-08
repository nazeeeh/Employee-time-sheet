function seeAllTasks() {
    location.assign("../../contents/task.html");
}
function showBarChartDetails(){
    let barChartDetails = document.getElementsByClassName("bar-details")

    barChartDetails.forEach(element => {
        if(element.style.display == "block"){
            element.style.display = "none"
        }else{
            element.style.display == "block"
        }
    });
   
}
function showNotificationBar(){
    const notificationBar = document.getElementById("notification-popup");

    if(notificationBar.style.display == "block"){
        notificationBar.style.display = "none"
    }else{
       notificationBar.style.display = "block"
    }
}

