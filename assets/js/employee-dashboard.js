// display stop button and hide stop button when Start button is clicked
function changeTimerButton() {
    let startTime = document.getElementById("start-time");
    let stopTime = document.getElementById("stop-time");

    if (stopTime.style.display === "none") {
        stopTime.style.display = "block";
        startTime.style.display = "none";
    } else {
        startTime.style.display = "block";
        stopTime.style.display = "none";
    }
}

// display start button and hide stop button when Stop button is clicked
function changeTimerButton2() {
    let startTime = document.getElementById("start-time");
    let stopTime = document.getElementById("stop-time");

    if (startTime.style.display === "none") {
        startTime.style.display = "block";
        stopTime.style.display = "none";
    } else {
        startTime.style.display = "none";
        stopTime.style.display = "block";
    }
}
// Calendar Section
(function() {
    var today = new Date();
    var month, day, year, firstDay;
    month = today.getMonth();
    day = today.getDate();
    year = today.getFullYear();

    firstDay = new Date(year, month, 0);

    var months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    function displayDate() {
        var holder = document.getElementById("dateHolder");
        holder.innerText = months[month] + " " + year;
    }

    function createDayHeaders() {
        var wrapper = document.getElementById("calWrapper");
        var row = document.createElement("tr");
        for (var i = 0; i < days.length; i++) {
            var el = document.createElement("th");
            el.setAttribute("class", "dayHeader");
            el.innerText = days[i];
            row.appendChild(el);
        }
        wrapper.appendChild(row);
    }

    function createDayCells() {
        var dayOne = firstDay.getDay();
        var iDay = 0;

        var wrapper = document.getElementById("calWrapper");
        var lastDay = new Date(year, month + 1, 0).getDate();

        while (iDay < lastDay) {
            var row = document.createElement("tr");
            for (var i = 0; i < days.length; i++) {
                var el = document.createElement("td");

                if (dayOne === i || iDay > 0) {
                    if (day === iDay) el.setAttribute("class", "dayCell today");
                    else el.setAttribute("class", "dayCell");

                    if (iDay < lastDay) iDay++;
                    else break;
                    el.innerText = iDay;
                }
                row.appendChild(el);
            }
            wrapper.appendChild(row);
        }
    }

    displayDate(today);
    createDayHeaders();
    createDayCells();
})();

//local storage for todo-list
let todoList = [{
        task: "Check up with Doctor Maureen",
    },
    {
        task: "Business meeting with Mr Shams",
    },
    {
        task: "Meeting with Johnson from i2talk company",
    },
];
displayContent();

//Display function
function displayContent() {
    todoTask = '';
    for (i = 0; i < todoList.length; i++) {
        if (todoList != null) {
            todoTask += `<div>
            <div>
             <strong> ${todoList[i].task}</strong><br>
            </div>
            <button onClick="editUser(${i})" class="edit" >Edit</button> &nbsp; 
            <button onClick="deleteUser(${i})" class="delete">Delete</button>
            </div>`;
        }
    }
    document.getElementById("todoTask").innerHTML = todoTask;
    todoList = JSON.parse(localStorage.getItem("todo"));
}
displayContent();

// Adding new User
function addTodoList() {
    let newList = {
        task: prompt("Enter Task"),
    };
    todoList.push(newList);
    localStorage.setItem("todo", JSON.stringify(todoList));
    displayContent();
}

//Editing User
function editUser(id) {
    let newTodoDetail = {
        task: prompt("Edit task"),
    };
    todoList[id] = newTodoDetail;
    localStorage.setItem("todo", JSON.stringify(todoList));
    displayContent();
}

//Deleting User
function deleteUser(id) {
    if (confirm(`Are you sure you want to delete ${todoList[id].task}?`)) {
        todoList.splice(id, 1);
    }
    localStorage.setItem("todo", JSON.stringify(todoList));
    displayContent();
}

function viewAllTasks() {
    location.assign("../contents/employee-tasks.html");
}