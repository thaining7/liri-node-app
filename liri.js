require("dotenv").config();
var fs = require("fs");
var request = require("request");
var moment = require("moment");
moment().format();
// var inquirer = require("inquirer");
var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var liriInput = process.argv[2];
var liriInput1 = process.argv;
var movieTitle = "";
var songTitle = "";
var artistName = "";

if (liriInput === "movie-this") {
    // console.log(liriInput);
    for (i = 3; i < liriInput1.length; i++) {
        movieTitle += liriInput1[i] + "";
    }
    axios.get("http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy").then(
        function (response) {

            // console.log("The movie's rating is: " + response.data.imdbRating);
            // console.log(response.data);
            console.log(JSON.stringify(response.data, null, 2));
        });

}
// else (liriInput === "movie-this") {
//     axios.get("http://www.omdbapi.com/?t=Mr. Nobody&y=&plot=short&apikey=trilogy").then(
//         function (response) {

//             // console.log("The movie's rating is: " + response.data.imdbRating);
//             console.log(JSON.stringify(response.data, null, 2));
//         });
// }

else if (liriInput === "spotify-this-song") {
    for (i = 3; i < liriInput1.length; i++) {
        songTitle += liriInput1[i] + "";
    }
    spotify
        .search({ type: 'track', query: songTitle })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (err) {
            console.log(err);
        });
}

else if (liriInput === "concert-this") {
    for (i = 3; i < liriInput1.length; i++) {
        artistName += liriInput1[i] + "";
    }
    axios.get("https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp").then(function (response) {
        console.log(JSON.stringify(response.data, null, 2));
    });
}

else {
    console.log('Please type one of the following commands: concert-this "band name", movie-this "name of movie", spotify-this-song "name of song"');
}