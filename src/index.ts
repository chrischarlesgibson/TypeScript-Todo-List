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

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input?.value == "" || input?.value == null) return;

  //typescript infers by the shape of newTask that it is a Task type so the Task types types are apllied to new task
  const newTask = {
    id: uuid4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  };

  //or can be explicit and do
  // const newTask: Task = {
  //   id: uuid4(),
  //   title: input.value,
  //   completed: false,
  //   createdAt: new Date(),
  // };

  addListItem(newTask);
});
function addListItem(task: Task) {
  const item = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  label.append(checkbox, task.title);
  item.append(label);
  list?.append(item);
}
