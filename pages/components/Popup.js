class Popup {
  // The constructor initializes the popup by selecting the popup element and its close button
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector); // Select the popup element using the provided selector
    this._popupCloseBtn = this._popupElement.querySelector(".popup__close");
    this._handleEscClose = this._handleEscClose.bind(this); // Select the close button inside the popup
  }

  // Private method to handle closing the popup when the Escape key is pressed
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      // Check if the pressed key is "Escape"
      this.close(); // Call the close method to close the popup
    }
  }

  // Method to open the popup
  open() {
    this._popupElement.classList.add("popup_visible"); // Add a class to make the popup visible
    document.addEventListener("keyup", this._handleEscClose); // Add an event listener to handle the Escape key
  }

  // Method to close the popup
  close() {
    this._popupElement.classList.remove("popup_visible"); // Remove the class to hide the popup
    document.removeEventListener("keyup", this._handleEscClose); // Remove the Escape key event listener
  }

  // Method to set event listeners for the popup
  setEventListeners() {
    this._popupElement.addEventListener("mousedown", (evt) => {
      // Check if the click is on the close button or the overlay
      if (
        evt.target === this._popupCloseBtn ||
        evt.target === this._popupElement
      ) {
        this.close(); // Close the popup
      }
    });
  }
}

export default Popup; // Export the Popup class so it can be imported and used in other files

// Popup class responsibilities:
// - Handle general popup behavior (e.g., opening and closing).
// - Add and remove the "popup_visible" class to show or hide the popup.
// - Listen for the Escape key to close the popup.
// - Handle clicks on the close button or overlay to close the popup.
