class Todo {
  constructor(data, selector) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
  }

  _generateCheckboxEl(todoElement) {
    this._todoCheckboxEl = todoElement.querySelector(".todo__completed");
    this._todoLabel = todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);

    this._todoCheckboxEl.addEventListener("change", (evt) => {
      this._data.completed = !this._data.completed;
    });
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);
    const todoNameEl = this._todoElement.querySelector(".todo__name");
    const todoDate = this._todoElement.querySelector(".todo__date");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    this._todoDeleteBtn.addEventListener("click", (evt) => {
      this._todoElement.remove();
      console.log(`Todo "${this._data.name}" has been deleted.`);
    });

    todoNameEl.textContent = this._data.name;

    this._generateCheckboxEl(this._todoElement);

    return this._todoElement;
  }
}

export default Todo;
