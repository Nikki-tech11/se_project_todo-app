class Todo {
  constructor(data, selector, handleCheck, handleDelete, handleUpdate) {
    this._handleCheck = handleCheck;
    this._data = data;
    this._templateElement = document.querySelector(selector);
    this._handleDelete = handleDelete;
    this.handleCheck = handleCheck;
    this._handleUpdate = handleUpdate;
  }

  _generateCheckboxEl(todoElement) {
    this._todoCheckboxEl = todoElement.querySelector(".todo__completed");
    this._todoLabel = todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  _setEventListeners() {
    this._todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
      this._handleDelete(this._completed);
    });

    this._todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = !this._data.completed;
      this.handleCheck(this._completed);

      this._handleUpdate(this._data);
    });
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);
    const todoNameEl = this._todoElement.querySelector(".todo__name");
    const todoDate = this._todoElement.querySelector(".todo__date");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    todoNameEl.textContent = this._data.name;

    if (this._data.date) {
      const formattedDate = new Date(this._data.date).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        }
      );
      todoDate.textContent = `Due: ${formattedDate}`;
    } else {
      todoDate.textContent = "No due date";
    }

    this._generateCheckboxEl(this._todoElement);

    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;

// This class represents a single todo item.
// Responsibilities:
// - Render the todo in the UI.
// - Handle actions specific to the todo (e.g., delete, mark as completed).
