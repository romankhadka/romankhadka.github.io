window.onload = () => {
    function appendTask(task) {
        const list = document.querySelector("#task-list-wrapper");
        const newTask = document.createElement("div");
        newTask.innerHTML = task;
        list.append(newTask);
    }

    function addTask() {
        const task = document.querySelector("#newTask");
        if (task.value === "") return false;
        localStorage.setItem("tasks", JSON.stringify([...JSON.parse(localStorage.getItem("tasks") || "[]"), task.value]));
        appendTask(task.value);
        task.value = "";
    }

    document.querySelector("#addTaskBtn").addEventListener('click', () => addTask());
    document.querySelector("#clearTaskBtn").addEventListener('click', () => {
        document.querySelector('#task-list-wrapper').innerHTML = '';
        localStorage.removeItem("tasks");
    });


    if (localStorage.getItem("tasks") != null)  {
        let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
        tasks.forEach(function (task) {
            appendTask(task);
        });
    }

};
