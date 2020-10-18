function seeAllTasks() {
    location.assign("../../contents/task.html");
}
    
function showNotificationBar(){
    const notificationBar = document.getElementById("notification-popup");

    if(notificationBar.style.display == "block"){
        notificationBar.style.display = "none"
    }else{
       notificationBar.style.display = "block"
    }
}

