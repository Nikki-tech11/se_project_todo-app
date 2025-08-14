class Section {
  constructor({ items, renderer, containerSelector }) {
    this._items = items;
    this._renderer = renderer;
    this._containerEl = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item); // Call the renderer function passing the item as an argument
    });
  }

  addItem(element) {
    this._containerEl.prepend(element); // prepend adds the new element at the top of the container
  }
}

export default Section;

// This class handles rendering and adding/organizing todo items.
//In your section class:
//items, renderer, and containerSelector are parameters.
//The object { items: initialTodos, renderer: ..., containerSelector: ".todos__list" } is the argument passed when creating a new instance.
