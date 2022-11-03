const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.post("/", function(req, res){
    const query = req.body.cityName;
    const apiKey = "your appid";
    const unit = "metric";
    url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            console.log(JSON.parse(data));
            const temp = JSON.parse(data).main.temp;
            const weatherDescription = JSON.parse(data).weather[0].description;
            res.write("<h1>The weather is currently "+ weatherDescription+ "</h1>");
            res.write("<h1>The temperature in "+ query+" is "+ temp + " degrees Celcius.</h1>");
            const imgURL = "http://openweathermap.org/img/wn/"+ JSON.parse(data).weather[0].icon+"@2x.png";
            res.write("<img src="+imgURL+" >");
            res.send();
            //res.sendFile(__dirname+ "/public/weather.html");
        })
    })
})


app.listen(3000, function(){
    console.log("Listening to the port 3000.")
});
