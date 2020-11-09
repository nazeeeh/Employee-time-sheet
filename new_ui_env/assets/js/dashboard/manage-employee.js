const employee = [{
    "firstName": "Ayodele",
    "SecondName": "Samuel Adebayo",
    "userName": "unclebay143",
    "department": "web development",
    "role": "web development",
    "employedDate": "10/20/2020",
}, {
    "firstName": "toluwani",
    "secondName": "Ayoola",
    "userName": "ayoola123",
    "department": "web development",
    "role": "web development",
    "employedDate": "10/20/2020",
}]


/* function to display all record in the local storage */
let renderEmployeeRecord = () => {
    var employeeListContainer = "";
    let serialNumber = 0;
    for (i = 0; i < employee.length; i++) {

        employeeListContainer += `
  <tr id="${i}" draggable="true" data-toggle="modal" data-target="#profileDisplayForm">
    <th scope="row">${serialNumber+=1}</th>
    <td>${employee[i].firstName}</td>
    <td>${employee[i].secondName}</td>
    <td>${employee[i].userName}</td>
    <td>${employee[i].department}</td>
    <td>${employee[i].role}</td>
    <td>${employee[i].employedDate}</td>
</tr>
      `
    }

    document.getElementById("here").innerHTML = employeeListContainer;

}

renderEmployeeRecord()