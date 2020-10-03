// get the current logged in user from local storage
let _is_Login_Admin = localStorage.getItem("currentUser")

var _is_Login_Admin = JSON.parse(localStorage.getItem("currentUser"))
console.log(_is_Login_Admin[0].employeeDb)