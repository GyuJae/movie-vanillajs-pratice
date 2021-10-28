import { IMAGE_URL, movieApi } from "./api.js";
import DetailViewer from "./DetailViewer.js";

export default class Movies {
  constructor({ $app, initalState, status }) {
    this.$app = $app;
    this.state = initalState;
    this.body = document.querySelector("body");
    this.$container = document.createElement("div");
    this.$container.className = "movies";
    this.$app.appendChild(this.$container);
    this.status = status;
    this.$pagination = document.createElement("div");
    this.$pagination.className = "pagination";
    this.body.appendChild(this.$pagination);
    this.render();
  }

  setState(nextState, status) {
    this.state = nextState;
    this.status = status;
    this.render();
  }

  render() {
    this.$container.innerHTML = this.state.results
      .map(
        (result) =>
          `<div class="movie" id=${result.id}><div id=${result.id}><img id=${
            result.id
          } src=${
            result.poster_path
              ? IMAGE_URL + result.poster_path
              : "./assets/loading.gif"
          } /></div><div class="title">${
            result.title.length >= 25
              ? result.title.slice(0, 22) + "..."
              : result.title
          }</div></div>`
      )
      .join("");
    this.$pagination.innerHTML =
      this.state.page === 1
        ? `<div class="next">Next ▶</div>`
        : this.state.page === this.state.total_pages
        ? `<div class="prev">◀ Prev</div>`
        : `<div class="prev">◀ Prev</div><div class="next">Next ▶</div>`;
    this.$container.querySelectorAll(".movie").forEach((movie) => {
      movie.addEventListener("click", (e) => {
        const { id } = e.target;
        const selectedMovieDate = this.state.results.filter(
          (result) => result.id + "" === id
        )[0];
        new DetailViewer({ state: selectedMovieDate });
      });
    });
    if (this.$pagination.querySelector(".prev")) {
      this.$pagination
        .querySelector(".prev")
        .addEventListener("click", async () => {
          let newState;
          if (this.status === "nowPlaying") {
            newState = await movieApi.nowPlaying(this.state.page - 1);
          } else if (this.status === "upcoming") {
            newState = await movieApi.upcoming(this.state.page - 1);
          } else if (this.status === "popular") {
            newState = await movieApi.popular(this.state.page - 1);
          }
          this.setState(newState, this.status);
        });
    }
    if (this.$pagination.querySelector(".next")) {
      this.$pagination
        .querySelector(".next")
        .addEventListener("click", async () => {
          let newState;
          if (this.status === "nowPlaying") {
            newState = await movieApi.nowPlaying(this.state.page + 1);
          } else if (this.status === "upcoming") {
            newState = await movieApi.upcoming(this.state.page + 1);
          } else if (this.status === "popular") {
            newState = await movieApi.popular(this.state.page + 1);
          }
          this.setState(newState, this.status);
        });
    }
  }
}
