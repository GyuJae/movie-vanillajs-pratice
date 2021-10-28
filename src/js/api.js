import Loading from "./Loading.js";

/*

interface Data {
    dates: {maximum: '2021-11-02', minimum: '2021-09-15'}
page: 1
results: (20) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
total_pages: 83
total_results: 1660
}

interface Result {
    adult: false
backdrop_path: "/eeijXm3553xvuFbkPFkDG6CLCbQ.jpg"
genre_ids: (4) [28, 12, 18, 878]
id: 438631
original_language: "en"
original_title: "Dune"
overview: "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people. As malevolent forces explode into conflict over the planet's exclusive supply of the most precious resource in existence-a commodity capable of unlocking humanity's greatest potential-only those who can conquer their fear will survive."
popularity: 7317.173
poster_path: "/d5NXSklXo0qyIYkgV94XAgMIckC.jpg"
release_date: "2021-09-15"
title: "Dune"
video: false
vote_average: 8
vote_count: 2720
}

*/
const getURL = (getUrl, page) =>
  `https://api.themoviedb.org/3/${getUrl}?api_key=962cebc1820ada99a807125b7f1fdcbf&language=en-US&page=${
    page ? page : 1
  }`;

const getData = async (url) => {
  const $loading = new Loading();
  $loading.setState(true);
  const data = await fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error("http error");
      }
      return res.json();
    })
    .catch((e) => {
      alert(e.message);
    })
    .finally(() => {
      $loading.setState(false);
    });
  return data;
};

export const movieApi = {
  nowPlaying: (page) => getData(getURL("movie/now_playing", page)),
  upcoming: (page) => getData(getURL("movie/upcoming", page)),
  popular: (page) => getData(getURL("movie/popular", page)),
  detail: (id) => getData(getURL(`movie/${id}`) + "&append_to_response=videos"),
};

export const IMAGE_URL = "https://image.tmdb.org/t/p/original";
