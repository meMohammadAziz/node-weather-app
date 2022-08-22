// fetch("https://puzzle.mead.io/puzzle")
//   .then((res) => res.json())
//   .then((data) => console.log(data.puzzle));

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const msgOne = document.querySelector("#msg-1");
const msgTwo = document.querySelector("#msg-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  msgOne.textContent = "";
  msgTwo.textContent = "Loading...";

  const location = search.value;

  const url = `http://localhost:${3000}/weather?address=${location}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.err || data.error) {
        msgOne.textContent = data.err;
        msgTwo.textContent = data.error;
      } else {
        msgOne.textContent = data.location;
        msgTwo.textContent = data.forecast;
      }
    });

  //   console.log(location);
});
