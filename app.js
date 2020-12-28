const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){
  const query = req.body.city;
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=a2e41482c40c073b864ecc979661705b&units=metric";
  https.get(url,function(response){

    response.on("data",function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<p>The weather is currently " + weatherDescription + "</p>");
      res.write("<h1>The temperature is " + temp +" degree celsius in " + query + ".</h1>");
      res.write("<img src=" + imageurl + ">");
      res.send();
    });
  });
})
app.listen(3000,function(){console.log("Server is running on port 3000")});
