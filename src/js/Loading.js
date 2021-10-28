export default class Loading {
  constructor() {
    this.body = document.querySelector("body");
    this.state = true;
    this.$container = document.createElement("div");
    this.$container.className = "modal loading";
    this.$container.innerHTML = `<div>
        <img src="./assets/loading.gif" />
      </div>`;
  }

  setState(newState) {
    this.state = newState;
    this.render();
  }

  render() {
    if (this.state === true) {
      this.body.appendChild(this.$container);
    } else {
      this.body.removeChild(this.$container);
    }
  }
}
