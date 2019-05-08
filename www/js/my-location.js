//....Global Variables....//
var currencyCode;
var city;
var latitude;
var longitude;
var currencyName;

//....Get current position...//
function getLocation() {

    navigator.geolocation.getCurrentPosition(geoCallback, onError);
}

var geoCallback = function (position) {

    console.log(position);

    //Isolate the latitude and longitude from the response
    latitude = -34.603722;//position.coords.latitude;
    longitude = -58.381592;//position.coords.longitude;//
    console.log(latitude + " test");
    console.log(longitude + " test");

    //Call the rest of the Functions that I want to get before any interaction with the user 
    openCage();
    getWeather();
    initMap();

}

function onError(message) {

    console.log(message);

}


//....Using openCage to get some value information from the location...//
function openCage() {

    var http = new XMLHttpRequest();
    var api_key = '1320b75b389846d19e15ec59ce222a88';
    var api = 'https://api.opencagedata.com/geocode/v1/json';

    //declaration of variable url 
    var url = api
        + '?'
        + '&key=' + encodeURIComponent(api_key)
        + '&q=' + encodeURIComponent(latitude)
        + ',' + encodeURIComponent(longitude)
        + '&pretty=1';

    console.log(url);
    
    http.open("GET", url);

    http.onreadystatechange = (e) => {
        if (http.readyState === 4 && http.status === 200) {
            var response = http.responseText;
            var responseJSON = JSON.parse(response);

            console.log(responseJSON);

            //Isolating the data that I want from the JSON response
            city = responseJSON.results[0].components.city;            
            var country = responseJSON.results[0].components.country;
            console.log("City: " + city + " | Country: " + country);
            currencyName = responseJSON.results[0].annotations.currency.name;
            currencyCode = responseJSON.results[0].annotations.currency.iso_code;
            console.log("Currency: " + currencyName + " (" + currencyCode + ")");
            var roadInfo = responseJSON.results[0].annotations.roadinfo.drive_on;
            console.log("test RoadInfo: "+roadInfo);

            document.getElementById('city').innerHTML = city;
            document.getElementById('openCage').innerHTML = "Country: " + country;
            document.getElementById('currency').innerHTML = currencyName;
            document.getElementById('roadInfo').innerHTML = "<br>If you are going on a RoadTrip, remember<br> "
                                                            +"you need to drive on your "+"<b>"+roadInfo+"!</b>";
            

            //Calling the function which will get the rate, taking the current currency depending on location 
            getRate();

        }
    };
    http.send();

}

