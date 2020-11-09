/*
                THIS SCRIPT 
                
 > handles the registration details of new clients 
and
 > create local storage for their employees

*/

let checkDb = JSON.parse(localStorage.getItem("paceDB"));
if (checkDb == null) // if paceDB does not exist create one 
{

    checkDb = []

}

let getUserDetails = () => { // function to get all user's details from registration form
    companyName = document.getElementById("name").value;
    companyEmail = document.getElementById("email").value;
    companyTel = document.getElementById("phone").value;
    companyType = document.getElementById("type").value;
    companyUrl = document.getElementById("url").value;
    companyPassword = document.getElementById("password").value;
    company2Password = document.getElementById("cpassword").value;
    logoOption = document.getElementById("logo");
    companyLogo = logoOption.options[logoOption.selectedIndex].text;
    accept_tc = document.getElementById("check-btn");
    isActive = true;



    const _create_company = () => {
        is_email_InDb = checkDb.find(x => x.email == companyEmail);

        if (is_email_InDb == undefined || is_email_InDb == null) {

            // alert("success")

            if (companyPassword == company2Password) { // validate password and confirm password before storage

                switch (companyLogo) { // check which logo is selected

                    case "Business":
                        return companyLogo = "business_avatar.png";
                        break;

                    case "Engineer":
                        companyLogo = "engineer_avatar.jpg";
                        break;

                    case "Information Technology":
                        companyLogo = "information_tech_avatar.jpg";
                        break;

                    case "Medicine":
                        companyLogo = "medic_avatar.png";
                        break;

                    case "Security":
                        companyLogo = "security_avatar.png";
                        break;

                    case "Software":
                        companyLogo = "software_avatar.jpg"
                        break;

                    default:
                        companyLogo = "no_profile_img.png"
                }

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
                        "name": "Sample Name",
                        "role": "Engineer",
                        "email": `sample@pacetimesheet.com`,
                        "password": "7444",
                        "user_type": "co-admin",
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
                    "phone": companyTel,
                    "type": companyType,
                    "password": companyPassword,
                    "url": companyUrl,
                    "logo": companyLogo,
                    "employeeDb": localStorage.getItem(`${companyName}_employees`), // creates local storage with company name
                    "user_type": "admin", // admin by default
                    "department": companyDepartment

                }

                checkDb.push(newCompany)

                // push new company information into the local storage
                localStorage.setItem("paceDB", JSON.stringify(checkDb))
                validateReg()

            } else

            {

                alert("Password Mismatch")

            }
        } else if (is_email_InDb["email"] == companyEmail) {
            // alert("EMAIL ALREADY FOUND")
            document.getElementById("companyNameHolder").innerHTML = "Email Already Exist";

        }
    }

    if (!companyName || !companyEmail || !companyPassword || !company2Password || !companyUrl || !companyType || !companyTel || !accept_tc.checked) {
        alert('all fields are required')
    } else {
        _create_company()
    }

}