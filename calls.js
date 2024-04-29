import convertToEuropeanDate from "./changeDate.js";

const apiURL = "https://swapi.py4e.com/api/";

const loadMovies = async () => {
  const consult = `${apiURL}/films/`;
  await fetch(consult)
    .then((response) => {
      if (!response.ok) {
        throw new Error("La solicitud no fue exitosa");
      }
      return response.json();
    })
    .then((data) => {
      const movieListElement = document.getElementById("movieList");
      movieListElement.innerHTML = "";
      data.results.map((movie, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${movie.episode_id}. ${movie.title}`;
        listItem.id = `${index + 1}`;
        movieListElement.appendChild(listItem);
      });
    })
    .catch((error) => {
      const movieListElement = document.getElementById("movieList");
      movieListElement.innerHTML = "";
      const listItem = document.createElement("li");
      listItem.textContent = `Ocurrió un error: ${error}`;
      movieListElement.appendChild(listItem);
    });
};

const getInfo = async (movieId) => {
  const consult = `${apiURL}/films/${movieId}/`;
  await fetch(consult)
    .then((response) => {
      if (!response.ok) {
        throw new Error("La solicitud no fue exitosa");
      }
      return response.json();
    })
    .then((data) => {
      const titleElement = document.getElementById("filmTitle");
      const descriptionElement = document.getElementById("description");
      const infoElement = document.getElementById("general-info");
      const charactersListElement = document.getElementById("characterList");
      const characterInfo = document.getElementById("characterInfo");
      characterInfo.innerHTML = "";
      titleElement.innerHTML = "";
      titleElement.textContent = data.title;
      descriptionElement.innerHTML = "";
      descriptionElement.textContent = data.opening_crawl;
      infoElement.innerHTML = `${data.director} <br>
      ${data.producer}<br>
      ${convertToEuropeanDate(data.release_date)}`;
      charactersListElement.innerHTML = "";
      data.characters.map(async (character) => {
        await fetch(character)
          .then((response) => {
            if (!response.ok) {
              throw new Error("La solicitud no fue exitosa");
            }
            return response.json();
          })
          .then((data) => {
            const listItem = document.createElement("li");
            listItem.textContent = data.name;
            listItem.id = data.url;
            charactersListElement.appendChild(listItem);
          })
          .catch((error) => {
            const listItem = document.createElement("li");
            listItem.textContent = `Ocurrió un error: ${error}`;
            charactersListElement.appendChild(listItem);
          });
      });
    });
};

const getVehiclesName = (vehicles) => {
  vehicles.map(async (vehicle) => {
    await fetch(vehicle)
      .then((response) => {
        if (!response.ok) {
          throw new Error("La solicitud no fue exitosa");
        }
        return response.json();
      })
      .then((data) => {
        return data.name;
      })
      .catch((error) => {
        return error;
      });
  });
};

const infoCharacter = async (character) => {
  const characterInfoElement = document.getElementById("characterInfo");
  await fetch(character)
    .then((response) => {
      if (!response.ok) {
        throw new Error("La solicitud no fue exitosa");
      }
      return response.json();
    })
    .then((data) => {
      characterInfoElement.innerHTML = `
        <div class="list-group-item">${data.name}</div>
        <div class="list-group-item">${data.birth_year}</div>
        <div class="list-group-item">
          <h4 class="list-group-item-heading">Información general</h4>
          <p class="list-group-item-text">
          Genero: ${data.gender}</br>
          Altura: ${data.height}</br>
          Peso: ${data.weight}</br>
          Color pelo: ${data.hair_color}</br>
          Color ojos: ${data.eye_color}
          </p>
        </div>
        </div>
        </br>
        <div id="card-752104">
        <div class="card">
          <div class="card-header">
            <a
            class="card-link collapsed"
            data-toggle="collapse"
            data-parent="#card-752104"
            href="#card-element-530309"
            >Pilota</a
          >
                      </div>
                      <div id="card-element-530309" class="collapse">
                        <div class="card-body" id="spaceshipsList">
                        ${
                          data.starships.length <= 0
                            ? "No tiene vehículos"
                            : getVehiclesName(data.vehicles)
                        }</div>
                      </div>
                    </div>
                    <div class="card">
                      <div class="card-header">
                        <a
                          class="card-link collapsed"
                          data-toggle="collapse"
                          data-parent="#card-752104"
                          href="#card-element-701038"
                          >Conduce</a
                        >
                      </div>
                      <div id="card-element-701038" class="collapse">
                        <div class="card-body" id="vehiclesList">
                        ${
                          data.vehicles.length <= 0
                            ? "No tiene vehículos"
                            : getVehiclesName(data.vehicles)
                        }
                        </div>
                      </div>`;
    })
    .catch((error) => {
      const listItem = document.createElement("li");
      listItem.textContent = `Ocurrió un error: ${error}`;
      characterInfoElement.appendChild(listItem);
    });
};

export { loadMovies, getInfo, infoCharacter };
