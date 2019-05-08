//....Global Variables....//
var trip;
var contentGlobal = "";
var fileEntryGlobal;


//....Function to create the file it it doesnt exist....//
function tryingFile() {

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemCallback, onError);

}

function fileSystemCallback(fs) {

    // Name of the file I want to create
    var fileToCreate = "myTrips.txt";

    // Opening/creating the file
    fs.root.getFile(fileToCreate, fileSystemOptionals, getFileCallback, onError);

}

var fileSystemOptionals = { create: true, exclusive: false };

function getFileCallback(fileEntry) {

    fileEntryGlobal = fileEntry;


}


//....Function to Write the File....//
function writeFile(newTrip) {
    //I call the Read function in order to see on console the Data that I have written
    readFile();

    contentGlobal = contentGlobal + " -- " + newTrip;

    var dataObj = new Blob([contentGlobal], { type: 'text/plain' });

    // Create a FileWriter object for our FileEntry (myTrips.txt).
    fileEntryGlobal.createWriter(function (fileWriter) {

        // If data object is not passed in,
        // create a new Blob instead.
        if (!dataObj) {
            dataObj = new Blob([contentGlobal], { type: 'text/plain' });
        }

        fileWriter.write(dataObj);

        fileWriter.onwriteend = function () {
            console.log("Successful file write...");
            var saveFile = "Successful Data Saved";
            document.getElementById("saved").innerHTML = saveFile;
            
        };

        fileWriter.onerror = function (e) {
            console.log("Failed file write: " + e.toString());
            document.getElementById('saved').innerHTML = "Please, try again.";
        };

    });

}

//....Function to Read the file using the console....//
function readFile() {

    // Get the file from the file entry
    fileEntryGlobal.file(function (file) {

        // Create the reader
        var reader = new FileReader();
        reader.readAsText(file);

        reader.onloadend = function () {

            console.log("Successful file read: " + this.result);
            console.log("file path: " + fileEntryGlobal.fullPath);
            contentGlobal = this.result;
        };

    }, onError);
}

function onError(msg) {
    console.log(msg);
}

//Convert the UNIX timestamp from DarkSky API into Date, for save Data in file
function timeConverter(timestamp) {
    var date = new Date(timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = date.getFullYear();
    var month = months[date.getMonth()];
    var day = date.getDate();
    var time = day + ' of ' + month + ' of ' + year;

    return time;
}

//....Function to create the string with the data I want to save....//
function checkTrip() {
    //Invoquing and storing the result of timeConverter Function 
    var currentDate = timeConverter(currentTimeUNIX);
    trip = "The " + currentDate + " you were in " + city + " and the T° was " + currentTemp + " °C. ";
    document.getElementById("displayData").innerHTML = trip;
}

//....Function to delete the File and Write over it....//
function deleteHistory() {

    // remove the file
    fileEntryGlobal.remove(successDelete, fail);
    document.getElementById('historyRemove').innerHTML = "All your data has been erased!!";
    tryingFile();
}

function successDelete(entry) {
    console.log("Removal succeeded.");
}

function fail(error) {
    console.log('Error removing file: ' + error.code);
}

//....Function to save the File....//
function save() {

    writeFile(trip);
}

