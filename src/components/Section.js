export default class Section {
  constructor(settings, selector) {
    this.items = settings.items;
    this.rerender = settings.rerender;
    this.selector = selector;
    // this.renderAll();
  }

  renderAll() {
    for (let i = 0; i < this.items.length; i++) {
      this.addItem(this.rerender(this.items[i]));
    }
  }

  addItem(element) {
    const container = document.querySelector(this.selector);
    container.prepend(element);
  }
}

// PopupWithImage
