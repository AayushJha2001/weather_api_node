const express = require('express')
const https = require("https");

const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

const port = process.env.port || 3000;

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.post('/', (req, res) => {
    //console.log(req.body.cityName);
    const query = req.body.cityName;
    const apiKey = "1d60a080e41f502dde8bc7b78f854104"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=metric"

    https.get(url, (response) => {
        //console.log(response.statusCode);
        response.on('data', (data) => {
            // console.log(data);
            const weatherData = JSON.parse(data);
            // console.log(weatherData)
            const temp = weatherData.main.temp;

            const discription = weatherData.weather[0].description
            // console.log(discription);

            res.write("<h1>The temperature in " + req.body.cityName + " is " + temp + " Degree Celsius</h1>")
            res.write("<p>The weather Description is " + discription + "</p>")
        })
    })

})

app.listen(port, () => {
    console.log("Server is listening on port " + port)
})

