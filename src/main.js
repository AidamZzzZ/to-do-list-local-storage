const addNewTaskInput = document.querySelector(".add-new-task");
const addTaskbutton = document.querySelector(".btn-add-task");
const tasksList = document.querySelector(".tasks-list");
const msgEl = document.querySelector(".msg");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


window.onload = function() {
	noTaskAddTask();
	renderTask(tasks);
}

addTaskbutton.addEventListener("click", () => addTask());

addNewTaskInput.addEventListener('keydown', (e) => {
	let value = e.key; 

	if (value === "Enter" && addNewTaskInput.value !== "") {
		addTask();
	};
});

function noTaskAddTask() {
	if (tasks.length === 0) {
		msgEl.classList.remove("filter")
	} else {
		msgEl.classList.add("filter")
	}
}

function addTask() {
	const task = addNewTaskInput.value;
	tasks.push({ taskName: task, complete: false });
	addNewTaskInput.value = "";

	localStorage.setItem('tasks', JSON.stringify(tasks))

	noTaskAddTask();
	renderTask(tasks);
};

function renderTask(tasks) {
	tasksList.innerHTML = "";
	tasks.forEach((task, index) => {	
		const li = document.createElement("li");
		const nameTask = document.createElement("span");
		const labelCheckbox = document.createElement("label");
		labelCheckbox.setAttribute("for", "check-input");
		labelCheckbox.classList.add("custom-checkbox")

		const checkbox = toggleCheckbox(task, index, nameTask);
		checkbox.name = "check-input";

		task.complete ? nameTask.classList.add("check") : nameTask.classList.remove("check");

		const deleteBtn = deleteButton(index);
		const doneBtn = doneButton(nameTask, nameTask, index);
		const editBtn = editButton(nameTask, doneBtn);

		nameTask.textContent = task.taskName;
		nameTask.classList.add("task-name");

		li.classList.add("task");
		li.appendChild(checkbox);
		li.appendChild(labelCheckbox)
		li.appendChild(nameTask);
		li.appendChild(deleteBtn);
		li.appendChild(editBtn);
		li.appendChild(doneBtn);

		tasksList.appendChild(li);
	});
};

function editButton(nameTask, doneBtn) {
	const button = document.createElement("button");
	button.innerHTML = `
		<i class="fa-solid fa-pen-to-square"></i>
	`;
	button.classList.add("edit-btn");

	button.addEventListener("click", () => {
		nameTask.contentEditable = true;
		nameTask.classList.add("edit")
		doneBtn.classList.remove("filter");
	});

	return button;
};

function doneButton(task, nameTask, index) {
	const button = document.createElement("button");
	button.innerHTML = `
		<i class="fa-solid fa-check"></i>
	`;
	button.classList.add("filter");
	button.classList.add("done-btn");

	button.addEventListener("click", () => {
		nameTask.contentEditable = false;
		nameTask.classList.remove("edit")
		button.classList.add("filter");
		tasks[index].taskName = nameTask.textContent;

		localStorage.setItem("tasks", JSON.stringify(tasks))
	});

	return button;
};

function deleteButton(task, index) {
	const button = document.createElement("button");
	button.innerHTML = `
		<i class="fa-solid fa-trash"></i>
	`;

	button.classList.add("delete-btn")
	button.addEventListener("click", (e) => {
		const value = e.target.parentElement;
		tasksList.removeChild(value);
		tasks.splice(index, 1);

		localStorage.setItem("tasks", JSON.stringify(tasks))	

		noTaskAddTask();
	});

	return button;
};

function toggleCheckbox(task, index, nameTask) {
	const checkbox = document.createElement("input");
	checkbox.type = "checkbox";
	checkbox.checked = task.complete;
	checkbox.classList.add("check-input");

	checkbox.addEventListener("change", () => {
		tasks[index].complete = checkbox.checked;
		localStorage.setItem("tasks", JSON.stringify(tasks))

		tasks[index].complete ? nameTask.classList.add("check") : nameTask.classList.remove("check");

	});

	return checkbox;
};

document.addEventListener("keyup", (e) => {

	if (e.target.matches(".search-task")) {
		
		document.querySelectorAll(".task").forEach(task => {

			task.textContent.toLowerCase().includes(e.target.value.toLowerCase())
			? task.classList.remove("filter") : task.classList.add("filter")
		
		});
	};
});