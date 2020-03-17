const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

//displays index.html of root path
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
});

//invoked after hitting go in the html form
app.post("/", function(req, res) {
    let lat = String(req.body.latitude);
    let lon = String(req.body.longitude);

        const units = "imperial";
        const apiKey = "e2a23207324a3ca9e15f4b78edef5b69";//secret key created on openweathermap
        const url = "https://api.openweathermap.org/data/2.5/weather"+"?lat="+lat+"&lon="+lon+"&units="+units+"&appid="+apiKey;
    // this gets the data from Open WeatherPI
    https.get(url, function(response){
        console.log(response.statusCode);
        // gets individual items from Open Weather API
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const maxTemp = weatherData.main.temp_max;
            const minTemp = weatherData.main.temp_min;
            const windSpeed = weatherData.wind.speed;
            const windDirect = parseFloat(weatherData.wind.deg);
            const city = weatherData.name;
            res.write("<h1>Minimum Temperature is "+minTemp+"&#8457;</h1>");
            res.write("<h1>Max Temperature is "+maxTemp+"&#8457;</h1>");
            res.write("<h1>Wind Speed is "+windSpeed+" m/h</h1>");
            res.write("<h1>Wind Direction is "+windDirect+"&deg;</h1>");
            res.write("<h1> Nearest location is "+city+".</h1>");
            res.send()
        });
    });
})


//Code will run on 3000 or any available open port
app.listen(process.env.PORT || 3000, function() {
console.log ("Server is running on port 3000")
});
