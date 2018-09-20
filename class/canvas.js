class Canvas {
  constructor() {
    this.width = screen.width;
    this.height = screen.height;
    this.style;
  }
  setSize(width, height) {
      this.width = width;
      this.height = height;
  }
  setStyle(style) {
    this.style = style;
  }
}
