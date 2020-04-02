const express = require("express");
const app = express();
const request = require("request");
const moment = require("moment");

app.set("view engine", "pug");
app.use(express.static("public"));

app.get("/", function(req, res) {
  var currentDay = moment(Date.now()).format("YYYY-MM-DD");
  var nextDay = moment(currentDay)
    .add(1, "days")
    .format("YYYY-MM-DD");
  var url =
    "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=" +
    currentDay +
    "&endtime=" +
    nextDay +
    "&minmagnitude=5";
  request(url, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var parsedData = JSON.parse(body);
      res.render("verti", {
        data: parsedData,
        moment: moment,
        currentDay: currentDay
      });
    }
  });
});

app.get("/:startdate/:enddate", function(req, res) {
  var currentDay = req.params.startdate;
  var nextDay = req.params.enddate;
  var url =
    "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=" +
    currentDay +
    "&endtime=" +
    nextDay +
    "&minmagnitude=5";
  request(url, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var parsedData = JSON.parse(body);
      res.render("verti", {
        data: parsedData,
        moment: moment,
        currentDay: currentDay
      });
    }
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("server listening");
});
