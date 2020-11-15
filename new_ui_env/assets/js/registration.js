/*
                THIS SCRIPT 
                
 > handles the registration details of new clients 
and
 > create local storage for their employees

*/

let signUpButton = document.getElementById("signUp");
signUpButton.addEventListener("click", getUserDetails);


let checkDb = JSON.parse(localStorage.getItem("paceDB"));
if (checkDb == null) // if paceDB does not exist create one 
{

    checkDb = []

}

function getUserDetails(formSubmit) { // function to get all user's details from registration form
    formSubmit.preventDefault() // stop form from loading
    employee = JSON.parse(localStorage.getItem(`${name}Employee`));
    companyName = document.getElementById("companyName").value;
    companyEmail = document.getElementById("companyEmail").value;
    companyPassword = document.getElementById("password").value;
    company2Password = document.getElementById("cPassword").value;
    // accept_tc = document.getElementById("check-btn");
    const _create_company = () => {
        is_email_InDb = checkDb.find(x => x.email == companyEmail);

        if (is_email_InDb == undefined || is_email_InDb == null) {

            if (companyPassword == company2Password) { // validate password and confirm password before storage

                var companyDepartment = JSON.parse(localStorage.getItem(`${companyName}_department`));

                if (companyDepartment === null || companyDepartment === undefined) { // if company department local storage does not exist create one 

                    companyDepartment = []

                }

                companyDefaultDepartment = ["Web design", "Web development", "Product Management"]
                companyDepartment.push(companyDefaultDepartment)
                localStorage.setItem(`${companyName}_department`, JSON.stringify(companyDefaultDepartment))

                // create local storage for new company employee

                let _employee_Db = JSON.parse(localStorage.getItem(`${companyName}_employees`));

                if (_employee_Db === null || _employee_Db === undefined) { // if company local storage does not exist create one 

                    _employee_Db = []

                }

                let _employed_date = (employed_date) => {
                    var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ];
                    return month[employed_date.getMonth()] + " " + employed_date.getDate() + " " + employed_date.getFullYear();
                }

                let sample = [

                    { // employee sample on dashboard

                        "id": `sample.${companyName}`,
                        "firstName": "Sample",
                        "secondName": "Demo",
                        "role": "Engineer",
                        "email": `sample@pacetimesheet.com`,
                        "password": "7444",
                        "user_type": "employee",
                        "phone": "08038157444",
                        "joining_date": _employed_date(new Date()),
                        "salary": "120000",
                        "currency": "Naira",
                        "department": "Sample",

                    }

                ]

                localStorage.setItem(`${companyName}_employees`, JSON.stringify(sample))


                // staging new company details for storage

                let newCompany = {

                    "name": companyName,
                    "email": companyEmail,
                    "phone": "",
                    "password": companyPassword,
                    "url": "",
                    "logo": "",
                    "employeeDb": localStorage.getItem(`${companyName}_employees`), // creates local storage with company name
                    "user_type": "admin", // admin by default
                    "department": companyDepartment

                }

                checkDb.push(newCompany)

                // push new company information into the local storage
                localStorage.setItem("paceDB", JSON.stringify(checkDb))
                

                

                swal({
                    title: "Registration Successful",
                    // text: `You have logged in for 5 minutes, Did you forget to start your time?`,
                    icon: "warning",
                    button: "Ok",
                })
                setTimeout(() => {
                    // alert("sam")
                    location.assign("./login.html", 500);
                }, 1000);
                
            } else

            {

                swal({
                    title: "Password Mismatched",
                    // text: `You have logged in for 5 minutes, Did you forget to start your time?`,
                    icon: "warning",
                    button: "Ok",
                })

            }
        } else if (is_email_InDb["email"] == companyEmail) {
            // alert("EMAIL ALREADY FOUND")
            // document.getElementById("companyNameHolder").innerHTML = "Email Already Exist";
            // swal({
            //     title: "Email Already Exist",
            //     icon: "error",
            //     button: "Okay",
            // })

        }
    }

    if (!companyName || !companyEmail || !companyPassword || !company2Password) {
        swal({
            title: "All Fields are required",
            icon: "error",
            button: "Okay",
        })
    } else {
        _create_company()
    }

}





// let signUpButton = document.getElementById("signUp");
// signUpButton.addEventListener("click", companyRegistration);

// var database = JSON.parse(localStorage.getItem("paceDb"));
// var currentLoggedInAdmin = JSON.parse(localStorage.getItem("current_AdminUser"));
// if (database == null) {
//     database = [];
// };
// if (currentLoggedInAdmin == null) {
//     currentLoggedInAdmin = [];
// };

// name = document.getElementById("companyName");
// email = document.getElementById("companyEmail");
// password = document.getElementById("password");
// cpassword = document.getElementById("cpassword");

// function companyRegistration(formSubmit) {
//     formSubmit.preventDefault() // stop form from loading
//     employee = JSON.parse(localStorage.getItem(`${name}Employee`));
//     if (employee == null) {
//         employee = [];
//     };
//     newCompany = {
//         name: name,
//         email: email,
//         password: password,
//         cpassword: cpassword,
//         companyUrl: "",
//         role: "admin",
//         accountSubscription: "premium",
//         department: []

//     };

//     validate(newCompany)
// };


// function validate(newCompanyDetails) {
//     const regEmailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     if (newCompanyDetails.name.length < 2) {
//         document.getElementById("errorMessage").innerHTML =
//             "first Name must be greater than 2 characters!";
//         return false;
//     } else if (!regEmailFormat.test(newCompanyDetails.email)) {
//         document.getElementById("errorMessage").innerHTML = "Enter a valid email address!";
//         return false;
//     } else if (newCompanyDetails.password.length < 8) {
//         document.getElementById("errorMessage").innerHTML =
//             "Password must be greater than 8 characters!";
//         return false;
//     } else if (!/[a-z]/.test(newCompanyDetails.password)) {
//         document.getElementById("errorMessage").innerHTML =
//             "Password must contain at least one lower case!";
//         return false;
//     } else if (!/[A-Z]/.test(newCompanyDetails.password)) {
//         document.getElementById("errorMessage").innerHTML =
//             "Password must contain at least one upper case!";
//         return false;
//     } else if (!/[0-9]/.test(newCompanyDetails.password)) {
//         document.getElementById("errorMessage").innerHTML =
//             "Password must contain a number!";
//         return false;
//     } else if (!/[ /\W|_/g]/.test(newCompanyDetails.password)) {
//         document.getElementById("errorMessage").innerHTML =
//             "Password must contain at least one special character!";
//         return false;
//     } else if (newCompanyDetails.password != newCompanyDetails.cpassword) {
//         document.getElementById("errorMessage").innerHTML = "Passwords do not match!";
//         return false;
//     } else {
//         isCompanyExist(newCompanyDetails.name, newCompanyDetails.email);
//     }

// }

// function isCompanyExist(name, email) {
//     let isCompanyName = database.find((element) => element.name == name);
//     let isCompanyEmail = database.find((element) => element.email == email);

//     if (isCompanyName) {
//         document.getElementById("errorMessage").innerHTML = "name has been taken!";
//     } else if (isCompanyEmail) {
//         document.getElementById("errorMessage").innerHTML = "Email has been taken!";
//     } else {
//         database.push(newCompany);
//         currentUser.push(newCompany);

//         // successful registration adds details to local storage
//         localStorage.setItem("PaceDb", JSON.stringify(database));
//         localStorage.setItem("current_AdminUser", JSON.stringify(currentLoggedInAdmin));
//         // redirect to admin dashboard
//         location.assign("../dashboard.html");
//     }
// }