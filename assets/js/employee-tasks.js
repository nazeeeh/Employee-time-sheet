function closeTasks() {
    location.assign("../contents/employee-dashboard.html");
}


    let tasks = JSON.parse(localStorage.getItem("tasks"))
   



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





