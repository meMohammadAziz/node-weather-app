const request = require("request");

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherapi.com/v1/forecast.json?key=c374b6f9d92f41da820101946222507&q=${lat},${long}&days=1&aqi=no&alerts=no`;
  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("Unable to connect to weather api", undefined);
    } else if (body.error) {
      callback(body.error.message, undefined);
    } else {
      callback(
        undefined,
        `${body.current.condition.text}. It is currently ${body.current.temp_c} degrees out. There is ${body.forecast.forecastday[0].day.daily_chance_of_rain}% chance of rain.`
      );
    }
  });
};

module.exports = forecast;
