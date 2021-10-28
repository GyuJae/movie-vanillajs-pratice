import { IMAGE_URL } from "./api.js";

export default class DetailViewer {
  constructor({ state }) {
    this.state = state;
    this.body = document.querySelector("body");
    this.$container = document.createElement("div");
    this.$container.className = "modal";
    this.body.appendChild(this.$container);
    this.render();
    this.$container.addEventListener("click", () => {
      if (this.body.contains(this.$container)) {
        this.body.removeChild(this.$container);
      }
    });
  }

  setState(newState) {
    this.state = newState;
    this.render();
  }

  render() {
    this.$container.innerHTML = `<div class="detail"><img src=${
      this.state.backdrop_path
        ? IMAGE_URL + this.state.backdrop_path
        : "./assets/loading.gif"
    } /></div>`;
    this.$container.addEventListener("click", () => {
      this.body.removeChild(this.$container);
    });
  }
}
