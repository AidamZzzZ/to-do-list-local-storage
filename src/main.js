 const addNewTaskInput = document.querySelector(".add-new-task");
const addTaskbutton = document.querySelector(".btn-add-task");
const tasksList = document.querySelector(".tasks-list");
const msgEl = document.querySelector(".msg");

const tasks = [];

addTaskbutton.addEventListener("click", () => addTask());

addNewTaskInput.addEventListener('keydown', (e) => {
	let value = e.key; 

	if (value === "Enter" && addNewTaskInput.value !== "") {
		addTask();
	};
});

function addTask() {
	const task = addNewTaskInput.value;
	tasks.push({ taskName: task, complete: false });
	addNewTaskInput.value = "";

	renderTask();
};

function renderTask() {
	tasksList.innerHTML = "";
	tasks.forEach((task, index) => {	
		const li = document.createElement("li");
		const nameTask = document.createElement("span");
		
		const checkbox = toggleCheckbox(task);
		const deleteBtn = deleteButton(index);
		const doneBtn = doneButton(nameTask, index);
		const editBtn = editButton(nameTask, doneBtn);

		nameTask.textContent = task.taskName;
		nameTask.classList.add("task-name");

		li.classList.add("task");
		li.appendChild(checkbox);
		li.appendChild(nameTask);
		li.appendChild(deleteBtn);
		li.appendChild(editBtn);
		li.appendChild(doneBtn);

		tasksList.appendChild(li);
	});
};

function editButton(nameTask, doneBtn) {
	const button = document.createElement("button");
	button.textContent = "Editar";
	button.classList.add("edit-btn");

	button.addEventListener("click", () => {
		nameTask.contentEditable = true;
		doneBtn.classList.remove("filter");
	});

	return button;
};

function doneButton(nameTask, index) {
	const button = document.createElement("button");
	button.textContent = "Done";
	button.classList.add("filter");
	button.classList.add("done-btn");

	button.addEventListener("click", () => {
		nameTask.contentEditable = false;
		button.classList.add("filter");
		tasks[index].taskName = nameTask.textContent;
	});

	return button;
};

function deleteButton(index) {
	const button = document.createElement("button");
	button.innerHTML = `
		<i class="fa-solid fa-trash"></i>
	`;
	button.classList.add("delete-btn")
	button.addEventListener("click", (e) => {
		const value = e.target.parentElement;
		tasks.splice(tasks[index], 1)
		tasksList.removeChild(value)
	});

	return button;
};

function toggleCheckbox(task) {
	const checkbox = document.createElement("input");
	checkbox.type = "checkbox";
	checkbox.checked = task.complete;
	checkbox.classList.add("check-input")

	checkbox.addEventListener("change", () => {
		task.complete = checkbox.checked;
	});

	return checkbox;
};
