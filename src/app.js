const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const port = 3000;
const app = express();

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.use(express.static(publicDirectoryPath));

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", { title: "Weather", name: "Mars" });
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About me", name: "Mars" });
});
app.get("/help", (req, res) => {
  res.render("help", {
    message: "This is some useful information about the weather station.",
    title: "Help",
    name: "Mars",
  });
});
app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (address) {
    geocode(address, (err, { latitude, longitude, location } = {}) => {
      if (err) {
        return res.send({ err });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location: location,
          address: req.query.address,
        });
      });
    });
  } else {
    res.send({
      error: "No address provided",
    });
  }
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMsg: "Help article not found.",
    title: "404",
    name: "Mars",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    errorMsg: "Page not found.",
    title: "404",
    name: "Mars",
  });
});

app.listen(port, () => {
  console.log("Server listening on port");
});
