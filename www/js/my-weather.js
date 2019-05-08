//....Global Variables....//
var currentTemp;
var currentTimeUNIX;

//....Function to get the Weather (DarkSky API) of the current location....//
function getWeather() {
    var http = new XMLHttpRequest();
    var api_key = 'e08200e08419de6cddca1db84348cbb7';
    var api = 'https://api.darksky.net/forecast/';
    var units = "si";   //I defined this units in orther to get the Temperature in Celsious

    //declaration of variable url 
    var url = api
        + encodeURIComponent(api_key)
        + '/' + encodeURIComponent(latitude)
        + ',' + encodeURIComponent(longitude)
        + '?units=' + encodeURIComponent(units);

    console.log(url);

    http.open("GET", url);


    http.onreadystatechange = (e) => {
        if (http.readyState === 4 && http.status === 200) {
            var response = http.responseText;
            var responseJSON = JSON.parse(response);

            console.log(responseJSON);

            //Isolating the data that I want from the JSON response
            currentTemp = responseJSON.currently.temperature;
            currentTimeUNIX = responseJSON.currently.time;
            var weeklySummary = responseJSON.daily.summary;
            var summary = responseJSON.currently.summary;
            var iconCode = responseJSON.currently.icon;
            var feels = responseJSON.currently.apparentTemperature;

            //Testing
            console.log(summary);
            console.log(iconCode + " is the icon code");
            console.log(currentTemp + " testing the T°");

            //Making the id of the Icon in the HTML dynamic
            document.getElementById("demo").id = iconCode;
            //Calling the function that gives me back the proper icon (used by DarkSky API)
            skycons();

            var weatherOutput = summary
                + "<br><b>Current temperature: </b>" + currentTemp + " °C"
                + "<br><b>Feels: </b>" + feels + " °C<br>"
                + "<br><b>The weather for this week:</b><br>" + weeklySummary;


            document.getElementById('getWeather').innerHTML = weatherOutput;

            

        }
    };
    http.send();
}

//....Function to get the Icon of the Weather....//
function skycons() {


    icons = new Skycons({
        "color": "pink",
        "resizeClear": true
    }),

        //Setting the icons I will use 
    icons.set("clear-day", Skycons.CLEAR_DAY);
    icons.set("clear-night", Skycons.CLEAR_NIGHT);
    icons.set("partly-cloudy-day", Skycons.PARTLY_CLOUDY_DAY);
    icons.set("partly-cloudy-night", Skycons.PARTLY_CLOUDY_NIGHT);
    icons.set("cloudy", Skycons.CLOUDY);
    icons.set("rain", Skycons.RAIN);
    icons.set("sleet", Skycons.SLEET);
    icons.set("snow", Skycons.SNOW);
    icons.set("wind", Skycons.WIND);
    icons.set("fog", Skycons.FOG);
    // animate the icons
    icons.play();
};



