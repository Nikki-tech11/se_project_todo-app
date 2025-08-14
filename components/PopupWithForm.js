import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector); // { popupSelector } is an object literal
    this._popupForm = this._popupElement.querySelector(".popup__form"); // Select the form inside the popup
    this._handleFormSubmit = handleFormSubmit; // Assign the form submit handler
  }

  // Method to collect input values from the form
  _getInputValues() {
    this._inputList = this._popupForm.querySelectorAll(".popup__input"); // Select all input fields in the form
    const inputValues = {}; // Initialize an object to store input values
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value; // Collect input values by name
    });
    return inputValues; // Return an object with input names as keys and values as values
  }

  // Method to set event listeners for the popup
  setEventListeners() {
    super.setEventListeners(); // Call the parent class's setEventListeners method
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault(); // Prevent the default form submission behavior
      const inputValues = this._getInputValues(); // Get the input values from the form
      this._handleFormSubmit(inputValues); // Pass the input values to the form submission handler
    });
  }
}

export default PopupWithForm;

// PopupWithForm class responsibilities:
// - Extend the Popup class to inherit general popup behavior.
// - Handle form-specific behavior inside the popup.
// - Prevent default form submission behavior.
// - Call the provided form submission handler (handleFormSubmit) with form input values.
// - Add event listeners for the form's "submit" event.
