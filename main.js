import { loadMovies, getInfo, infoCharacter } from "./library/calls.js";
window.onload = () => {
  loadMovies();

  const filmsList = document.getElementById("movieList");
  filmsList.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      getInfo(e.target.id);
    }
  });
  const charactersList = document.getElementById("characterList");
  charactersList.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      infoCharacter(e.target.id);
    }
  });
};
