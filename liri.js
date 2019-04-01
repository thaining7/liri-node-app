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
            console.log("Title: " + response.data.Title, "Year: " + response.data.Year, "IMDB Rating " + response.data.imdbRating, "Country: " + response.data.Country, "Language: " + response.data.Language, "Plot: " + response.data.Plot, "Actors: " + response.data.Actors);
        });

}

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
        console.log(response.venue);
    });
}

// else if (liriInput === "do-what-it-says") {

// }

else {
    console.log('Please type one of the following commands: concert-this "name of band", movie-this "name of movie", spotify-this-song "name of song", or do-what-it-says');
}