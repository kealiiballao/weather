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

    // takes in the city from the html form, display in console. Takes in as String
        const coordLong =parseFloat(req.body.longitude);
        const coordLat = parseFloat(req.body.latitude);
        console.log(coordLong +", "+coordLat);

    //build up the URL for the JSON query, API Key is e2a23207324a3ca9e15f4b78edef5b69 secret and needs to be obtained by signup
        const units = "imperial";
        const apiKey = "e2a23207324a3ca9e15f4b78edef5b69";//secret key created on openweathermap
        const url = "https://api.openweathermap.org/data/2.5/weather" + "?lat=" + coordLat +"&lon=" + coordLong +  "&units=" + units + "&APPID=" + apiKey; //url needed to query by city. See openweathermap city section.

    // this gets the data from Open WeatherPI
    https.get(url, function(response){
        // gets individual items from Open Weather API
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const tempMin = weatherData.main.temp_min;
            const tempMax = weatherData.main.temp_max;
            const windSpeed = weatherData.wind.speed;
            const windDirection = weatherData.wind.deg;
            const feelsLike = weatherData.main.feels_like;
           const city = weatherData.name;
           let myWeatherTestArray = [city,tempMin,tempMax,windSpeed,windDirection,feelsLike];
           for (let i = 0; i < myWeatherTestArray.length; i++) {
               console.log(myWeatherTestArray[i]);
               
           };
           
           /*
            
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            // displays the output of the results
            res.write("<h1> The weather is " + weatherDescription + "</h1>");
            res.write("<p>The Temperature in " + city +" is " + temp + "&#8457; </p>");//took out zip variable because not needed.
            res.write("<div><img src=" + imageURL +">"+"Feels like: "+ feelsLike+"</div>");
           
           */
          res.send(tempMin +",<br>"+ tempMax + ",<br>" + windSpeed +",<br>"+ windDirection + ",<br>" + feelsLike);//need to send data to webpage.
        });
    });
})


//Code will run on 3000 or any available open port
app.listen(process.env.PORT || 3003, function() {
console.log ("Server is running on port 3003")
});
