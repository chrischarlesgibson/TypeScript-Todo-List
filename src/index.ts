import { v4 as uuid4 } from "uuid";

console.log(uuid4());

type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};
const list = document.querySelector<HTMLUListElement>("#list");
//or another way
const form = document.getElementById("new-rask-form") as HTMLFormElement | null;
const input = document.querySelector<HTMLInputElement>("#new-task-title");

//tasks varibale should be an array of Tasks
const tasks: Task[] = getTasks();
tasks.forEach(addListItem);
addEventListener("submit", (e) => {
  e.preventDefault();

  if (input?.value == "" || input?.value == null) return;

  //typescript infers by the shape of newTask that it is a Task type so the Task types types are apllied to new task
  const newTask = {
    id: uuid4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  };

  tasks.push(newTask);

  //or can be explicit and do
  // const newTask: Task = {
  //   id: uuid4(),
  //   title: input.value,
  //   completed: false,
  //   createdAt: new Date(),
  // };

  addListItem(newTask);
  //clear input when add new task
  input.value = "";
});
function addListItem(task: Task) {
  const item = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    console.log(tasks);
    saveTasks();
  });
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  label.append(checkbox, task.title);
  item.append(label);
  list?.append(item);
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//explicitly tell it what should be returned. it should reutrn array of Tasks
function getTasks(): Task[] {
  const taskJSON = localStorage.getItem("tasks");
  if (taskJSON == null) return [];
  return JSON.parse(taskJSON);
}
