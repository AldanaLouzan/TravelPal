//....Global Variables....//
var rate;
var dollar;

//....Get the rate, using the currency as a variable, depending on location...//
function getRate() {

    var http = new XMLHttpRequest();
    var api_key = "295fa4ae6b0ad82f2deec9e1a75a6eda";
    var api = "http://apilayer.net/api/live";
    var url = api
        + '?'
        + 'access_key=' + encodeURIComponent(api_key);

    console.log(url);
    http.open("GET", url);

    http.onreadystatechange = (e) => {
        if (http.readyState === 4 && http.status === 200) {
            var response = http.responseText;
            var responseJSON = JSON.parse(response);

            console.log(responseJSON);

            console.log(currencyName + " got from my-location.js");
            document.getElementById('currency').innerHTML = currencyName;
            dollar = "USD";
            console.log(currencyCode + " code got from my-location.js");
            var curr = dollar + currencyCode;
            console.log("Currency code to get the rate: " + curr);

            //isolating data from JSON response
            rate = responseJSON.quotes[curr];

            console.log("Rate: " + rate);

        }
    };
    http.send();
}

//....Function to convert: Dollar to current Currency....//
function convert() {

    var inputDollar = document.getElementById('input').value;
    console.log(inputDollar);

    //Ensure just postive numbers in the input
    if (inputDollar > 0) {
        var result = (inputDollar * rate).toFixed(2);
        document.getElementById('result').innerHTML = result + " " + currencyCode;
    } else {
        var message = "Please, insert a valid number"
        document.getElementById('result').innerHTML = message;
    }

}

//....Function to convert: Current Currency to Dollar....//
function convert2() {

    inputCurrency = document.getElementById('inputCurrency').value;
    console.log(inputCurrency);

    //Ensure just postive numbers in the input
    if (inputCurrency > 0) {
        var result2 = (inputCurrency / rate).toFixed(2);
        document.getElementById('result2').innerHTML = result2 + " " + dollar;
    } else {
        var message = "Please, insert a valid number"
        document.getElementById('result').innerHTML = message;
    }
}
