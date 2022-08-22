const request = require("request");
const geocode = (address, callback) => {
  const url = `http://api.positionstack.com/v1/forward?access_key=43c7f2f1707905d12cc07471a5bf942d&query=${encodeURIComponent(
    address
  )}&limit=1`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("unable to connect to getlocation api", undefined);
    } else if (
      !body.data ||
      body.data.length === 0 ||
      body.data[0].length === 0
    ) {
      //   console.log(body.data);
      callback("Try again with different search term", {
        latitude: 0,
        longitude: 0,
      });
    } else {
      callback(undefined, {
        latitude: body.data[0].latitude,
        longitude: body.data[0].longitude,
        location: body.data[0].country,
      });
      //   console.log(body.data);
    }
  });
};

module.exports = geocode;
