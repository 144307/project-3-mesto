export default class Section {
  constructor(settings, selector) {
    this.items = settings.items;
    this.rerender = settings.rerender;
    this.selector = selector;
    this.container = document.querySelector(this.selector);
  }

  renderAll() {
    for (let i = 0; i < this.items.length; i++) {
      this.addItem(this.rerender(this.items[i]));
    }
  }

  addItem(element) {
    this.container.prepend(element);
  }
}
