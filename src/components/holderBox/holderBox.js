import "./holderBox.css";
import { createTodoItemUI } from "../todoItem/todoItem";
import { createProjectUI } from "../project/project";
import * as utilityFunctions from "../../utilityFunctions/utilityFunctions";
import * as domController from "../../domController/domController";
import compareAsc from "date-fns/compareAsc";

const createHolderBoxUI = (app, type, arr, projectId) => {
  const container = document.createElement("div");

  container.classList.add("holder-box-container", "flex-column");

  if (domController.getContentBox()) {
    domController.getContentBox().lastElementChild.remove();
  }

  if (!arr.length && type === "projects") {
    container.append("No Projects");
    return container;
  }
  
  if (!arr.length) {
    container.append("No Todos");
    return container;
  }

  if (type === "todos") {
    const sortedArr = sortObjsByDateAsc(arr);

    container.append(...sortedArr.map(e => createTodoItemUI(e, app, projectId)));
  } else if (type === "projects") {
    container.append(...arr.map(e => createProjectUI(e, app)));
  } else if (type === "day") {
    const filteredArr = utilityFunctions.getObjsDueToday(arr);

    container.append(...filteredArr.map(e => createTodoItemUI(e, app, projectId)));
  } else if (type === "week") {
    const filteredArr = utilityFunctions.getObjsDueThisWeek(arr);
    const sortedArr = sortObjsByDateAsc(filteredArr);

    container.append(...sortedArr.map(e => createTodoItemUI(e, app, projectId)));
  }

  return container;
}

const sortObjsByDateAsc = (objsArr) => {
  return objsArr.sort((a, b) => compareAsc(new Date(a.getDueDate()), new Date(b.getDueDate())));
}


export { createHolderBoxUI };
