const fetch = require("node-fetch");

const url =
  "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZGFiYWNhNGQ0ZGUxMTY4ZjE0ZmMwNDQzMDI3MzI2MSIsInN1YiI6IjY0OWNmMWMzM2U2ZjJiMDBlMmRjZmVjMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.M1CeGEk2NsnE8SnHuRvx8YXK1PN6ThhDLUeR4xSqV_o",
  },
};

fetch(url, options)
  .then((res) => res.json())
  .then((json) => console.log(json))
  .catch((err) => console.error("error:" + err));
