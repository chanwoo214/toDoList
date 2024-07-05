// User enters the value(task)
// when add button is clicked, add task
// when delete button is clicked, task is deleted
// when check button is clicked, task ends and crosses out the task
// 1. when check button is clicked, toggle isComplete to true and false
// 2. if true, consider complete and put a line through
// 3. if false, not complete 
// when processing tab is clicked, underline bar moves to that tab
// when processing tab is clicked, only show the tasks that are in process and when complete tabs are clicked, it only shows completed tasks
// when all tabs are clicked, shows all the tasks

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div")
let taskList = [];
let mode = "all-tasks";
let filteredList = [];
let horizontalUnderline = document.getElementById("under-line");
let horizontalTabs = document.querySelectorAll("task-tabs");

tabs.forEach(function (menu) {
    menu.addEventListener('click', function (event) {
        horizontalIndicator(event);
    });
});

function horizontalIndicator(e) {
    horizontalUnderline.style.left = e.currentTarget.offsetLeft + "px";
    horizontalUnderline.style.width = e.currentTarget.offsetWidth + "px";
    horizontalUnderline.style.top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight - 6 + "px";
}

addButton.addEventListener("click", addTask)

taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// Select the tabs
for (let i = 1; tabs.length; i++) {
    tabs[i].addEventListener("click", function (event) {
        filter(event)
    });
};

function addTask() {
    if (taskInput.value == "") {
        alert("Please insert task");
        taskInput.focus();
        return;
    }

    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false,
    };
    taskList.push(task);
    taskInput.value = "";
    render();
}

function render() {
    let list = [];
    // Show according to the chosen tab
    if (mode === "all-tasks") {
        list = taskList;
    } else if (mode === "processing-tasks" || mode === "completed-tasks") {
        // processing and completed tasks filteredList
        list = filteredList;
    }
    // show different lists
    let resultHTML = "";
    for (let i = 0; i < list.length; i++) {
        if (list[i].isComplete == true) {
            resultHTML += `<div class="task-complete" id = "${list[i].id}">
              <span>${taskList[i].taskContent}</span>
            <div class="button-box">
                <button onClick="toggleComplete('${list[i].id}')"><i class="fa-sharp fa-solid fa-arrow-rotate-right"></i></button>
                <button onClick="deleteTask('${list[i].id}')"><i class="fa-sharp fa-solid fa-trash"></i></button>
            </div>
        </div>`
        } else {
            resultHTML +=
                `<div class="task" id = "${list[i].id}">
                <span>${list[i].taskContent}</span>
                <div class="button-box">
                    <button onClick="toggleComplete('${list[i].id}')"><i class="fa-sharp fa-solid fa-check"></i></button>
                    <button onClick="deleteTask('${list[i].id}')"><i class="fa-sharp fa-solid fa-trash"></i></button>
                </div>
            </div>`
        }
    }

    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
    console.log("id:", id);
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    filter();
}

function deleteTask(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList.splice(i, 1);
            break;
        }
    }
    filter();
}

function filter(event) {
    if (event) {
        mode = event.target.id;
        underLine.style.width = event.target.offsetWidth + "px";
        underLine.style.left = event.target.offsetLeft + "px";
        underLine.style.top = event.target.offsetTop + (event.target.offsetHeight) - 3 + "px";
    }

    filteredList = [];
    if (mode === "all-tasks") {
        //Shows all the tasks
        render();
    } else if (mode === "processing-tasks") {
        //Shows only the processing tasks
        //task.isComplete = false;
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete === false) {
                filteredList.push(taskList[i]);
            }
        }
        render();
    } else if (mode === "completed-tasks") {
        //Shows completed tasks
        //task.isComplete = true;
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete === true) {
                filteredList.push(taskList[i]);
            }
        }
        render();
    }
}

function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9);
}