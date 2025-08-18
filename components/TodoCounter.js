class TodoCounter {
  // Constructor initializes the counter with the initial todos and the selector for the counter element
  constructor(todos, selector) {
    // Select the DOM element where the counter text will be displayed
    this._element = document.querySelector(selector);

    // Calculate the initial number of completed todos
    this._completed = todos.filter((todo) => todo.completed).length;

    // Set the total number of todos
    this._total = todos.length;

    // Update the counter text in the UI
    this._updateText();
  }

  // Method to update the completed count when a checkbox is toggled
  updateCompleted(increment) {
    if (increment) {
      // Increment the completed count if the checkbox is checked
      this._completed += 1;
    } else {
      // Decrement the completed count if the checkbox is unchecked
      this._completed -= 1;

      // Ensure the completed count doesn't go below zero
      if (this._completed < 0) {
        this._completed = 0;
      }
    }

    // Update the counter text in the UI
    this._updateText();
  }

  // Method to update the total count when a todo is added or deleted
  updateTotal(isAdding) {
    if (isAdding) {
      // Increment the total count if a new todo is added
      this._total += 1;
    } else {
      // Decrement the total count if a todo is deleted
      this._total -= 1;

      // Ensure the total count doesn't go below zero
      if (this._total < 0) {
        this._total = 0;
      }
    }

    // If there are no todos left, reset the completed count to zero
    if (this._total === 0) {
      this._completed = 0;
    }

    // Update the counter text in the UI
    this._updateText();
  }

  // Method to recalculate the completed count based on the current state of todos
  recalculateCompleted(todos) {
    // Recalculate the number of completed todos
    this._completed = todos.filter((todo) => todo.completed).length;

    // Update the counter text in the UI
    this._updateText();
  }

  // Private method to update the text content of the counter element in the UI
  _updateText() {
    // Set the text content to display the number of completed and total todos
    this._element.textContent = `Completed: ${this._completed} / Total: ${this._total}`;
  }
}

export default TodoCounter;
