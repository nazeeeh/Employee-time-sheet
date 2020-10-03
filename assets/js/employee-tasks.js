function closeTasks() {
    location.assign("../contents/employee-dashboard.html");
}

 // getting tasks from local storage
 JSON.parse(localStorage.getItem("tasks"))
   


// function to display tasks gotten from local storage
function viewTasks() {
    let view = `
    <table>
    <thead>
            <tr>
            <th>S/N</th>
            <th>Task</th>
            <th>Due Date</th>
            <th> Status</th>
            </tr>
        </thead>
    `
    for(let i = 0; i < tasks.length; i++) {
        view += `
        <tbody>
            <tr>
            <td>${i + 1}</td>
            <td>${tasks[i].name}</td>
            <td>${tasks[i].due}</td>
            <td><a href="#">accept</a></td>
        ` }
        view += `
        </tr>
    </tbody>
    </table>
    <button onclick="closeTasks()">close</button>
    `
    document.getElementById('view-tasks').innerHTML = view;
}

viewTasks();





=======
// employee_con += `<td><ul>${this_is_it.years.map(year => `<li>${year}</li>`).join("")}</ul></td>`;
>>>>>>> 5316138c7e7b35729e1cf5d5755cec3fc087b64c
