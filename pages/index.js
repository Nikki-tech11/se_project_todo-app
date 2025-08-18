import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "./utils/constants.js";
import Todo from "../components/Todo.js";

import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const addTodoButton = document.querySelector(".button_action_add");
// const addTodoPopupEl = document.querySelector("#add-todo-popup");
// const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const addTodoForm = document.querySelector("#add-todo-form");
// const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
// const todosList = document.querySelector(".todos__list");

// Function to generate a new todo item
const generateTodo = (data) => {
  // Create a new Todo instance
  const todo = new Todo(
    data, // Data for the todo item
    "#todo-template", // Template selector
    handleCheck, // Function to handle checkbox changes
    handleDelete // Function to handle deletion
  );

  // Get the DOM element for the todo item
  const todoElement = todo.getView();

  // Return the generated DOM element
  return todoElement;
};

// Section class to manage the list of todos
const taskSection = new Section({
  items: initialTodos, // Initial list of todos
  renderer: (item) => {
    renderTodo(item); // Reuse the renderTodo function
  },
  containerSelector: ".todos__list", // Selector for the container
});

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    // Destructure the input values from the form
    const { name, date } = inputValues; // Extract the "name" and "date" fields from the form data

    // Parse the date input if provided
    const dateInput = date ? new Date(date) : null; // Convert the date string to a Date object, or set it to null if no date is provided

    if (dateInput) {
      // Adjust the date for timezone offset if a valid date is provided
      dateInput.setMinutes(
        dateInput.getMinutes() + dateInput.getTimezoneOffset()
      );
    }

    // Generate a unique ID for the new to-do item
    const id = uuidv4(); // Use the uuidv4 function to create a unique identifier

    // Create a new to-do object with the name, date, and ID
    const values = { name, date: dateInput, id }; // Combine the name, adjusted date, and ID into an object

    // Render the new to-do item on the page
    renderTodo(values); // Call the renderTodo function to add the new to-do to the DOM

    todoCounter.updateTotal(true); // Update the total count of todos in the counter
    // Reset the form validation state
    newTodoFormValidator.resetValidation(); // Reset validation errors and disable the submit button

    // Close the popup after the form is submitted
    addTodoPopup.close(); // Call the close method to hide the popup
  },
});

const renderTodo = (item) => {
  const todo = generateTodo(item);
  taskSection.addItem(todo);
};

// initialTodos.forEach((item) => {
//   renderTodo(item);
// });

addTodoPopup.setEventListeners();

// const openModal = (modal) => {
//   modal.classList.add("popup_visible");
// };

// const closeModal = (modal) => {
//   modal.classList.remove("popup_visible");
// };

function handleCheck(completed) {
  if (completed) {
    todoCounter.updateCompleted(true);
  } else {
    todoCounter.updateCompleted(false);
  }
}

function handleDelete(completed) {
  if (!completed) {
    todoCounter.updateCompleted(false);
  }
  todoCounter.updateTotal(false);
}

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const newTodoFormValidator = new FormValidator(validationConfig, addTodoForm);
newTodoFormValidator.enableValidation();

// Render the initial list of todos
taskSection.renderItems();

// This file acts as the main controller for the app.
// Responsibilities:
// - Handle user interactions (e.g., form submissions, button clicks).
// - Prepare data for rendering.
// - Call methods from other classes (e.g., Todo, FormValidator).
