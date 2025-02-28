const addNewTaskInput = document.querySelector(".add-new-task");
const addTaskbutton = document.querySelector(".btn-add-task");
const tasksList = document.querySelector(".tasks-list");

const tasks = [];

addTaskbutton.addEventListener("click", () => {
	const task = addNewTaskInput.value;
	console.log(task)
});
