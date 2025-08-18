class TodoCounter {
  // todos should be the array of initial todos
  // selector is the selector for the counter text element
  constructor(todos, selector) {
    this._element = document.querySelector(selector);
    this._completed = todos.filter((todo) => todo.completed).length;
    this._total = todos.length;
    this._updateText();
  }

  // Call this when a checkbox is clicked, and when a completed
  // to-do is deleted.
  updateCompleted = (increment) => {
    // Increment or decrement the completed count
    if (increment) {
      this._completed += 1;
    } else {
      this._completed -= 1;
      if (this._completed < 0) {
        this._completed = 0; // Ensure completed count doesn't go below zero
      }
    }
    this._updateText();
  };

  // Call this when a to-do is deleted, or when a to-do is
  // created via the form.
  updateTotal = (increment) => {
    // Increment or decrement the total count
    if (increment) {
      this._total += 1;
    } else {
      this._total -= 1;
      if (this._total < 0) {
        this._total = 0; // Ensure total count doesn't go below zero
      }
    }

    // Reset completed count if there are no todos left
    if (this._total === 0) {
      this._completed = 0;
    }

    this._updateText();
  };
  // Call the method to update the text content
  _updateText() {
    // Sets the text content of corresponding text element.
    // Call this in the constructor, and whenever the counts get updated.
    this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }
}

export default TodoCounter;
