import { movieApi } from "./api.js";
import Movies from "./Movies.js";

export default class App {
  constructor($app) {
    this.$app = $app;
    this.headers = document
      .querySelector("nav")
      .querySelector("ul")
      .querySelectorAll("li");
    this.render();
  }

  setState() {}

  async render() {
    const nowPlaying = await movieApi.nowPlaying();
    const $movies = new Movies({
      $app: this.$app,
      initalState: nowPlaying,
      status: "nowPlaying",
    });
    this.headers.forEach((header) => {
      header.addEventListener("click", async (e) => {
        const { id } = e.target;
        let data;
        if (id === "nowPlaying") {
          data = await movieApi.nowPlaying();
        } else if (id === "upcoming") {
          data = await movieApi.upcoming();
        } else if (id === "popular") {
          data = await movieApi.popular();
        }
        $movies.setState(data, id);
      });
    });
  }
}
