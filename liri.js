require("dotenv").config();
var fs = require("fs");
// var request = require("request");
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
var defaultMovie = "Mr. Nobody"
var defaultSong = "Ace of Base The Sign"


// Movie this yo //

function movieThis() {
    if (liriInput === "movie-this") {
        if (movieTitle === "") {
            movieTitle = defaultMovie;
        }
        for (i = 3; i < liriInput1.length; i++) {
            movieTitle += liriInput1[i] + "";
        }
        axios.get("http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy").then(
            function (response) {
                // console.log(response.data);
                console.log("Title: " + response.data.Title, "Year: " + response.data.Year, "IMDB Rating " + response.data.imdbRating, "Country: " + response.data.Country, "Language: " + response.data.Language, "Plot: " + response.data.Plot, "Actors: " + response.data.Actors);
            });
    }
}
movieThis();


// Spotify this yo //

function spotifyThis() {
    if (liriInput === "spotify-this-song") {
        for (i = 3; i < liriInput1.length; i++) {
            songTitle += liriInput1[i] + "";
        }
        if (songTitle === "") {
            songTitle = defaultSong;
        }

        spotify
            .search({ type: 'track', query: songTitle })
            .then(function (response) {
                console.log("Song Artist: " + response.tracks.items[0].artists[0].name, "Song Name: " + response.tracks.items[0].name, "Song Preview Link: " + response.tracks.items[0].preview_url, "Song Album: " + response.tracks.items[0].album.name);
            })
            .catch(function (err) {
                console.log(err);
            });
    }
}
spotifyThis();

// Concert this yo //

function concertThis() {
    if (liriInput === "concert-this") {
        for (i = 3; i < liriInput1.length; i++) {
            artistName += liriInput1[i] + "";
        }
        axios.get("https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp").then(function (response) {
            console.log("Name of venue: " + response.data[0].venue.name, "Country of venue: " + response.data[0].venue.country, "City of venue: " + response.data[0].venue.city, "Date of concert: " + moment(response.data[0].datetime).format("MM/DD/YYYY"));
        });
    }
}
concertThis();

// do-what-it-says

function doThis() {
    if (liriInput === "do-what-it-says") {
        fs.readFile("random.txt", "utf8", function (error, data) {
            if (error) {
                return console.log("Sorry theres a problem");
            }
            console.log(data);
            var dataArr = data.split(",");
            liriInput = dataArr[0];
            //   console.log(dataArr[0]);
            liriInput1 = dataArr.slice(1).join(" ");
            //   console.log(dataArr.slice(1).join(" "));
            
            spotifyThis();
            
            // else if (liriInput === "concert-this") {
            //     concertThis();
            // }
            // else {
            //     movieThis();
            // }
        });
    }
}
doThis();

// else {
//     console.log('Please type one of the following commands: concert-this "name of band", movie-this "name of movie", spotify-this-song "name of song", or do-what-it-says');
// }