const field = document.querySelector(".add-task input"),
	tasks_content = document.querySelector(".tasks-content ul"),
	task_count = document.querySelector(".task-stats .tasks-count > span"),
	task_complete = document.querySelector(".task-stats .tasks-completed > span"),
	done_all = document.querySelector(".done-all"),
	del_all = document.querySelector(".del-all");

document.addEventListener("click", function (e) {
	if (e.target.classList.contains("delete")) {
		deletTask(e);
		saveData();
	} else if (e.target.tagName === "LI") {
		doneTask(e);
		saveData();
	}
	calcTask();
	field.focus();
});

function addTask() {
	if (field.value === "") {
		alert("you most write anything!");
	} else {
		let task_box = document.createElement("li");
		task_box.innerHTML = field.value;
		let task_del_btn = document.createElement("span");
		task_del_btn.classList.add("delete");
		task_del_btn.innerHTML = "\u00d7";
		task_box.appendChild(task_del_btn);
		tasks_content.appendChild(task_box);
		calcTask();
		saveData();
		field.value = "";
		field.focus();
	}
}

function deletTask(e) {
	e.target.parentNode.remove();
}

function doneTask(e) {
	e.target.classList.toggle("finished");
}

function deletAllTasks() {
	let all_task = document.querySelectorAll(".tasks-content ul li");
	all_task.forEach((ele) => {
		ele.remove();
	});
	calcTask();
	saveData();
	field.focus();
}

function doneAllTasks() {
	let all_task = document.querySelectorAll(".tasks-content ul li");
	if (done_all.innerHTML == "done all") {
		all_task.forEach((ele) => {
			ele.classList.add("finished");
		});
		done_all.innerHTML = "undone all";
	} else {
		all_task.forEach((ele) => {
			ele.classList.remove("finished");
		});
		done_all.innerHTML = "done all";
	}
	calcTask();
	saveData();
}

function calcTask() {
	let t_count = document.querySelectorAll(".tasks-content ul li").length;
	let t_complete = document.querySelectorAll(
		".tasks-content ul li.finished"
	).length;
	task_count.innerHTML = t_count;
	task_complete.innerHTML = t_complete;
	if (t_count === t_complete && t_count !== 0) {
		done_all.innerHTML = "undone all";
	} else {
		done_all.innerHTML = "done all";
	}
}

function saveData() {
	window.localStorage.setItem("data", tasks_content.innerHTML);
}

function showData() {
	tasks_content.innerHTML = window.localStorage.getItem("data");
	calcTask();
}

showData();
