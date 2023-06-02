require("dotenv").config();

API_ID = process.env.API_ID;

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
 res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){

        
    const query = req.body.cityName;
    const appid =API_ID;
    const unit = "metrics";
    const url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appid+"&units="+unit
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDesccription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
            
            res.write("<p>Weather Description : "+weatherDesccription+"</p>")
            res.write("<h1>Temperature : "+temp+ " Kelvin</h1>");
            res.write("<img src="+imageUrl+">");
            res.send()
        });
    });

});

app.listen(3000,function(){
    console.log("Server started in the port 3000");
});