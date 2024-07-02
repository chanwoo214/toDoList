// User enters the value(task)
// when add button is clicked, add task
// when delete button is clicked, task is deleted
// when check button is clicked, task ends and crosses out the task
// when processing tab is clicked, underline bar moves to that tab
// when processing tab is clicked, only show the tasks that are in process and when complete tabs are clicked, it only shows completed tasks
// when all tabs are clicked, shows all the tasks

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = [];
addButton.addEventListener("click", addTask)


function addTask() {
    let taskContent = taskInput.value;
    taskList.push(taskContent);
    render();
}

function render() {
    let resultHTML = "";
    for (let i = 0; i < taskList.length; i++) {
        resultHTML +=
            `<div class="task">
                <div>${taskList[i]}</div>
                <div>
                    <button>Check</button>
                    <button>Delete</button>
                </div>
            </div>`

    }


    document.getElementById("task-board").innerHTML = resultHTML;
}