
class DOMNodeCollection {
  constructor(nodes) {
    this.nodes = nodes;
  }

  html(html) {
    if (typeof html === "string") {
      this.each((node) => {
        node.innerHTML = html;
      });
    } else if (this.nodes.length > 0) {
      return this.nodes[0].innerHTML;
    }
  }

  empty() {
    this.html('');
  }
}
