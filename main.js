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
let taskList = [];
addButton.addEventListener("click", addTask)


function addTask() {
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
    let resultHTML = "";
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].isComplete == true) {
            resultHTML += `<div class="task-complete" id = "${taskList[i].id}">
              <span>${taskList[i].taskContent}</span>
            <div class="button-box">
                <button onClick="toggleComplete('${taskList[i].id}')"><i class="fa-sharp fa-solid fa-arrow-rotate-right"></i></button>
                <button onClick="deleteTask('${taskList[i].id}')"><i class="fa-sharp fa-solid fa-trash"></i></button>
            </div>
        </div>`
        } else {
            resultHTML +=
                `<div class="task" id = "${taskList[i].id}">
                <span>${taskList[i].taskContent}</span>
                <div class="button-box">
                    <button onClick="toggleComplete('${taskList[i].id}')"><i class="fa-sharp fa-solid fa-check"></i></button>
                    <button onClick="deleteTask('${taskList[i].id}')"><i class="fa-sharp fa-solid fa-trash"></i></button>
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
    render();
}

function deleteTask(id) {
    taskList = taskList.filter(task => task.id !== id);
    render();
}

function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9);
}