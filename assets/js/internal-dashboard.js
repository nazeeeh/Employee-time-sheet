
function showNotificationBar(){
    const notificationBar = document.getElementById("notification-popup");

    if(notificationBar.style.display == "block"){
        notificationBar.style.display = "none"
    }else{
       notificationBar.style.display = "block"
    }
}
// *************************************************
// ******************Notifications******************
// *************************************************
let notifications = []
let tasks = JSON.parse(localStorage.getItem("tasks"));

localStorage.setItem("notifications",  JSON.stringify(notifications))

if(tasks != null){
    notifications.push(tasks)
}
// function displayNotification(){}
