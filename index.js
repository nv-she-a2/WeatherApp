const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let city = 'Hisua';

app.get('/', (req, res) => {
    const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';	
    const apiId = '&appid=ae4be719cf240413da7aab32c8eaf23c&units=metric';

    const userLocation = (url1, url2, city) => {
        let newUrl = url1 + city + url2;
        return newUrl;
    };

    const apiUrl = userLocation(baseUrl, apiId, city);

    async function callWeatherAPI(){
        console.log('Calling Weather API:');
        let response = await fetch(apiUrl);
        let json = await response.json();

        const message =
        (
            `Right now, in \
            ${city}, ${json.sys.country} the current temperature is \
            ${json.main.temp.toFixed(2)} deg C.`.replace(/\s+/g, ' ')
        );
        res.send({message});
        console.log(message);
    }

    callWeatherAPI();

})

app.listen(port,(err) => {
    if(err)
        console.log(err);
    console.log('Listening to port '+port);
});
