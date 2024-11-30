
Element.prototype.addStyles = function(styles) {
  for (const [key, val] of Object.entries(styles)) {
    this.style.setProperty(key, val)
  }
}
